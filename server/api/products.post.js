import Redis from 'ioredis';
import md5 from "blueimp-md5";

export default defineEventHandler(async (event) => {

    const redis = new Redis(6379);

    let products = [];

    const requestBody = await readBody(event);

    const url = new URL(useRuntimeConfig().public.API_URL + '/products');

    const params = {
        "page": requestBody.page || 1,
        "category_id": requestBody.category_id || null,
        "stocks": "",
        "stock_images": "",
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const cacheKey = 'products:' + md5(JSON.stringify(params));
    redis.del('products:' + md5(JSON.stringify(params)))

    if (useRuntimeConfig().public.ENABLE_CACHE == false) {

        const request = await $fetch(url.toString());
        return request.data;
    }

    if (!await redis.exists(cacheKey)) {

        const request = await $fetch(url.toString());
        products = request.data;
        redis.set(cacheKey, JSON.stringify(request.data), 'EX', 60 * 60 * 24 * 30);

    } else {

       products = await redis.get(cacheKey);

    }

    return products;

});
