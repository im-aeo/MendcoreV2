// フレームワーク
import '../css/style.css';
import '../css/NProgress.css';
import 'vue-skeletor/dist/vue-skeletor.css';
//import './bootstrap';

// アプリの作成
import { Skeletor } from 'vue-skeletor';
import AeoPagination from './Components/Pagination.vue';
import { trail } from "momentum-trail"
import routes from "../routes/js/routing.json";
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h } from 'vue';
import type { DefineComponent } from 'vue';


// エクストラ


import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy-bundle.umd.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';


const appName = import.meta.env.VITE_APP_NAME || 'Vextoria';
createServer(page =>
  createInertiaApp({
    page,
    render: renderToString,
    progress: { includeCSS: true, showSpinner: false },
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>("./Pages/**/*.vue")),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .use(trail, {
          routes,
          url: props.initialPage.url
        })
        .use(VueTippy)
        .component('Skeletor', Skeletor)
        .component('AeoPagination', AeoPagination) // Pagination コンポーネントを登録する
        .component('Head', Head)
        .component('Link', Link)
    },
  }),
)
