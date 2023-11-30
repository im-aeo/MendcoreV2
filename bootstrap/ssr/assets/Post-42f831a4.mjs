import { defineComponent, ref, resolveComponent, withCtx, unref, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, withModifiers, withDirectives, vModelText, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$2 } from "./Footer-b7f961b4.mjs";
import { route } from "momentum-trail";
import axios from "axios";
import { useForm, usePage } from "@inertiajs/vue3";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Post",
  __ssrInlineRender: true,
  props: {
    topic: {},
    post: {},
    replies: {}
  },
  setup(__props) {
    const form = useForm({
      body: ""
    });
    const submit = () => {
      axios.get(`/sanctum/csrf-cookie`).then((response) => {
        form.post(route(`forum.reply.validate`, { id: usePage().props.post.id }), {
          onFinish: () => form.reset("body")
        });
      });
    };
    const isHidden = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell medium-9"${_scopeId}><div class="mb-2"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}>${ssrInterpolate(_ctx.post.title)}</div><div class="mb-2 text-xs text-muted fw-semibold"${_scopeId}>A post by: ${ssrInterpolate(_ctx.post.creator.username)}</div></div><div class="card-body"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}><div class="gap-2 mb-3 align-middle flex-container flex-dir-column"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: unref(route)("user.profile", { username: _ctx.post.creator.username })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img src="/assets/img/dummy.png" style="${ssrRenderStyle({ "max-width": "136px" })}" class="border img-fluid" alt="2oddMacs1"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      src: "/assets/img/dummy.png",
                      style: { "max-width": "136px" },
                      class: "border img-fluid",
                      alt: "2oddMacs1"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-center" style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(_ctx.post.creator.display_name)} <i class="ml-1 fas fa-shield-check text-success" style="${ssrRenderStyle({ "font-size": "13px" })}" title="This user is verified." data-toggle="tooltip"${_scopeId}></i></div><div class="text-xs fw-semibold text-muted"${_scopeId}>${ssrInterpolate("@" + _ctx.post.creator.username)}</div></div></div><div class="divider verticalDivider"${_scopeId}></div><div class="card card-body w-100"${_scopeId}><div class="gap-1 flex-container flex-dir-column"${_scopeId}><div class="mb-2 text-sm text-muted fw-semibold"${_scopeId}><i class="fas fa-clock"${_scopeId}></i>  Post by: ${ssrInterpolate(_ctx.post.creator.username)}, <b${_scopeId}>${ssrInterpolate(_ctx.post.DateHum)}</b></div><div class="mb-2" style="${ssrRenderStyle({ "white-space": "pre-wrap" })}"${_scopeId}>${_ctx.post.body}</div></div></div></div><div class="mx-1 my-3 divider"${_scopeId}></div><div class="section"${_scopeId}><ul class="pagination flex-container align-center"${_scopeId}><button class="page-link page-disabled"${_scopeId}><i class="fa-regular fa-chevron-left"${_scopeId}></i></button><button class="page-link page-active"${_scopeId}>1</button><button class="page-link"${_scopeId}>2</button><button class="page-link"${_scopeId}>3</button><button class="page-link"${_scopeId}><i class="fa-regular fa-chevron-right"${_scopeId}></i></button></ul></div></div><!--[-->`);
            ssrRenderList(_ctx.replies, (reply) => {
              _push2(`<div class="card-body"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}><div class="gap-2 mb-3 align-middle flex-container flex-dir-column"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: unref(route)("user.profile", { username: reply.creator.username })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img src="/assets/img/dummy.png" style="${ssrRenderStyle({ "max-width": "136px" })}" class="border img-fluid" alt="2oddMacs1"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: "/assets/img/dummy.png",
                        style: { "max-width": "136px" },
                        class: "border img-fluid",
                        alt: "2oddMacs1"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="text-center" style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(reply.creator.display_name)} <i class="ml-1 fas fa-shield-check text-success" style="${ssrRenderStyle({ "font-size": "13px" })}" title="This user is verified." data-toggle="tooltip"${_scopeId}></i></div><div class="text-xs fw-semibold text-muted"${_scopeId}>${ssrInterpolate("@" + reply.creator.username)}</div></div></div><div class="divider verticalDivider"${_scopeId}></div><div class="card card-body w-100"${_scopeId}><div class="gap-1 flex-container flex-dir-column"${_scopeId}><div class="mb-2 text-sm text-muted fw-semibold"${_scopeId}><i class="fas fa-clock"${_scopeId}></i>  Post by: ${ssrInterpolate(reply.creator.username)}, <b${_scopeId}>${ssrInterpolate(reply.DateHum)}</b></div><div class="mb-2" style="${ssrRenderStyle({ "white-space": "pre-wrap" })}"${_scopeId}>${reply.body}</div></div></div></div><div class="mx-1 my-3 divider"${_scopeId}></div><div class="section"${_scopeId}><ul class="pagination flex-container align-center"${_scopeId}><button class="page-link page-disabled"${_scopeId}><i class="fa-regular fa-chevron-left"${_scopeId}></i></button><button class="page-link page-active"${_scopeId}>1</button><button class="page-link"${_scopeId}>2</button><button class="page-link"${_scopeId}>3</button><button class="page-link"${_scopeId}><i class="fa-regular fa-chevron-right"${_scopeId}></i></button></ul></div></div>`);
            });
            _push2(`<!--]-->`);
            if (!isHidden.value) {
              _push2(`<div class="cell medium-9"${_scopeId}><div class="card card-body"${_scopeId}><div class="text-xl text-danger bg-primary"${_scopeId}>Reply to ${ssrInterpolate(_ctx.post.title)}</div><div class="mx-1 my-3 divider"${_scopeId}></div><form${_scopeId}><label for="post-body" class="mb-2 text-xs fw-bold text-uppercase"${_scopeId}>Reply Body</label><textarea id="post-body" class="form" placeholder="Body" maxlength="4096"${_scopeId}>${ssrInterpolate(unref(form).body)}</textarea><button class="btn btn-success btn-block" type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>Create</button></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="section flex-container align-center"${_scopeId}><a class="btn btn-success"${_scopeId}><i class="fas fa-reply"${_scopeId}></i> Reply</a></div></div>`);
          } else {
            return [
              createVNode("div", { class: "cell medium-9" }, [
                createVNode("div", { class: "mb-2" }, [
                  createVNode("div", { class: "mb-2 text-xl fw-semibold" }, toDisplayString(_ctx.post.title), 1),
                  createVNode("div", { class: "mb-2 text-xs text-muted fw-semibold" }, "A post by: " + toDisplayString(_ctx.post.creator.username), 1)
                ]),
                createVNode("div", { class: "card-body" }, [
                  createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                    createVNode("div", { class: "gap-2 mb-3 align-middle flex-container flex-dir-column" }, [
                      createVNode(_component_Link, {
                        href: unref(route)("user.profile", { username: _ctx.post.creator.username })
                      }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: "/assets/img/dummy.png",
                            style: { "max-width": "136px" },
                            class: "border img-fluid",
                            alt: "2oddMacs1"
                          })
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("div", {
                        class: "text-center",
                        style: { "line-height": "16px" }
                      }, [
                        createVNode("div", { class: "fw-semibold" }, [
                          createTextVNode(toDisplayString(_ctx.post.creator.display_name) + " ", 1),
                          createVNode("i", {
                            class: "ml-1 fas fa-shield-check text-success",
                            style: { "font-size": "13px" },
                            title: "This user is verified.",
                            "data-toggle": "tooltip"
                          })
                        ]),
                        createVNode("div", { class: "text-xs fw-semibold text-muted" }, toDisplayString("@" + _ctx.post.creator.username), 1)
                      ])
                    ]),
                    createVNode("div", { class: "divider verticalDivider" }),
                    createVNode("div", { class: "card card-body w-100" }, [
                      createVNode("div", { class: "gap-1 flex-container flex-dir-column" }, [
                        createVNode("div", { class: "mb-2 text-sm text-muted fw-semibold" }, [
                          createVNode("i", { class: "fas fa-clock" }),
                          createTextVNode("  Post by: " + toDisplayString(_ctx.post.creator.username) + ", ", 1),
                          createVNode("b", null, toDisplayString(_ctx.post.DateHum), 1)
                        ]),
                        createVNode("div", {
                          class: "mb-2",
                          innerHTML: _ctx.post.body,
                          style: { "white-space": "pre-wrap" }
                        }, null, 8, ["innerHTML"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mx-1 my-3 divider" }),
                  createVNode("div", { class: "section" }, [
                    createVNode("ul", { class: "pagination flex-container align-center" }, [
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
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.replies, (reply) => {
                  return openBlock(), createBlock("div", { class: "card-body" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                      createVNode("div", { class: "gap-2 mb-3 align-middle flex-container flex-dir-column" }, [
                        createVNode(_component_Link, {
                          href: unref(route)("user.profile", { username: reply.creator.username })
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: "/assets/img/dummy.png",
                              style: { "max-width": "136px" },
                              class: "border img-fluid",
                              alt: "2oddMacs1"
                            })
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode("div", {
                          class: "text-center",
                          style: { "line-height": "16px" }
                        }, [
                          createVNode("div", { class: "fw-semibold" }, [
                            createTextVNode(toDisplayString(reply.creator.display_name) + " ", 1),
                            createVNode("i", {
                              class: "ml-1 fas fa-shield-check text-success",
                              style: { "font-size": "13px" },
                              title: "This user is verified.",
                              "data-toggle": "tooltip"
                            })
                          ]),
                          createVNode("div", { class: "text-xs fw-semibold text-muted" }, toDisplayString("@" + reply.creator.username), 1)
                        ])
                      ]),
                      createVNode("div", { class: "divider verticalDivider" }),
                      createVNode("div", { class: "card card-body w-100" }, [
                        createVNode("div", { class: "gap-1 flex-container flex-dir-column" }, [
                          createVNode("div", { class: "mb-2 text-sm text-muted fw-semibold" }, [
                            createVNode("i", { class: "fas fa-clock" }),
                            createTextVNode("  Post by: " + toDisplayString(reply.creator.username) + ", ", 1),
                            createVNode("b", null, toDisplayString(reply.DateHum), 1)
                          ]),
                          createVNode("div", {
                            class: "mb-2",
                            innerHTML: reply.body,
                            style: { "white-space": "pre-wrap" }
                          }, null, 8, ["innerHTML"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mx-1 my-3 divider" }),
                    createVNode("div", { class: "section" }, [
                      createVNode("ul", { class: "pagination flex-container align-center" }, [
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
                  ]);
                }), 256)),
                !isHidden.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "cell medium-9"
                }, [
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("div", { class: "text-xl text-danger bg-primary" }, "Reply to " + toDisplayString(_ctx.post.title), 1),
                    createVNode("div", { class: "mx-1 my-3 divider" }),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("label", {
                        for: "post-body",
                        class: "mb-2 text-xs fw-bold text-uppercase"
                      }, "Reply Body"),
                      withDirectives(createVNode("textarea", {
                        id: "post-body",
                        class: "form",
                        "onUpdate:modelValue": ($event) => unref(form).body = $event,
                        placeholder: "Body",
                        maxlength: "4096"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).body]
                      ]),
                      createVNode("button", {
                        class: "btn btn-success btn-block",
                        type: "submit",
                        disabled: unref(form).processing
                      }, "Create", 8, ["disabled"])
                    ], 40, ["onSubmit"])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "section flex-container align-center" }, [
                  createVNode("a", {
                    onClick: ($event) => isHidden.value = !isHidden.value,
                    class: "btn btn-success"
                  }, [
                    createVNode("i", { class: "fas fa-reply" }),
                    createTextVNode(" Reply")
                  ], 8, ["onClick"])
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
const Post_vue_vue_type_style_index_0_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Forum/Post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
