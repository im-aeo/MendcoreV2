<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";

import SideLink from '../SideLink.vue';
const chatopen = ref(false);

const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
const adblock = ref(false);

async function detectAdBlock() {
    try {
        await fetch(new Request(googleAdUrl)).catch(() => adblock.value = true);
    } catch (e) {
        adblock.value = true;
    }
}

//onMounted(() => {
//detectAdBlock(); // Call the function only if adblock status is not already set
//});

const lang = computed(() => usePage<any>().props.locale);

const { props } = usePage<any>();
</script>
<template>
    <nav class="sidebar show-for-large" id="sidebar">
        <ul class="sidebar-nav">
            <div class="hide-for-large" v-if="!props.auth.user">
                <li class="side-item side-title">Account</li>
                <Link :href="route('auth.register.page')" class="side-link">
                <i class="fas fa-user-plus side-icon"></i>
                <span>Get Started</span>
                </Link>
                <li class="side-item">
                    <Link :href="route('auth.login.page')" class="side-link"><i
                        class="fas fa-sign-in side-icon"></i><span>Log In</span></Link>
                </li>
            </div>
            <li class="side-item">
                <Link :href="route('Welcome')" :class="[current('my.dashboard.*' || 'Welcome') ? 'active' : '']"
                    class="side-link"><i class="fas fa-home side-icon"></i><span>Home</span></Link>
            </li>
            <template v-for="sidesections in sidebarsections" class="hide-for-large">
                <li class="side-item side-title">{{ sidesections[lang].name }}</li>
                <!-- Iterate over links within the current section -->
                <SideLink class="side-item"
                    v-for="sidelink in sidebar.filter(link => link.section === sidesections.en.name)" :link="sidelink.url"
                    :ActiveLink="sidelink.active_link">
                    <i class="side-icon" :class="sidelink.icon"></i><span>{{ sidelink[lang].title }}</span>
                </SideLink>
            </template>
            <li v-if="props.auth.user" class="side-item side-title">My Spaces</li>
            <li v-if="props.auth.user" class="side-item">
                <Link href="#" class="side-link side-link-has-img">
                <span class="side-img">
                    <img src="/assets/img/icon.png" />
                </span>
                <span>Project Eclipse</span>
                </Link>
            </li>
        </ul>
    </nav>
    <main class="container">
        <div v-if="adblock" class="py-2 mb-4 text-center alert alert-danger fw-semibold">
            <div class="gap-2 align-middle flex-container align-justify">
                <i class="text-lg far fa-triangle-exclamation pe-2"></i>
                <div> Looks like you're using an adblocker! Please consider disabling your adblocker to support {{ props.site.name }}.</div>
                <i class="text-lg far fa-triangle-exclamation pe-2"></i>
            </div>
        </div>
        <div v-if="props.site_config.in_maintenance"
            class="py-2 mb-2 text-center text-white alert alert-warning">
            <div class="gap-2 align-middle flex-container align-justify">
                <i class="text-lg far fa-hammer pe-2"></i>
                <div>You are currently in maintenance mode.
                    <Link :href="route('maintenance.exit')" class="text-white fw-semibold">Exit</Link>
                </div>
                <i class="text-lg far fa-hammer pe-2"></i>
            </div>
        </div>
        <div class="grid-x grid-margin-x align-center">
            <slot />
        </div>
    </main><!-- End #main -->
</template>
<style scoped>
.msg {
    border-radius: 10px;
}

.msg.right {
    background-color: var(--info-600);
}

.msg.left {
    background-color: var(--gray-500);
    color: white;
}
</style>
<script lang="ts">
export default {
    methods: {
        showModal(modalId: string): void {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.toggle("active");
            }
        },
        addActiveClass(elementId: string): void {
            const element = document.getElementById(elementId);
            if (element) {
                element.classList.toggle('active');
            }
        },
        sidebarOpen(): void {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('show-for-large');
            }
        },
        addActiveClassSSInput(elementId: string): void {
            const element = document.getElementById(elementId) as HTMLInputElement;
            const isEmpty = (str: string): boolean => !str.trim().length;

            if (element) {
                element.addEventListener('input', function () {
                    if (isEmpty(this.value)) {
                        return;
                    } else {
                        element.classList.toggle('hide');
                    }
                });
            }
        }
    }
};
</script>
