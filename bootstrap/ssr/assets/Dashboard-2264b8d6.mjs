import { defineComponent, mergeProps, unref, useSSRContext, resolveComponent, ref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withModifiers, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import axios from "axios";
import { route } from "momentum-trail";
import { useForm, usePage } from "@inertiajs/vue3";
import { _ as _export_sfc, A as AeoPagination } from "../ssr.mjs";
import { _ as _sfc_main$6 } from "./FlashMessages-d3b27582.mjs";
import { _ as _sfc_main$5 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$4 } from "./AppHead-8e83a103.mjs";
import { _ as _sfc_main$7 } from "./Footer-b7f961b4.mjs";
import VLazyImage from "v-lazy-image";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "dayjs";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NewsCard",
  __ssrInlineRender: true,
  props: {
    link: {},
    title: {},
    desc: {},
    creator: {},
    date: {},
    image: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))}><a${ssrRenderAttr("href", _ctx.link)} class="d-block squish">`);
      _push(ssrRenderComponent(unref(VLazyImage), {
        sizes: "(max-width: 320px) 280px, 440px",
        src: _ctx.image,
        class: "mb-2 blog-thumbnail"
      }, null, _parent));
      _push(`<div style="${ssrRenderStyle({ "line-height": "18px" })}"><div class="d-block fw-semibold text-body">${ssrInterpolate(_ctx.title)}</div><div class="text-xs text-muted fw-semibold text-truncate">${ssrInterpolate(_ctx.desc)}</div><div class="mt-1 text-xs fw-semibold text-muted">${ssrInterpolate(_ctx.creator)}<span class="mx-1">•</span>${ssrInterpolate(_ctx.date)}</div><div class="divider w-100"></div></div></a></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NewsCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StatusCard",
  __ssrInlineRender: true,
  props: {
    name: {},
    DisplayName: {},
    date: {},
    message: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gap-3 section flex-container flex-dir-column-sm" }, _attrs))}><div class="mx-auto flex-child-grow" style="${ssrRenderStyle({ "width": "100px" })}"><a href="#" class="text-sm text-center d-block squish"><img src="/assets/img/dummy_headshot.png" class="mb-1 headshot" width="60"><div style="${ssrRenderStyle({ "line-height": "16px" })}"><div class="text-truncate">${ssrInterpolate(_ctx.DisplayName)}</div><div class="text-xs text-muted text-truncate">${ssrInterpolate("@" + _ctx.name)}</div></div></a></div><div class="card card-body card-inner w-100"><div class="align-middle flex-container align-justify"><div class="w-100"><div class="text-xs text-muted"><i class="far fa-clock me-1" style="${ssrRenderStyle({ "vertical-align": "middle", "margin-top": "-2.5px", "font-size": "10px" })}"></i> Posted ${ssrInterpolate(_ctx.date)}</div><div>${ssrInterpolate(_ctx.message)}</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/StatusCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Skeletor = resolveComponent("Skeletor");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Skeletor, {
    width: "200",
    height: "130",
    class: "mb-2 blog-thumbnail"
  }, null, _parent));
  _push(`<div style="${ssrRenderStyle({ "line-height": "18px" })}"><div class="d-block fw-semibold text-body">`);
  _push(ssrRenderComponent(_component_Skeletor, { width: "80" }, null, _parent));
  _push(`</div><div class="text-xs text-muted fw-semibold text-truncate">`);
  _push(ssrRenderComponent(_component_Skeletor, { width: "40" }, null, _parent));
  _push(`</div><div class="mt-1 text-xs fw-semibold text-muted">`);
  _push(ssrRenderComponent(_component_Skeletor, { width: "80" }, null, _parent));
  _push(` <span class="mx-1">•</span>`);
  _push(ssrRenderComponent(_component_Skeletor, { width: "60" }, null, _parent));
  _push(`</div><div class="divider w-100"></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NewsCardSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NewsCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const __default__ = {
  data() {
    return {
      Feed: [],
      NewsLoading: false,
      StatusLoading: false
    };
  },
  mounted() {
    this.getFeed();
  },
  methods: {
    async getFeed() {
      try {
        this.NewsLoading = true;
        const response = await axios.get(route("api.rss"));
        this.Feed = response.data;
        this.NewsLoading = false;
      } catch (error) {
        this.NewsLoading = true;
        console.error(error);
      }
    },
    getStatusList(page) {
      var vm = this;
      var pageUrl = page ? `/my/dashboard?page=${page}` : "/my/dashboard";
      axios.get(pageUrl).then(function(response) {
        if (response.data.hasOwnProperty("success")) {
          vm.users = response.data;
        }
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    slist: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const form = useForm({
      message: ""
    });
    const props = __props;
    const slist = ref(props.slist);
    const addStatus = (status) => {
      const StatusUpdate = {
        dname: usePage().props.auth.user.display_name,
        name: usePage().props.auth.user.display_name,
        message: status,
        DateHum: "Just Now"
      };
      console.log(props.slist);
      slist.value.push(StatusUpdate);
      axios.post(route(`my.dashboard.validate`), {
        message: status
      }).then((quote) => {
        console.log("Success:", quote);
      }).catch((error) => {
        console.error("Error:", error);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$4, {
        pageTitle: "Dashboard",
        description: "Login to" + unref(usePage)().props.site.name + ".",
        url: unref(route)("auth.login.page")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cell medium-3"${_scopeId}><div class="gap-2 mb-3 align-middle card card-body flex-container flex-dir-column"${_scopeId}><img src="/assets/img/dummy_headshot.png" width="60" class="headshot"${_scopeId}><div class="text-center" style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.auth.user.display_name)}</div><div class="text-xs fw-semibold text-muted"${_scopeId}>${ssrInterpolate("@" + unref(usePage)().props.auth.user.username)}</div></div><div class="divider w-100"${_scopeId}></div><div class="w-100"${_scopeId}><div class="gap-3 align-middle flex-container"${_scopeId}><i class="text-3xl fas fa-medal text-info" style="${ssrRenderStyle({ "width": "40px" })}"${_scopeId}></i><div class="w-100"${_scopeId}><div class="mb-1 flex-container align-justify"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Rank Lvl. 2 </div><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> 50/200 EXP </div></div><div class="progress-bar"${_scopeId}><span class="progress" style="${ssrRenderStyle({ "width": "25%" })}"${_scopeId}></span></div></div></div></div></div><div class="mb-1 text-xl fw-semibold"${_scopeId}> The Eclipse Times </div><div class="card card-body"${_scopeId}>`);
            if (_ctx.NewsLoading) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(NewsCardSkeleton, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              if (!_ctx.Feed) {
                _push2(`<div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-face-sleeping text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "18px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Blog Posts </div><div class="text-xs text-muted fw-semibold"${_scopeId}> When we publish a post it will appear here. </div></div></div>`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(_ctx.Feed, (Bpost) => {
                  _push2(ssrRenderComponent(_sfc_main$3, {
                    key: Bpost.link,
                    link: Bpost.link,
                    creator: Bpost.creator,
                    image: Bpost.image,
                    title: Bpost.title,
                    desc: Bpost.desc,
                    date: Bpost.date
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div><div class="cell medium-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
            _push2(`<div class="mb-1 text-xl fw-semibold show-for-small-only"${_scopeId}> Feed </div><form${_scopeId}><div class="mb-3"${_scopeId}><div class="position-relative"${_scopeId}><textarea class="mb-2 form form-has-button form-has-section-color pe-5" rows="5" placeholder="How are you doing?"${_scopeId}>${ssrInterpolate(unref(form).message)}</textarea><input type="submit" class="btn btn-success btn-sm has-ripple" value="Post" style="${ssrRenderStyle({ "position": "absolute", "bottom": "10px", "right": "10px" })}"${_scopeId}></div></div></form><div class="mb-1 text-xl fw-semibold"${_scopeId}>Posts</div><div class="card card-body"${_scopeId}>`);
            if (!slist.value) {
              _push2(`<div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-face-sleeping text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Posts </div><div class="text-xs text-muted fw-semibold"${_scopeId}> Start following players and their posts will appear here. </div></div></div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(slist.value.data, (status) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  DisplayName: status.dname,
                  name: status.name,
                  message: status.message,
                  date: status.DateHum
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(AeoPagination, {
              pagedata: slist.value,
              onPageClicked: _ctx.getStatusList
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "cell medium-3" }, [
                createVNode("div", { class: "gap-2 mb-3 align-middle card card-body flex-container flex-dir-column" }, [
                  createVNode("img", {
                    src: "/assets/img/dummy_headshot.png",
                    width: "60",
                    class: "headshot"
                  }),
                  createVNode("div", {
                    class: "text-center",
                    style: { "line-height": "16px" }
                  }, [
                    createVNode("div", { class: "fw-semibold" }, toDisplayString(unref(usePage)().props.auth.user.display_name), 1),
                    createVNode("div", { class: "text-xs fw-semibold text-muted" }, toDisplayString("@" + unref(usePage)().props.auth.user.username), 1)
                  ]),
                  createVNode("div", { class: "divider w-100" }),
                  createVNode("div", { class: "w-100" }, [
                    createVNode("div", { class: "gap-3 align-middle flex-container" }, [
                      createVNode("i", {
                        class: "text-3xl fas fa-medal text-info",
                        style: { "width": "40px" }
                      }),
                      createVNode("div", { class: "w-100" }, [
                        createVNode("div", { class: "mb-1 flex-container align-justify" }, [
                          createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Rank Lvl. 2 "),
                          createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " 50/200 EXP ")
                        ]),
                        createVNode("div", { class: "progress-bar" }, [
                          createVNode("span", {
                            class: "progress",
                            style: { "width": "25%" }
                          })
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-1 text-xl fw-semibold" }, " The Eclipse Times "),
                createVNode("div", { class: "card card-body" }, [
                  _ctx.NewsLoading ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(NewsCardSkeleton)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    !_ctx.Feed ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "gap-3 text-center flex-container flex-dir-column"
                    }, [
                      createVNode("i", { class: "text-5xl fas fa-face-sleeping text-muted" }),
                      createVNode("div", { style: { "line-height": "18px" } }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Blog Posts "),
                        createVNode("div", { class: "text-xs text-muted fw-semibold" }, " When we publish a post it will appear here. ")
                      ])
                    ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(_ctx.Feed, (Bpost) => {
                      return openBlock(), createBlock(_sfc_main$3, {
                        key: Bpost.link,
                        link: Bpost.link,
                        creator: Bpost.creator,
                        image: Bpost.image,
                        title: Bpost.title,
                        desc: Bpost.desc,
                        date: Bpost.date
                      }, null, 8, ["link", "creator", "image", "title", "desc", "date"]);
                    }), 128))
                  ]))
                ])
              ]),
              createVNode("div", { class: "cell medium-8" }, [
                createVNode(_sfc_main$6),
                createVNode("div", { class: "mb-1 text-xl fw-semibold show-for-small-only" }, " Feed "),
                createVNode("form", {
                  onSubmit: withModifiers(_ctx.submit, ["prevent"])
                }, [
                  createVNode("div", { class: "mb-3" }, [
                    createVNode("div", { class: "position-relative" }, [
                      withDirectives(createVNode("textarea", {
                        class: "mb-2 form form-has-button form-has-section-color pe-5",
                        rows: "5",
                        "onUpdate:modelValue": ($event) => unref(form).message = $event,
                        placeholder: "How are you doing?"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).message]
                      ]),
                      createVNode("input", {
                        type: "submit",
                        onClick: ($event) => addStatus(unref(form).message),
                        class: "btn btn-success btn-sm has-ripple",
                        value: "Post",
                        style: { "position": "absolute", "bottom": "10px", "right": "10px" }
                      }, null, 8, ["onClick"])
                    ])
                  ])
                ], 40, ["onSubmit"]),
                createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "Posts"),
                createVNode("div", { class: "card card-body" }, [
                  !slist.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "gap-3 text-center flex-container flex-dir-column"
                  }, [
                    createVNode("i", { class: "text-5xl fas fa-face-sleeping text-muted" }),
                    createVNode("div", { style: { "line-height": "16px" } }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Posts "),
                      createVNode("div", { class: "text-xs text-muted fw-semibold" }, " Start following players and their posts will appear here. ")
                    ])
                  ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(slist.value.data, (status) => {
                    return openBlock(), createBlock(_sfc_main$2, {
                      DisplayName: status.dname,
                      name: status.name,
                      message: status.message,
                      date: status.DateHum
                    }, null, 8, ["DisplayName", "name", "message", "date"]);
                  }), 256))
                ]),
                createVNode(AeoPagination, {
                  pagedata: slist.value,
                  onPageClicked: _ctx.getStatusList
                }, null, 8, ["pagedata", "onPageClicked"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$7, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
