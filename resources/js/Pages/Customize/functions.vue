<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
//import { route, current } from "momentum-trail";
import { ref } from 'vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});
function showModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle("active");
    }
};
const userAvatarColor = ref([avatar.color_left_arm]);
</script>

<template>
    <Navbar>
        <div class="modal" id="PartsModal">
            <div class="modal-avatar-card modal-card-body">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">
                            Avatar Parts
                        </div>
                        <button @click="showModal('PartsModal')" class="btn-circle"
                            data-toggle-modal="#following-modal" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                    <div class="cell medium-3">
                        <div class="text-center">
                            <div class="card card-body">
                                <div style="margin-bottom:2.5px;">
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_head }};padding:25px;margin-top:-1px;" data-part="head"></button>
                                </div>
                                <div style="margin-bottom:2.5px;">
                                    <button class="avatar-body-part" :style="{
                                        backgroundColor: userAvatarColor,
                                        padding: '50px',
                                        paddingRight: '0px'
                                      }" data-part="left_arm"></button>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_torso }};padding:50px;" data-part="torso"></button>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_right_arm }};padding:50px;padding-right:0px;" data-part="right_arm"></button>
                                </div>
                                <div>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_left_leg }};padding:50px;padding-right:0px;padding-left:47px;" data-part="left_leg"></button>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_right_leg }};padding:50px;padding-right:0px;padding-left:47px;" data-part="right_leg"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cell medium-8">
                        <div class="text-center">
                            <div class="card card-body">
                                <div style="margin-bottom:2.5px;">
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_head }};padding:25px;margin-top:-1px;" data-part="head"></button>
                                </div>
                                <div style="margin-bottom:2.5px;">
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_left_arm }};padding:50px;padding-right:0px;" data-part="left_arm"></button>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_torso }};padding:50px;" data-part="torso"></button>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_right_arm }};padding:50px;padding-right:0px;" data-part="right_arm"></button>
                                </div>
                                <div>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_left_leg }};padding:50px;padding-right:0px;padding-left:47px;" data-part="left_leg"></button>
                                    <button class="avatar-body-part" style="background-color:{{ Auth::user()->avatar()->color_right_leg }};padding:50px;padding-right:0px;padding-left:47px;" data-part="right_leg"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="cell medium-3">
            <div class="mb-1 align-middle flex-container align-justify">
                <div class="mb-1 text-xl fw-semibold">Avatar</div>
                <div class="button position-relative" style="margin-right: -14px" @click="showModal('PartsModal')">
                    <button class="text-sm far fa-fill-drip btn-circle" data-tooltip-title="More"
                        data-tooltip-placement="bottom"></button>
                </div>
            </div>
            <div class="mb-3 card card-body">
                <img src="/assets/img/dummy.png" />
                <div class="min-w-0 gap-2 mt-3 flex-container">
                    <button class="btn btn-danger btn-sm text-truncate w-100">
                        Reset
                    </button>
                    <button class="btn btn-info btn-sm text-truncate w-100">
                        Random
                    </button>
                </div>
            </div>
        </div>
        <div class="cell medium-8">
            <div class="mb-1 align-middle flex-container align-justify">
                <div class="mb-1 text-xl fw-semibold">Inventory</div>
            </div>
            <div class="mb-3 card card-body">
                <div class="gap-3 text-center flex-container flex-dir-column">
                    <i class="text-5xl fas fa-wand-magic-sparkles text-muted"></i>
                    <div style="line-height: 16px">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            No Items.
                        </div>
                        <div class="text-xs text-muted fw-semibold">
                            You are not wearing any items.
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-3 card card-body">
                <div class="section">
                    <ul class="tabs">
                        <li class="tab-item">
                            <a href="#" class="tab-link active squish">Hats</a>
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish">Shirts</a>
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish">Accessories</a>
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish">Pants</a>
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish">Heads</a>
                        </li>
                    </ul>
                </div>
                <div class="section">
                    <div class="gap-3 text-center flex-container flex-dir-column">
                        <i class="text-5xl fas fa-crate-apple text-muted"></i>
                        <div style="line-height: 16px">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                No insert_category_name_here
                            </div>
                            <div class="text-xs text-muted fw-semibold">
                                You have no items in the category.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Navbar>
</template>
