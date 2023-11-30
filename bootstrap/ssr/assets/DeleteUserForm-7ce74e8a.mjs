import { defineComponent, ref, unref, useSSRContext } from "vue";
import { ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import "momentum-trail";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmingUserDeletion = ref(false);
    ref(null);
    const form = useForm({
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></button><div class="${ssrRenderClass([{ "active": confirmingUserDeletion.value }, "modal"])}" id="DeleteAcceountModal"><form><div class="modal-card modal-card-body modal-card-sm"><div class="section-borderless"><div class="gap-2 align-middle flex-container align-justify"><div class="text-lg fw-semibold">Delete Account</div><button class="btn-circle" style="${ssrRenderStyle({ "margin-right": "-10px" })}"><i class="fas fa-times"></i></button></div></div><div class="section-borderless"><div class="mb-2"><p class="fw-semibold text-muted text-md">Are you sure you want to delete your account?</p><div class="text-xs fw-bold text-muted text-uppercase"> Password </div><div class="field"><div class="control"><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" class="form" placeholder="Password"></div></div><div${ssrRenderAttr("message", unref(form).errors.password)} class="mt-2"></div><div class="text-xs text-muted fw-semibold"> Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. </div><div class="min-w-0 gap-2 mt-3 flex-container"><button class="btn btn-info btn-sm text-truncate w-100">Cancel</button><button class="btn btn-danger btn-sm text-truncate w-100"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}> Close Account </button></div></div></div></div></form></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Settings/Partials/DeleteUserForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
