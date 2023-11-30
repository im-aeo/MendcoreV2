<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import AppHead from '@/Components/AppHead.vue';
import { usePage, router } from '@inertiajs/vue3';
import { route, current } from 'momentum-trail'
import axios from 'axios';
import OBJRenderer from '@/Components/OBJRenderer.vue';
defineProps<{
    item?: { type: Object, default: null },
    reccomendations?: Object,
    itemOwnership: Boolean
}>();

const hasOBJRender = ref(false);

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const purchaseBucks = () => {
    axios.get(`/sanctum/csrf-cookie`).then(response => {
        axios.post(route(`store.purchase`, { id: usePage<any>().props.item.id, currencyType: 'bucks' }));
    });
};
const purchaseCoins = () => {
    axios.get(`/sanctum/csrf-cookie`).then(response => {
        axios.post(route(`store.purchase`, { id: usePage<any>().props.item.id, currencyType: 'coins' }));
    });
};
</script>
<template>
    <AppHead :pageTitle="usePage<any>().props.item.name" :description="usePage<any>().props.item.description"
        :url="route(`store.item`, { id: item.id })" :item="true" :iid="usePage<any>().props.item.id"
        :itime="usePage<any>().props.item.time_off_sale" :cover="usePage<any>().props.item.thumbnail" />
    <Navbar />
    <Sidebar>
        <div class="modal" id="sell-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">Sell</div>
                        <button class="btn-circle" data-toggle-modal="#sell-modal" @click="showModal('sell-modal')"
                            style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="gap-2 flex-container">
                        <div class="w-100">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                Which Copy
                            </div>
                            <select class="form form-select form-xs">
                                <option value="1">Copy #1</option>
                            </select>
                        </div>
                        <div class="w-100">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                Price (Bucks)
                            </div>
                            <input type="text" class="form form-xs" placeholder="Price">
                        </div>
                    </div>
                </div>
                <div class="gap-2 flex-container align-right section-borderless">
                    <a href="#" class="btn btn-success btn-sm">Sell</a>
                    <button class="btn btn-secondary btn-sm" @click="showModal('sell-modal')"
                        data-toggle-modal="#purchase-with-bucks-modal">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="modal" id="crate-roll-modal">
            <div class="modal-card modal-card-body">
                <div class="section-borderless">
                    <div class="py-1 modal-scroll">
                        <div class="p-2 d-inline-block card card-five-star me-2">
                            <img src="/assets/img/item_dummy_2.png">
                        </div>
                        <div class="p-2 d-inline-block card card-four-star me-2">
                            <img src="/assets/img/item_dummy_3.png">
                        </div>
                        <div class="p-2 d-inline-block card card-three-star me-2">
                            <img src="/assets/img/item_dummy_5.png">
                        </div>
                        <div class="p-2 d-inline-block card card-three-star me-2">
                            <img src="/assets/img/item_dummy_6.png">
                        </div>
                        <div class="p-2 d-inline-block card card-four-star me-2">
                            <img src="/assets/img/item_dummy_4.png">
                        </div>
                        <div class="p-2 d-inline-block card card-two-and-one-star me-2">
                            <div class="align-middle w-100 h-100 flex-container flex-dir-column align-center">
                                <i class="text-3xl fas fa-coins text-warning"></i>
                                <div class="text-sm fw-semibold text-warning">
                                    1000
                                </div>
                            </div>
                        </div>
                        <div class="p-2 d-inline-block card card-two-and-one-star me-2">
                            <div class="align-middle w-100 h-100 flex-container flex-dir-column align-center">
                                <i class="text-3xl fas fa-money-bill-1-wave text-success"></i>
                                <div class="text-sm fw-semibold text-success">
                                    10
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 align-middle flex-container">
                        <div class="divider flex-child-grow ms-0"></div>
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            <i class="fas fa-arrow-up"></i>
                        </div>
                        <div class="divider flex-child-grow me-0"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="crate-info-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">
                            Information About {crateName}
                        </div>
                        <button class="btn-circle" data-toggle-modal="#crate-info-modal"
                            @click="showModal('crate-info-modal')" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="text-sm text-muted fw-semibold">
                        <div class="mb-2 card card-inner card-body">
                            <div>
                                Base probability of winning
                                <span class="text-warning"><i class="fas fa-star"></i> 5 star
                                    item</span>
                                is <span class="fw-bold text-body">??%</span>
                            </div>
                            <div>
                                Base probability of winning
                                <span class="text-membership"><i class="fas fa-star"></i> 4 star
                                    item</span>
                                is <span class="fw-bold text-body">??%</span>
                            </div>
                            <div>
                                Base probability of winning
                                <span class="text-success"><i class="fas fa-star"></i> 3 star
                                    item</span>
                                is <span class="fw-bold text-body">??%</span>
                            </div>
                            <div>
                                Base probability of winning
                                <span class="text-danger"><i class="fas fa-star"></i> 2 star
                                    item</span>
                                is <span class="fw-bold text-body">??%</span>
                            </div>
                            <div>
                                Base probability of winning
                                <span class="text-info"><i class="fas fa-star"></i> 1 star
                                    item</span>
                                is <span class="fw-bold text-body">??%</span>
                            </div>
                        </div>
                        <div class="mb-2 card card-inner card-body">
                            Upon opening
                            <span class="text-body fw-bold">9</span> crates, the
                            next crate you open will have its base probability
                            of winning a
                            <span class="text-membership"><i class="fas fa-star"></i> 4 star item</span>
                            boosted to 100%
                        </div>
                        <div class="card card-inner card-body">
                            Upon opening
                            <span class="text-body fw-bold">49</span> crates,
                            the next crate you open will have its base
                            probability of winning a
                            <span class="text-warning"><i class="fas fa-star"></i> 5 star item</span>
                            boosted to 100%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="view-crate-content-modal">
            <div class="modal-card modal-card-body">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">
                            {crateName}'s Contents
                        </div>
                        <button class="btn-circle" @click="showModal('view-crate-content-modal')"
                            data-toggle-modal="#view-crate-content-modal" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="align-middle flex-container">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            5 Star Items
                        </div>
                        <div class="divider flex-child-grow"></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-padding-y">
                        <div class="cell medium-3">
                            <a href="#">
                                <div class="p-2 mb-1 card card-five-star">
                                    <img src="/assets/img/item_dummy_2.png">
                                </div>
                                <div class="text-lg text-truncate fw-semibold text-warning">
                                    Bowtie
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="align-middle flex-container">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            4 Star Items
                        </div>
                        <div class="divider flex-child-grow"></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-padding-y">
                        <div class="cell medium-3">
                            <a href="#">
                                <div class="p-2 mb-1 card card-four-star">
                                    <img src="/assets/img/item_dummy_3.png">
                                </div>
                                <div class="text-lg text-truncate fw-semibold text-membership">
                                    Tree Helmet
                                </div>
                            </a>
                        </div>
                        <div class="cell medium-3">
                            <a href="#">
                                <div class="p-2 mb-1 card card-four-star">
                                    <img src="/assets/img/item_dummy_4.png">
                                </div>
                                <div class="text-lg text-truncate fw-semibold text-membership">
                                    Fall Fedora
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="align-middle flex-container">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            3 Star Items
                        </div>
                        <div class="divider flex-child-grow"></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-padding-y">
                        <div class="cell medium-3">
                            <a href="#">
                                <div class="p-2 mb-1 card card-three-star">
                                    <img src="/assets/img/item_dummy_5.png">
                                </div>
                                <div class="text-lg text-truncate fw-semibold text-success">
                                    Astronaut Helmet
                                </div>
                            </a>
                        </div>
                        <div class="cell medium-3">
                            <a href="#">
                                <div class="p-2 mb-1 card card-three-star">
                                    <img src="/assets/img/item_dummy_6.png">
                                </div>
                                <div class="text-lg text-truncate fw-semibold text-success">
                                    Fall Fedora
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="align-middle flex-container">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            2 Star Items
                        </div>
                        <div class="divider flex-child-grow"></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-padding-y">
                        <div class="cell medium-3">
                            <div class="p-2 mb-1 text-center card card-inner">
                                <i class="py-4 fas fa-money-bill-1-wave text-success text-7xl"></i>
                            </div>
                            <div class="text-lg text-truncate fw-semibold text-success">
                                10 Cash
                            </div>
                        </div>
                        <div class="cell medium-3">
                            <div class="p-2 mb-1 text-center card card-inner">
                                <i class="py-4 fas fa-money-bill-1-wave text-success text-7xl"></i>
                            </div>
                            <div class="text-lg text-truncate fw-semibold text-success">
                                100 Cash
                            </div>
                        </div>
                        <div class="cell medium-3">
                            <div class="p-2 mb-1 text-center card card-inner">
                                <i class="py-4 fas fa-money-bill-1-wave text-success text-7xl"></i>
                            </div>
                            <div class="text-lg text-truncate fw-semibold text-success">
                                500 Cash
                            </div>
                        </div>
                    </div>
                    <div class="align-middle flex-container">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            1 Star Items
                        </div>
                        <div class="divider flex-child-grow"></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-padding-y">
                        <div class="cell medium-3">
                            <div class="p-2 mb-1 text-center card card-inner">
                                <i class="py-4 fas fa-coins text-warning text-7xl"></i>
                            </div>
                            <div class="text-lg text-truncate fw-semibold text-warning">
                                10 Coins
                            </div>
                        </div>
                        <div class="cell medium-3">
                            <div class="p-2 mb-1 text-center card card-inner">
                                <i class="py-4 fas fa-coins text-warning text-7xl"></i>
                            </div>
                            <div class="text-lg text-truncate fw-semibold text-warning">
                                100 Coins
                            </div>
                        </div>
                        <div class="cell medium-3">
                            <div class="p-2 mb-1 text-center card card-inner">
                                <i class="py-4 fas fa-coins text-warning text-7xl"></i>
                            </div>
                            <div class="text-lg text-truncate fw-semibold text-warning">
                                500 Coins
                            </div>
                        </div>
                        <div class="cell medium-3">
                            <div class="p-2 mb-1 text-center card card-inner">
                                <i class="py-4 fas fa-coins text-warning text-7xl"></i>
                            </div>
                            <div class="text-lg text-truncate fw-semibold text-warning">
                                1000 Coins
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="purchase-with-bucks-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">Confirm Purchase</div>
                        <button class="btn-circle" @click="showModal('purchase-with-bucks-modal')"
                            data-toggle-modal="#purchase-with-bucks-modal" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">

                    <div class="text-sm text-muted fw-semibold">
                        Are you sure you want to buy
                        <span class="text-body fw-semibold">{{ usePage<any>().props.item.name }}</span>
                        for
                        <span class="text-success"><i class="fas fa-money-bill-1-wave me-1"></i>{{ usePage<any>
                            ().props.item.cost_bucks }}
                                Bucks</span>?
                    </div>

                </div>
                <div class="gap-2 flex-container align-right section-borderless">
                    <form @submit.prevent="purchaseBucks">
                        <button type="submit" class="btn btn-success btn-sm">Buy Now</button>
                        <button type="button" class="btn btn-secondary btn-sm"
                            @click="showModal('purchase-with-bucks-modal')" data-toggle-modal="#purchase-with-bucks-modal">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" id="purchase-with-coins-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">Confirm Purchase</div>
                        <button class="btn-circle" @click="showModal('purchase-with-coins-modal')"
                            data-toggle-modal="#purchase-with-coins-modal" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="text-sm text-muted fw-semibold">
                        Are you sure you want to buy
                        <span class="text-body fw-semibold">{{ usePage<any>().props.item.name }}</span>
                        for
                        <span class="text-warning"><i class="fas fa-coins me-1"></i>{{ usePage<any>().props.item.cost_coins
                        }}
                                Coins</span>?
                    </div>
                </div>
                <div class="gap-2 flex-container align-right section-borderless">
                    <form @submit.prevent="purchaseCoins">
                        <button type="submit" class="btn btn-warning btn-sm">Buy Now</button>
                        <button class="btn btn-secondary btn-sm" type="button"
                            @click="showModal('purchase-with-coins-modal')" data-toggle-modal="#purchase-with-coins-modal">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" id="verified-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">Verified Badge</div>
                        <button class="btn-circle" data-toggle-modal="#verified-modal" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="text-center section-borderless">
                    <i class="mb-3 text-6xl fas fa-shield-check text-success"></i>
                    <div class="text-sm text-muted fw-semibold">
                        This account is verified because it's a noteable and
                        trustworthy figure in Eclipse.
                    </div>
                </div>
                <div class="gap-2 flex-container align-center section-borderless">
                    <a href="#" class="btn btn-success btn-sm">Learn More</a>
                    <button class="btn btn-secondary btn-sm" data-toggle-modal="#verified-modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
        <div class="cell large-12">
            <div class="grid-x grid-margin-x grid-padding-y">
                <div class="cell medium-5">
                    <div class="mb-3 overflow-hidden card">
                        <div class="p-4 position-relative">
                            <div style="
                                position: absolute;
                                top: 10px;
                                left: 10px;
                            ">
                                <div v-if="item.rare" class="mb-1">
                                    <span class="badge badge-witch fw-semibold">
                                        <i class="fas fa-star" style="width: 18px"></i>Rare
                                    </span>
                                </div>
                                <div v-if="isNewItem(item.created_at)" class="mb-1">
                                    <span class="badge badge-info fw-semibold">
                                        <i class="fas fa-fire" style="width: 18px"></i>New
                                    </span>
                                </div>
                                <div class="mb-1">
                                    <div v-if="usePage<any>().props.item.sale_ongoing"
                                        class="mb-1 badge badge-danger fw-semibold">
                                        <i class="fas fa-badge-percent" style="width: 18px"></i>{{ usePage<any>
                                            ().props.item.percent_off + '%' }} off
                                    </div>
                                </div>
                                <div class="mb-1">
                                    <span class="badge badge-danger fw-semibold">
                                        <i class="fas fa-clock" style="width: 18px"></i>Goes offsale in 10:10:12
                                    </span>
                                </div>
                            </div>
                            <div class="gap-1 flex-container flex-dir-column" style="
                                position: absolute;
                                bottom: 10px;
                                right: 10px;
                            ">
                                <div class="ms-auto">
                                    <button class="btn btn-secondary btn-xs">
                                        Preview
                                    </button>
                                </div>
                                <div class="ms-auto" v-if="usePage<any>().props.item.type != 'crate'">
                                    <button class="btn btn-success btn-xs" data-toggle-modal="#view-crate-content-modal"
                                        @click="showModal('view-crate-content-modal')">
                                        View Contents
                                    </button>
                                </div>
                            </div>
                            <img :src="usePage<any>().props.item.thumbnail" class="mx-auto d-block" id="thumbnail"
                                ref="thumbnail" width="512" height="512">
                        </div>
                        <div v-if="itemOwnership"
                            class="gap-2 py-2 overflow-hidden text-sm text-center align-middle flex-container align-center bg-success fw-semibold">
                            <i class="text-lg fas fa-party-horn"></i>
                            Yahoo! You own this item.
                        </div>
                    </div>
                    <div class="gap-3 mb-3 align-middle flex-container" v-if="usePage<any>().props.item.type != 'crate'">
                        <button class="btn btn-info btn-xs w-100" data-toggle-modal="#crate-roll-modal"
                            @click="showModal('crate-roll-modal')">
                            Open Crate
                        </button>
                        <div class="text-xs text-center flex-child-grow text-danger fw-bold text-uppercase">
                            9 Owned
                        </div>
                        <button class="text-muted" data-toggle-modal="#crate-info-modal"
                            @click="showModal('crate-info-modal')">
                            <i class="far fa-question-circle"></i>
                        </button>
                    </div>
                    <div class="mb-1 text-xl fw-semibold">
                        Statistics
                    </div>
                    <div class="p-3 mb-3 card">
                        <div class="grid-x grid-margin-x">
                            <div class="mb-2 cell large-6">
                                <div class="text-xs fw-bold text-uppercase text-muted text-truncate">
                                    Date Created
                                </div>
                                <div class="fw-semibold text-truncate">
                                    {{ usePage<any>().props.item.DateHum }}
                                </div>
                            </div>
                            <div class="mb-2 cell large-6">
                                <div class="text-xs fw-bold text-uppercase text-muted text-truncate">
                                    Last Updated
                                </div>
                                <div class="fw-semibold text-truncate">
                                    {{ usePage<any>().props.item.UpdateHum }}
                                </div>
                            </div>
                            <div class="mb-2 cell large-6 mb-md-0">
                                <div class="text-xs fw-bold text-uppercase text-muted text-truncate">
                                    Type
                                </div>
                                <div class="fw-semibold text-capitalize text-truncate">
                                    {{ usePage<any>().props.item.item_type !== 'pants' ? capitalizeFirstLetter(usePage<any>
                                        ().props.item.item_type.slice(0, -1)) :
                                        capitalizeFirstLetter(usePage<any>().props.item.item_type) }}
                                </div>
                            </div>
                            <div class="cell large-6">
                                <div class="text-xs fw-bold text-uppercase text-muted text-truncate">
                                    Owners
                                </div>
                                <div class="fw-semibold text-truncate">
                                    {{ usePage<any>().props.item.owners }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1 text-xl fw-semibold">
                        Private Sellers
                        <span class="text-xs fw-semibold text-muted">This item has 3 listings</span>
                    </div>
                    <div class="card card-body">
                        <div class="gap-4 align-middle section flex-container">
                            <div class="gap-2 align-middle flex-container flex-child-grow">
                                <img src="/assets/img/dummy_headshot.png" class="headshot" width="50">
                                <div style="line-height: 10px">
                                    <div class="text-lg fw-semibold">
                                        Nabrious
                                    </div>
                                    <div class="text-xs fw-semibold text-muted">
                                        Copy #1 of 200
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal">
                                <i class="fas fa-money-bill-1-wave" style="width: 30px"></i>10 Bucks
                            </button>
                        </div>
                        <div class="gap-4 align-middle section flex-container">
                            <div class="gap-2 align-middle flex-container flex-child-grow">
                                <img src="/assets/img/dummy_headshot.png" class="headshot" width="50">
                                <div style="line-height: 10px">
                                    <div class="text-lg fw-semibold">
                                        Nabrious
                                    </div>
                                    <div class="text-xs fw-semibold text-muted">
                                        Copy #1 of 200
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal">
                                <i class="fas fa-money-bill-1-wave" style="width: 30px"></i>10 Bucks
                            </button>
                        </div>
                        <div class="gap-4 align-middle section flex-container">
                            <div class="gap-2 align-middle flex-container flex-child-grow">
                                <img src="/assets/img/dummy_headshot.png" class="headshot" width="50">
                                <div style="line-height: 10px">
                                    <div class="text-lg fw-semibold">
                                        Nabrious
                                    </div>
                                    <div class="text-xs fw-semibold text-muted">
                                        Copy #1 of 200
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal">
                                <i class="fas fa-money-bill-1-wave" style="width: 30px"></i>10 Bucks
                            </button>
                        </div>
                        <div class="gap-4 align-middle section flex-container">
                            <div class="gap-2 align-middle flex-container flex-child-grow">
                                <img src="/assets/img/dummy_headshot.png" class="headshot" width="50">
                                <div style="line-height: 10px">
                                    <div class="text-lg fw-semibold">
                                        Nabrious
                                    </div>
                                    <div class="text-xs fw-semibold text-muted">
                                        Copy #1 of 200
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-success btn-xs w-100" data-toggle-modal="#purchase-with-bucks-modal">
                                <i class="fas fa-money-bill-1-wave" style="width: 30px"></i>10 Bucks
                            </button>
                        </div>
                        <ul class="section pagination flex-container align-center">
                            <button class="page-link page-disabled">
                                <i class="fa-regular fa-chevron-left"></i>
                            </button>
                            <button class="page-link page-active">
                                1
                            </button>
                            <button class="page-link">2</button>
                            <button class="page-link">3</button>
                            <button class="page-link">
                                <i class="fa-regular fa-chevron-right"></i>
                            </button>
                        </ul>
                    </div>
                </div>
                <div class="cell medium-7">
                    <div class="mb-3 card card-body">
                        <div class="gap-2 mb-2 align-middle flex-container align-justify">
                            <div class="text-3xl fw-semibold">
                                {{ usePage<any>().props.item.name }}
                            </div>
                            <div class="position-relative dropdown" style="margin-right: -10px">
                                <button class="btn-circle" data-tooltip-title="More" data-tooltip-placement="bottom">
                                    <i class="fas fa-ellipsis-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li class="dropdown-item">
                                        <a href="#" class="dropdown-link dropdown-link-has-icon">
                                            <i class="fas fa-cash-register dropdown-icon"></i>
                                            Sell
                                        </a>
                                    </li>
                                    <li class="dropdown-item">
                                        <a href="#" class="dropdown-link dropdown-link-has-icon">
                                            <i class="fas fa-flag dropdown-icon"></i>
                                            Report
                                        </a>
                                    </li>
                                    <div class="align-middle flex-container">
                                        <div class="dropdown-title">
                                            Moderation
                                        </div>
                                        <li class="divider flex-child-grow"></li>
                                    </div>
                                    <li class="dropdown-item">
                                        <a href="#" class="dropdown-link dropdown-link-has-icon text-danger">
                                            <i class="fas fa-gavel dropdown-icon text-danger"></i>
                                            View in Panel
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="gap-2 mb-3 align-middle flex-container fw-semibold">
                            <div class="text-xs text-muted text-uppercase fw-bold">
                                By
                            </div>
                            <Link :href="route('user.profile', { username: usePage<any>().props.item.creator.username})" class="gap-2 align-middle flex-container"
                                :class="{ 'text-danger': usePage<any>().props.item.creator.isStaff }">
                                <img src="/assets/img/dummy_headshot.png" class="headshot" width="38">
                                <div style="line-height: 17px">
                                    <div>{{ usePage<any>().props.item.creator.display_name }}</div>
                                    <div class="text-xs text-muted text-truncate" style="max-width: 140px">
                                        {{ '@' + usePage<any>().props.item.creator.username }}
                                    </div>
                                </div>
                            </Link>
                            <i class="fas fa-shield-check text-success" data-toggle-modal="#verified-modal"
                                data-tooltip-title="Verified" data-tooltip-placement="bottom" style="cursor: pointer"></i>
                        </div>
                        <div class="mb-1 text-xs fw-bold text-uppercase text-muted">

                            <span v-if="usePage<any>().props.auth.user && itemOwnership != true">
                                Purchase With
                            </span>
                            <span class="text-info" v-else-if="itemOwnership"></span>
                            <span v-else>
                                Login to Purchase
                            </span>
                        </div>
                        <div class="gap-2 align-middle flex-container-lg" v-if="usePage<any>().props.auth.user && itemOwnership != true">
                            <button class="mb-2 btn btn-success btn-sm w-100" data-toggle-modal="#purchase-with-bucks-modal"
                                @click="showModal('purchase-with-bucks-modal')">
                                <i class="fas fa-money-bill-1-wave" style="width: 34px"></i>{{ usePage<any>
                                    ().props.item.cost_bucks }} Bucks
                            </button>
                            <div class="mb-2 text-xs fw-bold text-uppercase text-muted">
                                or
                            </div>
                            <button class="mb-2 btn btn-warning btn-sm w-100" data-toggle-modal="#purchase-with-coins-modal"
                                @click="showModal('purchase-with-coins-modal')">
                                <i class="fas fa-coins" style="width: 34px"></i>{{ usePage<any>().props.item.cost_coins }}
                                    Coins
                            </button>
                        </div>
                    </div>
                    <div class="mb-1 text-xl fw-semibold">
                        Description
                    </div>
                    <div class="mb-3 card card-body">
                        <div class="text-sm fw-semibold">
                            {{ usePage<any>().props.item.description }}
                        </div>
                    </div>
                    <div class="mb-1 text-xl fw-semibold">
                        More From Creator
                    </div>
                    <div class="mb-3 card card-body">
                        <div v-if="reccomendations" class="grid-x grid-margin-x">
                            <div class="cell large-3 medium-4 small-6" v-for="suggestion in reccomendations">
                                <a href="#" class="d-block">
                                    <div class="p-2 mb-1 card card-inner position-relative">
                                        <img src="/assets/img/item_dummy_2.png">
                                    </div>
                                    <div class="text-body fw-semibold text-truncate">
                                        {{ suggestion.name }}
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div v-else class="text-sm fw-bold text-muted">
                            There is no other items from this creator
                        </div>
                    </div>
                    <div class="mb-1 text-xl fw-semibold">
                        Price Chart
                    </div>
                    <div class="card card-body">
                        <div class="text-xs fw-bold text-uppercase text-muted">
                            PRICE CHART GOES HERE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Sidebar>
    <Footer />
</template>

<script lang="ts">
export default {
    name: 'MyComponent',
    methods: {
        isNewItem(created_at) {
            const currentTime = new Date();
            const itemTime = new Date(created_at);
            const timeDifference = currentTime - itemTime;
            const twoHoursInMillis = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

            return timeDifference < twoHoursInMillis;
        },
        showModal(modalId: string): void {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.toggle("active");
            }
        },
    },
};
</script>
