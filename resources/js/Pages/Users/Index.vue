<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import AppHead from '@/Components/AppHead.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import { route, current } from "momentum-trail";
import axios from 'axios';
import { ref, watch } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import VLazyImage from "v-lazy-image";
</script>

<template>
    <AppHead pageTitle="Users" description="View all users here." :url="route(`user.page`)" />
    <Navbar />
    <Sidebar>
        <div class="cell small-12">
            <div class="mb-2 text-3xl fw-semibold align-center">Users</div>
            <div class="grid-x align-center">
                <div class="mx-2 mb-3 row card avatar card-body card-status"
                    :class="[user.online ? 'online' : 'offline']" v-for="user in usePage<any>().props.users.data"
                    :key="usePage<any>().props.users.id">
                    <div class="gap-2 align-middle flex-container">
                        <Link :href="route('user.profile', { username: user.username })">
                        <v-lazy-image :src="user.avatar" width="45"
                            class="border img-fluid headshot rounded-circle border-secondary bg-dark"
                            :alt="user.username" />
                        </Link>
                        <div class="flex-wrap col-md-4 d-flex justify-content-center align-content-start"
                            style="flex-direction: column">
                            <div class="text-start">
                                <Link :href="route('user.profile', { username: user.username })" class="text-md">
                                {{ user.dname }}
                                </Link>
                                <div></div>
                                <Link :href="route('user.profile', { username: user.username })"
                                    class="text-sm fw-semibold text-body">
                                {{ '@' + user.username }}
                                </Link>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-3 my-3 divider"></div>
            <Pagination v-bind:pagedata="usePage<any>().props.users"></Pagination>
        </div>
    </Sidebar>
    <Footer />
</template>
