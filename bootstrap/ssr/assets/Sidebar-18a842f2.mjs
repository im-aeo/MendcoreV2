import { defineComponent, resolveComponent, mergeProps, unref, withCtx, renderSlot, useSSRContext, ref, computed, createVNode, toDisplayString, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { current, route } from "momentum-trail";
import { _ as _export_sfc } from "../ssr.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SideLink",
  __ssrInlineRender: true,
  props: {
    link: { type: String },
    active_link: { type: String, default: "none" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "side-item" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Link, {
        class: ["side-link", [unref(current)(__props.active_link) ? "active" : ""]],
        href: __props.link
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</li>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SideLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __default__ = {
  methods: {
    showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    },
    addActiveClass(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.toggle("active");
      }
    },
    sidebarOpen() {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.toggle("show-for-large");
      }
    },
    addActiveClassSSInput(elementId) {
      const element = document.getElementById(elementId);
      const isEmpty = (str) => !str.trim().length;
      if (element) {
        element.addEventListener("input", function() {
          if (isEmpty(this.value)) {
            return;
          } else {
            element.classList.toggle("hide");
          }
        });
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    const adblock = ref(false);
    const lang = computed(() => usePage().props.locale);
    const { props } = usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><nav class="sidebar show-for-large" id="sidebar" data-v-ff81f426><ul class="sidebar-nav" data-v-ff81f426>`);
      if (!unref(props).auth.user) {
        _push(`<div class="hide-for-large" data-v-ff81f426><li class="side-item side-title" data-v-ff81f426>Account</li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("auth.register.page"),
          class: "side-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-user-plus side-icon" data-v-ff81f426${_scopeId}></i><span data-v-ff81f426${_scopeId}>Get Started</span>`);
            } else {
              return [
                createVNode("i", { class: "fas fa-user-plus side-icon" }),
                createVNode("span", null, "Get Started")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<li class="side-item" data-v-ff81f426>`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("auth.login.page"),
          class: "side-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-sign-in side-icon" data-v-ff81f426${_scopeId}></i><span data-v-ff81f426${_scopeId}>Log In</span>`);
            } else {
              return [
                createVNode("i", { class: "fas fa-sign-in side-icon" }),
                createVNode("span", null, "Log In")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="side-item" data-v-ff81f426>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("Welcome"),
        class: [[unref(current)("my.dashboard.*") ? "active" : ""], "side-link"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-home side-icon" data-v-ff81f426${_scopeId}></i><span data-v-ff81f426${_scopeId}>Home</span>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-home side-icon" }),
              createVNode("span", null, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><!--[-->`);
      ssrRenderList(_ctx.sidebarsections, (sidesections) => {
        _push(`<!--[--><li class="side-item side-title" data-v-ff81f426>${ssrInterpolate(sidesections[lang.value].name)}</li><!--[-->`);
        ssrRenderList(_ctx.sidebar.filter((link) => link.section === sidesections.en.name), (sidelink) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            class: "side-item",
            link: sidelink.url,
            ActiveLink: sidelink.active_link
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="${ssrRenderClass([sidelink.icon, "side-icon"])}" data-v-ff81f426${_scopeId}></i><span data-v-ff81f426${_scopeId}>${ssrInterpolate(sidelink[lang.value].title)}</span>`);
              } else {
                return [
                  createVNode("i", {
                    class: ["side-icon", sidelink.icon]
                  }, null, 2),
                  createVNode("span", null, toDisplayString(sidelink[lang.value].title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]-->`);
      if (unref(props).auth.user) {
        _push(`<li class="side-item side-title" data-v-ff81f426>My Spaces</li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(props).auth.user) {
        _push(`<li class="side-item" data-v-ff81f426>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "#",
          class: "side-link side-link-has-img"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="side-img" data-v-ff81f426${_scopeId}><img src="/assets/img/icon.png" data-v-ff81f426${_scopeId}></span><span data-v-ff81f426${_scopeId}>Project Eclipse</span>`);
            } else {
              return [
                createVNode("span", { class: "side-img" }, [
                  createVNode("img", { src: "/assets/img/icon.png" })
                ]),
                createVNode("span", null, "Project Eclipse")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></nav><main class="container" data-v-ff81f426>`);
      if (adblock.value) {
        _push(`<div class="py-2 mb-4 text-center alert alert-danger fw-semibold" data-v-ff81f426><div class="gap-2 align-middle flex-container align-justify" data-v-ff81f426><i class="text-lg far fa-triangle-exclamation pe-2" data-v-ff81f426></i><div data-v-ff81f426> Looks like you&#39;re using an adblocker! Please consider disabling your adblocker to support ${ssrInterpolate(unref(props).site.name)}.</div><i class="text-lg far fa-triangle-exclamation pe-2" data-v-ff81f426></i></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(props).site_config.in_maintenance) {
        _push(`<div class="py-2 mb-2 text-center text-white alert alert-warning" data-v-ff81f426><div class="gap-2 align-middle flex-container align-justify" data-v-ff81f426><i class="text-lg far fa-hammer pe-2" data-v-ff81f426></i><div data-v-ff81f426>You are currently in maintenance mode. `);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)("maintenance.exit"),
          class: "text-white fw-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Exit`);
            } else {
              return [
                createTextVNode("Exit")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><i class="text-lg far fa-hammer pe-2" data-v-ff81f426></i></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid-x grid-margin-x align-center" data-v-ff81f426>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><!--]-->`);
    };
  }
});
const Sidebar_vue_vue_type_style_index_0_scoped_ff81f426_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LayoutParts/Sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ff81f426"]]);
export {
  Sidebar as S
};
