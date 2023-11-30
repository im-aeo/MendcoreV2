import { defineComponent, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import axios from "axios";
import { route } from "momentum-trail";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { _ as _sfc_main$2 } from "./Footer-b7f961b4.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import VLazyImage from "v-lazy-image";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    spaces: { type: Object }
  },
  setup(__props) {
    const SpaceSearchLoading = ref(false);
    const search = ref("");
    const results = ref([]);
    const performSearch = async () => {
      if (search.value !== "") {
        SpaceSearchLoading.value = true;
        await axios.get(route("spaces.index", { search: search.value })).then((response) => {
          results.value = response.data.results;
          SpaceSearchLoading.value = false;
        }).catch((err) => console.log(err));
      } else {
        SpaceSearchLoading.value = true;
        results.value = [];
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row mb-1"${_scopeId}><div class="col"${_scopeId}><h3${_scopeId}>Spaces</h3></div><div class="col text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "#",
              class: "btn btn-success"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fas fa-plus"${_scopeId2}></i> Create`);
                } else {
                  return [
                    createVNode("i", { class: "fas fa-plus" }),
                    createTextVNode(" Create")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="input-group mb-3"${_scopeId}><input type="text" name="search" placeholder="Search for spaces..."${ssrRenderAttr("value", search.value)} class="form"${_scopeId}><div class="input-group-append"${_scopeId}><button class="btn btn-success" type="submit"${_scopeId}><i class="fas fa-search"${_scopeId}></i><span class="hide-sm"${_scopeId}>Search</span></button></div></div>`);
            if (__props.spaces) {
              _push2(`<div${_scopeId}><!--[-->`);
              ssrRenderList(__props.spaces, (space) => {
                _push2(`<div class="card"${_scopeId}><div class="card-body"${_scopeId}><div class="row"${_scopeId}><div class="col-4 col-md-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: unref(route)("spaces.view", { id: space.id, slug: space.slug })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(VLazyImage), {
                        sizes: "(max-width: 512px) 280px, 512px",
                        src: space.thumbnail,
                        style: { "background": "var(--section_bg_inside)", "border-radius": "6px" },
                        class: "mb-2 blog-thumbnail"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(VLazyImage), {
                          sizes: "(max-width: 512px) 280px, 512px",
                          src: space.thumbnail,
                          style: { "background": "var(--section_bg_inside)", "border-radius": "6px" },
                          class: "mb-2 blog-thumbnail"
                        }, null, 8, ["src"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="col-8 col-md-8 align-self-center"${_scopeId}><h5 class="text-truncate"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: unref(route)("spaces.view", { id: space.id, slug: space.slug }),
                  style: { "color": "inherit", "font-weight": "600" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(space.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(space.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h5><div class="text-muted show-sm-only" style="${ssrRenderStyle({ "margin-top": "-5px" })}"${_scopeId}>${ssrInterpolate(space.member_count)} Members </div><div style="${ssrRenderStyle({ "max-height": "125px", "overflow": "hidden" })}"${_scopeId}>${ssrInterpolate(space.description ?? "This space does not have a description.")}</div></div><div class="col-md-2 text-center align-self-center hide-sm" style="${ssrRenderStyle({ "font-weight": "600" })}"${_scopeId}><h3${_scopeId}>${ssrInterpolate(space.member_count)}</h3><h4 class="text-muted" style="${ssrRenderStyle({ "margin-top": "-10px", "margin-bottom": "0" })}"${_scopeId}>MEMBERS</h4></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>No spaces found.</p></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "row mb-1" }, [
                createVNode("div", { class: "col" }, [
                  createVNode("h3", null, "Spaces")
                ]),
                createVNode("div", { class: "col text-right" }, [
                  createVNode(unref(Link), {
                    href: "#",
                    class: "btn btn-success"
                  }, {
                    default: withCtx(() => [
                      createVNode("i", { class: "fas fa-plus" }),
                      createTextVNode(" Create")
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "input-group mb-3" }, [
                withDirectives(createVNode("input", {
                  type: "text",
                  name: "search",
                  placeholder: "Search for spaces...",
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  class: "form",
                  onInput: performSearch
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, search.value]
                ]),
                createVNode("div", { class: "input-group-append" }, [
                  createVNode("button", {
                    class: "btn btn-success",
                    type: "submit"
                  }, [
                    createVNode("i", { class: "fas fa-search" }),
                    createVNode("span", { class: "hide-sm" }, "Search")
                  ])
                ])
              ]),
              __props.spaces ? (openBlock(), createBlock("div", { key: 0 }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.spaces, (space) => {
                  return openBlock(), createBlock("div", { class: "card" }, [
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-4 col-md-2" }, [
                          createVNode(unref(Link), {
                            href: unref(route)("spaces.view", { id: space.id, slug: space.slug })
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VLazyImage), {
                                sizes: "(max-width: 512px) 280px, 512px",
                                src: space.thumbnail,
                                style: { "background": "var(--section_bg_inside)", "border-radius": "6px" },
                                class: "mb-2 blog-thumbnail"
                              }, null, 8, ["src"])
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]),
                        createVNode("div", { class: "col-8 col-md-8 align-self-center" }, [
                          createVNode("h5", { class: "text-truncate" }, [
                            createVNode(unref(Link), {
                              href: unref(route)("spaces.view", { id: space.id, slug: space.slug }),
                              style: { "color": "inherit", "font-weight": "600" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(space.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          createVNode("div", {
                            class: "text-muted show-sm-only",
                            style: { "margin-top": "-5px" }
                          }, toDisplayString(space.member_count) + " Members ", 1),
                          createVNode("div", { style: { "max-height": "125px", "overflow": "hidden" } }, toDisplayString(space.description ?? "This space does not have a description."), 1)
                        ]),
                        createVNode("div", {
                          class: "col-md-2 text-center align-self-center hide-sm",
                          style: { "font-weight": "600" }
                        }, [
                          createVNode("h3", null, toDisplayString(space.member_count), 1),
                          createVNode("h4", {
                            class: "text-muted",
                            style: { "margin-top": "-10px", "margin-bottom": "0" }
                          }, "MEMBERS")
                        ])
                      ])
                    ])
                  ]);
                }), 256))
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", null, "No spaces found.")
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Spaces/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
