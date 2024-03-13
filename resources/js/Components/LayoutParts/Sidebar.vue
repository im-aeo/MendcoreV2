<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";
import SideLink from '../SideLink.vue';

defineProps<{
  image: String
}>();
const { props } = usePage<any>();
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

onMounted(() => {
    detectAdBlock(); // Call the function only if adblock status is not already set
});

const sidebarsections = [
    {
        en: { name: "NAVIGATION" },
        ru: { name: "НАВИГАЦИЯ" },
        jp: { name: "ナビゲーション" }
    },
    {
        en: { name: "SOCIAL" },
        ru: { name: "СОЦИАЛЬНОЕ" },
        jp: { name: "ソーシャル" }
    },
    {
        en: { name: "BOOST YOUR ACCOUNT" },
        ru: { name: "ПОДДЕРЖИТЕ СВОЙ АККАУНТ" },
        jp: { name: "アカウントを強化する" } 
    }
]
const sidebar = [
    {
        url: "#",
        active_link: "games.*",
        section: "NAVIGATION",
        icon: "fas fa-gamepad-modern",
        en: { title: "Games" },
        ru: { title: "Игры" },
        jp: { title: "ゲーム" }
        
    },
    {
        url: route(`store.page`),
        section: "NAVIGATION",
        active_link: "store.*",
        icon: "fas fa-store",
        en: { title: "Market" },
        ru: { title: "Рынок" },
        jp: { title: "市場" },
    },
    {
        url: route(`forum.page`, { id: 1 }),
        active_link: "forum.page.*",
        icon: "fas fa-messages",
        section: "NAVIGATION",
        en: { title: "Discuss" },
        ru: { title: "Обсуждать" },
        jp: { title: "議論" },
    },
    {
        url: "#",
        section: "NAVIGATION",
        active_link: "develop.*",
        icon: "fas fa-code",
        en: { title: "Develop" },
        ru: { title: "Развивать" },
        jp: { title: "発展" }
    },
    {
        url: route(`user.page`),
        active_link: "user.*",
        section: "SOCIAL",
        icon: "fas fa-users",
        en: { title: "Players" },
        ru: { title: "Игроки" },
        jp: { title: "発展" }
    },
    {
        url: "#",
        section: "SOCIAL",
        active_link: "spaces.*",
        icon: "fas fa-planet-ringed",
        en: { title: "Spaces" },
        ru: { title: "Пространства" },
        jp: { title: "スペース" }
    },
    {
        url: "#",
        section: "SOCIAL",
        active_link: "leaderboard.*",
	icon: "fas fa-list-ol",
        en: { title: "Leaderboard" },
        ru: { title: "Таблица лидеров" },
        jp: { title: "リーダーボード" }
    },
    {
        url: "#",
        icon: "fas fa-rocket-launch",
        active_link: "upgade.*",
        section: "BOOST YOUR ACCOUNT",
        en: { title: "Upgrade" },
        ru: { title: "модернизировать" },
        jp: { title: "アップグレード" }
    },

];    
const lang = computed(() => usePage().props.locale);
</script>
<template>
    <nav class="sidebar" id="side-bar" class="show-for-large">
        <ul class="sidebar-nav">
            <div class="hide-for-large" v-if="!props.auth.user">
                <li class="side-item side-title">Account</li>
		<SideLink :link="route('auth.register.page')" :ActiveLink="route('auth.register.page')">
		    <i class="fas fa-user-plus side-icon"></i>
		    <span>Get Started</span>
		</SideLink>
		<SideLink :link="route('auth.login.page')" :ActiveLink="route('auth.login.page')">
		    <i class="fas fa-sign-in side-icon"></i>
		    <span>Log In</span>
		</SideLink>
            </div>
                <SideLink :link="route('Welcome')" :ActiveLink="route('Welcome')">
		    <i class="fas fa-home side-icon"></i>
		    <span>Home</span>
		</SideLink>
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
    <div v-if="image" class="profile-banner">
        <img class="masoqi" src="{{ image }}" />
    </div>
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
