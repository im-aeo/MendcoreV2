import { defineComponent, computed, resolveComponent, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { _ as _sfc_main$2 } from "./Footer-b7f961b4.mjs";
import VLazyImage from "v-lazy-image";
import { usePage } from "@inertiajs/vue3";
import { route } from "momentum-trail";
import { _ as _export_sfc } from "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    UserCount: { type: Number, default: "0" }
  },
  setup(__props) {
    const site = computed(() => usePage().props.site);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="masthead-landing bg-info" data-v-743e0f74${_scopeId}><div class="cell" data-v-743e0f74${_scopeId}><div class="justify-center row-landing align-center" data-v-743e0f74${_scopeId}><div class="row-landing justify-content-center" data-v-743e0f74${_scopeId}><div class="col-xl-12-landing" data-v-743e0f74${_scopeId}><div class="text-center text-white" data-v-743e0f74${_scopeId}><h1 class="mb-5" data-v-743e0f74${_scopeId}>`);
            _push2(ssrRenderComponent(unref(VLazyImage), {
              src: site.value.logo,
              width: "512"
            }, null, _parent2, _scopeId));
            _push2(`</h1><h3 class="mt-3 fw-semibold" data-v-743e0f74${_scopeId}>Join in on the action today. Buy &amp; sell items, participate in groups, make friends, and more.</h3><h4 class="fw-semibold" data-v-743e0f74${_scopeId}>Join <strong data-v-743e0f74${_scopeId}>${ssrInterpolate(__props.UserCount)}</strong> ${ssrInterpolate(__props.UserCount != "1" ? "users" : "user")} today!</h4></div></div></div></div></div></header><div class="container site-landing grid-x" data-v-743e0f74${_scopeId}><div data-v-743e0f74${_scopeId}><div class="row-landing" id="YASQUEEN" data-v-743e0f74${_scopeId}><div class="col-md-6-landing" data-v-743e0f74${_scopeId}><div class="card" data-v-743e0f74${_scopeId}><div class="card-body" data-v-743e0f74${_scopeId}><div class="row-landing align-items-center-landing" data-v-743e0f74${_scopeId}><div class="text-center col-md-3-landing text-center-sm" data-v-743e0f74${_scopeId}><i class="fas fa-user-hard-hat text-info hide-sm-landing" style="${ssrRenderStyle({ "font-size": "90px" })}" data-v-743e0f74${_scopeId}></i><i class="mb-2 fas fa-user-hard-hat text-info show-sm-only-landing" style="${ssrRenderStyle({ "font-size": "80px" })}" data-v-743e0f74${_scopeId}></i></div><div class="col-md-9-landing" data-v-743e0f74${_scopeId}><div class="landing-text-landing-landing fw-semibold" data-v-743e0f74${_scopeId}>Customize Your Character</div><div data-v-743e0f74${_scopeId}>Pick and choose from a collection of items created by the community to create your own unique character with.</div></div></div></div></div></div><div class="col-md-6-landing" data-v-743e0f74${_scopeId}><div class="card" data-v-743e0f74${_scopeId}><div class="card-body" data-v-743e0f74${_scopeId}><div class="row-landing align-items-center-landing" data-v-743e0f74${_scopeId}><div class="text-center col-md-3-landing text-center-sm show-sm-only-landing" data-v-743e0f74${_scopeId}><i class="mb-2 fas fa-users text-success" style="${ssrRenderStyle({ "font-size": "80px" })}" data-v-743e0f74${_scopeId}></i></div><div class="text-right col-md-8-landing" data-v-743e0f74${_scopeId}><div class="landing-text-landing fw-semibold" data-v-743e0f74${_scopeId}>Meet New Friends</div><div data-v-743e0f74${_scopeId}>On ${ssrInterpolate(site.value.name)}, finding and adding friends is only two steps away, simply find a user and add them. It&#39;s that simple!</div></div><div class="text-center col-md-4-landing text-center-sm hide-sm-landing" data-v-743e0f74${_scopeId}><i class="fas fa-users text-success" style="${ssrRenderStyle({ "font-size": "90px" })}" data-v-743e0f74${_scopeId}></i></div></div></div></div></div><div class="col-md-6-landing" data-v-743e0f74${_scopeId}><div class="card" data-v-743e0f74${_scopeId}><div class="card-body" data-v-743e0f74${_scopeId}><div class="row-landing align-items-center-landing" data-v-743e0f74${_scopeId}><div class="text-center col-md-3-landing text-center-sm" data-v-743e0f74${_scopeId}><i class="fas fa-tools text-danger hide-sm-landing" style="${ssrRenderStyle({ "font-size": "90px" })}" data-v-743e0f74${_scopeId}></i><i class="mb-2 fas fa-tools text-danger show-sm-only-landing" style="${ssrRenderStyle({ "font-size": "80px" })}" data-v-743e0f74${_scopeId}></i></div><div class="col-md-9-landing" data-v-743e0f74${_scopeId}><div class="landing-text-landing fw-semibold" data-v-743e0f74${_scopeId}>Create Your Own Assets</div><div data-v-743e0f74${_scopeId}>Unleash your inner entrepreneur by creating and marketing your own items, groups, games and more.</div></div></div></div></div></div><div class="col-md-6-landing" data-v-743e0f74${_scopeId}><div class="card" data-v-743e0f74${_scopeId}><div class="card-body" data-v-743e0f74${_scopeId}><div class="row-landing align-items-center-landing" data-v-743e0f74${_scopeId}><div class="text-center col-md-3-landing text-center-sm show-sm-only-landing" data-v-743e0f74${_scopeId}><i class="mb-2 fas fa-comments-alt text-warning" style="${ssrRenderStyle({ "font-size": "80px" })}" data-v-743e0f74${_scopeId}></i></div><div class="text-right col-md-8-landing" data-v-743e0f74${_scopeId}><div class="landing-text-landing fw-semibold" data-v-743e0f74${_scopeId}>Socialize With Others</div><div data-v-743e0f74${_scopeId}>Head over to Discussion to socialize with all kinds of users on ${ssrInterpolate(site.value.name)}, from the funny to the professional, and find new friends!</div></div><div class="text-center col-md-4-landing text-center-sm hide-sm-landing" data-v-743e0f74${_scopeId}><i class="fas fa-comments-alt text-warning" style="${ssrRenderStyle({ "font-size": "90px" })}" data-v-743e0f74${_scopeId}></i></div></div></div></div></div></div></div></div><div class="justify-center text-center card card-body align-center reg-card" data-v-743e0f74${_scopeId}><div class="col-md-8 align-center text-center-sm" data-v-743e0f74${_scopeId}><h3 data-v-743e0f74${_scopeId}>What are you wating for?</h3><p data-v-743e0f74${_scopeId}>Register to ${ssrInterpolate(site.value.name)} below.</p><div class="min-w-0 gap-1 mt-3 flex-container align-center" data-v-743e0f74${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: unref(route)("auth.login.page"),
              class: "gap-2 btn btn-warning"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="mr-1 fas fa-key" data-v-743e0f74${_scopeId2}></i> Login`);
                } else {
                  return [
                    createVNode("i", { class: "mr-1 fas fa-key" }),
                    createTextVNode(" Login")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              href: unref(route)("auth.register.page"),
              class: "gap-2 btn btn-success"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="mr-1 fas fa-user-plus" data-v-743e0f74${_scopeId2}></i> Register`);
                } else {
                  return [
                    createVNode("i", { class: "mr-1 fas fa-user-plus" }),
                    createTextVNode(" Register")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("header", { class: "masthead-landing bg-info" }, [
                createVNode("div", { class: "cell" }, [
                  createVNode("div", { class: "justify-center row-landing align-center" }, [
                    createVNode("div", { class: "row-landing justify-content-center" }, [
                      createVNode("div", { class: "col-xl-12-landing" }, [
                        createVNode("div", { class: "text-center text-white" }, [
                          createVNode("h1", { class: "mb-5" }, [
                            createVNode(unref(VLazyImage), {
                              src: site.value.logo,
                              width: "512"
                            }, null, 8, ["src"])
                          ]),
                          createVNode("h3", { class: "mt-3 fw-semibold" }, "Join in on the action today. Buy & sell items, participate in groups, make friends, and more."),
                          createVNode("h4", { class: "fw-semibold" }, [
                            createTextVNode("Join "),
                            createVNode("strong", null, toDisplayString(__props.UserCount), 1),
                            createTextVNode(" " + toDisplayString(__props.UserCount != "1" ? "users" : "user") + " today!", 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "container site-landing grid-x" }, [
                createVNode("div", null, [
                  createVNode("div", {
                    class: "row-landing",
                    id: "YASQUEEN"
                  }, [
                    createVNode("div", { class: "col-md-6-landing" }, [
                      createVNode("div", { class: "card" }, [
                        createVNode("div", { class: "card-body" }, [
                          createVNode("div", { class: "row-landing align-items-center-landing" }, [
                            createVNode("div", { class: "text-center col-md-3-landing text-center-sm" }, [
                              createVNode("i", {
                                class: "fas fa-user-hard-hat text-info hide-sm-landing",
                                style: { "font-size": "90px" }
                              }),
                              createVNode("i", {
                                class: "mb-2 fas fa-user-hard-hat text-info show-sm-only-landing",
                                style: { "font-size": "80px" }
                              })
                            ]),
                            createVNode("div", { class: "col-md-9-landing" }, [
                              createVNode("div", { class: "landing-text-landing-landing fw-semibold" }, "Customize Your Character"),
                              createVNode("div", null, "Pick and choose from a collection of items created by the community to create your own unique character with.")
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-md-6-landing" }, [
                      createVNode("div", { class: "card" }, [
                        createVNode("div", { class: "card-body" }, [
                          createVNode("div", { class: "row-landing align-items-center-landing" }, [
                            createVNode("div", { class: "text-center col-md-3-landing text-center-sm show-sm-only-landing" }, [
                              createVNode("i", {
                                class: "mb-2 fas fa-users text-success",
                                style: { "font-size": "80px" }
                              })
                            ]),
                            createVNode("div", { class: "text-right col-md-8-landing" }, [
                              createVNode("div", { class: "landing-text-landing fw-semibold" }, "Meet New Friends"),
                              createVNode("div", null, "On " + toDisplayString(site.value.name) + ", finding and adding friends is only two steps away, simply find a user and add them. It's that simple!", 1)
                            ]),
                            createVNode("div", { class: "text-center col-md-4-landing text-center-sm hide-sm-landing" }, [
                              createVNode("i", {
                                class: "fas fa-users text-success",
                                style: { "font-size": "90px" }
                              })
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-md-6-landing" }, [
                      createVNode("div", { class: "card" }, [
                        createVNode("div", { class: "card-body" }, [
                          createVNode("div", { class: "row-landing align-items-center-landing" }, [
                            createVNode("div", { class: "text-center col-md-3-landing text-center-sm" }, [
                              createVNode("i", {
                                class: "fas fa-tools text-danger hide-sm-landing",
                                style: { "font-size": "90px" }
                              }),
                              createVNode("i", {
                                class: "mb-2 fas fa-tools text-danger show-sm-only-landing",
                                style: { "font-size": "80px" }
                              })
                            ]),
                            createVNode("div", { class: "col-md-9-landing" }, [
                              createVNode("div", { class: "landing-text-landing fw-semibold" }, "Create Your Own Assets"),
                              createVNode("div", null, "Unleash your inner entrepreneur by creating and marketing your own items, groups, games and more.")
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-md-6-landing" }, [
                      createVNode("div", { class: "card" }, [
                        createVNode("div", { class: "card-body" }, [
                          createVNode("div", { class: "row-landing align-items-center-landing" }, [
                            createVNode("div", { class: "text-center col-md-3-landing text-center-sm show-sm-only-landing" }, [
                              createVNode("i", {
                                class: "mb-2 fas fa-comments-alt text-warning",
                                style: { "font-size": "80px" }
                              })
                            ]),
                            createVNode("div", { class: "text-right col-md-8-landing" }, [
                              createVNode("div", { class: "landing-text-landing fw-semibold" }, "Socialize With Others"),
                              createVNode("div", null, "Head over to Discussion to socialize with all kinds of users on " + toDisplayString(site.value.name) + ", from the funny to the professional, and find new friends!", 1)
                            ]),
                            createVNode("div", { class: "text-center col-md-4-landing text-center-sm hide-sm-landing" }, [
                              createVNode("i", {
                                class: "fas fa-comments-alt text-warning",
                                style: { "font-size": "90px" }
                              })
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "justify-center text-center card card-body align-center reg-card" }, [
                createVNode("div", { class: "col-md-8 align-center text-center-sm" }, [
                  createVNode("h3", null, "What are you wating for?"),
                  createVNode("p", null, "Register to " + toDisplayString(site.value.name) + " below.", 1),
                  createVNode("div", { class: "min-w-0 gap-1 mt-3 flex-container align-center" }, [
                    createVNode(_component_Link, {
                      href: unref(route)("auth.login.page"),
                      class: "gap-2 btn btn-warning"
                    }, {
                      default: withCtx(() => [
                        createVNode("i", { class: "mr-1 fas fa-key" }),
                        createTextVNode(" Login")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(_component_Link, {
                      href: unref(route)("auth.register.page"),
                      class: "gap-2 btn btn-success"
                    }, {
                      default: withCtx(() => [
                        createVNode("i", { class: "mr-1 fas fa-user-plus" }),
                        createTextVNode(" Register")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const landing_css_vue_type_style_index_0_src_743e0f74_scoped_743e0f74_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Welcome = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-743e0f74"]]);
export {
  Welcome as default
};
