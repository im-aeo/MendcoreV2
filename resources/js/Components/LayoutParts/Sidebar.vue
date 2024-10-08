<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Link, usePage } from "@inertiajs/vue3";
import { route } from "momentum-trail";
import SideLink from "../SideLink.vue";
import FlashMessages from "@/Components/Messages/FlashMessages.vue";
import VLazyImage from "v-lazy-image";

defineProps<{
  image?: string;
}>();
const chatToggle = ref(false);
const { props } = usePage<any>();
const googleAdUrl = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
const adblock = ref(false);
const messages = ref([
  {
    username: "aeo",
    displayname: "ae-no",
    message: "test array",
    type: "type",
    DateHum: "Just Now",
  },
]);
async function detectAdBlock() {
  try {
    await fetch(new Request(googleAdUrl)).catch(() => (adblock.value = true));
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
    es: { name: "NAVEGACIÓN" },
    ru: { name: "НАВИГАЦИЯ" },
    ja: { name: "ナビゲーション" },
  },
  {
    en: { name: "SOCIAL" },
    es: { name: "Sociable" },
    ru: { name: "СОЦИАЛЬНОЕ" },
    ja: { name: "ソーシャル" },
  },
  {
    en: { name: "BOOST YOUR ACCOUNT" },
    es: { name: "IMPULSA TU CUENTA" },
    ru: { name: "ПОДДЕРЖИТЕ СВОЙ АККАУНТ" },
    ja: { name: "アカウントを強化する" },
  },
];
const sidebar = [
  {
    url: "#",
    active_link: "games.*",
    section: "NAVIGATION",
    icon: "fas fa-gamepad-modern",
    en: { title: "Games" },
    es: { title: "Juegos" },
    ru: { title: "Игры" },
    ja: { title: "ゲーム" },
  },
  {
    url: route(`store.page`),
    section: "NAVIGATION",
    active_link: "store.*",
    icon: "fas fa-store",
    en: { title: "Market" },
    es: { title: "Mercado" },
    ru: { title: "Маркет" },
    ja: { title: "市場" },
  },
  {
    url: route(`forum.page`, { id: 1 }),
    active_link: "forum.*",
    icon: "fas fa-messages",
    section: "NAVIGATION",
    en: { title: "Discuss" },
    es: { title: "Conversar" },
    ru: { title: "Обсуждение" },
    ja: { title: "議論" },
  },
  {
    url: "#",
    section: "NAVIGATION",
    active_link: "develop.*",
    icon: "fas fa-code",
    en: { title: "Develop" },
    es: { title: "Desarrollar" },
    ru: { title: "Мои создания" },
    ja: { title: "発展" },
  },
  {
    url: route(`user.page`),
    active_link: "user.*",
    section: "SOCIAL",
    icon: "fas fa-users",
    en: { title: "Players" },
    es: { title: "Jugadoras" },
    ru: { title: "Игроки" },
    ja: { title: "発展" },
  },
  {
    url: route(`spaces.page`),
    section: "SOCIAL",
    active_link: "spaces.*",
    icon: "fas fa-planet-ringed",
    en: { title: "Spaces" },
    es: { title: "Espacios" },
    ru: { title: "Пространства" },
    ja: { title: "スペース" },
  },
  {
    url: route(`leaderboard.page`),
    section: "SOCIAL",
    active_link: route(`leaderboard.page`),
    icon: "fas fa-list-ol",
    en: { title: "Leaderboard" },
    es: { title: "Tabla de clasificación" },
    ru: { title: "Таблица лидеров" },
    ja: { title: "リーダーボード" },
  },
  {
    url: "#",
    icon: "fas fa-rocket-launch",
    active_link: "upgade.*",
    section: "BOOST YOUR ACCOUNT",
    en: { title: "Upgrade" },
    es: { title: "Mejora" },
    ru: { title: "Подписки" },
    ja: { title: "アップグレード" },
  },
];
const lang = computed(() => usePage<any>().props.locale);
</script>
<template>
  <nav
    v-if="props.site.frontend.sidebar_menu"
    class="sidebar show-for-large"
    id="sidebar"
  >
    <ul class="sidebar-nav">
      <div class="hide-for-large" v-if="!props.auth.user">
        <li class="side-item side-title">Account</li>
        <SideLink
          :link="route('auth.register.page')"
          :ActiveLink="route('auth.register.page')"
        >
          <i class="fas fa-user-plus side-icon"></i>
          <span>Get Started</span>
        </SideLink>
        <SideLink :link="route('auth.login.page')" :ActiveLink="route('auth.login.page')">
          <i class="fas fa-sign-in side-icon"></i>
          <span>Log In</span>
        </SideLink>
      </div>
      <SideLink
        :link="route('Welcome')"
        :ActiveLink="props.auth.user ? 'my.dashboard.page' : 'Welcome'"
      >
        <i class="fas fa-home side-icon"></i>
        <span> {{ props.auth.user ? "Dashboard" : "Welcome" }} </span>
      </SideLink>
      <template v-for="sidesections in sidebarsections" class="hide-for-large">
        <li class="side-item side-title">{{ sidesections[lang].name }}</li>
        <!-- Iterate over links within the current section -->
        <SideLink
          class="side-item"
          v-for="sidelink in sidebar.filter(
            (link) => link.section === sidesections.en.name
          )"
          :link="sidelink.url"
          :ActiveLink="sidelink.active_link"
        >
          <i class="side-icon" :class="sidelink.icon"></i
          ><span>{{ sidelink[lang].title }}</span>
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
  <nav v-if="props.site_config.announcement" class="sitewide-alert">
    <div class="py-2 text-center alert alert-danger alert-wide fw-semibold">
      <div class="gap-2 text-center align-middle flex-container align-center">
        <div>
          {{ props.site_config.announcement_message }}
        </div>
      </div>
    </div>
  </nav>
  <main
    :class="{
      'container-navbar': !props.site.frontend.sidebar_menu,
      container: props.site.frontend.sidebar_menu,
    }"
  >
    <div class="position-relative cell shrink ms-1 mt-2 mb-2">
      <v-lazy-image
        :src="usePage<any>().props.auth?.user?.headshot"
        width="40"
        class="headshot"
        alt="Avatar"
        src-placeholder="assets/img/dummy_headshot.png"
      />
      <div class="text-2xl fw-semibold">test</div>
      <div class="text-sm fw-semibold text-muted">
        This idk does not have a description.
      </div>
    </div>
  </main>
  <div v-if="image" class="profile-banner">
    <v-lazy-image class="masoqi" :src="image" />
  </div>
  <FlashMessages />
  <main
    :class="{
      'container-navbar': !props.site.frontend.sidebar_menu,
      container: props.site.frontend.sidebar_menu,
    }"
  >
    <div v-if="adblock" class="py-2 mb-4 text-center alert alert-danger fw-semibold">
      <div class="gap-2 align-middle flex-container align-justify">
        <i class="text-lg far fa-triangle-exclamation pe-2"></i>
        <div>
          Looks like you're using an adblocker! Please consider disabling your adblocker
          to support {{ props.site.name }}.
        </div>
        <i class="text-lg far fa-triangle-exclamation pe-2"></i>
      </div>
    </div>
    <div
      v-if="props.site_config.in_maintenance"
      class="py-2 mb-4 text-center text-white alert alert-danger"
    >
      <div class="gap-2 align-middle flex-container align-justify">
        <i class="text-lg far fa-hammer pe-2"></i>
        <div>
          You are currently in maintenance mode.
          <Link :href="route('maintenance.exit')" class="ml-2 text-white fw-semibold"
            >Exit</Link
          >
        </div>
        <i class="text-lg far fa-hammer pe-2"></i>
      </div>
    </div>
    <div class="grid-x grid-margin-x align-center">
      <slot />
      <div
        id="chat-container"
        class="chat-container chat-vis focused"
        style="right: 66px; z-index: 1060"
        v-if="chatToggle"
      >
        <div
          class="chat-windows-header chat-header bg-info hover"
          @click="chatToggle = !chatToggle"
        >
          <div class="chat-header-action">
            <i class="chat-icon fas fa-message-xmark chat-link-icon"></i>
            <i class="chat-icon fas fa-cog chat-link-icon"></i>
            <i class="chat-icon fas fa-gamepad-modern chat-link-icon"></i>
          </div>
          <div class="chat-header-label">
            <span class="chat-caption-header text-overflow chat-header-title"> Aeo </span>
          </div>
        </div>
        <div class="chat-main">
          <div class="chat-body card-chat card-chat-body no-corners">
            <div
              v-for="message in messages"
              class="gap-2 p-2 mb-2 align-middle squish flex-container align-justify"
            >
              <div class="gap-2 align-middle flex-container">
                <img src="/assets/img/dummy_headshot.png" class="headshot" width="50" />
                <div class="w-100">
                  <div class="fw-semibold">{{ message.displayname }}</div>
                  <div class="text-sm fw-semibold text-muted">
                    @{{ message.username }}
                  </div>
                  <div class="text-xs fw-semibold text-muted">
                    {{ message.DateHum }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- End #main -->
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
        element.classList.toggle("active");
      }
    },
    addActiveClassSSInput(elementId: string): void {
      const element = document.getElementById(elementId) as HTMLInputElement;
      const isEmpty = (str: string): boolean => !str.trim().length;

      if (element) {
        element.addEventListener("input", function () {
          if (isEmpty(this.value)) {
            return;
          } else {
            element.classList.toggle("hide");
          }
        });
      }
    },
  },
};
</script>
