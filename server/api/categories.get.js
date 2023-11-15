import Redis from 'ioredis';
import md5 from "blueimp-md5";

// eslint-disable-next-line no-undef
export default defineEventHandler(async () => {

    const redis = new Redis(6379);

    let categories = [];

    // eslint-disable-next-line no-undef
    const url = new URL(useRuntimeConfig().public.API_URL + '/categories');

    const params = {
        'no-paginate': '',
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const cacheKey = 'categories:' + md5(JSON.stringify(params));

    // eslint-disable-next-line no-undef
    if (useRuntimeConfig().public.ENABLE_CACHE === false) {

        // eslint-disable-next-line no-undef
        const request = await $fetch(url.toString());
        return request.data.data;

    }

    if (!await redis.exists(cacheKey)) {

        // eslint-disable-next-line no-undef
        const request = await $fetch(url.toString());
        categories = request.data.data;
        redis.set(cacheKey, JSON.stringify(request.data.data), 'EX', 60 * 60 * 24 * 30);

    } else {

        categories = await redis.get(cacheKey);

    }

    return categories;

});
