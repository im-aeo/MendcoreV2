<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import AppHead from '@/Components/AppHead.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import { route, current } from "momentum-trail";
import axios from 'axios';
import { ref } from 'vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';

defineProps({
  users: { type: Object },
});
</script>

<template>
    <Navbar />
    <Sidebar>
        <div class="cell small-12">
            <div class="mb-2 text-3xl fw-semibold align-center">Users</div>
            <div class="grid-x align-center">
                <div class="mx-2 mb-3 row card avatar card-body card-status" :class="{ 'online': user.online ? 'offline' : 'offline' }" v-for="user in users.data" :key="users.id">
                    <div class="gap-2 align-middle flex-container">
                        <Link :href="route('user.profile', { username: user.username })">
                        <img :src="user.avatar" style="max-width:65px"
                            class="border img-fluid headshot rounded-circle border-secondary bg-dark" :alt="user.username">
                        </Link>
                        <div class="flex-wrap col-md-4 d-flex justify-content-center align-content-start"
                            style="flex-direction: column">
                            <div class="text-start">
                                <Link :href="route('user.profile', { username: user.username })" class="text-md">
                                      {{ user.dname }}
                                </Link>
                                <div></div>
                                <Link :href="route('user.profile', { username: user.username })" class="text-sm fw-semibold text-body">
                                      {{ '@' + user.username }}
                                </Link>
                                <div></div>
                            </div>
                        </div>

                    </div>
                    <div class="mx-1 my-2 divider"></div>
                    <button class="btn btn-info btn-block">Follow User</button>
                </div>
            </div>
            <div class="mx-3 my-3 divider"></div>
        </div>
    </Sidebar>
    <Footer />
</template>
