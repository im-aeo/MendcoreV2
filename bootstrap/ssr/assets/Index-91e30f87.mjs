import { mergeProps, useSSRContext, defineComponent, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Navbar-27c1e422.mjs";
import { _ as _sfc_main$3 } from "./Footer-b7f961b4.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { route } from "momentum-trail";
import axios from "axios";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.mjs";
import "v-lazy-image";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const _sfc_main$1 = {
  props: {
    currentPage: Number,
    totalPages: Number
  },
  computed: {
    pages() {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      const pageNumbers = [];
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
  },
  methods: {
    changePage(page) {
      if (this.currentPage !== page) {
        this.$emit("page-change", page);
      }
    },
    prevPage() {
      this.changePage(this.currentPage - 1);
    },
    nextPage() {
      this.changePage(this.currentPage + 1);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({ "aria-label": "Page navigation" }, _attrs))}><ul class="pagination justify-content-center"><li class="${ssrRenderClass([{ disabled: $props.currentPage === 1 }, "page-item"])}"><a class="page-link" aria-label="First"><span aria-hidden="true">««</span></a></li><li class="${ssrRenderClass([{ disabled: $props.currentPage === 1 }, "page-item"])}"><a class="page-link" aria-label="Previous"><span aria-hidden="true">«</span></a></li><!--[-->`);
  ssrRenderList($options.pages, (page) => {
    _push(`<li class="${ssrRenderClass([{ active: $props.currentPage === page }, "page-item"])}"><a class="page-link">${ssrInterpolate(page)}</a></li>`);
  });
  _push(`<!--]--><li class="${ssrRenderClass([{ disabled: $props.currentPage === $props.totalPages }, "page-item"])}"><a class="page-link" aria-label="Next"><span aria-hidden="true">»</span></a></li><li class="${ssrRenderClass([{ disabled: $props.currentPage === $props.totalPages }, "page-item"])}"><a class="page-link" aria-label="Last"><span aria-hidden="true">»»</span></a></li></ul></nav>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NewPaginator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NewPaginator = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const __default__ = {
  data() {
    return {
      currentPage: slist.current_page,
      totalPages: slist.last_page
      // Set the total number of pages
      // Your data here
    };
  },
  methods: {
    getUserList(page) {
      var vm = this;
      var pageUrl = page ? `/users/discover/?page=${page}` : "/users/discover";
      axios.get(pageUrl).then(function(response) {
        if (response.data.hasOwnProperty("success")) {
          vm.users = response.data.users;
          vm.tags = response.data.users.data;
        }
      }).catch(function(error) {
        console.log(error);
      });
    },
    async fetchUserStatus() {
      this.userstat.fetchingStatus = true;
      const cachedOnlineStatus = this.userstat.online;
      try {
        const response = await axios.get(route(`api.user.online`, { id: this.userstat.id }));
        this.userstat.online = response.data.online;
      } catch (error) {
        console.error(error);
        this.userstat.online = cachedOnlineStatus;
      } finally {
        this.userstat.fetchingStatus = false;
      }
    }
  },
  data() {
    return {
      userstat: {
        // Replace this with your actual user object
        online: false,
        id: this.users.id,
        fetchingStatus: false
      }
    };
  },
  created() {
    this.fetchUserStatus();
  },
  computed: {
    userStatus() {
      return this.userstat.online ? "Online" : "Offline";
    },
    userStatusClass() {
      return this.userstat.online ? "online" : "offline";
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: { type: Object }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell small-12"${_scopeId}><div class="mb-2 text-3xl fw-semibold align-center"${_scopeId}>Users</div><div class="grid-x align-center"${_scopeId}><!--[-->`);
            ssrRenderList(__props.users.data, (user) => {
              _push2(`<div class="${ssrRenderClass([["mb-3", "card", "card-body", "card-status", _ctx.userStatusClass], "mx-2 mb-3 row card avatar card-body"])}"${_scopeId}><div class="gap-2 align-middle flex-container"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("user.profile", { username: user.username })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", user.avatar)} style="${ssrRenderStyle({ "max-width": "65px" })}" class="border img-fluid headshot rounded-circle border-secondary bg-dark" alt="2oddMacs1"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: user.avatar,
                        style: { "max-width": "65px" },
                        class: "border img-fluid headshot rounded-circle border-secondary bg-dark",
                        alt: "2oddMacs1"
                      }, null, 8, ["src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="flex-wrap col-md-4 d-flex justify-content-center align-content-start" style="${ssrRenderStyle({ "flex-direction": "column" })}"${_scopeId}><div class="text-start"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("user.profile", { username: user.username }),
                class: "text-md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(user.dname)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(user.dname), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div${_scopeId}></div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("user.profile", { username: user.username }),
                class: "text-sm fw-semibold text-body"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate("@" + user.username)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString("@" + user.username), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div${_scopeId}></div></div></div></div><div class="mx-1 my-2 divider"${_scopeId}></div><button class="btn btn-info btn-block"${_scopeId}>Follow User</button></div>`);
            });
            _push2(`<!--]--></div><div class="mx-3 my-3 divider"${_scopeId}></div>`);
            _push2(ssrRenderComponent(NewPaginator, {
              "current-page": _ctx.currentPage,
              "total-pages": _ctx.totalPages,
              onPageChange: _ctx.getUserList
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "cell small-12" }, [
                createVNode("div", { class: "mb-2 text-3xl fw-semibold align-center" }, "Users"),
                createVNode("div", { class: "grid-x align-center" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.users.data, (user) => {
                    return openBlock(), createBlock("div", {
                      class: ["mx-2 mb-3 row card avatar card-body", ["mb-3", "card", "card-body", "card-status", _ctx.userStatusClass]],
                      key: __props.users.id
                    }, [
                      createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                        createVNode(unref(Link), {
                          href: unref(route)("user.profile", { username: user.username })
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: user.avatar,
                              style: { "max-width": "65px" },
                              class: "border img-fluid headshot rounded-circle border-secondary bg-dark",
                              alt: "2oddMacs1"
                            }, null, 8, ["src"])
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode("div", {
                          class: "flex-wrap col-md-4 d-flex justify-content-center align-content-start",
                          style: { "flex-direction": "column" }
                        }, [
                          createVNode("div", { class: "text-start" }, [
                            createVNode(unref(Link), {
                              href: unref(route)("user.profile", { username: user.username }),
                              class: "text-md"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(user.dname), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("div"),
                            createVNode(unref(Link), {
                              href: unref(route)("user.profile", { username: user.username }),
                              class: "text-sm fw-semibold text-body"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString("@" + user.username), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("div")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mx-1 my-2 divider" }),
                      createVNode("button", { class: "btn btn-info btn-block" }, "Follow User")
                    ], 2);
                  }), 128))
                ]),
                createVNode("div", { class: "mx-3 my-3 divider" }),
                createVNode(NewPaginator, {
                  "current-page": _ctx.currentPage,
                  "total-pages": _ctx.totalPages,
                  onPageChange: _ctx.getUserList
                }, null, 8, ["current-page", "total-pages", "onPageChange"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
