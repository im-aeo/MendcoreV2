import { defineComponent, ref, onMounted, resolveComponent, unref, withCtx, createTextVNode, useSSRContext, mergeProps, computed, provide, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import axios from "axios";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$4 } from "./AppHead-8e83a103.mjs";
import { _ as _sfc_main$5 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$6 } from "./Footer-b7f961b4.mjs";
import { route } from "momentum-trail";
import { _ as _export_sfc } from "../ssr.mjs";
import "dayjs";
import "v-lazy-image";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const temporaryLink = "#";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MarketSidebar",
  __ssrInlineRender: true,
  props: {
    categories: {}
  },
  setup(__props, { emit: __emit }) {
    function pluralType(inputString) {
      const words = inputString.split(" ");
      const modifiedWords = [];
      for (const word of words) {
        if (word.toLowerCase() === "pants" || word.toLowerCase() === "recent") {
          modifiedWords.push(word);
        } else {
          if (word.toLowerCase() === "accessory") {
            return "Accessories";
          }
          modifiedWords.push(word + "s");
        }
      }
      return modifiedWords.join(" ");
    }
    const { categories } = __props;
    const selectedCategory = ref(null);
    const emit = __emit;
    function selectCategory(category) {
      selectedCategory.value = category;
      emit("category-selected", category);
    }
    onMounted(() => {
      if (categories.length > 0) {
        selectCategory(categories[0]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-2 text-xl fw-semibold">Market</div>`);
      if (unref(usePage)().props.auth.user) {
        _push(ssrRenderComponent(_component_Link, { class: "mb-2 btn btn-success btn-xs btn-block forum-button" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` New Item `);
            } else {
              return [
                createTextVNode(" New Item ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="tabs flex-dir-column"><li class="tab-item"><!--[-->`);
      ssrRenderList(_ctx.categories, (category) => {
        _push(`<a${ssrRenderAttr("href", temporaryLink)} class="${ssrRenderClass([{ active: selectedCategory.value === category }, "tab-link squish"])}"><i class="${ssrRenderClass(category.icon)}"></i> ${ssrInterpolate(pluralType(category.name))}</a>`);
      });
      _push(`<!--]--></li></ul></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LayoutParts/MarketSidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MarketSorting",
  __ssrInlineRender: true,
  props: {
    selectedCategory: {}
  },
  setup(__props) {
    function pluralType(inputString) {
      if (typeof inputString !== "string") {
        return "";
      }
      const words = inputString.split(" ");
      const modifiedWords = [];
      for (const word of words) {
        if (word.toLowerCase() === "pants" || word.toLowerCase() === "recent") {
          modifiedWords.push(word);
        } else {
          if (word.toLowerCase() === "accessory") {
            return "Accessories";
          }
          modifiedWords.push(word + "s");
        }
      }
      return modifiedWords.join(" ");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-2 align-middle grid-x" }, _attrs))}><div class="cell large-3"><div class="mb-2 text-xl fw-semibold">${ssrInterpolate(pluralType(_ctx.selectedCategory))}</div></div><div class="cell large-9"><div class="gap-2 align-middle flex-container-lg"><input type="text" class="mb-2 form form-xs form-has-section-color" placeholder="Search..."><select class="mb-2 form form-xs form-select form-has-section-color"><option value="1" selected disabled> Advanced Sorting... </option></select><div class="mb-2 flex-container flex-child-grow"><input type="submit" class="btn btn-xs btn-success w-100" value="Search"></div><div class="mb-2 flex-container flex-child-grow"><a href="#" class="text-center btn btn-info btn-xs flex-child-grow">Buy Currency</a></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LayoutParts/MarketSorting.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Skeletor = resolveComponent("Skeletor");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "cell large-2 medium-3 small-6" }, _attrs))}><div class="d-block"><div class="p-2 mb-1 card card-item position-relative"><div style="${ssrRenderStyle({ "position": "absolute", "bottom": "10px", "left": "10px" })}">`);
  _push(ssrRenderComponent(_component_Skeletor, {
    height: "24",
    width: "64",
    class: "mb-1 badge badge-warning fw-semibold"
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_Skeletor, { height: "120" }, null, _parent));
  _push(`</div><div class="text-body fw-semibold text-truncate">`);
  _push(ssrRenderComponent(_component_Skeletor, { width: "80" }, null, _parent));
  _push(`</div><div class="text-body fw-semibold text-truncate">`);
  _push(ssrRenderComponent(_component_Skeletor, { width: "40" }, null, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ItemCardSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ItemCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props) {
    const props = __props;
    const items = ref([]);
    const categories = computed(() => props.categories);
    const ItemLoading = ref(false);
    const selectedCategory = ref("");
    async function fetchItems(selectedcat) {
      if (selectedCategory) {
        try {
          selectedCategory.value = selectedcat.name;
          ItemLoading.value = true;
          const response = await axios.get(route(`api.store.items`, { category: selectedcat.name }));
          items.value = response.data;
          ItemLoading.value = false;
        } catch (error) {
          console.error(error);
        }
      }
    }
    function selectCategory(category) {
      selectedCategory.value = category;
      ItemLoading.value = true;
    }
    const itemRoute = (itemId) => route(`store.item`, { id: itemId });
    const creatorRoute = (username) => route(`user.profile`, { username });
    provide("selectedCategory", selectedCategory);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell large-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              categories: categories.value,
              onCategorySelected: fetchItems,
              selectCategory
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="cell large-9"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { selectedCategory: selectedCategory.value }, null, _parent2, _scopeId));
            if (ItemLoading.value || items.value && items.value.length > 0) {
              _push2(`<div class="grid-x grid-margin-x grid-padding-y"${_scopeId}>`);
              if (ItemLoading.value) {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(ItemCardSkeleton, null, null, _parent2, _scopeId));
                _push2(`<!--]-->`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(items.value, (item, index) => {
                  _push2(`<div class="cell large-2 medium-3 small-6"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Link, {
                    href: itemRoute(item.id),
                    class: "d-block"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="p-2 mb-1 card card-item position-relative"${_scopeId2}><div style="${ssrRenderStyle({ "position": "absolute", "bottom": "10px", "left": "10px" })}"${_scopeId2}>`);
                        if (item.in_event) {
                          _push3(`<div class="mb-1 badge badge-warning fw-semibold"${_scopeId2}><i class="fas fa-calendar-star" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}></i>Event </div>`);
                        } else if (item.rare) {
                          _push3(`<div class="mb-1 badge badge-info fw-semibold"${_scopeId2}><i class="fas fa-star" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}></i>Rare </div>`);
                        } else if (item.sale_ongoing) {
                          _push3(`<div class="mb-1 badge badge-danger fw-semibold"${_scopeId2}><i class="fas fa-badge-percent" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}></i>${ssrInterpolate(item.percent_off + "%")} off </div>`);
                        } else if (item.time_off_sale != null) {
                          _push3(`<div class="mb-1 badge badge-warning fw-semibold"${_scopeId2}><i class="fas fa-clock" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}></i>Timed </div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div><div style="${ssrRenderStyle({ "position": "absolute", "top": "10px", "right": "10px" })}"${_scopeId2}><div class="mb-1 badge badge-warning fw-semibold"${_scopeId2}><i class="fas fa-coins" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}></i>${ssrInterpolate(item.cost_coins)}</div><div class="mb-1 badge badge-success fw-semibold"${_scopeId2}><i class="fas fa-money-bill-1-wave" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}></i>${ssrInterpolate(item.cost_bucks)}</div></div><img src="/assets/img/item_dummy_4.png"${_scopeId2}></div><div class="text-body fw-semibold text-truncate"${_scopeId2}>${ssrInterpolate(item.name)}</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-2 mb-1 card card-item position-relative" }, [
                            createVNode("div", { style: { "position": "absolute", "bottom": "10px", "left": "10px" } }, [
                              item.in_event ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mb-1 badge badge-warning fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-calendar-star",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode("Event ")
                              ])) : item.rare ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "mb-1 badge badge-info fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-star",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode("Rare ")
                              ])) : item.sale_ongoing ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "mb-1 badge badge-danger fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-badge-percent",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode(toDisplayString(item.percent_off + "%") + " off ", 1)
                              ])) : item.time_off_sale != null ? (openBlock(), createBlock("div", {
                                key: 3,
                                class: "mb-1 badge badge-warning fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-clock",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode("Timed ")
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { style: { "position": "absolute", "top": "10px", "right": "10px" } }, [
                              createVNode("div", { class: "mb-1 badge badge-warning fw-semibold" }, [
                                createVNode("i", {
                                  class: "fas fa-coins",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode(toDisplayString(item.cost_coins), 1)
                              ]),
                              createVNode("div", { class: "mb-1 badge badge-success fw-semibold" }, [
                                createVNode("i", {
                                  class: "fas fa-money-bill-1-wave",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode(toDisplayString(item.cost_bucks), 1)
                              ])
                            ]),
                            createVNode("img", { src: "/assets/img/item_dummy_4.png" })
                          ]),
                          createVNode("div", { class: "text-body fw-semibold text-truncate" }, toDisplayString(item.name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<div class="text-xs fw-semibold text-truncate"${_scopeId}><span class="text-muted"${_scopeId}>By:</span>  `);
                  _push2(ssrRenderComponent(_component_Link, {
                    href: creatorRoute(item.creator.username)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate("@" + item.creator.username)}<i class="fas fa-shield-check text-success ms-1"${_scopeId2}></i>`);
                      } else {
                        return [
                          createTextVNode(toDisplayString("@" + item.creator.username), 1),
                          createVNode("i", { class: "fas fa-shield-check text-success ms-1" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]-->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class=""${_scopeId}><div class="pb-0 card-body"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column mb-2"${_scopeId}><i class="text-5xl fas fa-store-slash text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Items</div><div class="text-muted fw-semibold"${_scopeId}><p class="text-xs"${_scopeId}>There are currently no items in this category.</p></div></div></div></div></div>`);
            }
            _push2(`<ul class="my-4 pagination flex-container align-center"${_scopeId}><button class="page-link page-disabled"${_scopeId}><i class="fa-regular fa-chevron-left"${_scopeId}></i></button><button class="page-link page-active"${_scopeId}>1</button><button class="page-link"${_scopeId}>2</button><button class="page-link"${_scopeId}>3</button><button class="page-link"${_scopeId}><i class="fa-regular fa-chevron-right"${_scopeId}></i></button></ul></div>`);
          } else {
            return [
              createVNode("div", { class: "cell large-3" }, [
                createVNode(_sfc_main$3, {
                  categories: categories.value,
                  onCategorySelected: fetchItems,
                  selectCategory
                }, null, 8, ["categories"])
              ]),
              createVNode("div", { class: "cell large-9" }, [
                createVNode(_sfc_main$2, { selectedCategory: selectedCategory.value }, null, 8, ["selectedCategory"]),
                ItemLoading.value || items.value && items.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "grid-x grid-margin-x grid-padding-y"
                }, [
                  ItemLoading.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton),
                    createVNode(ItemCardSkeleton)
                  ], 64)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(items.value, (item, index) => {
                    return openBlock(), createBlock("div", {
                      class: "cell large-2 medium-3 small-6",
                      key: index
                    }, [
                      createVNode(_component_Link, {
                        href: itemRoute(item.id),
                        class: "d-block"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-2 mb-1 card card-item position-relative" }, [
                            createVNode("div", { style: { "position": "absolute", "bottom": "10px", "left": "10px" } }, [
                              item.in_event ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mb-1 badge badge-warning fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-calendar-star",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode("Event ")
                              ])) : item.rare ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "mb-1 badge badge-info fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-star",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode("Rare ")
                              ])) : item.sale_ongoing ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "mb-1 badge badge-danger fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-badge-percent",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode(toDisplayString(item.percent_off + "%") + " off ", 1)
                              ])) : item.time_off_sale != null ? (openBlock(), createBlock("div", {
                                key: 3,
                                class: "mb-1 badge badge-warning fw-semibold"
                              }, [
                                createVNode("i", {
                                  class: "fas fa-clock",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode("Timed ")
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { style: { "position": "absolute", "top": "10px", "right": "10px" } }, [
                              createVNode("div", { class: "mb-1 badge badge-warning fw-semibold" }, [
                                createVNode("i", {
                                  class: "fas fa-coins",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode(toDisplayString(item.cost_coins), 1)
                              ]),
                              createVNode("div", { class: "mb-1 badge badge-success fw-semibold" }, [
                                createVNode("i", {
                                  class: "fas fa-money-bill-1-wave",
                                  style: { "width": "18px" }
                                }),
                                createTextVNode(toDisplayString(item.cost_bucks), 1)
                              ])
                            ]),
                            createVNode("img", { src: "/assets/img/item_dummy_4.png" })
                          ]),
                          createVNode("div", { class: "text-body fw-semibold text-truncate" }, toDisplayString(item.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"]),
                      createVNode("div", { class: "text-xs fw-semibold text-truncate" }, [
                        createVNode("span", { class: "text-muted" }, "By:"),
                        createTextVNode("  "),
                        createVNode(_component_Link, {
                          href: creatorRoute(item.creator.username)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString("@" + item.creator.username), 1),
                            createVNode("i", { class: "fas fa-shield-check text-success ms-1" })
                          ]),
                          _: 2
                        }, 1032, ["href"])
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: ""
                }, [
                  createVNode("div", { class: "pb-0 card-body" }, [
                    createVNode("div", { class: "gap-3 text-center flex-container flex-dir-column mb-2" }, [
                      createVNode("i", { class: "text-5xl fas fa-store-slash text-muted" }),
                      createVNode("div", { style: { "line-height": "16px" } }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Items"),
                        createVNode("div", { class: "text-muted fw-semibold" }, [
                          createVNode("p", { class: "text-xs" }, "There are currently no items in this category.")
                        ])
                      ])
                    ])
                  ])
                ])),
                createVNode("ul", { class: "my-4 pagination flex-container align-center" }, [
                  createVNode("button", { class: "page-link page-disabled" }, [
                    createVNode("i", { class: "fa-regular fa-chevron-left" })
                  ]),
                  createVNode("button", { class: "page-link page-active" }, "1"),
                  createVNode("button", { class: "page-link" }, "2"),
                  createVNode("button", { class: "page-link" }, "3"),
                  createVNode("button", { class: "page-link" }, [
                    createVNode("i", { class: "fa-regular fa-chevron-right" })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Store/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
