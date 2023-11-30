import { defineComponent, ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import axios from "axios";
import { usePage, Link } from "@inertiajs/vue3";
import { route } from "momentum-trail";
import VLazyImage from "v-lazy-image";
import { _ as _sfc_main$3 } from "./Footer-b7f961b4.mjs";
import { _ as _sfc_main$2 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$1 } from "./AppHead-8e83a103.mjs";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "dayjs";
const __default__ = {
  data() {
    return {
      userstat: {
        // Replace this with your actual user object
        online: false,
        following: false,
        id: this.user.id,
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
  },
  methods: {
    async fetchUserStatus() {
      this.userstat.fetchingStatus = true;
      const cachedOnlineStatus2 = this.userstat.online;
      try {
        const response = await axios.get(route(`api.usePage<any>().props.user.online`, { id: this.userstat.id }));
        this.userstat.online = response.data.online;
      } catch (error) {
        console.error(error);
        this.userstat.online = cachedOnlineStatus2;
      } finally {
        this.userstat.fetchingStatus = false;
      }
    },
    async fetchFollowStatus() {
      this.userstat.fetchingStatus = true;
      this.userstat.follow;
      try {
        const response = await axios.get(route(`api.usePage<any>().props.user.online`, { id: this.userstat.id }));
        this.userstat.follow = response.data.following;
      } catch (error) {
        console.error(error);
        this.userstat.online = cachedOnlineStatus;
      } finally {
        this.userstat.fetchingStatus = false;
      }
    },
    showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    user: { type: Object },
    is_following: { type: Boolean }
  },
  setup(__props) {
    ref(false);
    usePage().props.is_following;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal" id="following-modal"${_scopeId}><div class="modal-card modal-card-body"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.display_name)}&#39;s Following </div><button class="btn-circle" data-toggle-modal="#following-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="section"${_scopeId}><!--[-->`);
            ssrRenderList(unref(usePage)().props.user.following, (followingUser, index) => {
              _push2(`<!--[--><div class="gap-2 mt-2 mb-2 align-middle flex-container align-justify"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="headshot" width="50"${_scopeId}><div class="w-100"${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(followingUser.username)}</div><div class="text-sm fw-semibold text-muted"${_scopeId}> @${ssrInterpolate(followingUser.username)}</div></div><div class="gap-2 mt-2 mb-2 align-middle flex-container align-justify"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)(`usePage<any>().props.user.profile`, { username: followingUser.username }),
                class: "min-w-0 btn btn-info btn-sm text-truncate"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` View Profile `);
                  } else {
                    return [
                      createTextVNode(" View Profile ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (index < unref(usePage)().props.user.following.length - 1) {
                _push2(`<div class="divider w-100"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div></div></div><div class="modal" id="followers-modal"${_scopeId}><div class="modal-card modal-card-body"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.display_name)}&#39;s Followers </div><button class="btn-circle" data-toggle-modal="#followers-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="section"${_scopeId}><!--[-->`);
            ssrRenderList(unref(usePage)().props.user.followers, (followerUser, index) => {
              _push2(`<!--[--><div class="gap-2 mt-2 mb-2 align-middle flex-container align-justify"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="headshot" width="50"${_scopeId}><div class="w-100"${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(followerUser.username)}</div><div class="text-sm fw-semibold text-muted"${_scopeId}> @${ssrInterpolate(followerUser.username)}</div></div><div class="gap-2 mt-2 mb-2 align-middle flex-container align-justify"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)(`usePage<any>().props.user.profile`, { username: followerUser.username }),
                class: "min-w-0 btn btn-info btn-sm text-truncate"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` View Profile `);
                  } else {
                    return [
                      createTextVNode(" View Profile ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (index < unref(usePage)().props.user.followers.length - 1) {
                _push2(`<div class="divider w-100"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div></div></div><div class="grid-x grid-margin-x grid-padding-y align-center"${_scopeId}><div class="cell large-11"${_scopeId}><div class="card mb-2"${_scopeId}><img style="${ssrRenderStyle({ "background-repeat": "no-repeat", "background-size": "cover", "object-fit": "cover", "border-radius": "var(--rounded-lg) var(--rounded-lg) 0px 0px", "height": "100px" })}" class="w-100 card-img-top" onerror="this.style.backgroundColor=&#39;var(--info-600)&#39;;"${ssrRenderAttr("src", unref(usePage)().props.user.settings.banner_url)}${_scopeId}><div class="card-body mb-2"${_scopeId}><div class="flex-container align-justify align-middle mb-1"${_scopeId}><div class="flex-container align-middle gap-2"${_scopeId}><img src="assets/img/dummy_headshot.png" class="headshot" width="50"${_scopeId}><div class="w-100"${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.display_name)}<img src="https://hatscripts.github.io/circle-flags/flags/gy.svg" style="${ssrRenderStyle({ "width": "26px", "height": "16px" })}"${_scopeId}></div><div class="fw-semibold"${_scopeId}>${ssrInterpolate("@" + unref(usePage)().props.user.username)}</div></div></div><div class="flex-container align-middle gap-2"${_scopeId}><a href="#" class="btn btn-danger pl-2 btn-sm btn-circle text-truncate min-w-0"${_scopeId}><i class="fa-solid fa-ellipsis-vertical"${_scopeId}></i></a><a href="#" class="btn btn-info btn-sm text-truncate min-w-0"${_scopeId}><i class="fa-solid fa-user-plus"${_scopeId}></i></a><a href="#" class="btn btn-success btn-sm text-truncate min-w-0"${_scopeId}><i class="fa-solid fa-envelope"${_scopeId}></i></a><a href="#" class="btn btn-danger btn-sm text-truncate min-w-0"${_scopeId}><i class="fa-solid fa-repeat"${_scopeId}></i></a></div></div></div></div></div><div class="cell medium-3"${_scopeId}><div class="card-body mb-2"${_scopeId}><div class="${ssrRenderClass(["card", "card-body", "card-status", _ctx.userStatusClass])}" style="${ssrRenderStyle(unref(usePage)().props.user.settings.calling_card_enabled ? { "background-image": "url(" + unref(usePage)().props.user.settings.calling_card_url + ")", "background-repeat": "no-repeat", "background-size": "cover" } : null)}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(VLazyImage), {
              src: unref(usePage)().props.user.avatar,
              "src-placeholder": "https://cdn.discordapp.com/attachments/1057450856959709234/1145773190963015760/38fdc2dff0917fb933e079c3d88b593ab0c1d655f449.png?ex=652d73f0&is=651afef0&hm=63d23b93b32b268cfa07756bf65a5ef9700d694314fcf759592974079429d7f8&"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="card-body"${_scopeId}><div class="text-center mt-2"${_scopeId}><div class="flex-container align-center gap-3 text-sm"${_scopeId}><button class="fw-semibold text-muted text-center text-truncate min-w-0 px-0"${_scopeId}><span class="text-body"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.following_count)}</span> Following </button><button class="fw-semibold text-muted text-center text-truncate min-w-0 px-0"${_scopeId}><span class="text-body"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.followers_count)}</span> Followers </button></div>`);
            if (unref(usePage)().props.user.followsYou) {
              _push2(`<div class="text-sm text-info fw-semibold"${_scopeId}> Follows you </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><a class="card p-2 mb-2 card-inner flex-container align-middle gap-2 mt-1"${_scopeId}><img src="assets/img/space_placeholder.png" class="headshot" width="40"${_scopeId}><div class="min-w-0" style="${ssrRenderStyle({ "line-height": "14px" })}"${_scopeId}><div class="text-truncate text-xs fw-bold text-muted text-uppercase"${_scopeId}> Primary Space </div><div class="text-truncate fw-semibold text-sm text-body"${_scopeId}> Namesnipe </div></div></a><div class="mb-1 text-xl fw-semibold"${_scopeId}>About Me</div><div class="mb-3 card card-body"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.about_me)}</div><div class="mb-1 text-xl fw-semibold"${_scopeId}>Statistics</div><div class="mb-3 card card-body"${_scopeId}><div class="gap-1 align-middle flex-container flex-dir-column"${_scopeId}><div class="text-sm text-membership fw-semibold w-100"${_scopeId}><i class="text-center fas fa-rocket-launch text-membership" style="${ssrRenderStyle({ "width": "26px" })}"${_scopeId}></i> Premium Subscriber </div><div class="text-sm w-100"${_scopeId}><i class="text-center fas fa-medal text-muted" style="${ssrRenderStyle({ "width": "26px" })}"${_scopeId}></i> Rank Lvl. 2 </div><div class="text-sm w-100"${_scopeId}><i class="text-center fas fa-users-medical text-muted" style="${ssrRenderStyle({ "width": "26px" })}"${_scopeId}></i> Joined on ${ssrInterpolate(unref(usePage)().props.user.joindate)}</div><div class="text-sm w-100"${_scopeId}><i class="text-center fas fa-clock text-muted" style="${ssrRenderStyle({ "width": "26px" })}"${_scopeId}></i> Last seen ${ssrInterpolate(unref(usePage)().props.user.DateHum)}</div><div class="text-sm w-100"${_scopeId}><i class="text-center fas fa-messages text-muted" style="${ssrRenderStyle({ "width": "26px" })}"${_scopeId}></i> ${ssrInterpolate(unref(usePage)().props.user.posts)} Discussion Posts </div></div></div><div class="mb-1 text-xl fw-semibold"${_scopeId}>Spaces</div><div class="mb-3 card card-body"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-planet-ringed text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Spaces </div><div class="text-xs text-muted fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.username)} has not joined any spaces. </div></div></div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="text-center cell medium-4 small-4"${_scopeId}><a href="#" class="text-body"${_scopeId}><img src="/assets/img/space_placeholder.png" class="mb-1"${_scopeId}><div${_scopeId}><div class="text-sm fw-semibold text-truncate"${_scopeId}><i class="mb-1 text-xs text-info fw-bold text-uppercase fas fa-star"${_scopeId}></i>  Namesnipe </div><div class="text-xs text-muted fw-semibold"${_scopeId}> 12K Members </div></div></a></div><div class="text-center cell medium-4 small-4"${_scopeId}><a href="#" class="text-body"${_scopeId}><img src="/assets/img/icon.png" class="mb-1"${_scopeId}><div${_scopeId}><div class="text-sm fw-semibold text-truncate"${_scopeId}> Project Eclipse </div><div class="text-xs text-muted fw-semibold"${_scopeId}>4 Members</div></div></a></div></div></div></div><div class="cell medium-8"${_scopeId}><div class="mb-3 text-center alert alert-success fw-semibold"${_scopeId}> You are now following this user! </div><div style="${ssrRenderStyle({ "height": "6px" })}"${_scopeId}></div><div class="mb-1 align-middle flex-container align-justify"${_scopeId}><div class="mb-1 text-xl fw-semibold"${_scopeId}>Achievements</div><a href="#" class="btn btn-secondary btn-sm"${_scopeId}>View All</a></div><div class="mb-3 card card-body"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-award text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Achievements </div><div class="text-xs text-muted fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.username)} has not made any achievements. </div></div></div><div class="flex-wrap gap-3 flex-container align-center"${_scopeId}><div class="min-w-0 text-center" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}><img src="/assets/img/achievement_dummy.png"${_scopeId}><div class="text-xs fw-semibold text-truncate"${_scopeId}> Adminstrator </div></div><div class="min-w-0 text-center" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}><img src="/assets/img/achievement_dummy.png"${_scopeId}><div class="text-xs fw-semibold text-truncate"${_scopeId}> Adminstrator </div></div><div class="min-w-0 text-center" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}><img src="/assets/img/achievement_dummy.png"${_scopeId}><div class="text-xs fw-semibold text-truncate"${_scopeId}> Adminstrator </div></div><div class="min-w-0 text-center" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}><img src="/assets/img/achievement_dummy.png"${_scopeId}><div class="text-xs fw-semibold text-truncate"${_scopeId}> Adminstrator </div></div><div class="min-w-0 text-center" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}><img src="/assets/img/achievement_dummy.png"${_scopeId}><div class="text-xs fw-semibold text-truncate"${_scopeId}> Adminstrator </div></div></div></div><div class="mb-3 card card-body"${_scopeId}><div class="section"${_scopeId}><ul class="tabs"${_scopeId}><li class="tab-item"${_scopeId}><a href="#" class="tab-link active squish"${_scopeId}>Posts</a></li><li class="tab-item"${_scopeId}><a href="#" class="tab-link squish"${_scopeId}>Inventory</a></li></ul></div><div class="section"${_scopeId}><div class="gap-3 text-center flex-container flex-dir-column"${_scopeId}><i class="text-5xl fas fa-face-sleeping text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> No Posts </div><div class="text-xs text-muted fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.username)} has not posted anything to their feed. </div></div></div></div><div class="gap-3 section flex-container flex-dir-column-sm"${_scopeId}><div class="mx-auto flex-child-grow" style="${ssrRenderStyle({ "width": "100px" })}"${_scopeId}><a href="#" class="text-sm text-center d-block squish"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="mb-1 headshot" width="60"${_scopeId}><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="text-membership text-truncate"${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.display_name)}</div><div class="text-xs text-muted text-truncate"${_scopeId}>${ssrInterpolate("@" + unref(usePage)().props.user.username)}</div></div></a></div><div class="card card-body card-inner w-100"${_scopeId}><div class="align-middle flex-container align-justify"${_scopeId}><div class="w-100"${_scopeId}><div class="text-xs text-muted"${_scopeId}><i class="far fa-clock me-1" style="${ssrRenderStyle({ "vertical-align": "middle", "margin-top": "-2.5px", "font-size": "10px" })}"${_scopeId}></i>Posted 23 minutes ago </div><div${_scopeId}>${ssrInterpolate(unref(usePage)().props.user.status)}</div><div class="text-sm" style="${ssrRenderStyle({ "margin-left": "-6px" })}"${_scopeId}><button class="btn-like active squish"${_scopeId}><i class="far fa-heart"${_scopeId}></i>1 </button></div></div><div class="dropdown ms-auto position-relative"${_scopeId}><button class="btn-circle" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-ellipsis-vertical"${_scopeId}></i></button><ul class="dropdown-menu dropdown-menu-end"${_scopeId}><li class="dropdown-item"${_scopeId}><a href="#" class="dropdown-link dropdown-link-has-icon"${_scopeId}><i class="fas fa-flag dropdown-icon"${_scopeId}></i> Report </a></li><div class="align-middle flex-container"${_scopeId}><div class="dropdown-title"${_scopeId}>Moderation</div><li class="divider flex-child-grow"${_scopeId}></li></div><li class="dropdown-item"${_scopeId}><a href="#" class="dropdown-link dropdown-link-has-icon text-danger"${_scopeId}><i class="fas fa-trash text-danger dropdown-icon"${_scopeId}></i> Delete </a></li></ul></div></div><div class="my-2 align-middle flex-container"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Comments </div><div class="divider flex-child-grow"${_scopeId}></div></div><div class="gap-2 mb-2 flex-container"${_scopeId}><input type="text" class="form form-sm form-has-section-color" placeholder="What are your thoughts on this post?"${_scopeId}><input type="button" class="btn btn-success btn-sm" value="Post"${_scopeId}></div></div></div><div class="section"${_scopeId}><ul class="pagination flex-container align-center"${_scopeId}><button class="page-link page-disabled"${_scopeId}><i class="fa-regular fa-chevron-left"${_scopeId}></i></button><button class="page-link page-active"${_scopeId}>1</button><button class="page-link"${_scopeId}>2</button><button class="page-link"${_scopeId}>3</button><button class="page-link"${_scopeId}><i class="fa-regular fa-chevron-right"${_scopeId}></i></button></ul></div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "modal",
                id: "following-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, toDisplayString(unref(usePage)().props.user.display_name) + "'s Following ", 1),
                      createVNode("button", {
                        onClick: ($event) => _ctx.showModal("following-modal"),
                        class: "btn-circle",
                        "data-toggle-modal": "#following-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "section" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(usePage)().props.user.following, (followingUser, index) => {
                        return openBlock(), createBlock(Fragment, { key: index }, [
                          createVNode("div", { class: "gap-2 mt-2 mb-2 align-middle flex-container align-justify" }, [
                            createVNode("img", {
                              src: "/assets/img/dummy_headshot.png",
                              class: "headshot",
                              width: "50"
                            }),
                            createVNode("div", { class: "w-100" }, [
                              createVNode("div", { class: "fw-semibold" }, toDisplayString(followingUser.username), 1),
                              createVNode("div", { class: "text-sm fw-semibold text-muted" }, " @" + toDisplayString(followingUser.username), 1)
                            ]),
                            createVNode("div", { class: "gap-2 mt-2 mb-2 align-middle flex-container align-justify" }, [
                              createVNode(unref(Link), {
                                href: unref(route)(`usePage<any>().props.user.profile`, { username: followingUser.username }),
                                class: "min-w-0 btn btn-info btn-sm text-truncate"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" View Profile ")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ]),
                          index < unref(usePage)().props.user.following.length - 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "divider w-100"
                          })) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "followers-modal",
                onClick: ($event) => _ctx.showModal("followers-modal")
              }, [
                createVNode("div", { class: "modal-card modal-card-body" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, toDisplayString(unref(usePage)().props.user.display_name) + "'s Followers ", 1),
                      createVNode("button", {
                        onClick: ($event) => _ctx.showModal("followers-modal"),
                        class: "btn-circle",
                        "data-toggle-modal": "#followers-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "section" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(usePage)().props.user.followers, (followerUser, index) => {
                        return openBlock(), createBlock(Fragment, { key: index }, [
                          createVNode("div", { class: "gap-2 mt-2 mb-2 align-middle flex-container align-justify" }, [
                            createVNode("img", {
                              src: "/assets/img/dummy_headshot.png",
                              class: "headshot",
                              width: "50"
                            }),
                            createVNode("div", { class: "w-100" }, [
                              createVNode("div", { class: "fw-semibold" }, toDisplayString(followerUser.username), 1),
                              createVNode("div", { class: "text-sm fw-semibold text-muted" }, " @" + toDisplayString(followerUser.username), 1)
                            ]),
                            createVNode("div", { class: "gap-2 mt-2 mb-2 align-middle flex-container align-justify" }, [
                              createVNode(unref(Link), {
                                href: unref(route)(`usePage<any>().props.user.profile`, { username: followerUser.username }),
                                class: "min-w-0 btn btn-info btn-sm text-truncate"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" View Profile ")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ]),
                          index < unref(usePage)().props.user.followers.length - 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "divider w-100"
                          })) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])
                  ])
                ])
              ], 8, ["onClick"]),
              createVNode("div", { class: "grid-x grid-margin-x grid-padding-y align-center" }, [
                createVNode("div", { class: "cell large-11" }, [
                  createVNode("div", { class: "card mb-2" }, [
                    createVNode("img", {
                      style: { "background-repeat": "no-repeat", "background-size": "cover", "object-fit": "cover", "border-radius": "var(--rounded-lg) var(--rounded-lg) 0px 0px", "height": "100px" },
                      class: "w-100 card-img-top",
                      onerror: "this.style.backgroundColor='var(--info-600)';",
                      src: unref(usePage)().props.user.settings.banner_url
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "card-body mb-2" }, [
                      createVNode("div", { class: "flex-container align-justify align-middle mb-1" }, [
                        createVNode("div", { class: "flex-container align-middle gap-2" }, [
                          createVNode("img", {
                            src: "assets/img/dummy_headshot.png",
                            class: "headshot",
                            width: "50"
                          }),
                          createVNode("div", { class: "w-100" }, [
                            createVNode("div", { class: "fw-semibold" }, [
                              createTextVNode(toDisplayString(unref(usePage)().props.user.display_name), 1),
                              createVNode("img", {
                                src: "https://hatscripts.github.io/circle-flags/flags/gy.svg",
                                style: { "width": "26px", "height": "16px" }
                              })
                            ]),
                            createVNode("div", { class: "fw-semibold" }, toDisplayString("@" + unref(usePage)().props.user.username), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex-container align-middle gap-2" }, [
                          createVNode("a", {
                            href: "#",
                            class: "btn btn-danger pl-2 btn-sm btn-circle text-truncate min-w-0"
                          }, [
                            createVNode("i", { class: "fa-solid fa-ellipsis-vertical" })
                          ]),
                          createVNode("a", {
                            href: "#",
                            class: "btn btn-info btn-sm text-truncate min-w-0"
                          }, [
                            createVNode("i", { class: "fa-solid fa-user-plus" })
                          ]),
                          createVNode("a", {
                            href: "#",
                            class: "btn btn-success btn-sm text-truncate min-w-0"
                          }, [
                            createVNode("i", { class: "fa-solid fa-envelope" })
                          ]),
                          createVNode("a", {
                            href: "#",
                            class: "btn btn-danger btn-sm text-truncate min-w-0"
                          }, [
                            createVNode("i", { class: "fa-solid fa-repeat" })
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "cell medium-3" }, [
                  createVNode("div", { class: "card-body mb-2" }, [
                    createVNode("div", {
                      class: ["card", "card-body", "card-status", _ctx.userStatusClass],
                      style: unref(usePage)().props.user.settings.calling_card_enabled ? { "background-image": "url(" + unref(usePage)().props.user.settings.calling_card_url + ")", "background-repeat": "no-repeat", "background-size": "cover" } : null
                    }, [
                      createVNode(unref(VLazyImage), {
                        src: unref(usePage)().props.user.avatar,
                        "src-placeholder": "https://cdn.discordapp.com/attachments/1057450856959709234/1145773190963015760/38fdc2dff0917fb933e079c3d88b593ab0c1d655f449.png?ex=652d73f0&is=651afef0&hm=63d23b93b32b268cfa07756bf65a5ef9700d694314fcf759592974079429d7f8&"
                      }, null, 8, ["src"])
                    ], 6),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "text-center mt-2" }, [
                        createVNode("div", { class: "flex-container align-center gap-3 text-sm" }, [
                          createVNode("button", {
                            class: "fw-semibold text-muted text-center text-truncate min-w-0 px-0",
                            onClick: ($event) => _ctx.showModal("following-modal")
                          }, [
                            createVNode("span", { class: "text-body" }, toDisplayString(unref(usePage)().props.user.following_count), 1),
                            createTextVNode(" Following ")
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            class: "fw-semibold text-muted text-center text-truncate min-w-0 px-0",
                            onClick: ($event) => _ctx.showModal("followers-modal")
                          }, [
                            createVNode("span", { class: "text-body" }, toDisplayString(unref(usePage)().props.user.followers_count), 1),
                            createTextVNode(" Followers ")
                          ], 8, ["onClick"])
                        ]),
                        unref(usePage)().props.user.followsYou ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-info fw-semibold"
                        }, " Follows you ")) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("a", { class: "card p-2 mb-2 card-inner flex-container align-middle gap-2 mt-1" }, [
                    createVNode("img", {
                      src: "assets/img/space_placeholder.png",
                      class: "headshot",
                      width: "40"
                    }),
                    createVNode("div", {
                      class: "min-w-0",
                      style: { "line-height": "14px" }
                    }, [
                      createVNode("div", { class: "text-truncate text-xs fw-bold text-muted text-uppercase" }, " Primary Space "),
                      createVNode("div", { class: "text-truncate fw-semibold text-sm text-body" }, " Namesnipe ")
                    ])
                  ]),
                  createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "About Me"),
                  createVNode("div", { class: "mb-3 card card-body" }, toDisplayString(unref(usePage)().props.user.about_me), 1),
                  createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "Statistics"),
                  createVNode("div", { class: "mb-3 card card-body" }, [
                    createVNode("div", { class: "gap-1 align-middle flex-container flex-dir-column" }, [
                      createVNode("div", { class: "text-sm text-membership fw-semibold w-100" }, [
                        createVNode("i", {
                          class: "text-center fas fa-rocket-launch text-membership",
                          style: { "width": "26px" }
                        }),
                        createTextVNode(" Premium Subscriber ")
                      ]),
                      createVNode("div", { class: "text-sm w-100" }, [
                        createVNode("i", {
                          class: "text-center fas fa-medal text-muted",
                          style: { "width": "26px" }
                        }),
                        createTextVNode(" Rank Lvl. 2 ")
                      ]),
                      createVNode("div", { class: "text-sm w-100" }, [
                        createVNode("i", {
                          class: "text-center fas fa-users-medical text-muted",
                          style: { "width": "26px" }
                        }),
                        createTextVNode(" Joined on " + toDisplayString(unref(usePage)().props.user.joindate), 1)
                      ]),
                      createVNode("div", { class: "text-sm w-100" }, [
                        createVNode("i", {
                          class: "text-center fas fa-clock text-muted",
                          style: { "width": "26px" }
                        }),
                        createTextVNode(" Last seen " + toDisplayString(unref(usePage)().props.user.DateHum), 1)
                      ]),
                      createVNode("div", { class: "text-sm w-100" }, [
                        createVNode("i", {
                          class: "text-center fas fa-messages text-muted",
                          style: { "width": "26px" }
                        }),
                        createTextVNode(" " + toDisplayString(unref(usePage)().props.user.posts) + " Discussion Posts ", 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "Spaces"),
                  createVNode("div", { class: "mb-3 card card-body" }, [
                    createVNode("div", { class: "gap-3 text-center flex-container flex-dir-column" }, [
                      createVNode("i", { class: "text-5xl fas fa-planet-ringed text-muted" }),
                      createVNode("div", { style: { "line-height": "16px" } }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Spaces "),
                        createVNode("div", { class: "text-xs text-muted fw-semibold" }, toDisplayString(unref(usePage)().props.user.username) + " has not joined any spaces. ", 1)
                      ])
                    ]),
                    createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                      createVNode("div", { class: "text-center cell medium-4 small-4" }, [
                        createVNode("a", {
                          href: "#",
                          class: "text-body"
                        }, [
                          createVNode("img", {
                            src: "/assets/img/space_placeholder.png",
                            class: "mb-1"
                          }),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-sm fw-semibold text-truncate" }, [
                              createVNode("i", { class: "mb-1 text-xs text-info fw-bold text-uppercase fas fa-star" }),
                              createTextVNode("  Namesnipe ")
                            ]),
                            createVNode("div", { class: "text-xs text-muted fw-semibold" }, " 12K Members ")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "text-center cell medium-4 small-4" }, [
                        createVNode("a", {
                          href: "#",
                          class: "text-body"
                        }, [
                          createVNode("img", {
                            src: "/assets/img/icon.png",
                            class: "mb-1"
                          }),
                          createVNode("div", null, [
                            createVNode("div", { class: "text-sm fw-semibold text-truncate" }, " Project Eclipse "),
                            createVNode("div", { class: "text-xs text-muted fw-semibold" }, "4 Members")
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "cell medium-8" }, [
                  createVNode("div", { class: "mb-3 text-center alert alert-success fw-semibold" }, " You are now following this user! "),
                  createVNode("div", { style: { "height": "6px" } }),
                  createVNode("div", { class: "mb-1 align-middle flex-container align-justify" }, [
                    createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "Achievements"),
                    createVNode("a", {
                      href: "#",
                      class: "btn btn-secondary btn-sm"
                    }, "View All")
                  ]),
                  createVNode("div", { class: "mb-3 card card-body" }, [
                    createVNode("div", { class: "gap-3 text-center flex-container flex-dir-column" }, [
                      createVNode("i", { class: "text-5xl fas fa-award text-muted" }),
                      createVNode("div", { style: { "line-height": "16px" } }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Achievements "),
                        createVNode("div", { class: "text-xs text-muted fw-semibold" }, toDisplayString(unref(usePage)().props.user.username) + " has not made any achievements. ", 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex-wrap gap-3 flex-container align-center" }, [
                      createVNode("div", {
                        class: "min-w-0 text-center",
                        style: { "width": "80px" }
                      }, [
                        createVNode("img", { src: "/assets/img/achievement_dummy.png" }),
                        createVNode("div", { class: "text-xs fw-semibold text-truncate" }, " Adminstrator ")
                      ]),
                      createVNode("div", {
                        class: "min-w-0 text-center",
                        style: { "width": "80px" }
                      }, [
                        createVNode("img", { src: "/assets/img/achievement_dummy.png" }),
                        createVNode("div", { class: "text-xs fw-semibold text-truncate" }, " Adminstrator ")
                      ]),
                      createVNode("div", {
                        class: "min-w-0 text-center",
                        style: { "width": "80px" }
                      }, [
                        createVNode("img", { src: "/assets/img/achievement_dummy.png" }),
                        createVNode("div", { class: "text-xs fw-semibold text-truncate" }, " Adminstrator ")
                      ]),
                      createVNode("div", {
                        class: "min-w-0 text-center",
                        style: { "width": "80px" }
                      }, [
                        createVNode("img", { src: "/assets/img/achievement_dummy.png" }),
                        createVNode("div", { class: "text-xs fw-semibold text-truncate" }, " Adminstrator ")
                      ]),
                      createVNode("div", {
                        class: "min-w-0 text-center",
                        style: { "width": "80px" }
                      }, [
                        createVNode("img", { src: "/assets/img/achievement_dummy.png" }),
                        createVNode("div", { class: "text-xs fw-semibold text-truncate" }, " Adminstrator ")
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
                          }, "Posts")
                        ]),
                        createVNode("li", { class: "tab-item" }, [
                          createVNode("a", {
                            href: "#",
                            class: "tab-link squish"
                          }, "Inventory")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "section" }, [
                      createVNode("div", { class: "gap-3 text-center flex-container flex-dir-column" }, [
                        createVNode("i", { class: "text-5xl fas fa-face-sleeping text-muted" }),
                        createVNode("div", { style: { "line-height": "16px" } }, [
                          createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " No Posts "),
                          createVNode("div", { class: "text-xs text-muted fw-semibold" }, toDisplayString(unref(usePage)().props.user.username) + " has not posted anything to their feed. ", 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "gap-3 section flex-container flex-dir-column-sm" }, [
                      createVNode("div", {
                        class: "mx-auto flex-child-grow",
                        style: { "width": "100px" }
                      }, [
                        createVNode("a", {
                          href: "#",
                          class: "text-sm text-center d-block squish"
                        }, [
                          createVNode("img", {
                            src: "/assets/img/dummy_headshot.png",
                            class: "mb-1 headshot",
                            width: "60"
                          }),
                          createVNode("div", { style: { "line-height": "16px" } }, [
                            createVNode("div", { class: "text-membership text-truncate" }, toDisplayString(unref(usePage)().props.user.display_name), 1),
                            createVNode("div", { class: "text-xs text-muted text-truncate" }, toDisplayString("@" + unref(usePage)().props.user.username), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "card card-body card-inner w-100" }, [
                        createVNode("div", { class: "align-middle flex-container align-justify" }, [
                          createVNode("div", { class: "w-100" }, [
                            createVNode("div", { class: "text-xs text-muted" }, [
                              createVNode("i", {
                                class: "far fa-clock me-1",
                                style: { "vertical-align": "middle", "margin-top": "-2.5px", "font-size": "10px" }
                              }),
                              createTextVNode("Posted 23 minutes ago ")
                            ]),
                            createVNode("div", null, toDisplayString(unref(usePage)().props.user.status), 1),
                            createVNode("div", {
                              class: "text-sm",
                              style: { "margin-left": "-6px" }
                            }, [
                              createVNode("button", { class: "btn-like active squish" }, [
                                createVNode("i", { class: "far fa-heart" }),
                                createTextVNode("1 ")
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "dropdown ms-auto position-relative" }, [
                            createVNode("button", {
                              class: "btn-circle",
                              style: { "margin-right": "-10px" }
                            }, [
                              createVNode("i", { class: "fas fa-ellipsis-vertical" })
                            ]),
                            createVNode("ul", { class: "dropdown-menu dropdown-menu-end" }, [
                              createVNode("li", { class: "dropdown-item" }, [
                                createVNode("a", {
                                  href: "#",
                                  class: "dropdown-link dropdown-link-has-icon"
                                }, [
                                  createVNode("i", { class: "fas fa-flag dropdown-icon" }),
                                  createTextVNode(" Report ")
                                ])
                              ]),
                              createVNode("div", { class: "align-middle flex-container" }, [
                                createVNode("div", { class: "dropdown-title" }, "Moderation"),
                                createVNode("li", { class: "divider flex-child-grow" })
                              ]),
                              createVNode("li", { class: "dropdown-item" }, [
                                createVNode("a", {
                                  href: "#",
                                  class: "dropdown-link dropdown-link-has-icon text-danger"
                                }, [
                                  createVNode("i", { class: "fas fa-trash text-danger dropdown-icon" }),
                                  createTextVNode(" Delete ")
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "my-2 align-middle flex-container" }, [
                          createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Comments "),
                          createVNode("div", { class: "divider flex-child-grow" })
                        ]),
                        createVNode("div", { class: "gap-2 mb-2 flex-container" }, [
                          createVNode("input", {
                            type: "text",
                            class: "form form-sm form-has-section-color",
                            placeholder: "What are your thoughts on this post?"
                          }),
                          createVNode("input", {
                            type: "button",
                            class: "btn btn-success btn-sm",
                            value: "Post"
                          })
                        ])
                      ])
                    ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
