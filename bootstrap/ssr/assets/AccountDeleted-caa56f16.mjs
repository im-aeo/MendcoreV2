import { defineComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import "@inertiajs/vue3";
import "momentum-trail";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountDeleted",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card card-body"${_scopeId}><div class="mb-2 title is-1 has-text-weight-normal"${_scopeId}> Your account has been deleted. </div><div class="mb-3 title is-5 has-text-grey-light has-font-weight-light"${_scopeId}> Farewell. </div></div>`);
          } else {
            return [
              createVNode("div", { class: "card card-body" }, [
                createVNode("div", { class: "mb-2 title is-1 has-text-weight-normal" }, " Your account has been deleted. "),
                createVNode("div", { class: "mb-3 title is-5 has-text-grey-light has-font-weight-light" }, " Farewell. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AccountDeleted.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
