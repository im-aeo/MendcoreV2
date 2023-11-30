import { defineComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppHead-8e83a103.mjs";
import { _ as _sfc_main$2 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import "dayjs";
import "@inertiajs/vue3";
import "momentum-trail";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Game",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { title: "Aeo's Game" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell medium-3"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}>Games</div><ul class="tabs flex-dir-column"${_scopeId}><li class="tab-item"${_scopeId}><a href="#" class="tab-link active squish"${_scopeId}>Thumbnail</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Description </a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Comments</a></li></ul></div><div class="cell medium-8"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "cell medium-3" }, [
                createVNode("div", { class: "mb-2 text-xl fw-semibold" }, "Games"),
                createVNode("ul", { class: "tabs flex-dir-column" }, [
                  createVNode("li", { class: "tab-item" }, [
                    createVNode("a", {
                      href: "#",
                      class: "tab-link active squish"
                    }, "Thumbnail")
                  ]),
                  createVNode("li", { class: "tab-item" }, [
                    createVNode("a", {
                      href: "#",
                      class: "tab-link squish"
                    }, "Description ")
                  ]),
                  createVNode("li", { class: "tab-item" }, [
                    createVNode("a", {
                      href: "#",
                      class: "tab-link squish"
                    }, "Comments")
                  ])
                ])
              ]),
              createVNode("div", { class: "cell medium-8" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Games/Game.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
