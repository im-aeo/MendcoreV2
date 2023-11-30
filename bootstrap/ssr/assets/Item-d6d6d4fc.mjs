import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { S as Sidebar } from "./Sidebar-18a842f2.mjs";
import { _ as _sfc_main$2 } from "./Navbar-27c1e422.mjs";
import { _ as _sfc_main$3 } from "./Footer-b7f961b4.mjs";
import { _ as _sfc_main$1 } from "./AppHead-8e83a103.mjs";
import { usePage } from "@inertiajs/vue3";
import { route } from "momentum-trail";
import axios from "axios";
import "../ssr.mjs";
import "vue-skeletor";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
import "vue-tippy";
import "v-lazy-image";
import "dayjs";
const __default__ = {
  name: "MyComponent",
  methods: {
    isNewItem(created_at) {
      const currentTime = /* @__PURE__ */ new Date();
      const itemTime = new Date(created_at);
      const timeDifference = currentTime - itemTime;
      const twoHoursInMillis = 2 * 60 * 60 * 1e3;
      return timeDifference < twoHoursInMillis;
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
  __ssrInlineRender: true,
  props: {
    item: {},
    reccomendations: {}
  },
  setup(__props) {
    ref(false);
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const purchaseBucks = () => {
      axios.get(`/sanctum/csrf-cookie`).then((response) => {
        axios.post(route(`store.purchase`, { id: usePage().props.item.id, currencyType: "bucks" }));
      });
    };
    const purchaseCoins = () => {
      axios.get(`/sanctum/csrf-cookie`).then((response) => {
        axios.post(route(`store.purchase`, { id: usePage().props.item.id, currencyType: "coins" }));
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        pageTitle: unref(usePage)().props.item.name,
        description: unref(usePage)().props.item.description,
        url: unref(route)(`store.item`, { id: _ctx.item.id }),
        item: true,
        iid: unref(usePage)().props.item.id,
        itime: unref(usePage)().props.item.time_off_sale,
        cover: unref(usePage)().props.item.thumbnail
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(Sidebar, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal" id="sell-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>Sell</div><button class="btn-circle" data-toggle-modal="#sell-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="gap-2 flex-container"${_scopeId}><div class="w-100"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Which Copy </div><select class="form form-select form-xs"${_scopeId}><option value="1"${_scopeId}>Copy #1</option></select></div><div class="w-100"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> Price (Bucks) </div><input type="text" class="form form-xs" placeholder="Price"${_scopeId}></div></div></div><div class="gap-2 flex-container align-right section-borderless"${_scopeId}><a href="#" class="btn btn-success btn-sm"${_scopeId}>Sell</a><button class="btn btn-secondary btn-sm" data-toggle-modal="#purchase-with-bucks-modal"${_scopeId}> Cancel </button></div></div></div><div class="modal" id="crate-roll-modal"${_scopeId}><div class="modal-card modal-card-body"${_scopeId}><div class="section-borderless"${_scopeId}><div class="py-1 modal-scroll"${_scopeId}><div class="p-2 d-inline-block card card-five-star me-2"${_scopeId}><img src="/assets/img/item_dummy_2.png"${_scopeId}></div><div class="p-2 d-inline-block card card-four-star me-2"${_scopeId}><img src="/assets/img/item_dummy_3.png"${_scopeId}></div><div class="p-2 d-inline-block card card-three-star me-2"${_scopeId}><img src="/assets/img/item_dummy_5.png"${_scopeId}></div><div class="p-2 d-inline-block card card-three-star me-2"${_scopeId}><img src="/assets/img/item_dummy_6.png"${_scopeId}></div><div class="p-2 d-inline-block card card-four-star me-2"${_scopeId}><img src="/assets/img/item_dummy_4.png"${_scopeId}></div><div class="p-2 d-inline-block card card-two-and-one-star me-2"${_scopeId}><div class="align-middle w-100 h-100 flex-container flex-dir-column align-center"${_scopeId}><i class="text-3xl fas fa-coins text-warning"${_scopeId}></i><div class="text-sm fw-semibold text-warning"${_scopeId}> 1000 </div></div></div><div class="p-2 d-inline-block card card-two-and-one-star me-2"${_scopeId}><div class="align-middle w-100 h-100 flex-container flex-dir-column align-center"${_scopeId}><i class="text-3xl fas fa-money-bill-1-wave text-success"${_scopeId}></i><div class="text-sm fw-semibold text-success"${_scopeId}> 10 </div></div></div></div><div class="mt-2 align-middle flex-container"${_scopeId}><div class="divider flex-child-grow ms-0"${_scopeId}></div><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}><i class="fas fa-arrow-up"${_scopeId}></i></div><div class="divider flex-child-grow me-0"${_scopeId}></div></div></div></div></div><div class="modal" id="crate-info-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> Information About {crateName} </div><button class="btn-circle" data-toggle-modal="#crate-info-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="text-sm text-muted fw-semibold"${_scopeId}><div class="mb-2 card card-inner card-body"${_scopeId}><div${_scopeId}> Base probability of winning <span class="text-warning"${_scopeId}><i class="fas fa-star"${_scopeId}></i> 5 star item</span> is <span class="fw-bold text-body"${_scopeId}>??%</span></div><div${_scopeId}> Base probability of winning <span class="text-membership"${_scopeId}><i class="fas fa-star"${_scopeId}></i> 4 star item</span> is <span class="fw-bold text-body"${_scopeId}>??%</span></div><div${_scopeId}> Base probability of winning <span class="text-success"${_scopeId}><i class="fas fa-star"${_scopeId}></i> 3 star item</span> is <span class="fw-bold text-body"${_scopeId}>??%</span></div><div${_scopeId}> Base probability of winning <span class="text-danger"${_scopeId}><i class="fas fa-star"${_scopeId}></i> 2 star item</span> is <span class="fw-bold text-body"${_scopeId}>??%</span></div><div${_scopeId}> Base probability of winning <span class="text-info"${_scopeId}><i class="fas fa-star"${_scopeId}></i> 1 star item</span> is <span class="fw-bold text-body"${_scopeId}>??%</span></div></div><div class="mb-2 card card-inner card-body"${_scopeId}> Upon opening <span class="text-body fw-bold"${_scopeId}>9</span> crates, the next crate you open will have its base probability of winning a <span class="text-membership"${_scopeId}><i class="fas fa-star"${_scopeId}></i> 4 star item</span> boosted to 100% </div><div class="card card-inner card-body"${_scopeId}> Upon opening <span class="text-body fw-bold"${_scopeId}>49</span> crates, the next crate you open will have its base probability of winning a <span class="text-warning"${_scopeId}><i class="fas fa-star"${_scopeId}></i> 5 star item</span> boosted to 100% </div></div></div></div></div><div class="modal" id="view-crate-content-modal"${_scopeId}><div class="modal-card modal-card-body"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> {crateName}&#39;s Contents </div><button class="btn-circle" data-toggle-modal="#view-crate-content-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="align-middle flex-container"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> 5 Star Items </div><div class="divider flex-child-grow"${_scopeId}></div></div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-3"${_scopeId}><a href="#"${_scopeId}><div class="p-2 mb-1 card card-five-star"${_scopeId}><img src="/assets/img/item_dummy_2.png"${_scopeId}></div><div class="text-lg text-truncate fw-semibold text-warning"${_scopeId}> Bowtie </div></a></div></div><div class="align-middle flex-container"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> 4 Star Items </div><div class="divider flex-child-grow"${_scopeId}></div></div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-3"${_scopeId}><a href="#"${_scopeId}><div class="p-2 mb-1 card card-four-star"${_scopeId}><img src="/assets/img/item_dummy_3.png"${_scopeId}></div><div class="text-lg text-truncate fw-semibold text-membership"${_scopeId}> Tree Helmet </div></a></div><div class="cell medium-3"${_scopeId}><a href="#"${_scopeId}><div class="p-2 mb-1 card card-four-star"${_scopeId}><img src="/assets/img/item_dummy_4.png"${_scopeId}></div><div class="text-lg text-truncate fw-semibold text-membership"${_scopeId}> Fall Fedora </div></a></div></div><div class="align-middle flex-container"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> 3 Star Items </div><div class="divider flex-child-grow"${_scopeId}></div></div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-3"${_scopeId}><a href="#"${_scopeId}><div class="p-2 mb-1 card card-three-star"${_scopeId}><img src="/assets/img/item_dummy_5.png"${_scopeId}></div><div class="text-lg text-truncate fw-semibold text-success"${_scopeId}> Astronaut Helmet </div></a></div><div class="cell medium-3"${_scopeId}><a href="#"${_scopeId}><div class="p-2 mb-1 card card-three-star"${_scopeId}><img src="/assets/img/item_dummy_6.png"${_scopeId}></div><div class="text-lg text-truncate fw-semibold text-success"${_scopeId}> Fall Fedora </div></a></div></div><div class="align-middle flex-container"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> 2 Star Items </div><div class="divider flex-child-grow"${_scopeId}></div></div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-3"${_scopeId}><div class="p-2 mb-1 text-center card card-inner"${_scopeId}><i class="py-4 fas fa-money-bill-1-wave text-success text-7xl"${_scopeId}></i></div><div class="text-lg text-truncate fw-semibold text-success"${_scopeId}> 10 Cash </div></div><div class="cell medium-3"${_scopeId}><div class="p-2 mb-1 text-center card card-inner"${_scopeId}><i class="py-4 fas fa-money-bill-1-wave text-success text-7xl"${_scopeId}></i></div><div class="text-lg text-truncate fw-semibold text-success"${_scopeId}> 100 Cash </div></div><div class="cell medium-3"${_scopeId}><div class="p-2 mb-1 text-center card card-inner"${_scopeId}><i class="py-4 fas fa-money-bill-1-wave text-success text-7xl"${_scopeId}></i></div><div class="text-lg text-truncate fw-semibold text-success"${_scopeId}> 500 Cash </div></div></div><div class="align-middle flex-container"${_scopeId}><div class="text-xs fw-bold text-muted text-uppercase"${_scopeId}> 1 Star Items </div><div class="divider flex-child-grow"${_scopeId}></div></div><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-3"${_scopeId}><div class="p-2 mb-1 text-center card card-inner"${_scopeId}><i class="py-4 fas fa-coins text-warning text-7xl"${_scopeId}></i></div><div class="text-lg text-truncate fw-semibold text-warning"${_scopeId}> 10 Coins </div></div><div class="cell medium-3"${_scopeId}><div class="p-2 mb-1 text-center card card-inner"${_scopeId}><i class="py-4 fas fa-coins text-warning text-7xl"${_scopeId}></i></div><div class="text-lg text-truncate fw-semibold text-warning"${_scopeId}> 100 Coins </div></div><div class="cell medium-3"${_scopeId}><div class="p-2 mb-1 text-center card card-inner"${_scopeId}><i class="py-4 fas fa-coins text-warning text-7xl"${_scopeId}></i></div><div class="text-lg text-truncate fw-semibold text-warning"${_scopeId}> 500 Coins </div></div><div class="cell medium-3"${_scopeId}><div class="p-2 mb-1 text-center card card-inner"${_scopeId}><i class="py-4 fas fa-coins text-warning text-7xl"${_scopeId}></i></div><div class="text-lg text-truncate fw-semibold text-warning"${_scopeId}> 1000 Coins </div></div></div></div></div></div><div class="modal" id="purchase-with-bucks-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>Confirm Purchase</div><button class="btn-circle" data-toggle-modal="#purchase-with-bucks-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="text-sm text-muted fw-semibold"${_scopeId}> Are you sure you want to buy <span class="text-body fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.name)}</span> for <span class="text-success"${_scopeId}><i class="fas fa-money-bill-1-wave me-1"${_scopeId}></i>${ssrInterpolate(unref(usePage)().props.item.cost_bucks)} Bucks</span>? </div></div><div class="gap-2 flex-container align-right section-borderless"${_scopeId}><form${_scopeId}><button type="submit" class="btn btn-success btn-sm"${_scopeId}>Buy Now</button><button type="button" class="btn btn-secondary btn-sm" data-toggle-modal="#purchase-with-bucks-modal"${_scopeId}> Cancel </button></form></div></div></div><div class="modal" id="purchase-with-coins-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>Confirm Purchase</div><button class="btn-circle" data-toggle-modal="#purchase-with-coins-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="section-borderless"${_scopeId}><div class="text-sm text-muted fw-semibold"${_scopeId}> Are you sure you want to buy <span class="text-body fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.name)}</span> for <span class="text-warning"${_scopeId}><i class="fas fa-coins me-1"${_scopeId}></i>${ssrInterpolate(unref(usePage)().props.item.cost_coins)} Coins</span>? </div></div><div class="gap-2 flex-container align-right section-borderless"${_scopeId}><form${_scopeId}><button type="submit" class="btn btn-warning btn-sm"${_scopeId}>Buy Now</button><button class="btn btn-secondary btn-sm" type="button" data-toggle-modal="#purchase-with-coins-modal"${_scopeId}> Cancel </button></form></div></div></div><div class="modal" id="verified-modal"${_scopeId}><div class="modal-card modal-card-body modal-card-sm"${_scopeId}><div class="section-borderless"${_scopeId}><div class="gap-2 align-middle flex-container align-justify"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}>Verified Badge</div><button class="btn-circle" data-toggle-modal="#verified-modal" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><i class="fas fa-times"${_scopeId}></i></button></div></div><div class="text-center section-borderless"${_scopeId}><i class="mb-3 text-6xl fas fa-shield-check text-success"${_scopeId}></i><div class="text-sm text-muted fw-semibold"${_scopeId}> This account is verified because it&#39;s a noteable and trustworthy figure in Eclipse. </div></div><div class="gap-2 flex-container align-center section-borderless"${_scopeId}><a href="#" class="btn btn-success btn-sm"${_scopeId}>Learn More</a><button class="btn btn-secondary btn-sm" data-toggle-modal="#verified-modal"${_scopeId}> Close </button></div></div></div><div class="cell large-12"${_scopeId}><div class="grid-x grid-margin-x grid-padding-y"${_scopeId}><div class="cell medium-5"${_scopeId}><div class="mb-3 overflow-hidden card"${_scopeId}><div class="p-4 position-relative"${_scopeId}><div style="${ssrRenderStyle({ "position": "absolute", "top": "10px", "left": "10px" })}"${_scopeId}>`);
            if (_ctx.item.rare) {
              _push2(`<div class="mb-1"${_scopeId}><span class="badge badge-witch fw-semibold"${_scopeId}><i class="fas fa-star" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId}></i>Rare </span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.isNewItem(_ctx.item.created_at)) {
              _push2(`<div class="mb-1"${_scopeId}><span class="badge badge-info fw-semibold"${_scopeId}><i class="fas fa-fire" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId}></i>New </span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-1"${_scopeId}>`);
            if (unref(usePage)().props.item.sale_ongoing) {
              _push2(`<div class="mb-1 badge badge-danger fw-semibold"${_scopeId}><i class="fas fa-badge-percent" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId}></i>${ssrInterpolate(unref(usePage)().props.item.percent_off + "%")} off </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-1"${_scopeId}><span class="badge badge-danger fw-semibold"${_scopeId}><i class="fas fa-clock" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId}></i>Goes offsale in 10:10:12 </span></div></div><div class="gap-1 flex-container flex-dir-column" style="${ssrRenderStyle({ "position": "absolute", "bottom": "10px", "right": "10px" })}"${_scopeId}><div class="ms-auto"${_scopeId}><button class="btn btn-secondary btn-xs"${_scopeId}> Preview </button></div>`);
            if (unref(usePage)().props.item.type != "crate") {
              _push2(`<div class="ms-auto"${_scopeId}><button class="btn btn-success btn-xs" data-toggle-modal="#view-crate-content-modal"${_scopeId}> View Contents </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><img${ssrRenderAttr("src", unref(usePage)().props.item.thumbnail)} class="mx-auto d-block" id="thumbnail" width="512" height="512"${_scopeId}></div><div class="gap-2 py-2 overflow-hidden text-sm text-center align-middle flex-container align-center bg-success fw-semibold"${_scopeId}><i class="text-lg fas fa-party-horn"${_scopeId}></i> Yahoo! You own this item. </div></div>`);
            if (unref(usePage)().props.item.type != "crate") {
              _push2(`<div class="gap-3 mb-3 align-middle flex-container"${_scopeId}><button class="btn btn-info btn-xs w-100" data-toggle-modal="#crate-roll-modal"${_scopeId}> Open Crate </button><div class="text-xs text-center flex-child-grow text-danger fw-bold text-uppercase"${_scopeId}> 9 Owned </div><button class="text-muted" data-toggle-modal="#crate-info-modal"${_scopeId}><i class="far fa-question-circle"${_scopeId}></i></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-1 text-xl fw-semibold"${_scopeId}> Statistics </div><div class="p-3 mb-3 card"${_scopeId}><div class="grid-x grid-margin-x"${_scopeId}><div class="mb-2 cell large-6"${_scopeId}><div class="text-xs fw-bold text-uppercase text-muted text-truncate"${_scopeId}> Date Created </div><div class="fw-semibold text-truncate"${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.DateHum)}</div></div><div class="mb-2 cell large-6"${_scopeId}><div class="text-xs fw-bold text-uppercase text-muted text-truncate"${_scopeId}> Last Updated </div><div class="fw-semibold text-truncate"${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.UpdateHum)}</div></div><div class="mb-2 cell large-6 mb-md-0"${_scopeId}><div class="text-xs fw-bold text-uppercase text-muted text-truncate"${_scopeId}> Type </div><div class="fw-semibold text-capitalize text-truncate"${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.item_type !== "pants" ? capitalizeFirstLetter(unref(usePage)().props.item.item_type.slice(0, -1)) : capitalizeFirstLetter(unref(usePage)().props.item.item_type))}</div></div><div class="cell large-6"${_scopeId}><div class="text-xs fw-bold text-uppercase text-muted text-truncate"${_scopeId}> Owners </div><div class="fw-semibold text-truncate"${_scopeId}> 2 </div></div></div></div><div class="mb-1 text-xl fw-semibold"${_scopeId}> Private Sellers <span class="text-xs fw-semibold text-muted"${_scopeId}>This item has 3 listings</span></div><div class="card card-body"${_scopeId}><div class="gap-4 align-middle section flex-container"${_scopeId}><div class="gap-2 align-middle flex-container flex-child-grow"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="headshot" width="50"${_scopeId}><div style="${ssrRenderStyle({ "line-height": "10px" })}"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> Nabrious </div><div class="text-xs fw-semibold text-muted"${_scopeId}> Copy #1 of 200 </div></div></div><button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal"${_scopeId}><i class="fas fa-money-bill-1-wave" style="${ssrRenderStyle({ "width": "30px" })}"${_scopeId}></i>10 Bucks </button></div><div class="gap-4 align-middle section flex-container"${_scopeId}><div class="gap-2 align-middle flex-container flex-child-grow"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="headshot" width="50"${_scopeId}><div style="${ssrRenderStyle({ "line-height": "10px" })}"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> Nabrious </div><div class="text-xs fw-semibold text-muted"${_scopeId}> Copy #1 of 200 </div></div></div><button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal"${_scopeId}><i class="fas fa-money-bill-1-wave" style="${ssrRenderStyle({ "width": "30px" })}"${_scopeId}></i>10 Bucks </button></div><div class="gap-4 align-middle section flex-container"${_scopeId}><div class="gap-2 align-middle flex-container flex-child-grow"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="headshot" width="50"${_scopeId}><div style="${ssrRenderStyle({ "line-height": "10px" })}"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> Nabrious </div><div class="text-xs fw-semibold text-muted"${_scopeId}> Copy #1 of 200 </div></div></div><button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal"${_scopeId}><i class="fas fa-money-bill-1-wave" style="${ssrRenderStyle({ "width": "30px" })}"${_scopeId}></i>10 Bucks </button></div><div class="gap-4 align-middle section flex-container"${_scopeId}><div class="gap-2 align-middle flex-container flex-child-grow"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="headshot" width="50"${_scopeId}><div style="${ssrRenderStyle({ "line-height": "10px" })}"${_scopeId}><div class="text-lg fw-semibold"${_scopeId}> Nabrious </div><div class="text-xs fw-semibold text-muted"${_scopeId}> Copy #1 of 200 </div></div></div><button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal"${_scopeId}><i class="fas fa-money-bill-1-wave" style="${ssrRenderStyle({ "width": "30px" })}"${_scopeId}></i>10 Bucks </button></div><ul class="section pagination flex-container align-center"${_scopeId}><button class="page-link page-disabled"${_scopeId}><i class="fa-regular fa-chevron-left"${_scopeId}></i></button><button class="page-link page-active"${_scopeId}> 1 </button><button class="page-link"${_scopeId}>2</button><button class="page-link"${_scopeId}>3</button><button class="page-link"${_scopeId}><i class="fa-regular fa-chevron-right"${_scopeId}></i></button></ul></div></div><div class="cell medium-7"${_scopeId}><div class="mb-3 card card-body"${_scopeId}><div class="gap-2 mb-2 align-middle flex-container align-justify"${_scopeId}><div class="text-3xl fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.name)}</div><div class="position-relative dropdown" style="${ssrRenderStyle({ "margin-right": "-10px" })}"${_scopeId}><button class="btn-circle" data-tooltip-title="More" data-tooltip-placement="bottom"${_scopeId}><i class="fas fa-ellipsis-vertical"${_scopeId}></i></button><ul class="dropdown-menu dropdown-menu-end"${_scopeId}><li class="dropdown-item"${_scopeId}><a href="#" class="dropdown-link dropdown-link-has-icon"${_scopeId}><i class="fas fa-cash-register dropdown-icon"${_scopeId}></i> Sell </a></li><li class="dropdown-item"${_scopeId}><a href="#" class="dropdown-link dropdown-link-has-icon"${_scopeId}><i class="fas fa-flag dropdown-icon"${_scopeId}></i> Report </a></li><div class="align-middle flex-container"${_scopeId}><div class="dropdown-title"${_scopeId}> Moderation </div><li class="divider flex-child-grow"${_scopeId}></li></div><li class="dropdown-item"${_scopeId}><a href="#" class="dropdown-link dropdown-link-has-icon text-danger"${_scopeId}><i class="fas fa-gavel dropdown-icon text-danger"${_scopeId}></i> View in Panel </a></li></ul></div></div><div class="gap-2 mb-3 align-middle flex-container fw-semibold"${_scopeId}><div class="text-xs text-muted text-uppercase fw-bold"${_scopeId}> By </div><a href="#" class="${ssrRenderClass([{ "text-danger": unref(usePage)().props.item.creator.isStaff }, "gap-2 align-middle flex-container"])}"${_scopeId}><img src="/assets/img/dummy_headshot.png" class="headshot" width="38"${_scopeId}><div style="${ssrRenderStyle({ "line-height": "17px" })}"${_scopeId}><div${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.creator.display_name)}</div><div class="text-xs text-muted text-truncate" style="${ssrRenderStyle({ "max-width": "140px" })}"${_scopeId}>${ssrInterpolate("@" + unref(usePage)().props.item.creator.username)}</div></div></a><i class="fas fa-shield-check text-success" data-toggle-modal="#verified-modal" data-tooltip-title="Verified" data-tooltip-placement="bottom" style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId}></i></div><div class="mb-1 text-xs fw-bold text-uppercase text-muted"${_scopeId}>`);
            if (unref(usePage)().props.auth.user) {
              _push2(`<span${_scopeId}> Purchase With </span>`);
            } else {
              _push2(`<span${_scopeId}> Login to Purchase </span>`);
            }
            _push2(`</div>`);
            if (unref(usePage)().props.auth.user) {
              _push2(`<div class="gap-2 align-middle flex-container-lg"${_scopeId}><button class="mb-2 btn btn-success btn-sm w-100" data-toggle-modal="#purchase-with-bucks-modal"${_scopeId}><i class="fas fa-money-bill-1-wave" style="${ssrRenderStyle({ "width": "34px" })}"${_scopeId}></i>${ssrInterpolate(unref(usePage)().props.item.cost_bucks)} Bucks </button><div class="mb-2 text-xs fw-bold text-uppercase text-muted"${_scopeId}> or </div><button class="mb-2 btn btn-warning btn-sm w-100" data-toggle-modal="#purchase-with-coins-modal"${_scopeId}><i class="fas fa-coins" style="${ssrRenderStyle({ "width": "34px" })}"${_scopeId}></i>${ssrInterpolate(unref(usePage)().props.item.cost_coins)} Coins </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-1 text-xl fw-semibold"${_scopeId}> Description </div><div class="mb-3 card card-body"${_scopeId}><div class="text-sm fw-semibold"${_scopeId}>${ssrInterpolate(unref(usePage)().props.item.description)}</div></div><div class="mb-1 text-xl fw-semibold"${_scopeId}> More From Creator </div><div class="mb-3 card card-body"${_scopeId}>`);
            if (_ctx.reccomendations) {
              _push2(`<div class="grid-x grid-margin-x"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.reccomendations, (suggestion) => {
                _push2(`<div class="cell large-3 medium-4 small-6"${_scopeId}><a href="#" class="d-block"${_scopeId}><div class="p-2 mb-1 card card-inner position-relative"${_scopeId}><img src="/assets/img/item_dummy_2.png"${_scopeId}></div><div class="text-body fw-semibold text-truncate"${_scopeId}>${ssrInterpolate(suggestion.name)}</div></a></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-sm fw-bold text-muted"${_scopeId}> There is no other items from this creator </div>`);
            }
            _push2(`</div><div class="mb-1 text-xl fw-semibold"${_scopeId}> Price Chart </div><div class="card card-body"${_scopeId}><div class="text-xs fw-bold text-uppercase text-muted"${_scopeId}> PRICE CHART GOES HERE </div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "modal",
                id: "sell-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, "Sell"),
                      createVNode("button", {
                        class: "btn-circle",
                        "data-toggle-modal": "#sell-modal",
                        onClick: ($event) => _ctx.showModal("sell-modal"),
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 flex-container" }, [
                      createVNode("div", { class: "w-100" }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Which Copy "),
                        createVNode("select", { class: "form form-select form-xs" }, [
                          createVNode("option", { value: "1" }, "Copy #1")
                        ])
                      ]),
                      createVNode("div", { class: "w-100" }, [
                        createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " Price (Bucks) "),
                        createVNode("input", {
                          type: "text",
                          class: "form form-xs",
                          placeholder: "Price"
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "gap-2 flex-container align-right section-borderless" }, [
                    createVNode("a", {
                      href: "#",
                      class: "btn btn-success btn-sm"
                    }, "Sell"),
                    createVNode("button", {
                      class: "btn btn-secondary btn-sm",
                      onClick: ($event) => _ctx.showModal("sell-modal"),
                      "data-toggle-modal": "#purchase-with-bucks-modal"
                    }, " Cancel ", 8, ["onClick"])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "crate-roll-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "py-1 modal-scroll" }, [
                      createVNode("div", { class: "p-2 d-inline-block card card-five-star me-2" }, [
                        createVNode("img", { src: "/assets/img/item_dummy_2.png" })
                      ]),
                      createVNode("div", { class: "p-2 d-inline-block card card-four-star me-2" }, [
                        createVNode("img", { src: "/assets/img/item_dummy_3.png" })
                      ]),
                      createVNode("div", { class: "p-2 d-inline-block card card-three-star me-2" }, [
                        createVNode("img", { src: "/assets/img/item_dummy_5.png" })
                      ]),
                      createVNode("div", { class: "p-2 d-inline-block card card-three-star me-2" }, [
                        createVNode("img", { src: "/assets/img/item_dummy_6.png" })
                      ]),
                      createVNode("div", { class: "p-2 d-inline-block card card-four-star me-2" }, [
                        createVNode("img", { src: "/assets/img/item_dummy_4.png" })
                      ]),
                      createVNode("div", { class: "p-2 d-inline-block card card-two-and-one-star me-2" }, [
                        createVNode("div", { class: "align-middle w-100 h-100 flex-container flex-dir-column align-center" }, [
                          createVNode("i", { class: "text-3xl fas fa-coins text-warning" }),
                          createVNode("div", { class: "text-sm fw-semibold text-warning" }, " 1000 ")
                        ])
                      ]),
                      createVNode("div", { class: "p-2 d-inline-block card card-two-and-one-star me-2" }, [
                        createVNode("div", { class: "align-middle w-100 h-100 flex-container flex-dir-column align-center" }, [
                          createVNode("i", { class: "text-3xl fas fa-money-bill-1-wave text-success" }),
                          createVNode("div", { class: "text-sm fw-semibold text-success" }, " 10 ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-2 align-middle flex-container" }, [
                      createVNode("div", { class: "divider flex-child-grow ms-0" }),
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, [
                        createVNode("i", { class: "fas fa-arrow-up" })
                      ]),
                      createVNode("div", { class: "divider flex-child-grow me-0" })
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "crate-info-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, " Information About {crateName} "),
                      createVNode("button", {
                        class: "btn-circle",
                        "data-toggle-modal": "#crate-info-modal",
                        onClick: ($event) => _ctx.showModal("crate-info-modal"),
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "text-sm text-muted fw-semibold" }, [
                      createVNode("div", { class: "mb-2 card card-inner card-body" }, [
                        createVNode("div", null, [
                          createTextVNode(" Base probability of winning "),
                          createVNode("span", { class: "text-warning" }, [
                            createVNode("i", { class: "fas fa-star" }),
                            createTextVNode(" 5 star item")
                          ]),
                          createTextVNode(" is "),
                          createVNode("span", { class: "fw-bold text-body" }, "??%")
                        ]),
                        createVNode("div", null, [
                          createTextVNode(" Base probability of winning "),
                          createVNode("span", { class: "text-membership" }, [
                            createVNode("i", { class: "fas fa-star" }),
                            createTextVNode(" 4 star item")
                          ]),
                          createTextVNode(" is "),
                          createVNode("span", { class: "fw-bold text-body" }, "??%")
                        ]),
                        createVNode("div", null, [
                          createTextVNode(" Base probability of winning "),
                          createVNode("span", { class: "text-success" }, [
                            createVNode("i", { class: "fas fa-star" }),
                            createTextVNode(" 3 star item")
                          ]),
                          createTextVNode(" is "),
                          createVNode("span", { class: "fw-bold text-body" }, "??%")
                        ]),
                        createVNode("div", null, [
                          createTextVNode(" Base probability of winning "),
                          createVNode("span", { class: "text-danger" }, [
                            createVNode("i", { class: "fas fa-star" }),
                            createTextVNode(" 2 star item")
                          ]),
                          createTextVNode(" is "),
                          createVNode("span", { class: "fw-bold text-body" }, "??%")
                        ]),
                        createVNode("div", null, [
                          createTextVNode(" Base probability of winning "),
                          createVNode("span", { class: "text-info" }, [
                            createVNode("i", { class: "fas fa-star" }),
                            createTextVNode(" 1 star item")
                          ]),
                          createTextVNode(" is "),
                          createVNode("span", { class: "fw-bold text-body" }, "??%")
                        ])
                      ]),
                      createVNode("div", { class: "mb-2 card card-inner card-body" }, [
                        createTextVNode(" Upon opening "),
                        createVNode("span", { class: "text-body fw-bold" }, "9"),
                        createTextVNode(" crates, the next crate you open will have its base probability of winning a "),
                        createVNode("span", { class: "text-membership" }, [
                          createVNode("i", { class: "fas fa-star" }),
                          createTextVNode(" 4 star item")
                        ]),
                        createTextVNode(" boosted to 100% ")
                      ]),
                      createVNode("div", { class: "card card-inner card-body" }, [
                        createTextVNode(" Upon opening "),
                        createVNode("span", { class: "text-body fw-bold" }, "49"),
                        createTextVNode(" crates, the next crate you open will have its base probability of winning a "),
                        createVNode("span", { class: "text-warning" }, [
                          createVNode("i", { class: "fas fa-star" }),
                          createTextVNode(" 5 star item")
                        ]),
                        createTextVNode(" boosted to 100% ")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "view-crate-content-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, " {crateName}'s Contents "),
                      createVNode("button", {
                        class: "btn-circle",
                        onClick: ($event) => _ctx.showModal("view-crate-content-modal"),
                        "data-toggle-modal": "#view-crate-content-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "align-middle flex-container" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " 5 Star Items "),
                      createVNode("div", { class: "divider flex-child-grow" })
                    ]),
                    createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("a", { href: "#" }, [
                          createVNode("div", { class: "p-2 mb-1 card card-five-star" }, [
                            createVNode("img", { src: "/assets/img/item_dummy_2.png" })
                          ]),
                          createVNode("div", { class: "text-lg text-truncate fw-semibold text-warning" }, " Bowtie ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "align-middle flex-container" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " 4 Star Items "),
                      createVNode("div", { class: "divider flex-child-grow" })
                    ]),
                    createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("a", { href: "#" }, [
                          createVNode("div", { class: "p-2 mb-1 card card-four-star" }, [
                            createVNode("img", { src: "/assets/img/item_dummy_3.png" })
                          ]),
                          createVNode("div", { class: "text-lg text-truncate fw-semibold text-membership" }, " Tree Helmet ")
                        ])
                      ]),
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("a", { href: "#" }, [
                          createVNode("div", { class: "p-2 mb-1 card card-four-star" }, [
                            createVNode("img", { src: "/assets/img/item_dummy_4.png" })
                          ]),
                          createVNode("div", { class: "text-lg text-truncate fw-semibold text-membership" }, " Fall Fedora ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "align-middle flex-container" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " 3 Star Items "),
                      createVNode("div", { class: "divider flex-child-grow" })
                    ]),
                    createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("a", { href: "#" }, [
                          createVNode("div", { class: "p-2 mb-1 card card-three-star" }, [
                            createVNode("img", { src: "/assets/img/item_dummy_5.png" })
                          ]),
                          createVNode("div", { class: "text-lg text-truncate fw-semibold text-success" }, " Astronaut Helmet ")
                        ])
                      ]),
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("a", { href: "#" }, [
                          createVNode("div", { class: "p-2 mb-1 card card-three-star" }, [
                            createVNode("img", { src: "/assets/img/item_dummy_6.png" })
                          ]),
                          createVNode("div", { class: "text-lg text-truncate fw-semibold text-success" }, " Fall Fedora ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "align-middle flex-container" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " 2 Star Items "),
                      createVNode("div", { class: "divider flex-child-grow" })
                    ]),
                    createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "p-2 mb-1 text-center card card-inner" }, [
                          createVNode("i", { class: "py-4 fas fa-money-bill-1-wave text-success text-7xl" })
                        ]),
                        createVNode("div", { class: "text-lg text-truncate fw-semibold text-success" }, " 10 Cash ")
                      ]),
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "p-2 mb-1 text-center card card-inner" }, [
                          createVNode("i", { class: "py-4 fas fa-money-bill-1-wave text-success text-7xl" })
                        ]),
                        createVNode("div", { class: "text-lg text-truncate fw-semibold text-success" }, " 100 Cash ")
                      ]),
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "p-2 mb-1 text-center card card-inner" }, [
                          createVNode("i", { class: "py-4 fas fa-money-bill-1-wave text-success text-7xl" })
                        ]),
                        createVNode("div", { class: "text-lg text-truncate fw-semibold text-success" }, " 500 Cash ")
                      ])
                    ]),
                    createVNode("div", { class: "align-middle flex-container" }, [
                      createVNode("div", { class: "text-xs fw-bold text-muted text-uppercase" }, " 1 Star Items "),
                      createVNode("div", { class: "divider flex-child-grow" })
                    ]),
                    createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "p-2 mb-1 text-center card card-inner" }, [
                          createVNode("i", { class: "py-4 fas fa-coins text-warning text-7xl" })
                        ]),
                        createVNode("div", { class: "text-lg text-truncate fw-semibold text-warning" }, " 10 Coins ")
                      ]),
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "p-2 mb-1 text-center card card-inner" }, [
                          createVNode("i", { class: "py-4 fas fa-coins text-warning text-7xl" })
                        ]),
                        createVNode("div", { class: "text-lg text-truncate fw-semibold text-warning" }, " 100 Coins ")
                      ]),
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "p-2 mb-1 text-center card card-inner" }, [
                          createVNode("i", { class: "py-4 fas fa-coins text-warning text-7xl" })
                        ]),
                        createVNode("div", { class: "text-lg text-truncate fw-semibold text-warning" }, " 500 Coins ")
                      ]),
                      createVNode("div", { class: "cell medium-3" }, [
                        createVNode("div", { class: "p-2 mb-1 text-center card card-inner" }, [
                          createVNode("i", { class: "py-4 fas fa-coins text-warning text-7xl" })
                        ]),
                        createVNode("div", { class: "text-lg text-truncate fw-semibold text-warning" }, " 1000 Coins ")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "purchase-with-bucks-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, "Confirm Purchase"),
                      createVNode("button", {
                        class: "btn-circle",
                        onClick: ($event) => _ctx.showModal("purchase-with-bucks-modal"),
                        "data-toggle-modal": "#purchase-with-bucks-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "text-sm text-muted fw-semibold" }, [
                      createTextVNode(" Are you sure you want to buy "),
                      createVNode("span", { class: "text-body fw-semibold" }, toDisplayString(unref(usePage)().props.item.name), 1),
                      createTextVNode(" for "),
                      createVNode("span", { class: "text-success" }, [
                        createVNode("i", { class: "fas fa-money-bill-1-wave me-1" }),
                        createTextVNode(toDisplayString(unref(usePage)().props.item.cost_bucks) + " Bucks", 1)
                      ]),
                      createTextVNode("? ")
                    ])
                  ]),
                  createVNode("div", { class: "gap-2 flex-container align-right section-borderless" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(purchaseBucks, ["prevent"])
                    }, [
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-success btn-sm"
                      }, "Buy Now"),
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-secondary btn-sm",
                        onClick: ($event) => _ctx.showModal("purchase-with-bucks-modal"),
                        "data-toggle-modal": "#purchase-with-bucks-modal"
                      }, " Cancel ", 8, ["onClick"])
                    ], 40, ["onSubmit"])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "purchase-with-coins-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, "Confirm Purchase"),
                      createVNode("button", {
                        class: "btn-circle",
                        onClick: ($event) => _ctx.showModal("purchase-with-coins-modal"),
                        "data-toggle-modal": "#purchase-with-coins-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "text-sm text-muted fw-semibold" }, [
                      createTextVNode(" Are you sure you want to buy "),
                      createVNode("span", { class: "text-body fw-semibold" }, toDisplayString(unref(usePage)().props.item.name), 1),
                      createTextVNode(" for "),
                      createVNode("span", { class: "text-warning" }, [
                        createVNode("i", { class: "fas fa-coins me-1" }),
                        createTextVNode(toDisplayString(unref(usePage)().props.item.cost_coins) + " Coins", 1)
                      ]),
                      createTextVNode("? ")
                    ])
                  ]),
                  createVNode("div", { class: "gap-2 flex-container align-right section-borderless" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(purchaseCoins, ["prevent"])
                    }, [
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-warning btn-sm"
                      }, "Buy Now"),
                      createVNode("button", {
                        class: "btn btn-secondary btn-sm",
                        type: "button",
                        onClick: ($event) => _ctx.showModal("purchase-with-coins-modal"),
                        "data-toggle-modal": "#purchase-with-coins-modal"
                      }, " Cancel ", 8, ["onClick"])
                    ], 40, ["onSubmit"])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal",
                id: "verified-modal"
              }, [
                createVNode("div", { class: "modal-card modal-card-body modal-card-sm" }, [
                  createVNode("div", { class: "section-borderless" }, [
                    createVNode("div", { class: "gap-2 align-middle flex-container align-justify" }, [
                      createVNode("div", { class: "text-lg fw-semibold" }, "Verified Badge"),
                      createVNode("button", {
                        class: "btn-circle",
                        "data-toggle-modal": "#verified-modal",
                        style: { "margin-right": "-10px" }
                      }, [
                        createVNode("i", { class: "fas fa-times" })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "text-center section-borderless" }, [
                    createVNode("i", { class: "mb-3 text-6xl fas fa-shield-check text-success" }),
                    createVNode("div", { class: "text-sm text-muted fw-semibold" }, " This account is verified because it's a noteable and trustworthy figure in Eclipse. ")
                  ]),
                  createVNode("div", { class: "gap-2 flex-container align-center section-borderless" }, [
                    createVNode("a", {
                      href: "#",
                      class: "btn btn-success btn-sm"
                    }, "Learn More"),
                    createVNode("button", {
                      class: "btn btn-secondary btn-sm",
                      "data-toggle-modal": "#verified-modal"
                    }, " Close ")
                  ])
                ])
              ]),
              createVNode("div", { class: "cell large-12" }, [
                createVNode("div", { class: "grid-x grid-margin-x grid-padding-y" }, [
                  createVNode("div", { class: "cell medium-5" }, [
                    createVNode("div", { class: "mb-3 overflow-hidden card" }, [
                      createVNode("div", { class: "p-4 position-relative" }, [
                        createVNode("div", { style: { "position": "absolute", "top": "10px", "left": "10px" } }, [
                          _ctx.item.rare ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-1"
                          }, [
                            createVNode("span", { class: "badge badge-witch fw-semibold" }, [
                              createVNode("i", {
                                class: "fas fa-star",
                                style: { "width": "18px" }
                              }),
                              createTextVNode("Rare ")
                            ])
                          ])) : createCommentVNode("", true),
                          _ctx.isNewItem(_ctx.item.created_at) ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mb-1"
                          }, [
                            createVNode("span", { class: "badge badge-info fw-semibold" }, [
                              createVNode("i", {
                                class: "fas fa-fire",
                                style: { "width": "18px" }
                              }),
                              createTextVNode("New ")
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "mb-1" }, [
                            unref(usePage)().props.item.sale_ongoing ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mb-1 badge badge-danger fw-semibold"
                            }, [
                              createVNode("i", {
                                class: "fas fa-badge-percent",
                                style: { "width": "18px" }
                              }),
                              createTextVNode(toDisplayString(unref(usePage)().props.item.percent_off + "%") + " off ", 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "mb-1" }, [
                            createVNode("span", { class: "badge badge-danger fw-semibold" }, [
                              createVNode("i", {
                                class: "fas fa-clock",
                                style: { "width": "18px" }
                              }),
                              createTextVNode("Goes offsale in 10:10:12 ")
                            ])
                          ])
                        ]),
                        createVNode("div", {
                          class: "gap-1 flex-container flex-dir-column",
                          style: { "position": "absolute", "bottom": "10px", "right": "10px" }
                        }, [
                          createVNode("div", { class: "ms-auto" }, [
                            createVNode("button", { class: "btn btn-secondary btn-xs" }, " Preview ")
                          ]),
                          unref(usePage)().props.item.type != "crate" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "ms-auto"
                          }, [
                            createVNode("button", {
                              class: "btn btn-success btn-xs",
                              "data-toggle-modal": "#view-crate-content-modal",
                              onClick: ($event) => _ctx.showModal("view-crate-content-modal")
                            }, " View Contents ", 8, ["onClick"])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("img", {
                          src: unref(usePage)().props.item.thumbnail,
                          class: "mx-auto d-block",
                          id: "thumbnail",
                          ref: "thumbnail",
                          width: "512",
                          height: "512"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "gap-2 py-2 overflow-hidden text-sm text-center align-middle flex-container align-center bg-success fw-semibold" }, [
                        createVNode("i", { class: "text-lg fas fa-party-horn" }),
                        createTextVNode(" Yahoo! You own this item. ")
                      ])
                    ]),
                    unref(usePage)().props.item.type != "crate" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "gap-3 mb-3 align-middle flex-container"
                    }, [
                      createVNode("button", {
                        class: "btn btn-info btn-xs w-100",
                        "data-toggle-modal": "#crate-roll-modal",
                        onClick: ($event) => _ctx.showModal("crate-roll-modal")
                      }, " Open Crate ", 8, ["onClick"]),
                      createVNode("div", { class: "text-xs text-center flex-child-grow text-danger fw-bold text-uppercase" }, " 9 Owned "),
                      createVNode("button", {
                        class: "text-muted",
                        "data-toggle-modal": "#crate-info-modal",
                        onClick: ($event) => _ctx.showModal("crate-info-modal")
                      }, [
                        createVNode("i", { class: "far fa-question-circle" })
                      ], 8, ["onClick"])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "mb-1 text-xl fw-semibold" }, " Statistics "),
                    createVNode("div", { class: "p-3 mb-3 card" }, [
                      createVNode("div", { class: "grid-x grid-margin-x" }, [
                        createVNode("div", { class: "mb-2 cell large-6" }, [
                          createVNode("div", { class: "text-xs fw-bold text-uppercase text-muted text-truncate" }, " Date Created "),
                          createVNode("div", { class: "fw-semibold text-truncate" }, toDisplayString(unref(usePage)().props.item.DateHum), 1)
                        ]),
                        createVNode("div", { class: "mb-2 cell large-6" }, [
                          createVNode("div", { class: "text-xs fw-bold text-uppercase text-muted text-truncate" }, " Last Updated "),
                          createVNode("div", { class: "fw-semibold text-truncate" }, toDisplayString(unref(usePage)().props.item.UpdateHum), 1)
                        ]),
                        createVNode("div", { class: "mb-2 cell large-6 mb-md-0" }, [
                          createVNode("div", { class: "text-xs fw-bold text-uppercase text-muted text-truncate" }, " Type "),
                          createVNode("div", { class: "fw-semibold text-capitalize text-truncate" }, toDisplayString(unref(usePage)().props.item.item_type !== "pants" ? capitalizeFirstLetter(unref(usePage)().props.item.item_type.slice(0, -1)) : capitalizeFirstLetter(unref(usePage)().props.item.item_type)), 1)
                        ]),
                        createVNode("div", { class: "cell large-6" }, [
                          createVNode("div", { class: "text-xs fw-bold text-uppercase text-muted text-truncate" }, " Owners "),
                          createVNode("div", { class: "fw-semibold text-truncate" }, " 2 ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mb-1 text-xl fw-semibold" }, [
                      createTextVNode(" Private Sellers "),
                      createVNode("span", { class: "text-xs fw-semibold text-muted" }, "This item has 3 listings")
                    ]),
                    createVNode("div", { class: "card card-body" }, [
                      createVNode("div", { class: "gap-4 align-middle section flex-container" }, [
                        createVNode("div", { class: "gap-2 align-middle flex-container flex-child-grow" }, [
                          createVNode("img", {
                            src: "/assets/img/dummy_headshot.png",
                            class: "headshot",
                            width: "50"
                          }),
                          createVNode("div", { style: { "line-height": "10px" } }, [
                            createVNode("div", { class: "text-lg fw-semibold" }, " Nabrious "),
                            createVNode("div", { class: "text-xs fw-semibold text-muted" }, " Copy #1 of 200 ")
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn btn-success btn-xs w-100",
                          "data-toggle-modal": "#purchase-with-bucks-modal"
                        }, [
                          createVNode("i", {
                            class: "fas fa-money-bill-1-wave",
                            style: { "width": "30px" }
                          }),
                          createTextVNode("10 Bucks ")
                        ])
                      ]),
                      createVNode("div", { class: "gap-4 align-middle section flex-container" }, [
                        createVNode("div", { class: "gap-2 align-middle flex-container flex-child-grow" }, [
                          createVNode("img", {
                            src: "/assets/img/dummy_headshot.png",
                            class: "headshot",
                            width: "50"
                          }),
                          createVNode("div", { style: { "line-height": "10px" } }, [
                            createVNode("div", { class: "text-lg fw-semibold" }, " Nabrious "),
                            createVNode("div", { class: "text-xs fw-semibold text-muted" }, " Copy #1 of 200 ")
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn btn-success btn-xs w-100",
                          "data-toggle-modal": "#purchase-with-bucks-modal"
                        }, [
                          createVNode("i", {
                            class: "fas fa-money-bill-1-wave",
                            style: { "width": "30px" }
                          }),
                          createTextVNode("10 Bucks ")
                        ])
                      ]),
                      createVNode("div", { class: "gap-4 align-middle section flex-container" }, [
                        createVNode("div", { class: "gap-2 align-middle flex-container flex-child-grow" }, [
                          createVNode("img", {
                            src: "/assets/img/dummy_headshot.png",
                            class: "headshot",
                            width: "50"
                          }),
                          createVNode("div", { style: { "line-height": "10px" } }, [
                            createVNode("div", { class: "text-lg fw-semibold" }, " Nabrious "),
                            createVNode("div", { class: "text-xs fw-semibold text-muted" }, " Copy #1 of 200 ")
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn btn-success btn-xs w-100",
                          "data-toggle-modal": "#purchase-with-bucks-modal"
                        }, [
                          createVNode("i", {
                            class: "fas fa-money-bill-1-wave",
                            style: { "width": "30px" }
                          }),
                          createTextVNode("10 Bucks ")
                        ])
                      ]),
                      createVNode("div", { class: "gap-4 align-middle section flex-container" }, [
                        createVNode("div", { class: "gap-2 align-middle flex-container flex-child-grow" }, [
                          createVNode("img", {
                            src: "/assets/img/dummy_headshot.png",
                            class: "headshot",
                            width: "50"
                          }),
                          createVNode("div", { style: { "line-height": "10px" } }, [
                            createVNode("div", { class: "text-lg fw-semibold" }, " Nabrious "),
                            createVNode("div", { class: "text-xs fw-semibold text-muted" }, " Copy #1 of 200 ")
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn btn-success btn-xs w-100",
                          "data-toggle-modal": "#purchase-with-bucks-modal"
                        }, [
                          createVNode("i", {
                            class: "fas fa-money-bill-1-wave",
                            style: { "width": "30px" }
                          }),
                          createTextVNode("10 Bucks ")
                        ])
                      ]),
                      createVNode("ul", { class: "section pagination flex-container align-center" }, [
                        createVNode("button", { class: "page-link page-disabled" }, [
                          createVNode("i", { class: "fa-regular fa-chevron-left" })
                        ]),
                        createVNode("button", { class: "page-link page-active" }, " 1 "),
                        createVNode("button", { class: "page-link" }, "2"),
                        createVNode("button", { class: "page-link" }, "3"),
                        createVNode("button", { class: "page-link" }, [
                          createVNode("i", { class: "fa-regular fa-chevron-right" })
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "cell medium-7" }, [
                    createVNode("div", { class: "mb-3 card card-body" }, [
                      createVNode("div", { class: "gap-2 mb-2 align-middle flex-container align-justify" }, [
                        createVNode("div", { class: "text-3xl fw-semibold" }, toDisplayString(unref(usePage)().props.item.name), 1),
                        createVNode("div", {
                          class: "position-relative dropdown",
                          style: { "margin-right": "-10px" }
                        }, [
                          createVNode("button", {
                            class: "btn-circle",
                            "data-tooltip-title": "More",
                            "data-tooltip-placement": "bottom"
                          }, [
                            createVNode("i", { class: "fas fa-ellipsis-vertical" })
                          ]),
                          createVNode("ul", { class: "dropdown-menu dropdown-menu-end" }, [
                            createVNode("li", { class: "dropdown-item" }, [
                              createVNode("a", {
                                href: "#",
                                class: "dropdown-link dropdown-link-has-icon"
                              }, [
                                createVNode("i", { class: "fas fa-cash-register dropdown-icon" }),
                                createTextVNode(" Sell ")
                              ])
                            ]),
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
                              createVNode("div", { class: "dropdown-title" }, " Moderation "),
                              createVNode("li", { class: "divider flex-child-grow" })
                            ]),
                            createVNode("li", { class: "dropdown-item" }, [
                              createVNode("a", {
                                href: "#",
                                class: "dropdown-link dropdown-link-has-icon text-danger"
                              }, [
                                createVNode("i", { class: "fas fa-gavel dropdown-icon text-danger" }),
                                createTextVNode(" View in Panel ")
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "gap-2 mb-3 align-middle flex-container fw-semibold" }, [
                        createVNode("div", { class: "text-xs text-muted text-uppercase fw-bold" }, " By "),
                        createVNode("a", {
                          href: "#",
                          class: ["gap-2 align-middle flex-container", { "text-danger": unref(usePage)().props.item.creator.isStaff }]
                        }, [
                          createVNode("img", {
                            src: "/assets/img/dummy_headshot.png",
                            class: "headshot",
                            width: "38"
                          }),
                          createVNode("div", { style: { "line-height": "17px" } }, [
                            createVNode("div", null, toDisplayString(unref(usePage)().props.item.creator.display_name), 1),
                            createVNode("div", {
                              class: "text-xs text-muted text-truncate",
                              style: { "max-width": "140px" }
                            }, toDisplayString("@" + unref(usePage)().props.item.creator.username), 1)
                          ])
                        ], 2),
                        createVNode("i", {
                          class: "fas fa-shield-check text-success",
                          "data-toggle-modal": "#verified-modal",
                          "data-tooltip-title": "Verified",
                          "data-tooltip-placement": "bottom",
                          style: { "cursor": "pointer" }
                        })
                      ]),
                      createVNode("div", { class: "mb-1 text-xs fw-bold text-uppercase text-muted" }, [
                        unref(usePage)().props.auth.user ? (openBlock(), createBlock("span", { key: 0 }, " Purchase With ")) : (openBlock(), createBlock("span", { key: 1 }, " Login to Purchase "))
                      ]),
                      unref(usePage)().props.auth.user ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "gap-2 align-middle flex-container-lg"
                      }, [
                        createVNode("button", {
                          class: "mb-2 btn btn-success btn-sm w-100",
                          "data-toggle-modal": "#purchase-with-bucks-modal",
                          onClick: ($event) => _ctx.showModal("purchase-with-bucks-modal")
                        }, [
                          createVNode("i", {
                            class: "fas fa-money-bill-1-wave",
                            style: { "width": "34px" }
                          }),
                          createTextVNode(toDisplayString(unref(usePage)().props.item.cost_bucks) + " Bucks ", 1)
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "mb-2 text-xs fw-bold text-uppercase text-muted" }, " or "),
                        createVNode("button", {
                          class: "mb-2 btn btn-warning btn-sm w-100",
                          "data-toggle-modal": "#purchase-with-coins-modal",
                          onClick: ($event) => _ctx.showModal("purchase-with-coins-modal")
                        }, [
                          createVNode("i", {
                            class: "fas fa-coins",
                            style: { "width": "34px" }
                          }),
                          createTextVNode(toDisplayString(unref(usePage)().props.item.cost_coins) + " Coins ", 1)
                        ], 8, ["onClick"])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mb-1 text-xl fw-semibold" }, " Description "),
                    createVNode("div", { class: "mb-3 card card-body" }, [
                      createVNode("div", { class: "text-sm fw-semibold" }, toDisplayString(unref(usePage)().props.item.description), 1)
                    ]),
                    createVNode("div", { class: "mb-1 text-xl fw-semibold" }, " More From Creator "),
                    createVNode("div", { class: "mb-3 card card-body" }, [
                      _ctx.reccomendations ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid-x grid-margin-x"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.reccomendations, (suggestion) => {
                          return openBlock(), createBlock("div", { class: "cell large-3 medium-4 small-6" }, [
                            createVNode("a", {
                              href: "#",
                              class: "d-block"
                            }, [
                              createVNode("div", { class: "p-2 mb-1 card card-inner position-relative" }, [
                                createVNode("img", { src: "/assets/img/item_dummy_2.png" })
                              ]),
                              createVNode("div", { class: "text-body fw-semibold text-truncate" }, toDisplayString(suggestion.name), 1)
                            ])
                          ]);
                        }), 256))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-sm fw-bold text-muted"
                      }, " There is no other items from this creator "))
                    ]),
                    createVNode("div", { class: "mb-1 text-xl fw-semibold" }, " Price Chart "),
                    createVNode("div", { class: "card card-body" }, [
                      createVNode("div", { class: "text-xs fw-bold text-uppercase text-muted" }, " PRICE CHART GOES HERE ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Store/Item.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
