import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3";
import "vue/server-renderer";
import "momentum-trail";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(` soon.php `);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/soon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const soon = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  soon as default
};
