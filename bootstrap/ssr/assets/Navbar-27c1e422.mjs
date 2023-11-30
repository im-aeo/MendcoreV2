import { defineComponent, mergeProps, unref, useSSRContext, resolveComponent, withCtx, createVNode, toDisplayString, renderSlot, ref, computed, resolveDirective, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrGetDirectiveProps } from "vue/server-renderer";
import { usePage, router, Link } from "@inertiajs/vue3";
import { route, current } from "momentum-trail";
import { _ as _export_sfc } from "../ssr.mjs";
import VLazyImage from "v-lazy-image";
const __default__$1 = {
  props: {
    locales: Object
    // Receive the locales data from Laravel
  },
  methods: {
    showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    },
    setLocale(locale) {
      router.get(route(`auth.language`, { language: locale }));
    }
  }
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  __name: "LanguageModal",
  __ssrInlineRender: true,
  setup(__props) {
    const locale_active = usePage().props.locale;
    const locales = usePage().props.locales;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "modal",
        id: "LanguageSettings"
      }, _attrs))}><div class="modal-card modal-card-body"><div class="section-borderless"><div class="gap-2 align-middle flex-container align-justify"><div class="text-lg fw-semibold"> Change Language </div><button class="btn-circle" data-toggle-modal="#LanguageSettings" style="${ssrRenderStyle({ "margin-right": "-10px" })}"><i class="fas fa-times"></i></button></div></div><div class="section-borderless"><div class="section"><div id="theme-switcher-container" class="grid-x grid-margin-x grid-padding-y"><!--[-->`);
      ssrRenderList(unref(locales), (name, locale) => {
        _push(`<div class="cell large-6"><div class="${ssrRenderClass([{ "language-active": unref(locale_active) === locale }, "squish card card-body card-inner mb-lg-0"])}" style="${ssrRenderStyle({ "cursor": "pointer" })}"><div class="align-middle"><div class="gap-2 align-start flex-container" style="${ssrRenderStyle({ "min-width": "0" })}"><div class="selection-circle language"><i class="" class="${ssrRenderClass([{ "fa-solid fa-check": unref(locale_active) === locale }, ""])}"></i></div><div class="fw-semibold text-language text-truncate">${ssrInterpolate(name)}</div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal/LanguageModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SearchResult",
  __ssrInlineRender: true,
  props: {
    link: {},
    name: {},
    image: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "dropdown-item" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.link,
        class: "dropdown-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="align-middle flex-container align-justify"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}><img class="headshot flex-child-grow" alt="headshot" width="40"${ssrRenderAttr("src", _ctx.image)}${_scopeId}><div${_scopeId}>${ssrInterpolate(_ctx.name)}</div></div><i class="px-1 fas fa-chevron-right text-muted"${_scopeId}></i></div>`);
          } else {
            return [
              createVNode("div", { class: "align-middle flex-container align-justify" }, [
                createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                  createVNode("img", {
                    class: "headshot flex-child-grow",
                    alt: "headshot",
                    width: "40",
                    src: _ctx.image
                  }, null, 8, ["src"]),
                  createVNode("div", null, toDisplayString(_ctx.name), 1)
                ]),
                createVNode("i", { class: "px-1 fas fa-chevron-right text-muted" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SearchResult.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    link: {},
    active_link: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "nav-item cell shrink show-for-large" }, _attrs))}><li class="side-item">`);
      _push(ssrRenderComponent(_component_Link, {
        class: ["nav-link", [unref(current)(_ctx.active_link) ? "active" : ""]],
        href: _ctx.link
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
      _push(`</li></li>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    link: { type: String },
    IsBlock: { type: Boolean },
    ColorClass: { type: String }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      if (__props.link) {
        _push(ssrRenderComponent(_component_Link, mergeProps({ href: __props.link }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([[__props.IsBlock ? "my-2 mt-2 btn-block" : "", __props.ColorClass], "btn"])}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["btn", [__props.IsBlock ? "my-2 mt-2 btn-block" : "", __props.ColorClass]]
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 2)
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Button.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Link = resolveComponent("Link");
  const _component_Skeletor = resolveComponent("Skeletor");
  _push(`<!--[--><li class="dropdown-item">`);
  _push(ssrRenderComponent(_component_Link, { class: "dropdown-link" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="align-middle flex-container align-justify"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, {
          class: "headshot flex-child-grow",
          width: "40",
          height: "40"
        }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "100" }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "40" }, null, _parent2, _scopeId));
        _push2(`</div></div></div><i class="px-1 fas fa-chevron-right text-muted"${_scopeId}></i></div>`);
      } else {
        return [
          createVNode("div", { class: "align-middle flex-container align-justify" }, [
            createVNode("div", { class: "gap-2 align-middle flex-container" }, [
              createVNode(_component_Skeletor, {
                class: "headshot flex-child-grow",
                width: "40",
                height: "40"
              }),
              createVNode("div", null, [
                createVNode(_component_Skeletor, { width: "100" }),
                createVNode("div", null, [
                  createVNode(_component_Skeletor, { width: "40" })
                ])
              ])
            ]),
            createVNode("i", { class: "px-1 fas fa-chevron-right text-muted" })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="dropdown-item">`);
  _push(ssrRenderComponent(_component_Link, { class: "dropdown-link" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="align-middle flex-container align-justify"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, {
          class: "headshot flex-child-grow",
          width: "40",
          height: "40"
        }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "100" }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "40" }, null, _parent2, _scopeId));
        _push2(`</div></div></div><i class="px-1 fas fa-chevron-right text-muted"${_scopeId}></i></div>`);
      } else {
        return [
          createVNode("div", { class: "align-middle flex-container align-justify" }, [
            createVNode("div", { class: "gap-2 align-middle flex-container" }, [
              createVNode(_component_Skeletor, {
                class: "headshot flex-child-grow",
                width: "40",
                height: "40"
              }),
              createVNode("div", null, [
                createVNode(_component_Skeletor, { width: "100" }),
                createVNode("div", null, [
                  createVNode(_component_Skeletor, { width: "40" })
                ])
              ])
            ]),
            createVNode("i", { class: "px-1 fas fa-chevron-right text-muted" })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="dropdown-item">`);
  _push(ssrRenderComponent(_component_Link, { class: "dropdown-link" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="align-middle flex-container align-justify"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, {
          class: "headshot flex-child-grow",
          width: "40",
          height: "40"
        }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "100" }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "40" }, null, _parent2, _scopeId));
        _push2(`</div></div></div><i class="px-1 fas fa-chevron-right text-muted"${_scopeId}></i></div>`);
      } else {
        return [
          createVNode("div", { class: "align-middle flex-container align-justify" }, [
            createVNode("div", { class: "gap-2 align-middle flex-container" }, [
              createVNode(_component_Skeletor, {
                class: "headshot flex-child-grow",
                width: "40",
                height: "40"
              }),
              createVNode("div", null, [
                createVNode(_component_Skeletor, { width: "100" }),
                createVNode("div", null, [
                  createVNode(_component_Skeletor, { width: "40" })
                ])
              ])
            ]),
            createVNode("i", { class: "px-1 fas fa-chevron-right text-muted" })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="dropdown-item">`);
  _push(ssrRenderComponent(_component_Link, { class: "dropdown-link" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="align-middle flex-container align-justify"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, {
          class: "headshot flex-child-grow",
          width: "40",
          height: "40"
        }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "100" }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "40" }, null, _parent2, _scopeId));
        _push2(`</div></div></div><i class="px-1 fas fa-chevron-right text-muted"${_scopeId}></i></div>`);
      } else {
        return [
          createVNode("div", { class: "align-middle flex-container align-justify" }, [
            createVNode("div", { class: "gap-2 align-middle flex-container" }, [
              createVNode(_component_Skeletor, {
                class: "headshot flex-child-grow",
                width: "40",
                height: "40"
              }),
              createVNode("div", null, [
                createVNode(_component_Skeletor, { width: "100" }),
                createVNode("div", null, [
                  createVNode(_component_Skeletor, { width: "40" })
                ])
              ])
            ]),
            createVNode("i", { class: "px-1 fas fa-chevron-right text-muted" })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="dropdown-item">`);
  _push(ssrRenderComponent(_component_Link, { class: "dropdown-link" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="align-middle flex-container align-justify"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, {
          class: "headshot flex-child-grow",
          width: "40",
          height: "40"
        }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "100" }, null, _parent2, _scopeId));
        _push2(`<div${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Skeletor, { width: "40" }, null, _parent2, _scopeId));
        _push2(`</div></div></div><i class="px-1 fas fa-chevron-right text-muted"${_scopeId}></i></div>`);
      } else {
        return [
          createVNode("div", { class: "align-middle flex-container align-justify" }, [
            createVNode("div", { class: "gap-2 align-middle flex-container" }, [
              createVNode(_component_Skeletor, {
                class: "headshot flex-child-grow",
                width: "40",
                height: "40"
              }),
              createVNode("div", null, [
                createVNode(_component_Skeletor, { width: "100" }),
                createVNode("div", null, [
                  createVNode(_component_Skeletor, { width: "40" })
                ])
              ])
            ]),
            createVNode("i", { class: "px-1 fas fa-chevron-right text-muted" })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SearchResultSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SearchResultSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
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
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const logout = () => {
      router.post(route("auth.logout"));
    };
    const SearchLoading = ref(false);
    const search = ref("");
    const results = ref([]);
    const topbar = [
      {
        url: route(`games.page`),
        active_link: "games.*",
        icon: "fas fa-gamepad-modern",
        en: { title: "Games" },
        ru: { title: "Игры" },
        jp: { title: "ゲーム" }
      },
      {
        url: route(`store.page`),
        active_link: "store.*",
        icon: "fas fa-store",
        en: { title: "Market" },
        ru: { title: "Рынок" },
        jp: { title: "市場" }
      },
      {
        url: route(`forum.page`, { id: 1 }),
        active_link: "forum.*",
        icon: "fas fa-message-code",
        en: { title: "Discuss" },
        ru: { title: "Обсуждать" },
        jp: { title: "議論" }
      },
      {
        url: "#",
        active_link: "spaces.*",
        icon: "fas fa-planet-ringed",
        en: { title: "Spaces" },
        ru: { title: "Развивать" },
        jp: { title: "発展" }
      }
    ];
    const lang = computed(() => props.locale);
    const { props } = usePage();
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`<nav class="navbar"><ul class="navbar-nav grid-x">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        link: unref(route)(`Welcome`)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(VLazyImage), {
              src: unref(props).site.logo,
              class: "show-for-medium",
              width: "180"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VLazyImage), {
              src: unref(props).site.icon,
              class: "show-for-small-only",
              width: "43"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(VLazyImage), {
                src: unref(props).site.logo,
                class: "show-for-medium",
                width: "180"
              }, null, 8, ["src"]),
              createVNode(unref(VLazyImage), {
                src: unref(props).site.icon,
                class: "show-for-small-only",
                width: "43"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(topbar, (topbarlinks) => {
        _push(ssrRenderComponent(_sfc_main$3, {
          link: topbarlinks.url,
          active_link: topbarlinks.active_link
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(topbarlinks.icon)}"${_scopeId}></i>   <span${_scopeId}>${ssrInterpolate(topbarlinks[lang.value].title)}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: topbarlinks.icon
                }, null, 2),
                createTextVNode("   "),
                createVNode("span", null, toDisplayString(topbarlinks[lang.value].title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><li class="mx-1 align-middle nav-item cell auto nav-search mx-md-3"><input${ssrRenderAttr("value", search.value)} type="text" class="form" id="global-search-bar" autocomplete="nope" placeholder="Search..."><ul class="${ssrRenderClass(["dropdown-menu", { "hide": search.value === "" }])}" id="global-search-results"><li class="dropdown-title">Quick Results</li>`);
      if (!SearchLoading.value) {
        _push(`<!--[-->`);
        ssrRenderList(results.value, (result) => {
          _push(ssrRenderComponent(_sfc_main$4, {
            link: result.url,
            name: result.name,
            image: result.image
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(SearchResultSkeleton, null, null, _parent));
      }
      _push(`<li class="divider"></li><li class="dropdown-item">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "#",
        class: "dropdown-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="align-middle flex-container align-justify"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}><i class="text-xl align-middle fas fa-telescope headshot text-muted flex-container align-center flex-child-grow" style="${ssrRenderStyle({ "height": "40px", "width": "40px" })}"${_scopeId}></i><div${_scopeId}> Show all results for &quot;<span class="search-keyword"${_scopeId}>${ssrInterpolate(search.value)}</span>&quot; </div></div><i class="px-1 fas fa-chevron-right text-muted"${_scopeId}></i></div>`);
          } else {
            return [
              createVNode("div", { class: "align-middle flex-container align-justify" }, [
                createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                  createVNode("i", {
                    class: "text-xl align-middle fas fa-telescope headshot text-muted flex-container align-center flex-child-grow",
                    style: { "height": "40px", "width": "40px" }
                  }),
                  createVNode("div", null, [
                    createTextVNode(' Show all results for "'),
                    createVNode("span", { class: "search-keyword" }, toDisplayString(search.value), 1),
                    createTextVNode('" ')
                  ])
                ]),
                createVNode("i", { class: "px-1 fas fa-chevron-right text-muted" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><button content="Search" data-tooltip-placement="bottom"><i class="fas fa-search"></i></button></li>`);
      if (!unref(props).auth.user) {
        _push(ssrRenderComponent(_sfc_main$2, {
          link: unref(route)("auth.register.page"),
          ColorClass: "btn-success",
          class: "nav-item cell shrink me-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-person-to-portal"${_scopeId}></i>   Get Started `);
            } else {
              return [
                createVNode("i", { class: "fas fa-person-to-portal" }),
                createTextVNode("   Get Started ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(props).auth.user) {
        _push(ssrRenderComponent(_sfc_main$2, {
          link: unref(route)("auth.login.page"),
          ColorClass: "btn-info",
          class: "nav-item cell shrink me-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-door-open"${_scopeId}></i>   Login `);
            } else {
              return [
                createVNode("i", { class: "fas fa-door-open" }),
                createTextVNode("   Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(props).auth.user) {
        _push(`<li class="position-relative nav-item cell shrink"><div class="show-for-small-only position-relative"><a href="#" class="px-2 btn-circle squish text-body"><span class="notification-circle"></span><i class="text-xl fas fa-bell"></i></a></div><div class="dropdown show-for-medium position-relative" id="notification_dropdown"><div class="btn-circle squish"><button${ssrRenderAttrs(mergeProps({
          class: "px-2 text-body",
          content: "Notifications",
          "data-tooltip-placement": "bottom"
        }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><span class="notification-circle"></span><i class="text-xl fas fa-bell"></i></button></div><ul class="dropdown-menu dropdown-menu-end" style="${ssrRenderStyle({ "width": "340px" })}"><div class="align-middle flex-container"><div class="dropdown-title">Notifications</div><li class="divider flex-child-grow"></li></div><li class="px-2 py-2 text-center dropdown-item"><div class="gap-3 flex-container flex-dir-column"><i class="text-5xl fas fa-face-sleeping text-muted"></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"><div class="text-xs fw-bold text-muted text-uppercase"> No Notifications </div><div class="text-xs text-muted fw-semibold"> You have not recieved any notifications recently. </div></div></div></li><li class="divider"></li><li class="dropdown-item"><a href="#" class="dropdown-link"><div class="align-middle flex-container align-justify"><div class="gap-2 align-middle flex-container"><i class="text-lg align-middle fas fa-bell headshot text-muted flex-container align-center flex-child-grow" style="${ssrRenderStyle({ "height": "38px", "width": "38px" })}"></i><div class="text-sm"> Show All Notifications </div></div><i class="px-1 text-sm fas fa-chevron-right text-muted"></i></div></a></li></ul></div></li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(props).auth.user) {
        _push(`<li class="nav-item cell shrink show-for-large"><a${ssrRenderAttrs(mergeProps({
          href: "#",
          class: "text-sm nav-link",
          style: { "line-height": "20px" },
          content: unref(props).auth.user.coins + " Coins & " + unref(props).auth.user.bucks + " Bucks",
          "data-tooltip-placement": "bottom"
        }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><div class="text-warning"><i class="fas fa-coins" style="${ssrRenderStyle({ "width": "22px" })}"></i>${ssrInterpolate(unref(props).auth.user.coins)}</div><div class="text-success"><i class="fas fa-money-bill-1-wave" style="${ssrRenderStyle({ "width": "22px" })}"></i>${ssrInterpolate(unref(props).auth.user.bucks)}</div></a></li>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(props).auth.user) {
        _push(`<li class="dropdown position-relative nav-item cell shrink ms-1" id="user_dropdown"><button class="gap-2 align-middle flex-container squish"><img src="/assets/img/dummy_headshot.png" class="headshot" alt="headshot" width="40"><div class="text-start show-for-large"><div class="text-sm fw-semibold text-body">${ssrInterpolate(unref(props).auth.user.display_name)}</div><div class="text-xs text-muted fw-semibold">${ssrInterpolate("@" + unref(props).auth.user.username)} • Lvl. 2 </div></div><i class="text-sm fas fa-chevron-down text-muted show-for-large"></i></button><ul class="dropdown-menu dropdown-menu-end"><div class="show-for-small hide-for-large"><div class="gap-2 px-2 py-1 align-middle flex-container"><img src="/assets/img/dummy_headshot.png" class="headshot flex-child-shrink" alt="headshot" width="40"><div class="text-start" style="${ssrRenderStyle({ "line-height": "12px" })}"><div class="text-sm fw-semibold">${ssrInterpolate(unref(props).auth.user.display_name)}</div><div class="mb-1 text-xs text-muted fw-semibold">${ssrInterpolate("@" + unref(props).auth.user.username)}</div><div class="text-xs text-muted fw-semibold"> Lvl. 2 </div></div></div><li class="dropdown-item"><a href="#" class="dropdown-link dropdown-link-has-icon text-warning"><i class="fas fa-coins text-warning dropdown-icon"></i>${ssrInterpolate(unref(props).auth.user.coins)} Coins</a></li><li class="dropdown-item"><a href="#" class="dropdown-link dropdown-link-has-icon text-success"><i class="fas fa-money-bill-1-wave text-success dropdown-icon"></i>${ssrInterpolate(unref(props).auth.user.bucks)} Cash</a></li></div><div class="align-middle flex-container"><div class="dropdown-title">Account</div><li class="divider flex-child-grow"></li></div><li class="dropdown-item">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)(`user.profile`, { username: unref(props).auth.user.username }),
          class: "dropdown-link dropdown-link-has-icon"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-user dropdown-icon"${_scopeId}></i>Profile `);
            } else {
              return [
                createVNode("i", { class: "fas fa-user dropdown-icon" }),
                createTextVNode("Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="dropdown-item">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)(`avatar.page`),
          class: "dropdown-link dropdown-link-has-icon"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-edit dropdown-icon"${_scopeId}></i>Character`);
            } else {
              return [
                createVNode("i", { class: "fas fa-edit dropdown-icon" }),
                createTextVNode("Character")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="dropdown-item">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route)(`user.settings.page`, { category: "general" }),
          class: "dropdown-link dropdown-link-has-icon"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-cogs dropdown-icon"${_scopeId}></i>Settings `);
            } else {
              return [
                createVNode("i", { class: "fas fa-cogs dropdown-icon" }),
                createTextVNode("Settings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="divider"></li><li class="dropdown-item">`);
        _push(ssrRenderComponent(unref(Link), {
          onClick: logout,
          href: "#",
          class: "dropdown-link dropdown-link-has-icon text-danger"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-sign-out text-danger dropdown-icon"${_scopeId}></i>Logout`);
            } else {
              return [
                createVNode("i", { class: "fas fa-sign-out text-danger dropdown-icon" }),
                createTextVNode("Logout")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></nav>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LayoutParts/Navbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
