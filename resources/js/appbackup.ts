// Viteの修正
import 'vite/modulepreload-polyfill';

// フレームワーク
import '../css/style.css';
import '../css/NProgress.css';

import './bootstrap';

// アプリの作成
import { createApp, h } from 'vue';
import type { DefineComponent } from "vue";
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import PageLoader from './Components/Loaders/PageLoader.vue';
import AeoPagination from './Components/Pagination.vue';
import vue3GoogleLogin from 'vue3-google-login'
// サイトの大部分が完了したら、すべての Ziggy ルートをトレイルに移行します - 過去 あえお
//https://github.com/lepikhinb/momentum-trail

//import { defineRoutes } from "momentum-trail"
//import routes from "../routing/js/routing.json";
//defineRoutes(routes);


// エクストラ

//import LogRocket from 'logrocket';
//LogRocket.init('vkyjvf/vestora');

import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy-bundle.umd.min.js';
import '@popperjs/core/dist/umd/popper.min.js';


const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Vextoria';
createInertiaApp({
    progress: {includeCSS: true, showSpinner: false,},
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>("./Pages/**/*.vue")),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, (window as any).Ziggy)
            .use(VueTippy)
            .use(vue3GoogleLogin, {
                clientId: '564853151754-c0epg6ulhtc486gna17gr5jhp4b6re2d.apps.googleusercontent.com'
            })
            .component('PageLoader', PageLoader) // LoadingPage コンポーネントを登録する
            .component('AeoPagination', AeoPagination) // Pagination コンポーネントを登録する
            .component('Head', Head)
            .component('Link', Link)
            .mount(el);
    },
});

