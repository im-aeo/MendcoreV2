import { defineComponent, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import dayjs from "dayjs";
import { Head, usePage } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHead",
  __ssrInlineRender: true,
  props: {
    pageTitle: { type: String },
    description: { type: String },
    url: { type: String },
    cover: { type: String },
    item: { type: Boolean, default: false },
    iid: { type: Number },
    itime: { type: Number, default: null }
  },
  setup(__props) {
    const getFormattedDate = (timeStamp) => {
      if (timeStamp !== null && !isNaN(timeStamp)) {
        return dayjs(timeStamp).format("m-d-Y H:i");
      }
      return null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Head), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.pageTitle)}</title><meta charset="UTF-8"${_scopeId}><meta http-equiv="X-UA-Compatible" content="IE=edge"${_scopeId}><meta name="theme-color" content="#03a9f4"${_scopeId}><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"${_scopeId}><meta name="robots" content="index,follow"${_scopeId}><link rel="shortcut icon" type="image/x-icon"${ssrRenderAttr("href", unref(usePage)().props.site.icon)}${_scopeId}><meta${ssrRenderAttr("content", __props.pageTitle)} name="title"${_scopeId}><meta${ssrRenderAttr("content", __props.description)} name="description"${_scopeId}><meta content="website" property="og:type"${_scopeId}><meta${ssrRenderAttr("content", __props.url)} property="og:url"${_scopeId}><meta${ssrRenderAttr("content", __props.pageTitle)} property="og:title"${_scopeId}><meta${ssrRenderAttr("content", __props.description)} property="og:description"${_scopeId}><meta${ssrRenderAttr("content", __props.cover || unref(usePage)().props.site.icon)} property="og:image"${_scopeId}><meta content="summary_large_image" property="twitter:card"${_scopeId}><meta${ssrRenderAttr("content", __props.url)} property="twitter:url"${_scopeId}><meta${ssrRenderAttr("content", __props.pageTitle)} property="twitter:title"${_scopeId}><meta${ssrRenderAttr("content", __props.description)} property="twitter:description"${_scopeId}><meta${ssrRenderAttr("content", __props.cover || unref(usePage)().props.site.icon)} property="twitter:image"${_scopeId}>`);
            if (__props.item) {
              _push2(`<meta name="item-info"${ssrRenderAttr("data-id", __props.iid)}${ssrRenderAttr("data-onsale-until", getFormattedDate(__props.itime))}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.pageTitle), 1),
              createVNode("meta", { charset: "UTF-8" }),
              createVNode("meta", {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge"
              }),
              createVNode("meta", {
                name: "theme-color",
                content: "#03a9f4"
              }),
              createVNode("meta", {
                "http-equiv": "Content-Type",
                content: "text/html; charset=UTF-8"
              }),
              createVNode("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0, maximum-scale=1.0"
              }),
              createVNode("meta", {
                name: "robots",
                content: "index,follow"
              }),
              createVNode("link", {
                rel: "shortcut icon",
                type: "image/x-icon",
                href: unref(usePage)().props.site.icon
              }, null, 8, ["href"]),
              createVNode("meta", {
                content: __props.pageTitle,
                name: "title"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: __props.description,
                name: "description"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: "website",
                property: "og:type"
              }),
              createVNode("meta", {
                content: __props.url,
                property: "og:url"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: __props.pageTitle,
                property: "og:title"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: __props.description,
                property: "og:description"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: __props.cover || unref(usePage)().props.site.icon,
                property: "og:image"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: "summary_large_image",
                property: "twitter:card"
              }),
              createVNode("meta", {
                content: __props.url,
                property: "twitter:url"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: __props.pageTitle,
                property: "twitter:title"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: __props.description,
                property: "twitter:description"
              }, null, 8, ["content"]),
              createVNode("meta", {
                content: __props.cover || unref(usePage)().props.site.icon,
                property: "twitter:image"
              }, null, 8, ["content"]),
              __props.item ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "item-info",
                "data-id": __props.iid,
                "data-onsale-until": getFormattedDate(__props.itime)
              }, null, 8, ["data-id", "data-onsale-until"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppHead.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
