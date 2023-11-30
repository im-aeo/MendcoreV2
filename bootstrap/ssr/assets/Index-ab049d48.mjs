import { defineComponent, resolveComponent, unref, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, createVNode, useSSRContext, Fragment, renderList } from "vue";
import { ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { usePage, useForm } from "@inertiajs/vue3";
import { route, current } from "momentum-trail";
import { _ as _sfc_main$4 } from "./Footer-b7f961b4.mjs";
import { _ as _sfc_main$2 } from "./AppHead-8e83a103.mjs";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
import "dayjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ForumSidebar",
  __ssrInlineRender: true,
  props: [
    "topic",
    "section_one",
    "section_two",
    "section_three"
  ],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><div class="mb-2 text-xl fw-semibold">Forum</div>`);
      if (unref(usePage)().props.auth.user && unref(usePage)().props.auth.user.staff != false) {
        _push(`<button class="mb-2 btn btn-danger btn-xs btn-block forum-button"> New Post </button>`);
      } else if (unref(usePage)().props.auth.user && unref(usePage)().props.auth.user.staff != true && __props.topic.is_staff_only_posting == "0") {
        _push(`<button class="mb-2 btn btn-success btn-xs btn-block forum-button"> New Post </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="divider w-100"></div><ul class="tabs flex-dir-column"><button class="mb-2 btn btn-danger btn-xs btn-block btn-no-anim forum-button mt-2"><i class="fa-solid fa-megaphone fa-xs"></i> Official </button><!--[-->`);
      ssrRenderList(__props.section_one, (Official) => {
        _push(`<li class="tab-item">`);
        _push(ssrRenderComponent(_component_Link, {
          href: unref(route)("forum.page", { id: Official.id }),
          class: ["tab-link squish", [unref(current)("forum.page", Official.id) ? "active" : ""]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (Official.is_staff_only_posting == "1") {
                _push2(`<i class="fas fa-lock"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(Official.name)} <div class="text-xs"${_scopeId}>${ssrInterpolate(Official.description)}</div>`);
            } else {
              return [
                Official.is_staff_only_posting == "1" ? (openBlock(), createBlock("i", {
                  key: 0,
                  class: "fas fa-lock"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(Official.name) + " ", 1),
                createVNode("div", { class: "text-xs" }, toDisplayString(Official.description), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--><button class="mb-2 btn btn-warning btn-xs btn-block btn-no-anim forum-button mt-2"><i class="fa-solid fa-party-horn fa-xs"></i> Community </button><!--[-->`);
      ssrRenderList(__props.section_two, (Community) => {
        _push(`<li class="tab-item">`);
        _push(ssrRenderComponent(_component_Link, {
          href: unref(route)("forum.page", { id: Community.id }),
          class: ["tab-link squish", [unref(current)("forum.page", Community.id) ? "active" : ""]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(Community.name)} <div class="text-xs"${_scopeId}>${ssrInterpolate(Community.description)}</div>`);
            } else {
              return [
                createTextVNode(toDisplayString(Community.name) + " ", 1),
                createVNode("div", { class: "text-xs" }, toDisplayString(Community.description), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--><button class="mb-2 btn btn-info btn-xs btn-block btn-no-anim forum-button mt-2"><i class="fa-solid fa-triangle-exclamation fa-xs"></i> Serious </button><!--[-->`);
      ssrRenderList(__props.section_three, (Serious) => {
        _push(`<li class="tab-item">`);
        _push(ssrRenderComponent(_component_Link, {
          href: unref(route)("forum.page", { id: Serious.id }),
          class: ["tab-link squish", [unref(current)("forum.page", Serious.id) ? "active" : ""]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(Serious.name)} <div class="text-xs"${_scopeId}>${ssrInterpolate(Serious.description)}</div>`);
            } else {
              return [
                createTextVNode(toDisplayString(Serious.name) + " ", 1),
                createVNode("div", { class: "text-xs" }, toDisplayString(Serious.description), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LayoutParts/ForumSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __default__ = {
  props: {
    topic: Object,
    posts: Object,
    section_one: Object,
    section_two: Object,
    section_three: Object
  },
  methods: {
    getCurrentpath(id) {
      if (route("forum.page", { id }) === window.location.href) {
        return window.location.pathname;
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    posts: { type: Object },
    section_one: { type: Object },
    section_two: { type: Object },
    section_three: { type: Object },
    topic: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const form = useForm({
      title: "",
      body: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        pageTitle: "Discuss",
        description: "Here, You can discuss with the community surrounding several topics on " + unref(usePage)().props.site.name + ".",
        url: unref(route)("forum.page", { id: __props.topic.id })
      }, null, _parent));
      _push(`<div class="modal" id="forum-modal"><div class="modal-card modal-card-body modal-card-sm"><div class="section-borderless"><div class="gap-2 align-middle flex-container align-justify"><div class="text-lg fw-semibold">New Post</div><button class="btn-circle" data-toggle-modal="#forum-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"><i class="fas fa-times"></i></button></div></div><div class="section-borderless"><div class="mb-2"><div class="text-xs fw-bold text-muted text-uppercase"> Post Title </div><input type="text" class="form" name="title"${ssrRenderAttr("value", unref(form).title)} placeholder="Title..."></div><div class="mb-2"><div class="text-xs fw-bold text-muted text-uppercase"> Post Body </div><textarea id="post-body" class="mb-2 form" name="body" placeholder="Body" maxlength="4096">${ssrInterpolate(unref(form).body)}</textarea></div></div><div class="flex-wrap gap-2 flex-container justify-content-end section-borderless"><form><button class="btn btn-secondary"> Cancel </button><input type="submit" class="btn btn-success"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${ssrRenderAttr("value", "Post in " + __props.topic.name)}></form></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell medium-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              topic: __props.topic,
              section_one: __props.section_one,
              section_two: __props.section_two,
              section_three: __props.section_three
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="cell medium-8"${_scopeId}><div class="mb-2 text-sm fw-semibold"${_scopeId}>${ssrInterpolate(__props.topic.name)} • ${ssrInterpolate(__props.topic.description)}</div><div class="card"${_scopeId}><div class="pb-0 card-body"${_scopeId}>`);
            if (!__props.posts.data.length) {
              _push2(`<div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-message-xmark text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Forum Posts </div><div class="text-muted fw-semibold"${_scopeId}><p class="text-xs"${_scopeId}>There are currently no posts in this category.</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.posts.data, (post) => {
              _push2(`<div class="mb-3 row thread"${_scopeId}><div class="mx-1 my-3 divider"${_scopeId}></div><div class="gap-2 align-middle flex-container"${_scopeId}><a${ssrRenderAttr("href", unref(route)("user.profile", { username: post.username }))}${_scopeId}><img${ssrRenderAttr("src", post.headshot)} style="${ssrRenderStyle({ "max-width": "65px" })}" class="border img-fluid headshot rounded-circle border-secondary bg-dark" alt="2oddMacs1"${_scopeId}></a><div class="flex-wrap col-md-4 d-flex justify-content-center align-content-start" style="${ssrRenderStyle({ "flex-direction": "column" })}"${_scopeId}><div class="text-start"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: unref(route)("forum.post", { id: post.id, slug: post.seo }),
                class: "text-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(post.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(post.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div${_scopeId}></div>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: unref(route)("user.profile", { username: post.username }),
                class: "text-sm fw-semibold text-body"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(post.display_name)} • ${ssrInterpolate(post.DateHum)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(post.display_name) + " • " + toDisplayString(post.DateHum), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="text-xs text-muted fw-semibold text-body"${_scopeId}> @${ssrInterpolate(post.username)}</div></div></div></div></div>`);
            });
            _push2(`<!--]--><div class="mx-1 my-3 divider"${_scopeId}></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "cell medium-4" }, [
                createVNode(_sfc_main$1, {
                  topic: __props.topic,
                  section_one: __props.section_one,
                  section_two: __props.section_two,
                  section_three: __props.section_three
                }, null, 8, ["topic", "section_one", "section_two", "section_three"])
              ]),
              createVNode("div", { class: "cell medium-8" }, [
                createVNode("div", { class: "mb-2 text-sm fw-semibold" }, toDisplayString(__props.topic.name) + " • " + toDisplayString(__props.topic.description), 1),
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "pb-0 card-body" }, [
                    !__props.posts.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "gap-3 text-center flex-container flex-dir-column"
                    }, [
                      createVNode("i", { class: "text-5xl fas fa-message-xmark text-muted" }),
                      createVNode("div", { style: { "line-height": "16px" } }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Forum Posts "),
                        createVNode("div", { class: "text-muted fw-semibold" }, [
                          createVNode("p", { class: "text-xs" }, "There are currently no posts in this category.")
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.posts.data, (post) => {
                      return openBlock(), createBlock("div", { class: "mb-3 row thread" }, [
                        createVNode("div", { class: "mx-1 my-3 divider" }),
                        createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                          createVNode("a", {
                            href: unref(route)("user.profile", { username: post.username })
                          }, [
                            createVNode("img", {
                              src: post.headshot,
                              style: { "max-width": "65px" },
                              class: "border img-fluid headshot rounded-circle border-secondary bg-dark",
                              alt: "2oddMacs1"
                            }, null, 8, ["src"])
                          ], 8, ["href"]),
                          createVNode("div", {
                            class: "flex-wrap col-md-4 d-flex justify-content-center align-content-start",
                            style: { "flex-direction": "column" }
                          }, [
                            createVNode("div", { class: "text-start" }, [
                              createVNode(_component_Link, {
                                href: unref(route)("forum.post", { id: post.id, slug: post.seo }),
                                class: "text-md"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(post.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("div"),
                              createVNode(_component_Link, {
                                href: unref(route)("user.profile", { username: post.username }),
                                class: "text-sm fw-semibold text-body"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(post.display_name) + " • " + toDisplayString(post.DateHum), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("div", { class: "text-xs text-muted fw-semibold text-body" }, " @" + toDisplayString(post.username), 1)
                            ])
                          ])
                        ])
                      ]);
                    }), 256)),
                    createVNode("div", { class: "mx-1 my-3 divider" })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Forum/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
