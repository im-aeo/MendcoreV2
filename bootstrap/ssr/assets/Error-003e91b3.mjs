import { defineComponent, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$2 } from "./Footer-b7f961b4.mjs";
import "@inertiajs/vue3";
import "momentum-trail";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    status: {},
    adonis_error: {},
    message: {},
    icon: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell medium-7"${_scopeId}><div class="card text-center"${_scopeId}><div class="card-body"${_scopeId}><i class="${ssrRenderClass([_ctx.icon, "mb-3"])}" style="${ssrRenderStyle({ "font-size": "80px" })}"${_scopeId}></i><h3${_scopeId}>${ssrInterpolate(_ctx.status)}</h3><p${_scopeId}>${ssrInterpolate(_ctx.message)}</p></div></div><p class="mt-2 text-muted"${_scopeId}><i${_scopeId}>${ssrInterpolate(_ctx.adonis_error)}</i></p></div>`);
          } else {
            return [
              createVNode("div", { class: "cell medium-7" }, [
                createVNode("div", { class: "card text-center" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("i", {
                      class: ["mb-3", _ctx.icon],
                      style: { "font-size": "80px" }
                    }, null, 2),
                    createVNode("h3", null, toDisplayString(_ctx.status), 1),
                    createVNode("p", null, toDisplayString(_ctx.message), 1)
                  ])
                ]),
                createVNode("p", { class: "mt-2 text-muted" }, [
                  createVNode("i", null, toDisplayString(_ctx.adonis_error), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/App/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
