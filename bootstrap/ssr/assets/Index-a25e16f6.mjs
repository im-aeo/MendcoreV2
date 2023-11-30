import { defineComponent, ref, onMounted, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$2 } from "./Footer-b7f961b4.mjs";
import axios from "axios";
import { route } from "momentum-trail";
import { usePage } from "@inertiajs/vue3";
import VLazyImage from "v-lazy-image";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const __default__ = defineComponent({
  props: {
    avatar: {
      type: Object,
      required: true
    }
  },
  methods: {
    wearItem() {
      const requestData = {
        action: "wear",
        // Replace with the desired action
        id: 1
        // Replace with the item ID you want to wear
        // Add other data as needed
      };
      axios.post("/your-php-endpoint-url", requestData).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  data() {
    return {
      colors: this.$page.props.colors,
      userAvatar: {
        color_head: this.avatar.color_head,
        color_torso: this.avatar.color_torso,
        color_left_arm: this.avatar.color_left_arm,
        color_right_arm: this.avatar.color_right_arm,
        color_left_leg: this.avatar.color_left_leg,
        color_right_leg: this.avatar.color_right_leg,
        image: this.avatar.thumbnail,
        items: [
          {
            hats: {
              hat_1: this.avatar.hat_1,
              hat_2: this.avatar.hat_2,
              hat_3: this.avatar.hat_3,
              hat_4: this.avatar.hat_4,
              hat_5: this.avatar.hat_5,
              hat_6: this.avatar.hat_6
            },
            face: this.avatar.face,
            gear: this.avatar.gear,
            shirt: this.avatar.shirt,
            pants: this.avatar.pants
          }
        ]
      }
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedPart = ref(null);
    const selectedColor = ref(null);
    const VrcRequest = ref(false);
    const imageRefreshKey = ref(0);
    function showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    }
    const partNames = {
      head: "Head",
      left_arm: "Left Arm",
      torso: "Torso",
      right_arm: "Right Arm",
      left_leg: "Left Leg",
      right_leg: "Right Leg"
    };
    function VRCReset() {
      VrcRequest.value = true;
      const requestData = {
        action: "reset"
      };
      axios.post(route(`avatar.update`), requestData).then((response) => {
        console.log(response.data);
        imageRefreshKey.value += 1;
        getAvatar();
        VrcRequest.value = false;
      }).catch((error) => {
        console.error(error);
      });
      console.log(`Resetting`);
    }
    let thumbnail = "";
    async function getAvatar() {
      VrcRequest.value = true;
      try {
        const response = await axios.get(route(`api.thumbnails`, { type: 2, id: usePage().props.auth.user.id }), { maxRedirects: 0 });
        const redirectURL = response.headers["location"];
        if (redirectURL) {
          thumbnail = redirectURL;
          console.log(thumbnail);
        } else {
          console.error("No redirection URL found in the response headers.");
        }
        VrcRequest.value = false;
      } catch (error) {
        VrcRequest.value = false;
        console.error(error);
      }
    }
    function changeColor(color, part) {
      document.addEventListener("DOMContentLoaded", function() {
        VrcRequest.value = true;
        const requestData = {
          action: "color",
          body_part: part,
          color
        };
        axios.post(route(`avatar.update`), requestData).then((response) => {
          console.log(response.data);
          imageRefreshKey.value += 1;
          const partRecolor = document.getElementById(part);
          if (partRecolor) {
            partRecolor.style.backgroundColor = color;
            VrcRequest.value = false;
            selectedColor.value = color;
          } else {
            console.error(`Element with ID ${part} not found.`);
          }
        }).catch((error) => {
          VrcRequest.value = false;
          console.error(error);
        });
        console.log(`Changing ${part} color to: ${color}`);
      });
    }
    function selectPart(part) {
      selectedPart.value = part;
    }
    function setColor(color) {
      selectedColor.value = color;
    }
    function handlePartSelection(part) {
      showModal("PartsModal");
      selectPart(part);
    }
    onMounted(() => {
      getAvatar();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal" id="PartsModal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}>`);
            if (selectedPart.value) {
              _push2(`<div class="text-lg fw-semibold"${_scopeId}> Change ${ssrInterpolate(partNames[selectedPart.value])} Color </div>`);
            } else {
              _push2(`<div class="text-lg fw-semibold"${_scopeId}> Select a part to change its color </div>`);
            }
            _push2(`<button class="btn-circle" data-toggle-modal="#PartsModal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless grid-x mr-2"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.colors, (color, info) => {
              _push2(`<div class="mr-2"${_scopeId}><div class="${ssrRenderClass([{
                active: selectedColor.value === color || _ctx.userAvatar[`color_${selectedPart.value}`] === color
              }, "ColorPickerItem"])}" style="${ssrRenderStyle({
                backgroundColor: "#" + color,
                display: "inline-block",
                width: "32px",
                height: "32px"
              })}"${_scopeId}></div></div>`);
            });
            _push2(`<!--]--><div class="text-xs text-muted fw-semibold"${_scopeId}> After changing your avatar part your avatar will rerender with the changes applied. </div><div class="flex-wrap gap-2 flex-container justify-content-end section-borderless"${_scopeId}><button class="btn btn-secondary"${_scopeId}> Cancel </button>`);
            if (selectedPart.value && !VrcRequest.value) {
              _push2(`<input type="submit" class="btn btn-success" value="Submit"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="cell medium-3"${_scopeId}><div class="mb-3 card card-body"${_scopeId}>`);
            if (!VrcRequest.value) {
              _push2(ssrRenderComponent(unref(VLazyImage), {
                src: _ctx.userAvatar.image,
                "src-placeholder": "&"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<i class="fa-duotone fa-arrows-spin grid-x align-center text-center text-3xl text-info fa-spin"${_scopeId}></i>`);
            }
            _push2(`<div class="min-w-0 gap-2 mt-3 flex-container"${_scopeId}><button class="btn btn-danger btn-sm text-truncate w-100"${_scopeId}> Reset </button><button class="btn btn-info btn-sm text-truncate w-100"${_scopeId}> Random </button></div></div><div class="text-center"${_scopeId}><div class="card card-body"${_scopeId}><div style="${ssrRenderStyle({ "margin-bottom": "2.5px" })}"${_scopeId}><button class="avatar-body-part" id="Head" style="${ssrRenderStyle({
              backgroundColor: "#" + _ctx.userAvatar.color_head,
              padding: "25px",
              borderRadius: "15px",
              marginTop: "-1px"
            })}"${_scopeId}></button></div><div style="${ssrRenderStyle({ "margin-bottom": "2.5px" })}"${_scopeId}><button class="avatar-body-part" id="Left-Arm" style="${ssrRenderStyle({
              backgroundColor: "#" + _ctx.userAvatar.color_left_arm,
              padding: "50px",
              paddingRight: "0px"
            })}"${_scopeId}></button><button class="avatar-body-part" id="Torso" style="${ssrRenderStyle({
              backgroundColor: "#" + _ctx.userAvatar.color_torso,
              padding: "50px"
            })}"${_scopeId}></button><button class="avatar-body-part" id="Right-Arm" style="${ssrRenderStyle({
              backgroundColor: "#" + _ctx.userAvatar.color_right_arm,
              padding: "50px",
              paddingRight: "0px"
            })}"${_scopeId}></button></div><div${_scopeId}><button class="avatar-body-part" name="Left Leg" style="${ssrRenderStyle({
              backgroundColor: "#" + _ctx.userAvatar.color_left_leg,
              padding: "50px",
              paddingRight: "0px",
              paddingLeft: "47px"
            })}"${_scopeId}></button><button class="avatar-body-part" name="Right Leg" style="${ssrRenderStyle({
              backgroundColor: "#" + _ctx.userAvatar.color_right_leg,
              padding: "50px",
              paddingRight: "0px",
              borderBottom: "15px",
              paddingLeft: "47px"
            })}"${_scopeId}></button></div></div></div></div><div class="cell medium-8"${_scopeId}><div class="mb-1 align-middle flex-container align-justify"${_scopeId}><div class="mb-1 text-xl fw-semibold"${_scopeId}>Inventory</div></div><div class="mb-3 card card-body"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-wand-magic-sparkles text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Items. </div><div class="text-xs text-muted fw-semibold"${_scopeId}> You are not wearing any items. </div></div></div></div><div class="mb-3 card card-body"${_scopeId}><div class="section"${_scopeId}><ul class="tabs"${_scopeId}><li class="tab-item"${_scopeId}><a href="#" class="tab-link active squish"${_scopeId}>Hats</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Shirts</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Accessories</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Pants</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Heads</a></li></ul></div><div class="section"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-crate-apple text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No insert_category_name_here </div><div class="text-xs text-muted fw-semibold"${_scopeId}> You have no items in the category. </div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "modal",
                id: "PartsModal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      selectedPart.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-lg fw-semibold"
                      }, " Change " + toDisplayString(partNames[selectedPart.value]) + " Color ", 1)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-lg fw-semibold"
                      }, " Select a part to change its color ")),
                      createVNode("button", {
                        onClick: ($event) => showModal("PartsModal"),
                        class: "btn-circle",
                        "data-toggle-modal": "#PartsModal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless grid-x mr-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.colors, (color, info) => {
                      return openBlock(), createBlock("div", {
                        class: "mr-2",
                        key: info.name
                      }, [
                        createVNode("div", {
                          class: ["ColorPickerItem", {
                            active: selectedColor.value === color || _ctx.userAvatar[`color_${selectedPart.value}`] === color
                          }],
                          onClick: ($event) => setColor(color),
                          style: {
                            backgroundColor: "#" + color,
                            display: "inline-block",
                            width: "32px",
                            height: "32px"
                          }
                        }, null, 14, ["onClick"])
                      ]);
                    }), 128)),
                    createVNode("div", { class: "text-xs text-muted fw-semibold" }, " After changing your avatar part your avatar will rerender with the changes applied. "),
                    createVNode("div", { class: "flex-wrap gap-2 flex-container justify-content-end section-borderless" }, [
                      createVNode("button", {
                        class: "btn btn-secondary",
                        onClick: ($event) => showModal("PartsModal")
                      }, " Cancel ", 8, ["onClick"]),
                      selectedPart.value && !VrcRequest.value ? (openBlock(), createBlock("input", {
                        key: 0,
                        onClick: ($event) => changeColor(selectedColor.value, selectedPart.value),
                        type: "submit",
                        class: "btn btn-success",
                        value: "Submit"
                      }, null, 8, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "cell medium-3" }, [
                createVNode("div", { class: "mb-3 card card-body" }, [
                  !VrcRequest.value ? (openBlock(), createBlock(unref(VLazyImage), {
                    key: 0,
                    src: _ctx.userAvatar.image,
                    "src-placeholder": "&"
                  }, null, 8, ["src"])) : (openBlock(), createBlock("i", {
                    key: 1,
                    class: "fa-duotone fa-arrows-spin grid-x align-center text-center text-3xl text-info fa-spin"
                  })),
                  createVNode("div", { class: "min-w-0 gap-2 mt-3 flex-container" }, [
                    createVNode("button", {
                      onClick: ($event) => VRCReset(),
                      class: "btn btn-danger btn-sm text-truncate w-100"
                    }, " Reset ", 8, ["onClick"]),
                    createVNode("button", { class: "btn btn-info btn-sm text-truncate w-100" }, " Random ")
                  ])
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("div", { style: { "margin-bottom": "2.5px" } }, [
                      createVNode("button", {
                        class: "avatar-body-part",
                        id: "Head",
                        style: {
                          backgroundColor: "#" + _ctx.userAvatar.color_head,
                          padding: "25px",
                          borderRadius: "15px",
                          marginTop: "-1px"
                        },
                        onClick: ($event) => handlePartSelection("head")
                      }, null, 12, ["onClick"])
                    ]),
                    createVNode("div", { style: { "margin-bottom": "2.5px" } }, [
                      createVNode("button", {
                        class: "avatar-body-part",
                        id: "Left-Arm",
                        style: {
                          backgroundColor: "#" + _ctx.userAvatar.color_left_arm,
                          padding: "50px",
                          paddingRight: "0px"
                        },
                        onClick: ($event) => handlePartSelection("left_arm")
                      }, null, 12, ["onClick"]),
                      createVNode("button", {
                        class: "avatar-body-part",
                        id: "Torso",
                        style: {
                          backgroundColor: "#" + _ctx.userAvatar.color_torso,
                          padding: "50px"
                        },
                        onClick: ($event) => handlePartSelection("torso")
                      }, null, 12, ["onClick"]),
                      createVNode("button", {
                        class: "avatar-body-part",
                        id: "Right-Arm",
                        style: {
                          backgroundColor: "#" + _ctx.userAvatar.color_right_arm,
                          padding: "50px",
                          paddingRight: "0px"
                        },
                        onClick: ($event) => handlePartSelection("right_arm")
                      }, null, 12, ["onClick"])
                    ]),
                    createVNode("div", null, [
                      createVNode("button", {
                        class: "avatar-body-part",
                        name: "Left Leg",
                        onClick: ($event) => handlePartSelection("left_leg"),
                        style: {
                          backgroundColor: "#" + _ctx.userAvatar.color_left_leg,
                          padding: "50px",
                          paddingRight: "0px",
                          paddingLeft: "47px"
                        }
                      }, null, 12, ["onClick"]),
                      createVNode("button", {
                        class: "avatar-body-part",
                        name: "Right Leg",
                        onClick: ($event) => handlePartSelection("right_leg"),
                        style: {
                          backgroundColor: "#" + _ctx.userAvatar.color_right_leg,
                          padding: "50px",
                          paddingRight: "0px",
                          borderBottom: "15px",
                          paddingLeft: "47px"
                        }
                      }, null, 12, ["onClick"])
                    ])
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
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Customize/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
