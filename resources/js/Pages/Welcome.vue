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
});
</script>
<style scoped src="@/Pages/landing.css"></style>
<template>
    <Navbar>
    <header class="masthead-landing bg-info">
        <div class="cell">
            <div class="justify-center row-landing align-center">
                <div class="row-landing justify-content-center">
                    <div class="col-xl-12-landing">
                        <div class="text-center text-white">
                            <!-- Page heading-->
                            <h1 class="mb-5"><v-lazy-image :src="site.logo" width="512" /></h1>
                            <h3 class="mt-3  fw-semibold">Join in on the action today. Buy &amp; sell items, participate
                                in groups, make friends, and more.</h3>
                            <h4 class="fw-semibold">Join <strong>{{ UserCount }}</strong> {{ UserCount != "1" ? 'users' : 'user' }} today!</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="container site-landing grid-x">
        <div>
            <div class="row-landing" id="YASQUEEN">
                <div class="col-md-6-landing">
                    <div class="card">
                        <div class="card-body">
                            <div class="row-landing align-items-center-landing">
                                <div class="text-center col-md-3-landing text-center-sm">
                                    <i class="fas fa-user-hard-hat text-info hide-sm-landing" style="font-size:90px;"></i>
                                    <i class="mb-2 fas fa-user-hard-hat text-info show-sm-only-landing" style="font-size:80px;"></i>
                                </div>
                                <div class="col-md-9-landing">
                                    <div class="landing-text-landing-landing fw-semibold">Customize Your Character</div>
                                    <div>Pick and choose from a collection of items created by the community to create
                                        your own unique character with.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6-landing">
                    <div class="card">
                        <div class="card-body">
                            <div class="row-landing align-items-center-landing">
                                <div class="text-center col-md-3-landing text-center-sm show-sm-only-landing">
                                    <i class="mb-2 fas fa-users text-success" style="font-size:80px;"></i>
                                </div>
                                <div class="text-right col-md-8-landing">
                                    <div class="landing-text-landing fw-semibold">Meet New Friends</div>
                                    <div>On {{ site.name }}, finding and adding friends is only two steps away,
                                        simply find a
                                        user and add them. It's that simple!</div>
                                </div>
                                <div class="text-center col-md-4-landing text-center-sm hide-sm-landing">
                                    <i class="fas fa-users text-success" style="font-size:90px;"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6-landing">
                    <div class="card">
                        <div class="card-body">
                            <div class="row-landing align-items-center-landing">
                                <div class="text-center col-md-3-landing text-center-sm">
                                    <i class="fas fa-tools text-danger hide-sm-landing" style="font-size:90px;"></i>
                                    <i class="mb-2 fas fa-tools text-danger show-sm-only-landing" style="font-size:80px;"></i>
                                </div>
                                <div class="col-md-9-landing">
                                    <div class="landing-text-landing fw-semibold">Create Your Own Assets</div>
                                    <div>Unleash your inner entrepreneur by creating and marketing your own items,
                                        groups, games and more.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6-landing">
                    <div class="card">
                        <div class="card-body">
                            <div class="row-landing align-items-center-landing">
                                <div class="text-center col-md-3-landing text-center-sm show-sm-only-landing">
                                    <i class="mb-2 fas fa-comments-alt text-warning" style="font-size:80px;"></i>
                                </div>
                                <div class="text-right col-md-8-landing">
                                    <div class="landing-text-landing fw-semibold">Socialize With Others</div>
                                    <div>Head over to Discussion to socialize with all kinds of users on {{ site.name }}, from
                                        the funny to the professional, and find new friends!</div>
                                </div>
                                <div class="text-center col-md-4-landing text-center-sm hide-sm-landing">
                                    <i class="fas fa-comments-alt text-warning" style="font-size:90px;"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="justify-center text-center card card-body align-center reg-card">
        <div class="col-md-8 align-center text-center-sm">
            <h3>What are you wating for?</h3>
            <p>Register to {{ site.name }} below.</p>
            <div class="min-w-0 gap-1 mt-3 flex-container align-center">
                <Link :href="route('auth.login.page')" class="gap-2 btn btn-warning"><i
                    class="mr-1 fas fa-key"></i> Login</Link>
                <Link :href="route('auth.register.page')" class="gap-2 btn btn-success"><i
                    class="mr-1 fas fa-user-plus"></i> Register</Link>
            </div>
        </div>
    </div>
    <Footer/>
</Navbar>
</template>
