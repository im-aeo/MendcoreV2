import { defineComponent, ref, resolveComponent, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { useForm } from "@inertiajs/vue3";
import { route } from "momentum-trail";
import { _ as _sfc_main$2 } from "./FlashMessages-d3b27582.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import axios from "axios";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const ConfirmingAuth = ref(false);
    const form = useForm({
      username: "",
      password: "",
      remember: false
    });
    const submit = () => {
      axios.get(`/sanctum/csrf-cookie`).then((response) => {
        form.post(route(`auth.login.validate`), {
          onFinish: () => form.reset("password")
        });
      });
    };
    const ConfirmUserAuth = () => {
      ConfirmingAuth.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`<div class="cell medium-4"${_scopeId}><div class="mb-2"${_scopeId}><div class="text-2xl fw-semibold"${_scopeId}>Log In</div><div class="text-sm text-muted fw-semibold"${_scopeId}> Don&#39;t have an account? <a href="#" class="d-inline-block squish"${_scopeId}>Sign Up</a></div></div><div${_scopeId}></div><div class="card card-body"${_scopeId}><form${_scopeId}><div class="mb-2"${_scopeId}><div class="${ssrRenderClass([{ "text-danger": unref(form).errors.username }, "text-xs fw-bold text-muted text-uppercase"])}"${_scopeId}> Username </div><input type="text"${ssrRenderAttr("value", unref(form).username)} class="form" placeholder="Username..."${_scopeId}>`);
            if (unref(form).errors.username) {
              _push2(`<div class="text-xs text-danger fw-semibold"${_scopeId}>${ssrInterpolate(unref(form).errors.username)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-2"${_scopeId}><div class="${ssrRenderClass([{ "text-danger": unref(form).errors.password }, "text-xs fw-bold text-muted text-uppercase"])}"${_scopeId}> Password </div><input type="password"${ssrRenderAttr("value", unref(form).password)} class="mb-2 form" placeholder="Password..."${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<div class="text-xs text-danger fw-semibold"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="align-middle flex-container align-justify"${_scopeId}><input type="submit" class="${ssrRenderClass([{ "is-loading": ConfirmingAuth.value }, "btn btn-success"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} value="Log In"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: unref(route)("auth.forgot.page"),
              class: "text-sm fw-semibold squish"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forgot Password?`);
                } else {
                  return [
                    createTextVNode("Forgot Password?")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form><div class="mx-1 my-3 divider"${_scopeId}></div><a as="button"${ssrRenderAttr("href", unref(route)(`auth.login.google`))} class="my-2 mt-2 btn btn-secondary btn-block"${_scopeId}><i class="fab fa-google me-1"${_scopeId}></i> Log In with Google </a><button class="mt-2 btn btn-discord btn-block"${_scopeId}><i class="fab fa-discord me-1"${_scopeId}></i> Log In with Discord </button></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2),
              createVNode("div", { class: "cell medium-4" }, [
                createVNode("div", { class: "mb-2" }, [
                  createVNode("div", { class: "text-2xl fw-semibold" }, "Log In"),
                  createVNode("div", { class: "text-sm text-muted fw-semibold" }, [
                    createTextVNode(" Don't have an account? "),
                    createVNode("a", {
                      href: "#",
                      class: "d-inline-block squish"
                    }, "Sign Up")
                  ])
                ]),
                createVNode("div"),
                createVNode("div", { class: "card card-body" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", { class: "mb-2" }, [
                      createVNode("div", {
                        class: [{ "text-danger": unref(form).errors.username }, "text-xs fw-bold text-muted text-uppercase"]
                      }, " Username ", 2),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => unref(form).username = $event,
                        class: "form",
                        placeholder: "Username..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).username]
                      ]),
                      unref(form).errors.username ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-danger fw-semibold"
                      }, toDisplayString(unref(form).errors.username), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mb-2" }, [
                      createVNode("div", {
                        class: [{ "text-danger": unref(form).errors.password }, "text-xs fw-bold text-muted text-uppercase"]
                      }, " Password ", 2),
                      withDirectives(createVNode("input", {
                        type: "password",
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        class: "mb-2 form",
                        placeholder: "Password..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password]
                      ]),
                      unref(form).errors.password ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-danger fw-semibold"
                      }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "align-middle flex-container align-justify" }, [
                      createVNode("input", {
                        type: "submit",
                        class: ["btn btn-success", { "is-loading": ConfirmingAuth.value }],
                        disabled: unref(form).processing,
                        onClick: ConfirmUserAuth,
                        value: "Log In"
                      }, null, 10, ["disabled"]),
                      createVNode(_component_Link, {
                        href: unref(route)("auth.forgot.page"),
                        class: "text-sm fw-semibold squish"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Forgot Password?")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ], 40, ["onSubmit"]),
                  createVNode("div", { class: "mx-1 my-3 divider" }),
                  createVNode("a", {
                    as: "button",
                    href: unref(route)(`auth.login.google`),
                    class: "my-2 mt-2 btn btn-secondary btn-block"
                  }, [
                    createVNode("i", { class: "fab fa-google me-1" }),
                    createTextVNode(" Log In with Google ")
                  ], 8, ["href"]),
                  createVNode("button", { class: "mt-2 btn btn-discord btn-block" }, [
                    createVNode("i", { class: "fab fa-discord me-1" }),
                    createTextVNode(" Log In with Discord ")
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Authentication/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
