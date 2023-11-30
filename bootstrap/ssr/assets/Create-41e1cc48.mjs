import { defineComponent, withCtx, unref, createVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-27c1e422.mjs";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$2 } from "./Footer-b7f961b4.mjs";
import { useForm } from "@inertiajs/inertia-vue3";
import { route } from "momentum-trail";
import axios from "axios";
import "@inertiajs/vue3";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: "",
      body: ""
    });
    const submit = () => {
      axios.get(`/sanctum/csrf-cookie`).then((response) => {
        form.post(route(`forum.create.validate`, { id: props.topic.id }), {
          onFinish: () => form.reset("password")
        });
      });
    };
    const addText = (text) => {
      form.body += text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card card-body"${_scopeId}><div class="text-xl text-danger bg-primary"${_scopeId}>Create a Post</div><div class="text-xs text-muted bg-primary"${_scopeId}> Make sure you post in the appropriate sub-forum and that your post does not break any site rules. </div><div class="mx-1 my-3 divider"${_scopeId}></div><form${_scopeId}><label for="post-title" class="mb-2 text-xs fw-bold text-uppercase"${_scopeId}>Post Title</label><input id="post-title" class="mb-2 form" type="text" name="title"${ssrRenderAttr("value", unref(form).title)} placeholder="Title" maxlength="64"${_scopeId}><label for="post-body" class="mb-2 text-xs fw-bold text-uppercase"${_scopeId}>Post Content</label><textarea id="post-body" class="mb-2 form" name="body" placeholder="Body" maxlength="4096"${_scopeId}>${ssrInterpolate(unref(form).body)}</textarea><button class="btn btn-success btn-block" type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>Create</button></form><div class="min-w-0 gap-2 mt-3 flex-container"${_scopeId}><button class="btn btn-info"${_scopeId}>Add Color</button><button class="btn btn-warning"${_scopeId}>Bold Text</button><button class="btn btn-success"${_scopeId}>Italic Text</button><button class="btn btn-success"${_scopeId}>Underline Text</button><button class="btn btn-info"${_scopeId}>Insert an Image</button><button class="btn btn-danger"${_scopeId}>Link To Website</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "card card-body" }, [
                createVNode("div", { class: "text-xl text-danger bg-primary" }, "Create a Post"),
                createVNode("div", { class: "text-xs text-muted bg-primary" }, " Make sure you post in the appropriate sub-forum and that your post does not break any site rules. "),
                createVNode("div", { class: "mx-1 my-3 divider" }),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  createVNode("label", {
                    for: "post-title",
                    class: "mb-2 text-xs fw-bold text-uppercase"
                  }, "Post Title"),
                  withDirectives(createVNode("input", {
                    id: "post-title",
                    class: "mb-2 form",
                    type: "text",
                    name: "title",
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    placeholder: "Title",
                    maxlength: "64"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).title]
                  ]),
                  createVNode("label", {
                    for: "post-body",
                    class: "mb-2 text-xs fw-bold text-uppercase"
                  }, "Post Content"),
                  withDirectives(createVNode("textarea", {
                    id: "post-body",
                    class: "mb-2 form",
                    name: "body",
                    "onUpdate:modelValue": ($event) => unref(form).body = $event,
                    placeholder: "Body",
                    maxlength: "4096"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).body]
                  ]),
                  createVNode("button", {
                    class: "btn btn-success btn-block",
                    type: "submit",
                    disabled: unref(form).processing
                  }, "Create", 8, ["disabled"])
                ], 40, ["onSubmit"]),
                createVNode("div", { class: "min-w-0 gap-2 mt-3 flex-container" }, [
                  createVNode("button", {
                    class: "btn btn-info",
                    onClick: ($event) => addText("[color=#hexcodehere]Colored Text[/color]")
                  }, "Add Color", 8, ["onClick"]),
                  createVNode("button", {
                    class: "btn btn-warning",
                    onClick: ($event) => addText("[b]Bold Text[/b]")
                  }, "Bold Text", 8, ["onClick"]),
                  createVNode("button", {
                    class: "btn btn-success",
                    onClick: ($event) => addText("[i]Italic Text[/i]")
                  }, "Italic Text", 8, ["onClick"]),
                  createVNode("button", {
                    class: "btn btn-success",
                    onClick: ($event) => addText("[u]Underlined Text[/u]")
                  }, "Underline Text", 8, ["onClick"]),
                  createVNode("button", {
                    class: "btn btn-info",
                    onClick: ($event) => addText("[img]Image Link[/img]")
                  }, "Insert an Image", 8, ["onClick"]),
                  createVNode("button", {
                    class: "btn btn-danger",
                    onClick: ($event) => addText("[url=https://yourlinkhere]Link Text[/url]")
                  }, "Link To Website", 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Forum/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
