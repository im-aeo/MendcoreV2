import { defineComponent, ref, computed, watch, useSSRContext } from "vue";
import { ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashMessages",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const show = ref(true);
    const message = computed(() => props.message);
    const errorMessage = computed(() => props.error);
    const errors = computed(() => props.error);
    const hasError = computed(() => errors.value || Object.keys(errors.value || {}).length > 0);
    watch([message, hasError], () => {
      show.value = true;
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (message.value && show.value) {
        _push(`<div class="mb-3 text-center alert alert-success fw-semibold">${ssrInterpolate(message.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (hasError.value && show.value) {
        _push(`<div class="mb-3 text-center alert alert-danger fw-semibold">`);
        if (errorMessage.value) {
          _push(`<div>${ssrInterpolate(errorMessage.value)}</div>`);
        } else {
          _push(`<div>`);
          if (Object.keys(errors.value).length === 1) {
            _push(`<span>You have an error in your request.</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div>You have ${ssrInterpolate(Object.keys(errors.value).length)} errors in your request.</div></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Messages/FlashMessages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
