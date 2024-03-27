<script setup lang="ts">
import AppHead from '@/Components/AppHead.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import { computed } from 'vue';
import VLazyImage from "v-lazy-image";
import { usePage } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";

const site = computed(() => usePage<any>().props.site)

defineProps({
    UserCount: { type: Number, default: '0' },
    LandingItems: { type: Array },
});
</script>
<style scoped src="@/Pages/landing.css"></style>
<template>
<AppHead :pageTitle="{{ 'Welcome -' + site.name }}" description="Join in on the action today. Buy &amp; sell items, participate in spaces, make friends, and more." :url="route(`Welcome`)" />
    <Navbar>
        <header class="masthead-landing bg-info">
        <div class="cell large-12">
            <div class="justify-center row-landing align-center">
                <div class="row-landing justify-content-center">
                    <div class="text-center text-white">
                        <!-- Page heading-->
                        <h1 class="mb-5">
                         <v-lazy-image :src="site.logo" width="300px" />
                        </h1>
                        <h3 class="mt-3 fw-semibold">
                            Join in on the action today. Buy &amp; sell items, participate in groups, make friends, and
                            more.
                        </h3>
                        <div class="min-w-0 gap-4 mt-3 flex-container align-center">
                            <button :href="route('auth.login.page')" class=" btn btn-landing btn-warning">
                                <i class="mr-1 fas fa-key"></i>
                                Login
                            </button>
                            <button :href="route('auth.register.page')" class="btn btn-landing btn-success">
                                <i class="mr-1 fas fa-user-plus"></i>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main class="container">
        <div class="grid-x grid-margin-x grid-padding-y">
                <div class="cell large-12">
                <div class="grid-x align-middle">
                    <div class="cell large-4 mb-4">
                        <div class="landing-text-landing fw-semibold">Customize your Character</div>
                        <div>
                            Pick and choose from a collection of items created by the community to create you own
                            unique character with.
                        </div>
                    </div>
                    <div class="cell large-8">
                        <div class="grid-x grid-margin-x grid-padding-y">
                            <div class="cell large-2 medium-4 small-6"  v-for="item in LandingItems">
                                <a href="#" class="d-block">
                                    <div class="card card-item position-relative p-2 mb-1">
                                        <img :src="item.thumbnail" />
                                    </div>
                                    <div class="text-body fw-semibold text-truncate">
                                        {{ item.name }}
                                    </div>
                                </a>
                                <div class="text-xs fw-semibold">
                                    <span class="text-muted">By</span>
                                    <a href="#" class="text-danger">{{ '@' + item.creator.username }}
                                        <i class="fas fa-shield-check text-success ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <div class="grid-x align-middle mb-2">
                    <div class="cell large-8">
                        <div class="grid-x grid-margin-x grid-padding-y">
                            <div class="cell large-6 medium-6 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#"
                                                class="btn btn-info btn-sm text-truncate min-w-0 show-for-large-only">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cell large-6 medium-6 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#"
                                                class="btn btn-info btn-sm text-truncate min-w-0 show-for-large-only">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="grid-x grid-margin-x grid-padding-y">
                            <div class="cell large-6 medium-6 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#"
                                                class="btn btn-info btn-sm text-truncate min-w-0 show-for-large-only">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="cell large-6 medium-6 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#"
                                                class="btn btn-info btn-sm text-truncate min-w-0 show-for-large-only">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cell large-4 mt-4">
                        <div class="landing-text-landing fw-semibold">Socialize With Others</div>
                        <div>Head over to Discussion to socialize with all kinds of users on Netisu, from
                            the funny to the professional, and find new friends!</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
<Footer/>
</Navbar>
</template>
