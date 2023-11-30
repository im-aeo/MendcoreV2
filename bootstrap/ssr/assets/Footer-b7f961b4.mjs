import { defineComponent, resolveDirective, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const __default__ = {
  methods: {
    showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    },
    addActiveClass(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.toggle("active");
      }
    },
    sidebarOpen() {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.toggle("show-for-large");
      }
    },
    addActiveClassSSInput(elementId) {
      const element = document.getElementById(elementId);
      const isEmpty = (str) => !str.trim().length;
      if (element) {
        element.addEventListener("input", function() {
          if (isEmpty(this.value)) {
            return;
          } else {
            element.classList.toggle("hide");
          }
        });
      }
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const props = usePage().props;
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tippy = resolveDirective("tippy");
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer footer-fixed" }, _attrs))}><main class="container py-3"><div class="align-middle grid-x grid-margin-x"><div class="cell small-1"><div class="gap-3 flex-container align-right align-center-sm"><img${ssrRenderAttr("src", unref(props).site.icon)}></div></div><div class="cell large-6"><div class="mb-1 text-lg fw-semibold mb-lg-0"> Copyright © 2023 ${ssrInterpolate(unref(props).site.name)}. All rights reserved. </div><div class="mb-2 flex-container-lg mb-lg-0"><a href="#" class="text-sm footer-link fw-semibold">TERMS OF SERVICE</a><a href="#" class="text-sm footer-link fw-semibold">PRIVACY POLICY</a><a href="#" class="text-sm footer-link fw-semibold">JOBS</a><a href="#" class="text-sm footer-link fw-semibold">CONTACT</a></div></div><div class="cell large-5"><div class="gap-3 flex-container align-right align-center-sm"><button${ssrRenderAttrs(mergeProps({
        href: "#",
        class: "text-2xl footer-media text-muted",
        content: "Language"
      }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><i class="fas fa-language"></i></button><a${ssrRenderAttrs(mergeProps({
        href: unref(props).site.socials.discord,
        class: "text-2xl footer-media text-muted",
        content: "Join us on Discord"
      }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><i class="fab fa-discord"></i></a><a${ssrRenderAttrs(mergeProps({
        href: unref(props).site.socials.twitter,
        class: "text-2xl footer-media text-muted",
        content: "Follow us on Twitter"
      }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><i class="fab fa-twitter"></i></a><a${ssrRenderAttrs(mergeProps({
        href: unref(props).site.socials.twitch,
        class: "text-2xl footer-media text-muted",
        content: "Follow us on Twitch"
      }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><i class="fab fa-twitch"></i></a><a${ssrRenderAttrs(mergeProps({
        href: unref(props).site.socials.tiktok,
        class: "text-2xl footer-media text-muted",
        content: "Follow us on TikTok"
      }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><i class="fab fa-tiktok"></i></a><a${ssrRenderAttrs(mergeProps({
        href: unref(usePage)().props.site.socials.facebook,
        class: "text-2xl footer-media text-muted",
        content: "Follow us on Facebook"
      }, ssrGetDirectiveProps(_ctx, _directive_tippy)))}><i class="fab fa-facebook"></i></a></div></div></div></main></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LayoutParts/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
