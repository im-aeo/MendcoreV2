import { defineComponent, withCtx, unref, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { route } from "momentum-trail";
import "@inertiajs/vue3";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BetaWelcome",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell"${_scopeId}><div class="justify-center text-center row card card-body align-center scatball-card"${_scopeId}><div class="col-md-8 align-center text-center-sm"${_scopeId}><h1 class="text-warning"${_scopeId}>The place to create.</h1><p class="text-upgrade"${_scopeId}>${ssrInterpolate(_ctx.$page.props.site.name)} is an online 3D gaming platform where users can enable their creativity. Customize your character, create your own clothing, participate in a virtual economy, create groups, chat with others, and much more.</p></div></div><div class="justify-center mt-2 mb-2 text-start card card-body align-center stat-card"${_scopeId}><div class="col-md-8 align-center text-center-sm"${_scopeId}><h1${_scopeId}>With over: 100+ users</h1><p class="fs-2"${_scopeId}>And over 150 items,</p></div></div><div class="justify-center mt-2 mb-2 text-center card card-body align-center reg-card"${_scopeId}><div class="col-md-8 align-center text-center-sm"${_scopeId}><h3${_scopeId}>What are you wating for?</h3><p${_scopeId}>Register to ${ssrInterpolate(_ctx.$page.props.site.name)} below.</p><div class="buttons"${_scopeId}><a${ssrRenderAttr("href", unref(route)("auth.register.page"))} class="btn btn-success"${_scopeId}><i class="mr-1 fas fa-user-plus"${_scopeId}></i> Create Account</a><a${ssrRenderAttr("href", unref(route)("auth.login.page"))} class="btn btn-warning"${_scopeId}><i class="mr-1 fas fa-key"${_scopeId}></i> Existing User</a></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "cell" }, [
                createVNode("div", { class: "justify-center text-center row card card-body align-center scatball-card" }, [
                  createVNode("div", { class: "col-md-8 align-center text-center-sm" }, [
                    createVNode("h1", { class: "text-warning" }, "The place to create."),
                    createVNode("p", { class: "text-upgrade" }, toDisplayString(_ctx.$page.props.site.name) + " is an online 3D gaming platform where users can enable their creativity. Customize your character, create your own clothing, participate in a virtual economy, create groups, chat with others, and much more.", 1)
                  ])
                ]),
                createVNode("div", { class: "justify-center mt-2 mb-2 text-start card card-body align-center stat-card" }, [
                  createVNode("div", { class: "col-md-8 align-center text-center-sm" }, [
                    createVNode("h1", null, "With over: 100+ users"),
                    createVNode("p", { class: "fs-2" }, "And over 150 items,")
                  ])
                ]),
                createVNode("div", { class: "justify-center mt-2 mb-2 text-center card card-body align-center reg-card" }, [
                  createVNode("div", { class: "col-md-8 align-center text-center-sm" }, [
                    createVNode("h3", null, "What are you wating for?"),
                    createVNode("p", null, "Register to " + toDisplayString(_ctx.$page.props.site.name) + " below.", 1),
                    createVNode("div", { class: "buttons" }, [
                      createVNode("a", {
                        href: unref(route)("auth.register.page"),
                        class: "btn btn-success"
                      }, [
                        createVNode("i", { class: "mr-1 fas fa-user-plus" }),
                        createTextVNode(" Create Account")
                      ], 8, ["href"]),
                      createVNode("a", {
                        href: unref(route)("auth.login.page"),
                        class: "btn btn-warning"
                      }, [
                        createVNode("i", { class: "mr-1 fas fa-key" }),
                        createTextVNode(" Existing User")
                      ], 8, ["href"])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BetaWelcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
