import { useRouter, useRoute } from "vue-router";

function piniaNuxtPlugin({store}) {
    const router = useRouter();
    const route = useRoute();

    store.$router = router;
    store.$route = route;
}

export default defineNuxtPlugin(({$pinia}) => {
    $pinia.use(piniaNuxtPlugin);
}) 
