// フレームワーク
import '../css/style.css';
import '../css/NProgress.css';
import 'vue-skeletor/dist/vue-skeletor.css';

import PageLoader from './Components/Loaders/PageLoader.vue'

import './bootstrap';

// アプリの作成
import { Skeletor } from 'vue-skeletor';
import { createSSRApp, h } from 'vue';
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import type { DefineComponent } from 'vue';
import AeoPagination from './Components/Pagination.vue';
import { trail } from "momentum-trail"
import routes from "../routes/js/routing.json";

// エクストラ

import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy-bundle.umd.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Vextoria';

createInertiaApp({
    progress: { includeCSS: true, showSpinner: false },
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>("./Pages/**/*.vue")),
    setup({ el, App, props, plugin }) {
        const app = createSSRApp({ render: () => h(App, props) })
            .use(plugin)
            .use(trail, {
                routes,
                url: props.initialPage.url
            })
            .use(VueTippy)
            .component('Skeletor', Skeletor)
            .component('AeoPagination', AeoPagination)
            .component('Head', Head)
            .component('Link', Link);

        // Set productionTip to true in production environment
        if (process.env.NODE_ENV === 'production') {
            app.config.productionTip = true;
        }

        // Mount the app to the element
        app.mount(el);
    },
});

