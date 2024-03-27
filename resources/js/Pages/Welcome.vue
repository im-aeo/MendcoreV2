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
        <div class="cell">
            <div class="justify-center row-landing align-center">
                <div class="row-landing justify-content-center">
                    <div class="col-xl-12-landing">
                        <div class="text-center text-white">
                            <!-- Page heading-->
                            <h1 class="mb-5">
                                <v-lazy-image :src="site.logo" width="512" />
                            </h1>
                            <h3 class="mt-3 fw-semibold">
                                Join in on the action today. Buy &amp; sell items, participate in groups, make friends, and more.
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
        </div>
    </header>
    <div class="container site-landing grid-x">
        <div>
            <div class="row-landing" id="YASQUEEN">
                <div class="col-md-12-landing">
                    <div class="row-landing">
                        <div class="text-right col-md-4-landing">
                            <div class="landing-text-landing fw-semibold">Customize your Character</div>
                            <div>Pick and choose from a collection of items created by the community to create you own
                                unique character with.</div>
                        </div>
                        
                        <div class="col-md-2-landing" v-for="item in LandingItems">
                            <div class="cell large-2 medium-3 small-6">
                                <a href="#" class="d-block">
                                    <div class="card position-relative p-2 mb-1">
                                        <img src="item.thumbnail" />
                                    </div>
                                    <div class="text-body fw-semibold text-truncate">
                                        {{ item.name }}
                                    </div>
                                </a>
                                <div class="text-xs fw-semibold">
                                    <span class="text-muted">By</span>
                                    <a href="#" class="text-danger">{{ '@' + item.creator.username }}<i
                                            class="fas fa-shield-check text-success ms-1"></i></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row-landing mt-4 mb-4" id="YASQUEEN">
                <div class="col-md-12-landing">
                    <div class="row-landing">
                        <div class="col-md-4-landing mb-2">
                            <div class="cell large-2 medium-3 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious<span class="mx-1">&bullet;</span>35m ago
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#" class="btn btn-info btn-sm text-truncate min-w-0">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cell large-2 medium-3 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious<span class="mx-1">&bullet;</span>35m ago
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#" class="btn btn-info btn-sm text-truncate min-w-0">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4-landing">
                            <div class="cell large-4 medium-3 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious<span class="mx-1">&bullet;</span>35m ago
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#" class="btn btn-info btn-sm text-truncate min-w-0">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cell large-4 medium-3 small-6 mb-2">
                                <div class="card card-post card-body section-borderless">
                                    <div class="section">
                                        <div class="flex-container align-justify align-middle gap-2">
                                            <div class="flex-container align-middle gap-2">
                                                <i class="fa-solid fa-messages text-2xl text-warning"></i>
                                                <div class="w-100">
                                                    <div class="fw-semibold">Nabrious</div>
                                                    <div class="text-sm  fw-semibold text-muted">
                                                        Nabrious<span class="mx-1">&bullet;</span>35m ago
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#" class="btn btn-info btn-sm text-truncate min-w-0">View
                                                Post</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-right col-md-4-landing">
                            <div class="landing-text-landing fw-semibold">Socialize With Others</div>
                            <div>Head over to Discussion to socialize with all kinds of users on {{ site.name }}, from
                                the funny to the professional, and find new friends!</div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
       </div>
<Footer/>
</Navbar>
</template>
