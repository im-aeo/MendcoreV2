import { defineComponent, ref, computed, resolveComponent, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, withDirectives, vModelText, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$2 } from "./Footer-b7f961b4.mjs";
import { useForm } from "@inertiajs/inertia-vue3";
import { route } from "momentum-trail";
import "@inertiajs/vue3";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const totalSteps = 2;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Forgot",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      email: ""
    });
    let currentStep = ref(1);
    const nextStep = () => {
      if (currentStep.value < totalSteps) {
        currentStep.value++;
      }
    };
    const isPreviousButtonDisabled = computed(() => {
      return currentStep.value === 1;
    });
    const previousStep = () => {
      currentStep.value--;
    };
    const getProgressWidth = () => {
      const progress = currentStep.value / totalSteps * 100;
      return `${progress}%`;
    };
    const getTitle = () => {
      if (currentStep.value === 1) {
        return "Oh noes! Did you forget your password?";
      } else if (currentStep.value === 2) {
        return "Sent!";
      }
    };
    const getStepText = () => {
      if (currentStep.value === 1) {
        return "Fill in the e-mail asscoiated with your account in the field below, if said e-mail is linked to an account, we will send you a link to reset your password.";
      } else if (currentStep.value === 2) {
        return ' If you do not see the e-mail within 5 minutes, please check your spam folder. If you still do not see it, then please press the "Resend Confirmation Email" button below. (Sorry for the inconvenience!)';
      }
    };
    ref("");
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FlashMessages = resolveComponent("FlashMessages");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell large-8 medium-10"${_scopeId}><div class="card"${_scopeId}><div class="card-body"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_FlashMessages, null, null, _parent2, _scopeId));
            _push2(`<div class="progress-bar"${_scopeId}><span class="progress" style="${ssrRenderStyle({ width: getProgressWidth() })}"${_scopeId}></span></div><div class="mx-1 my-3 divider"${_scopeId}></div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="text-center cell medium-3"${_scopeId}><img src="/assets/img/earl_placeholder.png" class="show-for-medium" alt="earl"${_scopeId}><img src="/assets/img/earl_placeholder.png" alt="earl" style="${ssrRenderStyle({ "max-width": "180px" })}" class="show-for-small-only"${_scopeId}></div><div class="cell medium-9"${_scopeId}><div class="text-2xl fw-semibold"${_scopeId}>${ssrInterpolate(getTitle())}</div><div class="gap-1 mb-2 flex-container flex-dir-column"${_scopeId}><div class="text-sm text-muted fw-semibold"${_scopeId}>${ssrInterpolate(getStepText())}</div></div>`);
            if (unref(currentStep) === 1) {
              _push2(`<div${_scopeId}><div${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Email Address </div><input type="text" class="form"${ssrRenderAttr("value", unref(form).email)} placeholder="Email Address"${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 2) {
              _push2(`<div${_scopeId}><div${_scopeId}><button class="btn btn-info btn-disabled btn-block"${_scopeId}><i class="fas fa-envelopes me-2"${_scopeId}></i>Resend Confirmation Email </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="divider mx-1 my-3"${_scopeId}></div><div class="flex-container align-justify"${_scopeId}>`);
            if (unref(currentStep) > 1) {
              _push2(`<button class="${ssrRenderClass([{ disabled: isPreviousButtonDisabled.value }, "px-4 btn btn-danger"])}"${_scopeId}> Previous </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 1) {
              _push2(`<button class="px-4 btn btn-success"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Send Email </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Link, {
              class: "text-xs fw-bold text-muted text-uppercase",
              href: unref(route)("auth.login.page")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Already have an account?`);
                } else {
                  return [
                    createTextVNode("Already have an account?")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "cell large-8 medium-10" }, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode(_component_FlashMessages),
                    createVNode("div", { class: "progress-bar" }, [
                      createVNode("span", {
                        class: "progress",
                        style: { width: getProgressWidth() }
                      }, null, 4)
                    ]),
                    createVNode("div", { class: "mx-1 my-3 divider" }),
                    createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                      createVNode("div", { class: "text-center cell medium-3" }, [
                        createVNode("img", {
                          src: "/assets/img/earl_placeholder.png",
                          class: "show-for-medium",
                          alt: "earl"
                        }),
                        createVNode("img", {
                          src: "/assets/img/earl_placeholder.png",
                          alt: "earl",
                          style: { "max-width": "180px" },
                          class: "show-for-small-only"
                        })
                      ]),
                      createVNode("div", { class: "cell medium-9" }, [
                        createVNode("div", { class: "text-2xl fw-semibold" }, toDisplayString(getTitle()), 1),
                        createVNode("div", { class: "gap-1 mb-2 flex-container flex-dir-column" }, [
                          createVNode("div", { class: "text-sm text-muted fw-semibold" }, toDisplayString(getStepText()), 1)
                        ]),
                        unref(currentStep) === 1 ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Email Address "),
                            withDirectives(createVNode("input", {
                              type: "text",
                              class: "form",
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              placeholder: "Email Address"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).email]
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        unref(currentStep) === 2 ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("div", null, [
                            createVNode("button", { class: "btn btn-info btn-disabled btn-block" }, [
                              createVNode("i", { class: "fas fa-envelopes me-2" }),
                              createTextVNode("Resend Confirmation Email ")
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "divider mx-1 my-3" }),
                        createVNode("div", { class: "flex-container align-justify" }, [
                          unref(currentStep) > 1 ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: previousStep,
                            class: ["px-4 btn btn-danger", { disabled: isPreviousButtonDisabled.value }]
                          }, " Previous ", 2)) : createCommentVNode("", true),
                          unref(currentStep) === 1 ? (openBlock(), createBlock("button", {
                            key: 1,
                            class: "px-4 btn btn-success",
                            onClick: nextStep,
                            disabled: unref(form).processing
                          }, " Send Email ", 8, ["disabled"])) : createCommentVNode("", true)
                        ]),
                        createVNode(_component_Link, {
                          class: "text-xs fw-bold text-muted text-uppercase",
                          href: unref(route)("auth.login.page")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Already have an account?")
                          ]),
                          _: 1
                        }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Authentication/Forgot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
