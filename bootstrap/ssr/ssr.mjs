import { Skeletor } from "vue-skeletor";
import { Link, createInertiaApp, Head } from "@inertiajs/vue3";
import { resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, createSSRApp, h } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { trail } from "momentum-trail";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import VueTippy from "vue-tippy";
const style = "";
const NProgress = "";
const vueSkeletor = "";
const _sfc_main = {
  components: {
    Link
  },
  props: {
    pagedata: {
      type: Object,
      required: true,
      default: () => ({
        current_page: 0,
        last_page: 0,
        total: 0
      })
    }
  },
  methods: {
    getPageClick(page) {
      if (page >= 1 && page <= this.pagedata.last_page) {
        this.$emit("page-clicked", page);
        return `?page=${page}`;
      }
      return "";
    }
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-2 section" }, _attrs))}><ul class="pagination flex-container align-center">`);
  _push(ssrRenderComponent(_component_Link, {
    class: ["page-link", { "page-disabled": $props.pagedata.current_page == 1 }],
    as: "button",
    href: $options.getPageClick($props.pagedata.current_page - 1)
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fa-regular fa-chevron-left"${_scopeId}></i>`);
      } else {
        return [
          createVNode("i", { class: "fa-regular fa-chevron-left" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--[-->`);
  ssrRenderList($props.pagedata.last_page, (page) => {
    _push(ssrRenderComponent(_component_Link, {
      class: ["page-link", { "page-active": $props.pagedata.current_page == page }],
      as: "button",
      key: page,
      href: $options.getPageClick(page)
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(page)}`);
        } else {
          return [
            createTextVNode(toDisplayString(page), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]-->`);
  _push(ssrRenderComponent(_component_Link, {
    class: ["page-link", { "page-disabled": $props.pagedata.current_page == $props.pagedata.last_page }],
    as: "button",
    href: $options.getPageClick($props.pagedata.current_page + 1)
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fa-regular fa-chevron-right"${_scopeId}></i>`);
      } else {
        return [
          createVNode("i", { class: "fa-regular fa-chevron-right" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AeoPagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const url = "https://netisu.test";
const port = null;
const defaults = [];
const routes = {
  "l5-swagger.default.api": {
    uri: "api/documentation",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "l5-swagger.default.docs": {
    uri: "docs/{jsonFile?}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "jsonFile"
    ]
  },
  "l5-swagger.default.asset": {
    uri: "docs/asset/{asset}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "asset"
    ]
  },
  "l5-swagger.default.oauth2_callback": {
    uri: "api/oauth2-callback",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "passport.token": {
    uri: "oauth/token",
    methods: [
      "POST"
    ]
  },
  "passport.authorizations.authorize": {
    uri: "oauth/authorize",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "passport.token.refresh": {
    uri: "oauth/token/refresh",
    methods: [
      "POST"
    ]
  },
  "passport.authorizations.approve": {
    uri: "oauth/authorize",
    methods: [
      "POST"
    ]
  },
  "passport.authorizations.deny": {
    uri: "oauth/authorize",
    methods: [
      "DELETE"
    ]
  },
  "passport.tokens.index": {
    uri: "oauth/tokens",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "passport.tokens.destroy": {
    uri: "oauth/tokens/{token_id}",
    methods: [
      "DELETE"
    ],
    parameters: [
      "token_id"
    ]
  },
  "passport.clients.index": {
    uri: "oauth/clients",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "passport.clients.store": {
    uri: "oauth/clients",
    methods: [
      "POST"
    ]
  },
  "passport.clients.update": {
    uri: "oauth/clients/{client_id}",
    methods: [
      "PUT"
    ],
    parameters: [
      "client_id"
    ]
  },
  "passport.clients.destroy": {
    uri: "oauth/clients/{client_id}",
    methods: [
      "DELETE"
    ],
    parameters: [
      "client_id"
    ]
  },
  "passport.scopes.index": {
    uri: "oauth/scopes",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "passport.personal.tokens.index": {
    uri: "oauth/personal-access-tokens",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "passport.personal.tokens.store": {
    uri: "oauth/personal-access-tokens",
    methods: [
      "POST"
    ]
  },
  "passport.personal.tokens.destroy": {
    uri: "oauth/personal-access-tokens/{token_id}",
    methods: [
      "DELETE"
    ],
    parameters: [
      "token_id"
    ]
  },
  "sanctum.csrf-cookie": {
    uri: "sanctum/csrf-cookie",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  telescope: {
    uri: "telescope/{view?}",
    methods: [
      "GET",
      "HEAD"
    ],
    wheres: {
      view: "(.*)"
    },
    parameters: [
      "view"
    ]
  },
  "api.": {
    uri: "api",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "api.search": {
    uri: "api/search",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "api.avatar": {
    uri: "api/render/validate/{id}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id"
    ]
  },
  "api.user.": {
    uri: "api/users",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "api.user.online": {
    uri: "api/users/online/{id}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id"
    ]
  },
  "api.user.status": {
    uri: "api/users/status-list",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "api.user.avatar": {
    uri: "api/users/user/img/{id}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id"
    ]
  },
  "api.user.follow": {
    uri: "api/users/follow/{user}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "user"
    ],
    bindings: {
      user: "id"
    }
  },
  "api.user.unfollow": {
    uri: "api/users/unfollow/{user}",
    methods: [
      "POST"
    ],
    parameters: [
      "user"
    ],
    bindings: {
      user: "id"
    }
  },
  "api.store.": {
    uri: "api/market",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "api.store.items": {
    uri: "api/market/items/{category}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "category"
    ]
  },
  "api.store.event.items": {
    uri: "api/market/items/event/{eventId}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "eventId"
    ]
  },
  "api.avatar.": {
    uri: "api/inventory",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "api.avatar.items": {
    uri: "api/inventory/inventory/{category}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "category"
    ]
  },
  "api.rss": {
    uri: "api/rss-feed",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "api.thumbnails": {
    uri: "api/thumbnails/{type}/{id}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "type",
      "id"
    ]
  },
  "maintenance.page": {
    uri: "maintenance",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "maintenance.authenticate.password": {
    uri: "maintenance/password",
    methods: [
      "POST"
    ]
  },
  "maintenance.exit": {
    uri: "maintenance/exit",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "my.dashboard.page": {
    uri: "my/dashboard",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "my.dashboard.validate": {
    uri: "my/dashboard",
    methods: [
      "POST"
    ]
  },
  "user.page": {
    uri: "users/discover",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "user.profile": {
    uri: "users/profile/{username}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "username"
    ]
  },
  "user.settings.page": {
    uri: "users/settings/{category}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "category"
    ]
  },
  "user.settings.update": {
    uri: "users/settings/update",
    methods: [
      "PATCH"
    ]
  },
  "user.settings.destroy": {
    uri: "users/settings/delete-account",
    methods: [
      "POST"
    ]
  },
  "avatar.page": {
    uri: "customize",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "avatar.update": {
    uri: "customize/update",
    methods: [
      "POST"
    ]
  },
  "forum.page": {
    uri: "discuss/{id}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id"
    ]
  },
  "forum.post": {
    uri: "discuss/post/{id}/{slug}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id",
      "slug"
    ]
  },
  "forum.create.page": {
    uri: "discuss/create/{id}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id"
    ]
  },
  "forum.create.validate": {
    uri: "discuss/create/{id}/validate",
    methods: [
      "POST"
    ],
    parameters: [
      "id"
    ]
  },
  "forum.reply.validate": {
    uri: "discuss/create/reply/{id}/validate",
    methods: [
      "POST"
    ],
    parameters: [
      "id"
    ]
  },
  "auth.logout": {
    uri: "auth/logout",
    methods: [
      "POST"
    ]
  },
  "auth.language": {
    uri: "auth/set-language/{language}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "language"
    ]
  },
  "auth.login.google": {
    uri: "auth/login/google/v1",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "auth.login.google.validation": {
    uri: "auth/login/callback/google",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "auth.login.page": {
    uri: "auth/login",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "auth.login.validate": {
    uri: "auth/login/validate",
    methods: [
      "POST"
    ]
  },
  "auth.login.metamask": {
    uri: "auth/login/validate/metamask",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "auth.login.metamask.validation": {
    uri: "auth/login/validate/meta-mask-api",
    methods: [
      "POST"
    ]
  },
  "auth.register.page": {
    uri: "auth/register",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "auth.register.validate": {
    uri: "auth/register/validate",
    methods: [
      "POST"
    ]
  },
  "auth.forgot.page": {
    uri: "auth/forgot",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  Welcome: {
    uri: "/",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "games.page": {
    uri: "games",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  removed: {
    uri: "deletion",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "store.page": {
    uri: "market",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "store.create.validate": {
    uri: "market/create",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "store.item": {
    uri: "market/item/{id}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id"
    ]
  },
  "store.purchase": {
    uri: "market/item/purchase/{id}/{currencyType}",
    methods: [
      "POST"
    ],
    parameters: [
      "id",
      "currencyType"
    ]
  },
  "spaces.page": {
    uri: "spaces",
    methods: [
      "GET",
      "HEAD"
    ]
  },
  "spaces.view": {
    uri: "spaces/{id}/{slug}",
    methods: [
      "GET",
      "HEAD"
    ],
    parameters: [
      "id",
      "slug"
    ]
  }
};
const wildcards = {
  "l5-swagger.*": [],
  "l5-swagger.default.*": [],
  "passport.*": [],
  "passport.authorizations.*": [],
  "passport.token.*": [],
  "passport.tokens.*": [],
  "passport.clients.*": [],
  "passport.scopes.*": [],
  "passport.personal.*": [],
  "passport.personal.tokens.*": [],
  "sanctum.*": [],
  "api.*": [],
  "api.user.*": [],
  "api.store.*": [],
  "api.store.event.*": [],
  "api.avatar.*": [],
  "maintenance.*": [],
  "maintenance.authenticate.*": [],
  "my.*": [],
  "my.dashboard.*": [],
  "user.*": [],
  "user.settings.*": [],
  "avatar.*": [],
  "forum.*": [],
  "forum.create.*": [],
  "forum.reply.*": [],
  "auth.*": [],
  "auth.login.*": [],
  "auth.login.google.*": [],
  "auth.login.metamask.*": [],
  "auth.register.*": [],
  "auth.forgot.*": [],
  "games.*": [],
  "store.*": [],
  "store.create.*": [],
  "spaces.*": []
};
const routes$1 = {
  url,
  port,
  defaults,
  routes,
  wildcards
};
async function resolvePageComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
const appName = "Laravel";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    progress: { includeCSS: true, showSpinner: false },
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/AccountDeleted.vue": () => import("./assets/AccountDeleted-caa56f16.mjs"), "./Pages/Admin/Page.vue": () => import("./assets/Page-a696e48a.mjs"), "./Pages/Admin/soon.vue": () => import("./assets/soon-16cb798a.mjs"), "./Pages/App/Error.vue": () => import("./assets/Error-003e91b3.mjs"), "./Pages/App/FeatureDisabled.vue": () => import("./assets/FeatureDisabled-12997fba.mjs"), "./Pages/Authentication/Create.vue": () => import("./assets/Create-e486196f.mjs"), "./Pages/Authentication/Forgot.vue": () => import("./assets/Forgot-a1e633e4.mjs"), "./Pages/Authentication/Login.vue": () => import("./assets/Login-97a65a39.mjs"), "./Pages/BetaWelcome.vue": () => import("./assets/BetaWelcome-d501fad7.mjs"), "./Pages/Customize/Index.vue": () => import("./assets/Index-a25e16f6.mjs"), "./Pages/Customize/functions.vue": () => import("./assets/functions-414ff465.mjs"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-2264b8d6.mjs"), "./Pages/Forum/Create.vue": () => import("./assets/Create-41e1cc48.mjs"), "./Pages/Forum/Index.vue": () => import("./assets/Index-ab049d48.mjs"), "./Pages/Forum/Post.vue": () => import("./assets/Post-42f831a4.mjs"), "./Pages/Games/Game.vue": () => import("./assets/Game-a83e5ba8.mjs"), "./Pages/Games/Index.vue": () => import("./assets/Index-c34ef43f.mjs"), "./Pages/Maintenance/Development.vue": () => import("./assets/Development-d29eb0cf.mjs"), "./Pages/Maintenance/Index.vue": () => import("./assets/Index-aa6e9ada.mjs"), "./Pages/Settings/Edit.vue": () => import("./assets/Edit-d7c539f1.mjs"), "./Pages/Settings/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-7ce74e8a.mjs"), "./Pages/Settings/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-8bddf153.mjs"), "./Pages/Settings/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-ff53dbae.mjs"), "./Pages/Spaces/Index.vue": () => import("./assets/Index-f0bb5781.mjs"), "./Pages/Store/Index.vue": () => import("./assets/Index-d92a6e86.mjs"), "./Pages/Store/Item.vue": () => import("./assets/Item-d6d6d4fc.mjs"), "./Pages/Users/Index.vue": () => import("./assets/Index-91e30f87.mjs"), "./Pages/Users/Profile.vue": () => import("./assets/Profile-ff7909f0.mjs"), "./Pages/Welcome.vue": () => import("./assets/Welcome-a8fa65ec.mjs") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin).use(trail, {
        routes: routes$1,
        url: props.initialPage.url
      }).use(VueTippy).component("Skeletor", Skeletor).component("AeoPagination", AeoPagination).component("Head", Head).component("Link", Link);
    }
  })
);
export {
  AeoPagination as A,
  _export_sfc as _
};
