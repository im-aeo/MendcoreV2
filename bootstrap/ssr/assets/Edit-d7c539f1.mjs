import { defineComponent, resolveComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$3 } from "./Footer-b7f961b4.mjs";
import _sfc_main$2 from "./DeleteUserForm-7ce74e8a.mjs";
import { route, current } from "momentum-trail";
import "@inertiajs/vue3";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const __default__ = {
  data() {
    return {
      activeTheme: ""
    };
  },
  mounted() {
    const theme = localStorage.getItem("theme") || "light";
    this.activeTheme = theme;
    this.applyTheme(theme);
    const storedTheme = localStorage.getItem("theme");
    const themeBtn = document.getElementById(theme + "-theme-btn");
    if (themeBtn) {
      themeBtn.classList.remove("active");
      if (storedTheme === theme || this.activeTheme === theme) {
        themeBtn.classList.add("active");
      }
    }
  },
  methods: {
    capitalized(name) {
      const capitalizedFirst = name[0].toUpperCase();
      const rest = name.slice(1);
      return capitalizedFirst + rest;
    },
    applyTheme(theme) {
      let style = document.getElementById("theme-style");
      const themeBtn = document.getElementById(theme + "-theme-btn");
      if (!style) {
        style = document.createElement("link");
        style.id = "theme-style";
        style.rel = "stylesheet";
        document.head.appendChild(style);
      }
      style.href = `/assets/css/themes/variables-${theme}.css`;
      localStorage.setItem("theme", theme);
      if (themeBtn) {
        themeBtn.classList.remove("active");
      }
    },
    setTheme(theme) {
      this.activeTheme = theme;
      this.applyTheme(theme);
      const storedTheme = localStorage.getItem("theme");
      const themeBtn = document.getElementById(theme + "-theme-btn");
      if (themeBtn) {
        themeBtn.classList.remove("active");
        if (storedTheme === theme || this.activeTheme === theme) {
          themeBtn.classList.add("active");
        }
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: Boolean,
    status: String,
    categories: Array,
    themes: Array
  },
  setup(__props) {
    function showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal" id="email-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>Change Email</div><button class="btn-circle" data-toggle-modal="#email-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> New Email </div><input type="text" class="form" placeholder="New Email..."${_scopeId}></div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Password </div><input type="password" class="form" placeholder="Password..."${_scopeId}></div><div class="text-xs text-muted fw-semibold"${_scopeId}> After changing your email address, a confirmation email will be sent to your inbox to confirm your identity. </div></div><div class="flex-wrap gap-2 flex-container justify-content-end section-borderless"${_scopeId}><button class="btn btn-secondary"${_scopeId}> Cancel </button><input type="submit" class="btn btn-success" value="Change Email"${_scopeId}></div></div></div><div class="modal" id="username-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>Change Username</div><button class="btn-circle" data-toggle-modal="#username-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-danger text-uppercase"${_scopeId}> Username </div><input type="text" class="form" placeholder="New Username..."${_scopeId}><div class="text-xs text-danger fw-semibold"${_scopeId}> This username is already taken. Try @Nabrious123 instead. </div></div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Password </div><input type="password" class="form" placeholder="Password..."${_scopeId}></div><div class="text-xs text-muted fw-semibold"${_scopeId}> Changing your username costs<span class="mx-1 text-success"${_scopeId}><i class="fas fa-money-bill-1-wave"${_scopeId}></i> ${ssrInterpolate(_ctx.$page.props.site.price.username)}</span>. </div></div><div class="flex-wrap gap-2 flex-container justify-content-end section-borderless"${_scopeId}><button class="btn btn-secondary"${_scopeId}> Cancel </button><input type="submit" class="btn btn-success" value="Change Username"${_scopeId}></div></div></div><div class="modal" id="displayname-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> Change Display Name </div><button class="btn-circle" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> New Display Name </div><input type="text" class="mb-2 form" placeholder="New Display Name..."${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Password </div><input type="password" class="mb-2 form" placeholder="Password..."${_scopeId}><div class="text-xs text-muted fw-semibold"${_scopeId}> Changing your your display name is free but can only be done once every two weeks. </div></div><div class="flex-wrap gap-2 flex-container justify-content-end section-borderless"${_scopeId}><button class="btn btn-secondary"${_scopeId}> Cancel </button><input type="submit" class="btn btn-success" value="Change Display Name"${_scopeId}></div></div></div><div class="cell medium-3"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}>Account Settings</div><ul class="tabs flex-dir-column"${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<li class="tab-item"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: unref(route)(`user.settings.page`, { category }),
                class: [[unref(current)(`settings.page`, { category }) ? "active" : ""], "tab-link squish"]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.capitalized(category))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.capitalized(category)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul></div><div class="cell medium-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<div${_scopeId}>`);
              if (category === "general") {
                _push2(`<div${_scopeId}><div class="mb-1 text-xl fw-semibold"${_scopeId}>General</div><div class="section-borderless"${_scopeId}><div class="card card-body"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}> Account Information </div><div class="section-borderless"${_scopeId}><div class="grid-x grid-margin-x"${_scopeId}><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify h-100"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> User ID </div><div class="text-truncate fw-semibold"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.id)}</div></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
                _push2(`</div></div><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Username </div><div class="text-truncate fw-semibold"${_scopeId}>${ssrInterpolate("@" + _ctx.$page.props.auth.user.username)}</div></div><button class="btn btn-info btn-circle"${_scopeId}><i class="fas fa-pencil"${_scopeId}></i></button></div></div><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Display Name </div><div class="text-truncate fw-semibold"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.display_name)}</div></div><button class="btn btn-info btn-circle"${_scopeId}><i class="fas fa-pencil"${_scopeId}></i></button></div></div><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Email Address<span style="${ssrRenderStyle({ "font-size": "10px" })}" class="text-success ms-2"${_scopeId}><i class="fas fa-check me-1"${_scopeId}></i>Verified</span></div><div class="text-truncate fw-semibold"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div><button class="btn btn-info btn-circle"${_scopeId}><i class="fas fa-pencil"${_scopeId}></i></button></div></div><div class="mb-3 cell medium-6"${_scopeId}><div class="gap-2 align-middle card card-body card-inner flex-container align-justify"${_scopeId}><div class="min-w-0"${_scopeId}><div class="text-xs text-truncate fw-bold text-muted text-uppercase"${_scopeId}> Date of Birth </div><div class="text-truncate fw-semibold"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.birthdate)}</div><div class="text-xs fw-semibold text-muted"${_scopeId}> If you want to change your date of birth, <a href="#"${_scopeId}>contact support</a>. </div></div></div></div></div><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> About You </div><div class="mb-3 position-relative"${_scopeId}><textarea class="form form-has-button pe-5" rows="5"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.about_me)}</textarea><input type="button" class="btn btn-success btn-sm" value="Update" style="${ssrRenderStyle({ "position": "absolute", "bottom": "10px", "right": "10px" })}"${_scopeId}></div><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Forum Signature </div><div class="gap-2 align-middle flex-container"${_scopeId}><input type="text" class="form form-sm btn-sm"${ssrRenderAttr("value", _ctx.$page.props.auth.user.Signature)}${_scopeId}><input type="submit" class="btn btn-success btn-sm" value="Update"${_scopeId}></div></div></div></div><div class="section-borderless"${_scopeId}><div class="card card-body"${_scopeId}><div class="mb-2 text-xl fw-semibold"${_scopeId}> Website Theme </div><div id="theme-switcher-container" class="grid-x grid-margin-x grid-padding-y"${_scopeId}><!--[-->`);
                ssrRenderList(__props.themes, (theme, index) => {
                  _push2(`<div class="cell large-6"${_scopeId}>`);
                  if (theme.available) {
                    _push2(`<div class="mb-2 theme-selection squish card card-body card-inner mb-lg-0"${ssrRenderAttr("id", theme.name + "-theme-btn")}${_scopeId}><div class="gap-4 align-middle flex-container"${_scopeId}><div class="selection-circle flex-child-grow show-for-large"${_scopeId}></div><div class="gap-1 align-middle flex-container flex-dir-column" style="${ssrRenderStyle({ "min-width": "0" })}"${_scopeId}><div class="${ssrRenderClass("theme-circle" + theme.name)}"${_scopeId}></div><div class="text-lg fw-semibold text-truncate"${_scopeId}>${ssrInterpolate(theme.name)} Theme </div><div class="selection-circle flex-child-grow show-for-small hide-for-large"${_scopeId}></div></div></div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (category === "account") {
                _push2(`<div${_scopeId}><div class="text-xl fw-semibold mb-1"${_scopeId}> Security &amp; Privacy </div><div class="section-borderless"${_scopeId}><div class="card card-body"${_scopeId}><div class="text-xl fw-semibold mb-2"${_scopeId}>Security</div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-12"${_scopeId}><div class="card card-inner card-body"${_scopeId}><div class="mb-2"${_scopeId}><div class="text-xl fw-semibold mb-2"${_scopeId}> Change Password </div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Current Password </div><input type="password" class="form form-has-section-color" placeholder="Current Password..."${_scopeId}></div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> New Password </div><input type="password" class="form form-has-section-color" placeholder="Current Password..."${_scopeId}></div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Confirm Password </div><input type="password" class="form form-has-section-color" placeholder="Current Password..."${_scopeId}></div></div><button class="btn btn-success"${_scopeId}> Change Password </button></div></div></div></div></div><div class="section-borderless"${_scopeId}><div class="card card-body"${_scopeId}><div class="text-xl fw-semibold mb-2"${_scopeId}>Other</div><div class="card card-inner card-body mb-3"${_scopeId}><div class="text-xl fw-semibold mb-2"${_scopeId}> Privacy </div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Who Can Follow Me </div><select class="form form-select form-has-section-color"${_scopeId}><option value="1"${_scopeId}>Everyone</option><option value="2"${_scopeId}>No One</option></select></div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Who Can See My Posts? </div><select class="form form-select form-has-section-color"${_scopeId}><option value="1"${_scopeId}>Everyone</option><option value="2"${_scopeId}> Followers Only </option></select></div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Who Can Send Me Messages </div><select class="form form-select form-has-section-color"${_scopeId}><option value="1"${_scopeId}>Everyone</option><option value="2"${_scopeId}> Followers Only </option><option value="3"${_scopeId}>No One</option></select></div><div class="mb-2"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Who Can Send Me Trade Requests </div><select class="form form-select form-has-section-color"${_scopeId}><option value="1"${_scopeId}>Everyone</option><option value="2"${_scopeId}> Followers Only </option><option value="3"${_scopeId}>No One</option></select></div><button class="btn btn-success"${_scopeId}> Save Settings </button></div><div class="card card-inner card-body"${_scopeId}><div class="text-xl fw-semibold mb-2"${_scopeId}> Blocked Players </div><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Player Username </div><div class="flex-container gap-2 mb-2"${_scopeId}><input type="text" class="form form-has-section-color" placeholder="Player Username..."${_scopeId}><button class="btn btn-danger"${_scopeId}> Block </button></div><div class="card card-body"${_scopeId}><div class="flex-container flex-dir-column text-center gap-3"${_scopeId}><i class="fas fa-user-slash text-5xl text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="fw-bold text-xs text-muted text-uppercase"${_scopeId}> No Blocked Players </div><div class="text-xs text-muted fw-semibold"${_scopeId}> Yahoo! You have not blocked any players. </div></div></div></div></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (category === "billing") {
                _push2(`<div${_scopeId}><div class="flex-container align-middle align-justify mb-2"${_scopeId}><div class="text-xl fw-semibold"${_scopeId}>Billing</div><a href="#" class="btn btn-upgrade btn-sm"${_scopeId}><i class="fas fa-rocket-launch me-2"${_scopeId}></i>Upgrade</a></div><div class="card card-body mb-3"${_scopeId}><div class="text-xl fw-semibold mb-2"${_scopeId}> Active Membership </div><div class="card card-inner card-body"${_scopeId}><div class="flex-container flex-dir-column text-center gap-3"${_scopeId}><i class="fas fa-rocket-launch text-5xl text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="fw-bold text-xs text-muted text-uppercase"${_scopeId}> No Active Membership </div><div class="text-xs text-muted fw-semibold"${_scopeId}> You currently do not have any active membership to manage. </div></div></div></div></div><div class="card card-body"${_scopeId}><div class="text-xl fw-semibold mb-2"${_scopeId}> Previous Purchases </div><div class="card card-inner card-body"${_scopeId}><div class="flex-container flex-dir-column text-center gap-3"${_scopeId}><i class="fas fa-envelope-open-text text-5xl text-muted"${_scopeId}></i><div style="${ssrRenderStyle({ "line-height": "16px" })}"${_scopeId}><div class="fw-bold text-xs text-muted text-uppercase"${_scopeId}> No Previous Purchases </div><div class="text-xs text-muted fw-semibold"${_scopeId}> You have not made any purchases. </div></div></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", {
                class: "modal",
                id: "email-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, "Change Email"),
                      createVNode("button", {
                        onClick: ($event) => showModal("email-modal"),
                        class: "btn-circle",
                        "data-toggle-modal": "#email-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "mb-2" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " New Email "),
                      createVNode("input", {
                        type: "text",
                        class: "form",
                        placeholder: "New Email..."
                      })
                    ]),
                    createVNode("div", { class: "mb-2" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Password "),
                      createVNode("input", {
                        type: "password",
                        class: "form",
                        placeholder: "Password..."
                      })
                    ]),
                    createVNode("div", { class: "text-xs text-muted fw-semibold" }, " After changing your email address, a confirmation email will be sent to your inbox to confirm your identity. ")
                  ]),
                  createVNode("div", { class: "flex-wrap gap-2 flex-container justify-content-end section-borderless" }, [
                    createVNode("button", {
                      class: "btn btn-secondary",
                      onClick: ($event) => showModal("email-modal")
                    }, " Cancel ", 8, ["onClick"]),
                    createVNode("input", {
                      type: "submit",
                      class: "btn btn-success",
                      value: "Change Email"
                    })
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "username-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, "Change Username"),
                      createVNode("button", {
                        onClick: ($event) => showModal("username-modal"),
                        class: "btn-circle",
                        "data-toggle-modal": "#username-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "mb-2" }, [
                      createVNode("div", { class: "text-xs fw-bold text-danger text-uppercase" }, " Username "),
                      createVNode("input", {
                        type: "text",
                        class: "form",
                        placeholder: "New Username..."
                      }),
                      createVNode("div", { class: "text-xs text-danger fw-semibold" }, " This username is already taken. Try @Nabrious123 instead. ")
                    ]),
                    createVNode("div", { class: "mb-2" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Password "),
                      createVNode("input", {
                        type: "password",
                        class: "form",
                        placeholder: "Password..."
                      })
                    ]),
                    createVNode("div", { class: "text-xs text-muted fw-semibold" }, [
                      createTextVNode(" Changing your username costs"),
                      createVNode("span", { class: "mx-1 text-success" }, [
                        createVNode("i", { class: "fas fa-money-bill-1-wave" }),
                        createTextVNode(" " + toDisplayString(_ctx.$page.props.site.price.username), 1)
                      ]),
                      createTextVNode(". ")
                    ])
                  ]),
                  createVNode("div", { class: "flex-wrap gap-2 flex-container justify-content-end section-borderless" }, [
                    createVNode("button", {
                      class: "btn btn-secondary",
                      onClick: ($event) => showModal("username-modal")
                    }, " Cancel ", 8, ["onClick"]),
                    createVNode("input", {
                      type: "submit",
                      class: "btn btn-success",
                      value: "Change Username"
                    })
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "displayname-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, " Change Display Name "),
                      createVNode("button", {
                        class: "btn-circle",
                        onClick: ($event) => showModal("displayname-modal"),
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " New Display Name "),
                    createVNode("input", {
                      type: "text",
                      class: "mb-2 form",
                      placeholder: "New Display Name..."
                    }),
                    createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Password "),
                    createVNode("input", {
                      type: "password",
                      class: "mb-2 form",
                      placeholder: "Password..."
                    }),
                    createVNode("div", { class: "text-xs text-muted fw-semibold" }, " Changing your your display name is free but can only be done once every two weeks. ")
                  ]),
                  createVNode("div", { class: "flex-wrap gap-2 flex-container justify-content-end section-borderless" }, [
                    createVNode("button", {
                      class: "btn btn-secondary",
                      onClick: ($event) => showModal("displayname-modal")
                    }, " Cancel ", 8, ["onClick"]),
                    createVNode("input", {
                      type: "submit",
                      class: "btn btn-success",
                      value: "Change Display Name"
                    })
                  ])
                ])
              ]),
              createVNode("div", { class: "cell medium-3" }, [
                createVNode("div", { class: "mb-2 text-xl fw-semibold" }, "Account Settings"),
                createVNode("ul", { class: "tabs flex-dir-column" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                    return openBlock(), createBlock("li", { class: "tab-item" }, [
                      createVNode(_component_Link, {
                        href: unref(route)(`user.settings.page`, { category }),
                        class: [[unref(current)(`settings.page`, { category }) ? "active" : ""], "tab-link squish"]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.capitalized(category)), 1)
                        ]),
                        _: 2
                      }, 1032, ["href", "class"])
                    ]);
                  }), 256))
                ])
              ]),
              createVNode("div", { class: "cell medium-8" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                  return openBlock(), createBlock("div", { key: category }, [
                    category === "general" ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "mb-1 text-xl fw-semibold" }, "General"),
                      createVNode("div", { class: "section-borderless" }, [
                        createVNode("div", { class: "card card-body" }, [
                          createVNode("div", { class: "mb-2 text-xl fw-semibold" }, " Account Information "),
                          createVNode("div", { class: "section-borderless" }, [
                            createVNode("div", { class: "grid-x grid-margin-x" }, [
                              createVNode("div", { class: "mb-3 cell medium-6" }, [
                                createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify h-100" }, [
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, " User ID "),
                                    createVNode("div", { class: "text-truncate fw-semibold" }, toDisplayString(_ctx.$page.props.auth.user.id), 1)
                                  ]),
                                  createVNode(_sfc_main$2)
                                ])
                              ]),
                              createVNode("div", { class: "mb-3 cell medium-6" }, [
                                createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify" }, [
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, " Username "),
                                    createVNode("div", { class: "text-truncate fw-semibold" }, toDisplayString("@" + _ctx.$page.props.auth.user.username), 1)
                                  ]),
                                  createVNode("button", {
                                    class: "btn btn-info btn-circle",
                                    onClick: ($event) => showModal("username-modal")
                                  }, [
                                    createVNode("i", { class: "fas fa-pencil" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "mb-3 cell medium-6" }, [
                                createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify" }, [
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, " Display Name "),
                                    createVNode("div", { class: "text-truncate fw-semibold" }, toDisplayString(_ctx.$page.props.auth.user.display_name), 1)
                                  ]),
                                  createVNode("button", {
                                    class: "btn btn-info btn-circle",
                                    onClick: ($event) => showModal("displayname-modal")
                                  }, [
                                    createVNode("i", { class: "fas fa-pencil" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "mb-3 cell medium-6" }, [
                                createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify" }, [
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, [
                                      createTextVNode(" Email Address"),
                                      createVNode("span", {
                                        style: { "font-size": "10px" },
                                        class: "text-success ms-2"
                                      }, [
                                        createVNode("i", { class: "fas fa-check me-1" }),
                                        createTextVNode("Verified")
                                      ])
                                    ]),
                                    createVNode("div", { class: "text-truncate fw-semibold" }, toDisplayString(_ctx.$page.props.auth.user.email), 1)
                                  ]),
                                  createVNode("button", {
                                    class: "btn btn-info btn-circle",
                                    onClick: ($event) => showModal("email-modal")
                                  }, [
                                    createVNode("i", { class: "fas fa-pencil" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "mb-3 cell medium-6" }, [
                                createVNode("div", { class: "gap-2 align-middle card card-body card-inner flex-container align-justify" }, [
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("div", { class: "text-xs text-truncate fw-bold text-muted text-uppercase" }, " Date of Birth "),
                                    createVNode("div", { class: "text-truncate fw-semibold" }, toDisplayString(_ctx.$page.props.auth.user.birthdate), 1),
                                    createVNode("div", { class: "text-xs fw-semibold text-muted" }, [
                                      createTextVNode(" If you want to change your date of birth, "),
                                      createVNode("a", { href: "#" }, "contact support"),
                                      createTextVNode(". ")
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " About You "),
                            createVNode("div", { class: "mb-3 position-relative" }, [
                              createVNode("textarea", {
                                class: "form form-has-button pe-5",
                                rows: "5"
                              }, toDisplayString(_ctx.$page.props.auth.user.about_me), 1),
                              createVNode("input", {
                                type: "button",
                                class: "btn btn-success btn-sm",
                                value: "Update",
                                style: { "position": "absolute", "bottom": "10px", "right": "10px" }
                              })
                            ]),
                            createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Forum Signature "),
                            createVNode("div", { class: "gap-2 align-middle flex-container" }, [
                              createVNode("input", {
                                type: "text",
                                class: "form form-sm btn-sm",
                                value: _ctx.$page.props.auth.user.Signature
                              }, null, 8, ["value"]),
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
                          createVNode("div", { class: "mb-2 text-xl fw-semibold" }, " Website Theme "),
                          createVNode("div", {
                            id: "theme-switcher-container",
                            class: "grid-x grid-margin-x grid-padding-y"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.themes, (theme, index) => {
                              return openBlock(), createBlock("div", {
                                class: "cell large-6",
                                key: index
                              }, [
                                theme.available ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mb-2 theme-selection squish card card-body card-inner mb-lg-0",
                                  id: theme.name + "-theme-btn",
                                  onClick: ($event) => _ctx.setTheme(theme.name)
                                }, [
                                  createVNode("div", { class: "gap-4 align-middle flex-container" }, [
                                    createVNode("div", { class: "selection-circle flex-child-grow show-for-large" }),
                                    createVNode("div", {
                                      class: "gap-1 align-middle flex-container flex-dir-column",
                                      style: { "min-width": "0" }
                                    }, [
                                      createVNode("div", {
                                        class: "theme-circle" + theme.name
                                      }, null, 2),
                                      createVNode("div", { class: "text-lg fw-semibold text-truncate" }, toDisplayString(theme.name) + " Theme ", 1),
                                      createVNode("div", { class: "selection-circle flex-child-grow show-for-small hide-for-large" })
                                    ])
                                  ])
                                ], 8, ["id", "onClick"])) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    category === "account" ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("div", { class: "text-xl fw-semibold mb-1" }, " Security & Privacy "),
                      createVNode("div", { class: "section-borderless" }, [
                        createVNode("div", { class: "card card-body" }, [
                          createVNode("div", { class: "text-xl fw-semibold mb-2" }, "Security"),
                          createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                            createVNode("div", { class: "cell medium-12" }, [
                              createVNode("div", { class: "card card-inner card-body" }, [
                                createVNode("div", { class: "mb-2" }, [
                                  createVNode("div", { class: "text-xl fw-semibold mb-2" }, " Change Password "),
                                  createVNode("div", { class: "mb-2" }, [
                                    createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Current Password "),
                                    createVNode("input", {
                                      type: "password",
                                      class: "form form-has-section-color",
                                      placeholder: "Current Password..."
                                    })
                                  ]),
                                  createVNode("div", { class: "mb-2" }, [
                                    createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " New Password "),
                                    createVNode("input", {
                                      type: "password",
                                      class: "form form-has-section-color",
                                      placeholder: "Current Password..."
                                    })
                                  ]),
                                  createVNode("div", { class: "mb-2" }, [
                                    createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Confirm Password "),
                                    createVNode("input", {
                                      type: "password",
                                      class: "form form-has-section-color",
                                      placeholder: "Current Password..."
                                    })
                                  ])
                                ]),
                                createVNode("button", { class: "btn btn-success" }, " Change Password ")
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "section-borderless" }, [
                        createVNode("div", { class: "card card-body" }, [
                          createVNode("div", { class: "text-xl fw-semibold mb-2" }, "Other"),
                          createVNode("div", { class: "card card-inner card-body mb-3" }, [
                            createVNode("div", { class: "text-xl fw-semibold mb-2" }, " Privacy "),
                            createVNode("div", { class: "mb-2" }, [
                              createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Who Can Follow Me "),
                              createVNode("select", { class: "form form-select form-has-section-color" }, [
                                createVNode("option", { value: "1" }, "Everyone"),
                                createVNode("option", { value: "2" }, "No One")
                              ])
                            ]),
                            createVNode("div", { class: "mb-2" }, [
                              createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Who Can See My Posts? "),
                              createVNode("select", { class: "form form-select form-has-section-color" }, [
                                createVNode("option", { value: "1" }, "Everyone"),
                                createVNode("option", { value: "2" }, " Followers Only ")
                              ])
                            ]),
                            createVNode("div", { class: "mb-2" }, [
                              createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Who Can Send Me Messages "),
                              createVNode("select", { class: "form form-select form-has-section-color" }, [
                                createVNode("option", { value: "1" }, "Everyone"),
                                createVNode("option", { value: "2" }, " Followers Only "),
                                createVNode("option", { value: "3" }, "No One")
                              ])
                            ]),
                            createVNode("div", { class: "mb-2" }, [
                              createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Who Can Send Me Trade Requests "),
                              createVNode("select", { class: "form form-select form-has-section-color" }, [
                                createVNode("option", { value: "1" }, "Everyone"),
                                createVNode("option", { value: "2" }, " Followers Only "),
                                createVNode("option", { value: "3" }, "No One")
                              ])
                            ]),
                            createVNode("button", { class: "btn btn-success" }, " Save Settings ")
                          ]),
                          createVNode("div", { class: "card card-inner card-body" }, [
                            createVNode("div", { class: "text-xl fw-semibold mb-2" }, " Blocked Players "),
                            createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Player Username "),
                            createVNode("div", { class: "flex-container gap-2 mb-2" }, [
                              createVNode("input", {
                                type: "text",
                                class: "form form-has-section-color",
                                placeholder: "Player Username..."
                              }),
                              createVNode("button", { class: "btn btn-danger" }, " Block ")
                            ]),
                            createVNode("div", { class: "card card-body" }, [
                              createVNode("div", { class: "flex-container flex-dir-column text-center gap-3" }, [
                                createVNode("i", { class: "fas fa-user-slash text-5xl text-muted" }),
                                createVNode("div", { style: { "line-height": "16px" } }, [
                                  createVNode("div", { class: "fw-bold text-xs text-muted text-uppercase" }, " No Blocked Players "),
                                  createVNode("div", { class: "text-xs text-muted fw-semibold" }, " Yahoo! You have not blocked any players. ")
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    category === "billing" ? (openBlock(), createBlock("div", { key: 2 }, [
                      createVNode("div", { class: "flex-container align-middle align-justify mb-2" }, [
                        createVNode("div", { class: "text-xl fw-semibold" }, "Billing"),
                        createVNode("a", {
                          href: "#",
                          class: "btn btn-upgrade btn-sm"
                        }, [
                          createVNode("i", { class: "fas fa-rocket-launch me-2" }),
                          createTextVNode("Upgrade")
                        ])
                      ]),
                      createVNode("div", { class: "card card-body mb-3" }, [
                        createVNode("div", { class: "text-xl fw-semibold mb-2" }, " Active Membership "),
                        createVNode("div", { class: "card card-inner card-body" }, [
                          createVNode("div", { class: "flex-container flex-dir-column text-center gap-3" }, [
                            createVNode("i", { class: "fas fa-rocket-launch text-5xl text-muted" }),
                            createVNode("div", { style: { "line-height": "16px" } }, [
                              createVNode("div", { class: "fw-bold text-xs text-muted text-uppercase" }, " No Active Membership "),
                              createVNode("div", { class: "text-xs text-muted fw-semibold" }, " You currently do not have any active membership to manage. ")
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "card card-body" }, [
                        createVNode("div", { class: "text-xl fw-semibold mb-2" }, " Previous Purchases "),
                        createVNode("div", { class: "card card-inner card-body" }, [
                          createVNode("div", { class: "flex-container flex-dir-column text-center gap-3" }, [
                            createVNode("i", { class: "fas fa-envelope-open-text text-5xl text-muted" }),
                            createVNode("div", { style: { "line-height": "16px" } }, [
                              createVNode("div", { class: "fw-bold text-xs text-muted text-uppercase" }, " No Previous Purchases "),
                              createVNode("div", { class: "text-xs text-muted fw-semibold" }, " You have not made any purchases. ")
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
