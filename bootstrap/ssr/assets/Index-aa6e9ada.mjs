import axios from "axios";
import { route } from "momentum-trail";
import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
const _sfc_main = {
  data() {
    return {
      password: "",
      showError: false,
      errorMsg: ""
    };
  },
  methods: {
    submitPassword() {
      this.showError = false;
      this.errorMsg = "";
      if (!this.password) {
        this.errorMsg = "Please provide a password.";
        this.showError = true;
        return;
      }
      axios.post(route(`maintenance.authenticate.password`), { password: this.password }).then((response) => {
        if (response.data.error) {
          this.errorMsg = response.data.error;
          this.showError = true;
        } else {
          location.reload();
        }
      }).catch((error) => {
        console.error(error);
        this.errorMsg = "An error occurred while processing the request.";
        this.showError = true;
      });
    }
  }
};
const Index_vue_vue_type_style_index_0_scoped_61d74d06_lang = "";
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AppFooter = resolveComponent("AppFooter");
  _push(`<!--[--><div class="justify-center w-40 grid-x maint-body align-center" data-v-61d74d06><div class="mt-5 cell large-5 medium-5" data-v-61d74d06><div class="mb-3 card card-body w-100" data-v-61d74d06><div class="row align-items-center" data-v-61d74d06><div class="text-center col-md-3 text-center-sm" data-v-61d74d06><i class="fas fa-user-hard-hat text-info" style="${ssrRenderStyle({ "font-size": "90px" })}" data-v-61d74d06></i></div><div class="mt-4 col-md-9" data-v-61d74d06><div class="text-xl fw-semibold" data-v-61d74d06>Maintenance</div><div class="mt-1 text-sm text-muted" data-v-61d74d06>We will be back up soon!</div></div></div><div class="mx-1 my-3 divider" data-v-61d74d06></div><form data-v-61d74d06><div class="mb-2" data-v-61d74d06><input class="form" type="password" placeholder="Developer Password"${ssrRenderAttr("value", $data.password)} data-v-61d74d06></div><button class="mb-2 btn btn-info w-100 d-block" type="submit" data-v-61d74d06>Enter</button></form>`);
  if ($data.showError) {
    _push(`<div class="mb-2 text-xs text-danger fw-bold mini-text" data-v-61d74d06>${ssrInterpolate($data.errorMsg)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Maintenance/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-61d74d06"]]);
export {
  Index as default
};
