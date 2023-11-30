import { defineComponent, ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><form class="mt-6 space-y-6"><div><label for="current_password" value="Current Password"></label><input id="current_password"${ssrRenderAttr("value", unref(form).current_password)} type="password" class="block w-full mt-1" autocomplete="current-password"><div${ssrRenderAttr("message", unref(form).errors.current_password)} class="mt-2"></div></div><div><label for="password" value="New Password"></label><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" class="block w-full mt-1" autocomplete="new-password"><input${ssrRenderAttr("message", unref(form).errors.password)} class="mt-2"></div><div><label for="password_confirmation" value="Confirm Password"></label><input id="password_confirmation"${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" class="block w-full mt-1" autocomplete="new-password"><div${ssrRenderAttr("message", unref(form).errors.password_confirmation)} class="mt-2"></div></div><div class="flex items-center gap-4"><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>Save</button></div></form></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Partials/UpdatePasswordForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
