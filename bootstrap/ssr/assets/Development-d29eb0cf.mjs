import { resolveComponent, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3";
import "momentum-trail";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const _sfc_main = {
  data() {
    return {
      password: "",
      showError: false
    };
  },
  methods: {
    submitPassword() {
      this.$inertia.post("/maintenance", { password: this.password }).then(() => {
        location.reload();
      }).catch(() => {
        this.showError = true;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Footer = resolveComponent("Footer");
  _push(`<!--[--><main class="container"><div class="grid-x"><div class="cell medium-7 p-2"><div class="text-xl fw-semibold mb-1">Roadmap - ${ssrInterpolate(_ctx.$page.props.site.name)} <i class="fas fa-globe text-warning"></i></div><div class="card card-body mb-3"><div class="mb-3">${ssrInterpolate(_ctx.$page.props.site.name)} is a new website where you can imagine something you&#39;ve always wanted to build, and then bring that imagination into a creation of your own. ${ssrInterpolate(_ctx.$page.props.site.name)} is pretty new and were still setting everything up to be ready for you. <p>We can not wait to see you on ${ssrInterpolate(_ctx.$page.props.site.name)}! ❤️</p><div class="text-xl">Frequently Asked Questions</div><div class="mx-1 my-2 divider"></div><p><b>Will ${ssrInterpolate(_ctx.$page.props.site.name)} have a game client &amp; workshop?</b></p><p>Yes, ${ssrInterpolate(_ctx.$page.props.site.name)} will have an official game client and workshop! Our client is specifically being made in the Godot engine, so users can have everything they need to start bring their imagination to life.</p><p><b>Can I reserve my username?</b></p><p>As of right now, it is not possible to reserve a username, although we will be opening this up in the near future close to ${ssrInterpolate(_ctx.$page.props.site.name)}&#39;s release. You will only be able to reserve one username, including spaced usernames.</p></div></div></div><div class="cell medium-5 p-2"><div class="text-xl fw-semibold mb-1">Progress <i class="fas fa-bars-progress fa-flip-horizontal text-warning"></i></div><div class="card card-body mb-2"><div class="mb-2"><ul class="tabs flex-dir-column"><li class="tab-item"><a href="#" class="tab-link active squish"><i class="fas fa-check"> </i>Authentication</a></li><li class="tab-item mt-1"><a href="#" class="tab-link active squish"><i class="fas fa-check"> </i>Item Shop</a></li><li class="tab-item mt-1"><a href="#" class="tab-link active squish"><i class="fas fa-check"> </i>Forums</a></li><li class="tab-item"><a href="#" class="tab-link squish"><i class="fas fa-clock text-warning"> </i>Settings</a></li><li class="tab-item"><a href="#" class="tab-link squish"><i class="fas fa-clock text-warning"> </i>Real Life Purchasing</a></li><li class="tab-item"><a href="#" class="tab-link squish"><i class="fas fa-clock text-warning"> </i>Settings</a></li><li class="tab-item"><a href="#" class="tab-link squish"><i class="fas fa-clock text-warning"> </i>Real Life Purchasing (Memberships)</a></li></ul></div></div><div class="card card-body mb-3"><div class="text-xl">Maintenance Code</div><div class="text-sm mt-1 text-muted">We will be back up soon!</div><div class="mx-1 my-3 divider"></div><form><div class="mb-2"><input class="form" type="password" placeholder="Developer Password"${ssrRenderAttr("value", $data.password)}></div><button class="btn btn-info mb-2 w-100 d-block" type="submit">Enter</button></form>`);
  if ($data.showError) {
    _push(`<div class="text-xs text-danger fw-bold mini-text mb-2"> Incorrect password. Please try again. </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div></main>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Maintenance/Development.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Development = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Development as default
};
