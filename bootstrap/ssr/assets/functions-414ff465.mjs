import { defineComponent, ref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
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
  __name: "functions",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String
  },
  setup(__props) {
    function showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    }
    const userAvatarColor = ref([avatar.color_left_arm]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal" id="PartsModal"${_scopeId}><div class="modal-avatar-card modal-card-body"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> Avatar Parts </div><button class="btn-circle" data-toggle-modal="#following-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="cell medium-3"${_scopeId}><div class="text-center"${_scopeId}><div class="card card-body"${_scopeId}><div style="${ssrRenderStyle({ "margin-bottom": "2.5px" })}"${_scopeId}><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_head }}", "padding": "25px", "margin-top": "-1px" })}" data-part="head"${_scopeId}></button></div><div style="${ssrRenderStyle({ "margin-bottom": "2.5px" })}"${_scopeId}><button class="avatar-body-part" style="${ssrRenderStyle({
              backgroundColor: userAvatarColor.value,
              padding: "50px",
              paddingRight: "0px"
            })}" data-part="left_arm"${_scopeId}></button><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_torso }}", "padding": "50px" })}" data-part="torso"${_scopeId}></button><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_right_arm }}", "padding": "50px", "padding-right": "0px" })}" data-part="right_arm"${_scopeId}></button></div><div${_scopeId}><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_left_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" })}" data-part="left_leg"${_scopeId}></button><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_right_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" })}" data-part="right_leg"${_scopeId}></button></div></div></div></div><div class="cell medium-8"${_scopeId}><div class="text-center"${_scopeId}><div class="card card-body"${_scopeId}><div style="${ssrRenderStyle({ "margin-bottom": "2.5px" })}"${_scopeId}><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_head }}", "padding": "25px", "margin-top": "-1px" })}" data-part="head"${_scopeId}></button></div><div style="${ssrRenderStyle({ "margin-bottom": "2.5px" })}"${_scopeId}><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_left_arm }}", "padding": "50px", "padding-right": "0px" })}" data-part="left_arm"${_scopeId}></button><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_torso }}", "padding": "50px" })}" data-part="torso"${_scopeId}></button><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_right_arm }}", "padding": "50px", "padding-right": "0px" })}" data-part="right_arm"${_scopeId}></button></div><div${_scopeId}><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_left_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" })}" data-part="left_leg"${_scopeId}></button><button class="avatar-body-part" style="${ssrRenderStyle({ "background-color": "{{ Auth::user()->avatar()->color_right_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" })}" data-part="right_leg"${_scopeId}></button></div></div></div></div></div></div></div></div><div class="cell medium-3"${_scopeId}><div class="mb-1 align-middle flex-container align-justify"${_scopeId}><div class="mb-1 text-xl fw-semibold"${_scopeId}>Avatar</div><div class="button position-relative" style="${ssrRenderStyle({ "margin-right": "-14px" })}"${_scopeId}><button class="text-sm far fa-fill-drip btn-circle" data-tooltip-title="More" data-tooltip-placement="bottom"${_scopeId}></button></div></div><div class="mb-3 card card-body"${_scopeId}><img src="/assets/img/dummy.png"${_scopeId}><div class="min-w-0 gap-2 mt-3 flex-container"${_scopeId}><button class="btn btn-danger btn-sm text-truncate w-100"${_scopeId}> Reset </button><button class="btn btn-info btn-sm text-truncate w-100"${_scopeId}> Random </button></div></div></div><div class="cell medium-8"${_scopeId}><div class="mb-1 align-middle flex-container align-justify"${_scopeId}><div class="mb-1 text-xl fw-semibold"${_scopeId}>Inventory</div></div><div class="mb-3 card card-body"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-wand-magic-sparkles text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Items. </div><div class="text-xs text-muted fw-semibold"${_scopeId}> You are not wearing any items. </div></div></div></div><div class="mb-3 card card-body"${_scopeId}><div class="section"${_scopeId}><ul class="tabs"${_scopeId}><li class="tab-item"${_scopeId}><a href="#" class="tab-link active squish"${_scopeId}>Hats</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Shirts</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Accessories</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Pants</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Heads</a></li></ul></div><div class="section"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-crate-apple text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No insert_category_name_here </div><div class="text-xs text-muted fw-semibold"${_scopeId}> You have no items in the category. </div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "modal",
                id: "PartsModal"
              }, [
                createVNode("div", { class: "modal-avatar-card modal-card-body" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, " Avatar Parts "),
                      createVNode("button", {
                        onClick: ($event) => showModal("PartsModal"),
                        class: "btn-circle",
                        "data-toggle-modal": "#following-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "card card-body" }, [
                            createVNode("div", { style: { "margin-bottom": "2.5px" } }, [
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_head }}", "padding": "25px", "margin-top": "-1px" },
                                "data-part": "head"
                              })
                            ]),
                            createVNode("div", { style: { "margin-bottom": "2.5px" } }, [
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: {
                                  backgroundColor: userAvatarColor.value,
                                  padding: "50px",
                                  paddingRight: "0px"
                                },
                                "data-part": "left_arm"
                              }, null, 4),
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_torso }}", "padding": "50px" },
                                "data-part": "torso"
                              }),
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_right_arm }}", "padding": "50px", "padding-right": "0px" },
                                "data-part": "right_arm"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_left_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" },
                                "data-part": "left_leg"
                              }),
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_right_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" },
                                "data-part": "right_leg"
                              })
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "cell medium-8" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "card card-body" }, [
                            createVNode("div", { style: { "margin-bottom": "2.5px" } }, [
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_head }}", "padding": "25px", "margin-top": "-1px" },
                                "data-part": "head"
                              })
                            ]),
                            createVNode("div", { style: { "margin-bottom": "2.5px" } }, [
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_left_arm }}", "padding": "50px", "padding-right": "0px" },
                                "data-part": "left_arm"
                              }),
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_torso }}", "padding": "50px" },
                                "data-part": "torso"
                              }),
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_right_arm }}", "padding": "50px", "padding-right": "0px" },
                                "data-part": "right_arm"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_left_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" },
                                "data-part": "left_leg"
                              }),
                              createVNode("button", {
                                class: "avatar-body-part",
                                style: { "background-color": "{{ Auth::user()->avatar()->color_right_leg }}", "padding": "50px", "padding-right": "0px", "padding-left": "47px" },
                                "data-part": "right_leg"
                              })
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "cell medium-3" }, [
                createVNode("div", { class: "mb-1 align-middle flex-container align-justify" }, [
                  createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "Avatar"),
                  createVNode("div", {
                    class: "button position-relative",
                    style: { "margin-right": "-14px" },
                    onClick: ($event) => showModal("PartsModal")
                  }, [
                    createVNode("button", {
                      class: "text-sm far fa-fill-drip btn-circle",
                      "data-tooltip-title": "More",
                      "data-tooltip-placement": "bottom"
                    })
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "mb-3 card card-body" }, [
                  createVNode("img", { src: "/assets/img/dummy.png" }),
                  createVNode("div", { class: "min-w-0 gap-2 mt-3 flex-container" }, [
                    createVNode("button", { class: "btn btn-danger btn-sm text-truncate w-100" }, " Reset "),
                    createVNode("button", { class: "btn btn-info btn-sm text-truncate w-100" }, " Random ")
                  ])
                ])
              ]),
              createVNode("div", { class: "cell medium-8" }, [
                createVNode("div", { class: "mb-1 align-middle flex-container align-justify" }, [
                  createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "Inventory")
                ]),
                createVNode("div", { class: "mb-3 card card-body" }, [
                  createVNode("div", { class: "gap-3 text-center flex-container flex-dir-column" }, [
                    createVNode("i", { class: "text-5xl fas fa-wand-magic-sparkles text-muted" }),
                    createVNode("div", { style: { "line-height": "16px" } }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Items. "),
                      createVNode("div", { class: "text-xs text-muted fw-semibold" }, " You are not wearing any items. ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-3 card card-body" }, [
                  createVNode("div", { class: "section" }, [
                    createVNode("ul", { class: "tabs" }, [
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link active squish"
                        }, "Hats")
                      ]),
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link squish"
                        }, "Shirts")
                      ]),
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link squish"
                        }, "Accessories")
                      ]),
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link squish"
                        }, "Pants")
                      ]),
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link squish"
                        }, "Heads")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "section" }, [
                    createVNode("div", { class: "gap-3 text-center flex-container flex-dir-column" }, [
                      createVNode("i", { class: "text-5xl fas fa-crate-apple text-muted" }),
                      createVNode("div", { style: { "line-height": "16px" } }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No insert_category_name_here "),
                        createVNode("div", { class: "text-xs text-muted fw-semibold" }, " You have no items in the category. ")
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Customize/functions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
