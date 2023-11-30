import { defineComponent, onMounted, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import axios from "axios";
import { route } from "momentum-trail";
import { useForm, usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$1 } from "./AppHead-8e83a103.mjs";
import { _ as _sfc_main$3 } from "./Footer-b7f961b4.mjs";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
import "dayjs";
const __default__ = {
  methods: {
    extractImageUrl(imageString) {
      const regex = /src="(.*?)"/;
      const matches = regex.exec(imageString);
      if (matches && matches.length > 1) {
        return matches[1];
      }
      return "";
    },
    getStatusList(page) {
      var vm = this;
      var pageUrl = page ? `/my/dashboard?page=${page}` : "/my/dashboard";
      axios.get(pageUrl).then(function(response) {
        if (response.data.hasOwnProperty("success")) {
          vm.users = response.data.users;
          vm.tags = response.data.users.data;
        }
      }).catch(function(error) {
        console.log(error);
      });
    }
  },
  props: {
    slist: Object,
    News: Array
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Page",
  __ssrInlineRender: true,
  props: {
    slist: { type: Object },
    News: { type: Array }
  },
  setup(__props) {
    useForm({
      message: ""
    });
    const getNewsList = () => {
      var rsspapi = route(`api.rss`);
      axios.get(rsspapi).then(function(response) {
        if (response.data.hasOwnProperty("success")) {
          usePage().props.News = response.data.News;
        }
      }).catch(function(error) {
        console.log(error);
      });
    };
    onMounted(() => {
      getNewsList();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        pageTitle: "Dashboard",
        description: "Login to Vestora.",
        url: unref(route)("auth.login.page")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="container"${_scopeId}><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-3"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}>Staff Panel</div><ul class="tabs flex-dir-column"${_scopeId}><li class="tab-item"${_scopeId}><a href="#" class="tab-link active squish"${_scopeId}>Staff Information</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Reviews</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Security</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Logs</a></li></ul></div><div class="cell medium-8"${_scopeId}><div class="mb-3 text-center alert alert-success fw-semibold"${_scopeId}> Header Box Successfully Changed </div><div class="mb-1 text-xl fw-semibold"${_scopeId}>Staff</div><div class="section-borderless"${_scopeId}><div class="card card-body"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}> Staff Information </div><div class="section-borderless"${_scopeId}><div class="grid-x grid-margin-x"${_scopeId}><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify h-100"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Users Registered </div><div class="text-truncate fw-semibold"${_scopeId}> 2 </div></div></div></div><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Staff Members </div><div class="text-truncate fw-semibold"${_scopeId}> 8 </div></div><button class="btn btn-info btn-circle" data-toggle-modal="#staff-change"${_scopeId}><i class="fas fa-pencil"${_scopeId}></i></button></div></div><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Users Emails<span style="${ssrRenderStyle({ "font-size": "10px" })}" class="text-success ms-2"${_scopeId}><i class="fas fa-check me-1"${_scopeId}></i>Verified</span></div><div class="text-truncate fw-semibold"${_scopeId}> 3 </div></div></div></div><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Website Stats for Nerds </div><div class="text-truncate fw-semibold"${_scopeId}> Created: 31/08/2023 </div><div class="text-xs fw-semibold text-muted"${_scopeId}> Website version - <span style="${ssrRenderStyle({ "font-size": "10px" })}" class="text-info ms-2"${_scopeId}><i class="fas fa-bolt me-1"${_scopeId}></i>69.420 AdonisJs</span><br${_scopeId}> Up time - <span style="${ssrRenderStyle({ "font-size": "10px" })}" class="text-success ms-2"${_scopeId}><i class="fas fa-clock me-1"${_scopeId}></i>6 minutes</span><br${_scopeId}> Website Name - <span style="${ssrRenderStyle({ "font-size": "10px" })}" class="text-info ms-2"${_scopeId}><i class="fas fa-hashtag me-1"${_scopeId}></i>Vextoria</span><br${_scopeId}> API up time - <span style="${ssrRenderStyle({ "font-size": "10px" })}" class="text-success ms-2"${_scopeId}><i class="fas fa-clock me-1"${_scopeId}></i>6 minutes</span><br${_scopeId}> Client Servers - <span style="${ssrRenderStyle({ "font-size": "10px" })}" class="text-success ms-2"${_scopeId}><i class="fa fa-circle-check me-1"${_scopeId}></i>Responsive</span></div></div></div></div></div><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Header Box Announcements </div><div class="gap-2 align-middle flex-container"${_scopeId}><input type="text" class="form form-sm btn-sm" value="Write it here..."${_scopeId}><input type="submit" class="btn btn-success btn-sm" value="Update"${_scopeId}></div></div></div></div><div class="section-borderless"${_scopeId}><div class="card card-body"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}> Website Holiday Themes </div><div class="grid-x grid-margin-x"${_scopeId}><div class="cell large-6"${_scopeId}><div class="mb-2 theme-selection squish card card-body card-inner mb-lg-0" data-theme="easter"${_scopeId}><div class="gap-4 align-middle flex-container"${_scopeId}><div class="selection-circle flex-child-grow show-for-large"${_scopeId}></div><div class="gap-1 align-middle flex-container flex-dir-column" style="${ssrRenderStyle({ "min-width": "0" })}"${_scopeId}><div class="theme-circle light"${_scopeId}></div><div class="text-lg fw-semibold text-truncate"${_scopeId}> Easter Theme </div><div class="selection-circle flex-child-grow show-for-small hide-for-large"${_scopeId}></div></div></div></div></div><div class="cell large-6"${_scopeId}><div class="theme-selection squish card card-body card-inner" data-theme="Halloween"${_scopeId}><div class="gap-4 align-middle flex-container"${_scopeId}><div class="selection-circle flex-child-grow show-for-large"${_scopeId}></div><div class="gap-1 align-middle flex-container flex-dir-column"${_scopeId}><div class="theme-circle dark"${_scopeId}></div><div class="text-lg fw-semibold text-truncate"${_scopeId}> Halloween Theme </div><div class="selection-circle flex-child-grow show-for-small hide-for-large"${_scopeId}></div></div></div></div></div><br${_scopeId}><div class="cell large-6"${_scopeId}><div class="mb-2 theme-selection squish card card-body card-inner mb-lg-0" data-theme="christmas"${_scopeId}><div class="gap-4 align-middle flex-container"${_scopeId}><div class="selection-circle flex-child-grow show-for-large"${_scopeId}></div><div class="gap-1 align-middle flex-container flex-dir-column" style="${ssrRenderStyle({ "min-width": "0" })}"${_scopeId}><div class="theme-circle dark"${_scopeId}></div><div class="text-lg fw-semibold text-truncate"${_scopeId}> Christmas Theme </div><div class="selection-circle flex-child-grow show-for-small hide-for-large"${_scopeId}></div></div></div></div></div></div></div></div></div></div></main>`);
          } else {
            return [
              createVNode("main", { class: "container" }, [
                createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                  createVNode("div", { class: "cell medium-3" }, [
                    createVNode("div", { class: "mb-2 text-xl fw-semibold" }, "Staff Panel"),
                    createVNode("ul", { class: "tabs flex-dir-column" }, [
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link active squish"
                        }, "Staff Information")
                      ]),
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link squish"
                        }, "Reviews")
                      ]),
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link squish"
                        }, "Security")
                      ]),
                      createVNode("li", { class: "tab-item" }, [
                        createVNode("a", {
                          href: "#",
                          class: "tab-link squish"
                        }, "Logs")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "cell medium-8" }, [
                    createVNode("div", { class: "mb-3 text-center alert alert-success fw-semibold" }, " Header Box Successfully Changed "),
                    createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "Staff"),
                    createVNode("div", { class: "section-borderless" }, [
                      createVNode("div", { class: "card card-body" }, [
                        createVNode("div", { class: "mb-2 text-xl fw-semibold" }, " Staff Information "),
                        createVNode("div", { class: "section-borderless" }, [
                          createVNode("div", { class: "grid-x grid-margin-x" }, [
                            createVNode("div", { class: "mb-3 cell medium-6" }, [
                              createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify h-100" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, " Users Registered "),
                                  createVNode("div", { class: "text-truncate fw-semibold" }, " 2 ")
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mb-3 cell medium-6" }, [
                              createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, " Staff Members "),
                                  createVNode("div", { class: "text-truncate fw-semibold" }, " 8 ")
                                ]),
                                createVNode("button", {
                                  class: "btn btn-info btn-circle",
                                  "data-toggle-modal": "#staff-change"
                                }, [
                                  createVNode("i", { class: "fas fa-pencil" })
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mb-3 cell medium-6" }, [
                              createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, [
                                    createTextVNode(" Users Emails"),
                                    createVNode("span", {
                                      style: { "font-size": "10px" },
                                      class: "text-success ms-2"
                                    }, [
                                      createVNode("i", { class: "fas fa-check me-1" }),
                                      createTextVNode("Verified")
                                    ])
                                  ]),
                                  createVNode("div", { class: "text-truncate fw-semibold" }, " 3 ")
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mb-3 cell medium-6" }, [
                              createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, " Website Stats for Nerds "),
                                  createVNode("div", { class: "text-truncate fw-semibold" }, " Created: 31/08/2023 "),
                                  createVNode("div", { class: "text-xs fw-semibold text-muted" }, [
                                    createTextVNode(" Website version - "),
                                    createVNode("span", {
                                      style: { "font-size": "10px" },
                                      class: "text-info ms-2"
                                    }, [
                                      createVNode("i", { class: "fas fa-bolt me-1" }),
                                      createTextVNode("69.420 AdonisJs")
                                    ]),
                                    createVNode("br"),
                                    createTextVNode(" Up time - "),
                                    createVNode("span", {
                                      style: { "font-size": "10px" },
                                      class: "text-success ms-2"
                                    }, [
                                      createVNode("i", { class: "fas fa-clock me-1" }),
                                      createTextVNode("6 minutes")
                                    ]),
                                    createVNode("br"),
                                    createTextVNode(" Website Name - "),
                                    createVNode("span", {
                                      style: { "font-size": "10px" },
                                      class: "text-info ms-2"
                                    }, [
                                      createVNode("i", { class: "fas fa-hashtag me-1" }),
                                      createTextVNode("Vextoria")
                                    ]),
                                    createVNode("br"),
                                    createTextVNode(" API up time - "),
                                    createVNode("span", {
                                      style: { "font-size": "10px" },
                                      class: "text-success ms-2"
                                    }, [
                                      createVNode("i", { class: "fas fa-clock me-1" }),
                                      createTextVNode("6 minutes")
                                    ]),
                                    createVNode("br"),
                                    createTextVNode(" Client Servers - "),
                                    createVNode("span", {
                                      style: { "font-size": "10px" },
                                      class: "text-success ms-2"
                                    }, [
                                      createVNode("i", { class: "fa fa-circle-check me-1" }),
                                      createTextVNode("Responsive")
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Header Box Announcements "),
                          createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                            createVNode("input", {
                              type: "text",
                              class: "form form-sm btn-sm",
                              value: "Write it here..."
                            }),
                            createVNode("input", {
                              type: "submit",
                              class: "btn btn-success btn-sm",
                              value: "Update"
                            })
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "section-borderless" }, [
                      createVNode("div", { class: "card card-body" }, [
                        createVNode("div", { class: "mb-2 text-xl fw-semibold" }, " Website Holiday Themes "),
                        createVNode("div", { class: "grid-x grid-margin-x" }, [
                          createVNode("div", { class: "cell large-6" }, [
                            createVNode("div", {
                              class: "mb-2 theme-selection squish card card-body card-inner mb-lg-0",
                              "data-theme": "easter"
                            }, [
                              createVNode("div", { class: "gap-4 align-middle flex-container" }, [
                                createVNode("div", { class: "selection-circle flex-child-grow show-for-large" }),
                                createVNode("div", {
                                  class: "gap-1 align-middle flex-container flex-dir-column",
                                  style: { "min-width": "0" }
                                }, [
                                  createVNode("div", { class: "theme-circle light" }),
                                  createVNode("div", { class: "text-lg fw-semibold text-truncate" }, " Easter Theme "),
                                  createVNode("div", { class: "selection-circle flex-child-grow show-for-small hide-for-large" })
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "cell large-6" }, [
                            createVNode("div", {
                              class: "theme-selection squish card card-body card-inner",
                              "data-theme": "Halloween"
                            }, [
                              createVNode("div", { class: "gap-4 align-middle flex-container" }, [
                                createVNode("div", { class: "selection-circle flex-child-grow show-for-large" }),
                                createVNode("div", { class: "gap-1 align-middle flex-container flex-dir-column" }, [
                                  createVNode("div", { class: "theme-circle dark" }),
                                  createVNode("div", { class: "text-lg fw-semibold text-truncate" }, " Halloween Theme "),
                                  createVNode("div", { class: "selection-circle flex-child-grow show-for-small hide-for-large" })
                                ])
                              ])
                            ])
                          ]),
                          createVNode("br"),
                          createVNode("div", { class: "cell large-6" }, [
                            createVNode("div", {
                              class: "mb-2 theme-selection squish card card-body card-inner mb-lg-0",
                              "data-theme": "christmas"
                            }, [
                              createVNode("div", { class: "gap-4 align-middle flex-container" }, [
                                createVNode("div", { class: "selection-circle flex-child-grow show-for-large" }),
                                createVNode("div", {
                                  class: "gap-1 align-middle flex-container flex-dir-column",
                                  style: { "min-width": "0" }
                                }, [
                                  createVNode("div", { class: "theme-circle dark" }),
                                  createVNode("div", { class: "text-lg fw-semibold text-truncate" }, " Christmas Theme "),
                                  createVNode("div", { class: "selection-circle flex-child-grow show-for-small hide-for-large" })
                                ])
                              ])
                            ])
                          ])
                        ])
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
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
