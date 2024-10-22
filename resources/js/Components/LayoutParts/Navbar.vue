<script setup lang="ts">
  import { ref, onMounted, watch, computed } from "vue";
  import { router, Link, usePage } from "@inertiajs/vue3";
  import axios from "axios";
  import { route, current } from "momentum-trail";
  import LanguageModal from "../Modal/LanguageModal.vue";
  import SearchResult from "../SearchResult.vue";
  import NavLink from "../NavLink.vue";
  import Button from "../Button.vue";
  import SearchResultSkeleton from "../SearchResultSkeleton.vue";
  import VLazyImage from "v-lazy-image";
  import PageLoader from "../Loaders/PageLoader.vue";
  import "../../../css/style.css";
  import "../../../css/NProgress.css";
  // Define the SearchResult interface
  interface SearchResult {
    url: string;
    image: string;
    name: string;
    // Add other properties if needed
  }
  defineProps<{
    landing: { type: boolean; default: false; required: false };
  }>();
  const SearchLoading = ref(false);

  const search = ref("");
  // Update the type of results to be an array of SearchResult
  const results = ref<SearchResult[]>([]);

  const performSearch = async () => {
    if (search.value !== "") {
      SearchLoading.value = true;
      await axios
        .get(route("api.search", { search: search.value }))
        .then((response) => {
          // Assuming the response.data is an array of SearchResult
          results.value = response.data.results;
          SearchLoading.value = false;
        })
        .catch((err) => console.log(err));
    } else {
      SearchLoading.value = true;
      results.value = [];
    }
  };

  const readAll = async () => {
    await axios
      .post(route(`api.notif.read-all`))
      .then()
      .catch((err) => console.log(err));
  };
  // Language stuff
  const topbar = [
    {
      url: route(`games.page`),
      active_link: "games.*",
      icon: "fas fa-gamepad-modern",
      en: { title: "Games" },
      es: { title: "Juegos" },
      ru: { title: "Игры" },
      ja: { title: "ゲーム" },
    },
    {
      url: route(`store.page`),
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
      icon: "fas fa-message-code",
      en: { title: "Discuss" },
      es: { title: "Conversar" },
      ru: { title: "Обсуждение" },
      ja: { title: "議論" },
    },
    {
      url: route(`spaces.page`),
      active_link: "spaces.*",
      icon: "fas fa-planet-ringed",
      en: { title: "Spaces" },
      es: { title: "Espacios" },
      ru: { title: "Развивать" },
      ja: { title: "スペース" },
    },
  ];
  const lang = computed<any>(() => props.locale);

  const { props } = usePage<any>();
</script>
<template>
  <PageLoader v-if="props.site.page_loader" />
  <LanguageModal />
  <div v-if="props.auth?.user" class="modal" id="profile-modal">
    <div
      class="modal-card modal-card-body"
      :style="
        props.auth?.user?.settings.profile_banner_enabled
          ? {
              background:
                'url(' + props.auth?.user?.settings.profile_banner_url + ')',
              'background-repeat': 'no-repeat',
              'background-size': 'cover',
              'box-shadow':
                'inset 0 0 0 100vw rgba(var(--section-bg-rgb), 0.5)!important',
            }
          : null
      "
    >
      <div class="section-borderless">
        <div class="gap-2 align-middle flex-container align-justify">
          <button class="gap-2 align-middle flex-container squish">
            <v-lazy-image
              :src="usePage<any>().props.auth?.user?.headshot"
              width="40"
              class="headshot"
              alt="Avatar"
              src-placeholder="assets/img/dummy_headshot.png"
              :style="
                props.auth?.user?.settings.calling_card_enabled
                  ? {
                      margin: '0',
                      'background-image':
                        'url(' +
                        props.auth?.user?.settings.calling_card_url +
                        ')',
                      'background-repeat': 'no-repeat',
                      'background-size': 'cover',
                    }
                  : null
              "
            />
            <div class="text-start">
              <div class="text-sm fw-semibold text-body">
                {{ props.auth?.user?.display_name }}
              </div>
              <div
                v-if="props.auth?.user?.staff"
                class="mt-1 mb-1 badge badge-danger fw-semibold w-100"
              >
              {{ props.auth?.user?.position }}
              </div>

              <div
                v-else-if="props.auth?.user?.settings.beta_tester"
                class="mt-1 mb-1 badge badge-success fw-semibold w-100"
              >
                Beta Tester
              </div>
              <div v-else class="text-xs text-body fw-semibold">
                {{ "@" + props.auth?.user?.username }} &bullet;
                {{ "Lvl. " + props.auth?.user?.level }}
              </div>
            </div>
          </button>
          <button
            @click="showModal('profile-modal')"
            class="btn-circle text-body"
            data-toggle-modal="#following-modal"
            style="margin-right: -10px"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="section-borderless">
        <div class="gap-2 section flex-container">
          <Link
            :href="
              route(`user.profile`, { username: props.auth?.user?.username })
            "
            class="min-w-0 btn btn-info btn-sm text-truncate"
          >
            <i class="fa-solid fa-user-crown"></i>
          </Link>

          <Link
            :href="route(`avatar.page`)"
            class="min-w-0 btn btn-success btn-sm text-truncate"
          >
            <i class="fa-solid fa-palette"></i>
          </Link>

          <Link
            :href="route(`user.settings.page`)"
            class="min-w-0 btn btn-warning btn-sm text-truncate"
          >
            <i class="fa-solid fa-wrench"></i>
          </Link>
          <a  v-if="props.auth?.user && props.auth?.user?.staff" :href="route('admin.page')" class="min-w-0 btn btn-danger btn-sm text-truncate show-for-small-only">
            <i class="fas fa-gavel"></i>
          </a>
          <Link
            :href="route('auth.logout')"
            method="post"
            class="min-w-0 btn btn-danger btn-sm text-truncate"
            as="button"
          >
            <i class="fa-solid fa-right-from-bracket"></i>
          </Link>
        </div>
      </div>
    </div>
  </div>
  <nav class="navbar" :class="{ 'navbar-landing': landing }">
    <ul class="navbar-nav grid-x">
      <li
        class="nav-item cell shrink show-for-small hide-for-large me-1"
        @click="sidebarOpen()"
      >
        <button class="btn-circle squish" id="sidebar-toggler">
          <i class="text-xl fas fa-bars"></i>
        </button>
      </li>
      <NavLink :link="route(`Welcome`)">
        <v-lazy-image
          :src="props.site.logo"
          class="show-for-medium"
          width="180"
        />
        <v-lazy-image
          :src="props.site.icon"
          class="show-for-small-only"
          width="43"
        />
      </NavLink>
      <NavLink
        v-for="topbarlinks in topbar"
        :link="topbarlinks.url"
        :active_link="topbarlinks.active_link"
      >
        <i :class="topbarlinks.icon"></i> &nbsp;
        <span>{{ topbarlinks[lang].title }}</span>
      </NavLink>
      <li class="nav-item text-danger cell shrink show-for-large">
        <li class="side-item">
            <a  v-if="props.auth?.user && props.auth?.user?.staff" :href="route('admin.page')" class="nav-link">
              <i class="fas fa-gavel"></i> &nbsp;
              <span>Admin</span>
            </a>
        </li>
    </li>
      <li class="mx-1 align-middle nav-item cell auto nav-search mx-md-3">
        <input
          v-if="props.site.frontend.search_bar"
          v-model="search"
          type="text"
          class="form"
          id="global-search-bar"
          name="hidden"
          autocomplete="off"
          placeholder="Search..."
          @input="performSearch"
        />
        <ul
          :class="['dropdown-menu', { hide: search === '' }]"
          id="global-search-results"
        >
          <li class="dropdown-title">Quick Results</li>
          <SearchResult
            href="#"
            v-if="!SearchLoading"
            v-for="result in results"
            :link="result.url"
            :name="result.name"
            :image="result.image"
          />
          <SearchResultSkeleton v-else />
          <li
            class="px-2 py-2 text-center dropdown-item"
            v-if="!SearchLoading && !results"
          >
            <div class="gap-3 flex-container flex-dir-column">
              <i
                class="text-5xl fa-solid fa-folder-magnifying-glass text-muted"
              ></i>
              <div style="line-height: 16px">
                <div class="text-xs fw-bold text-muted text-uppercase">
                  No Results
                </div>
                <div class="text-xs text-muted fw-semibold">
                  My mighty search came up empty! Try a different keyword?
                </div>
              </div>
            </div>
          </li>
          <li class="divider"></li>
          <li class="dropdown-item">
            <Link href="#" class="dropdown-link">
              <div class="align-middle flex-container align-justify">
                <div class="gap-2 align-middle flex-container">
                  <i
                    class="text-xl align-middle fas fa-telescope headshot text-muted flex-container align-center flex-child-grow"
                    style="height: 40px; width: 40px"
                  ></i>
                  <div>
                    Show all results for "<span class="search-keyword">{{
                      search
                    }}</span
                    >"
                  </div>
                </div>
                <i class="px-1 fas fa-chevron-right text-muted"></i>
              </div>
            </Link>
          </li>
        </ul>
        <button
          v-if="props.site.frontend.search_bar"
          content="Search"
          data-tooltip-placement="bottom"
        >
          <i class="fas fa-search"></i>
        </button>
      </li>
      <Button
        v-if="!props.auth?.user"
        :link="route('auth.register.page')"
        ColorClass="btn-success"
        class="nav-item cell show-for-large shrink me-1"
      >
        <i class="fas fa-person-to-portal"></i> &nbsp; Get Started
      </Button>
      <Button
        v-if="!props.auth?.user"
        :link="route('auth.login.page')"
        ColorClass="btn-info"
        class="nav-item cell show-for-large shrink me-1"
      >
        <i class="fas fa-door-open"></i> &nbsp; Login
      </Button>
      <li
        v-if="props.auth?.user && props.auth?.user?.settings.notifications_enabled"
        class="position-relative nav-item cell shrink"
      >
        <div class="show-for-small-only position-relative">
          <Link
            :href="route('notification.page')"
            class="px-2 btn-circle squish text-body"
          >
            <span
              v-if="props.auth?.user?.notifications.length"
              class="notification-circle"
            ></span>
            <i class="text-xl fas fa-bell"></i>
        </Link>
        </div>
        <div
          class="dropdown show-for-medium position-relative"
          id="notification_dropdown"
        >
          <div
            @click="addActiveClass(`notification_dropdown`)"
            class="btn-circle squish"
          >
            <button
              class="px-2 text-body"
              v-tippy
              content="Notifications"
              data-tooltip-placement="bottom"
            >
              <span
                class="notification-circle"
                v-if="props.auth?.user?.notifications.length"
              ></span
              ><i class="text-xl fas fa-bell"></i>
            </button>
          </div>
          <ul class="dropdown-menu dropdown-menu-end" style="width: 340px">
            <div class="align-middle flex-container">
              <div class="dropdown-title">Notifications</div>
              <li class="divider flex-child-grow"></li>
            </div>
            <li
              v-if="!props.auth?.user?.notifications.length"
              class="px-2 py-2 text-center dropdown-item"
            >
              <div class="gap-3 flex-container flex-dir-column">
                <i class="text-5xl fas fa-face-sleeping text-muted"></i>
                <div style="line-height: 16px">
                  <div class="text-xs fw-bold text-muted text-uppercase">
                    No Notifications
                  </div>
                  <div class="text-xs text-muted fw-semibold">
                    You have not recieved any notifications recently.
                  </div>
                </div>
              </div>
            </li>

            <li
              v-else
              v-for="notification in props.auth?.user?.notifications"
              class="dropdown-item"
            >
              <Link :href="notification.data.route" class="dropdown-link">
                <div class="gap-1 align-middle flex-container">
                  <i
                    class="text-lg text-center fas fa-comments-alt text-info flex-child-grow"
                    style="width: 38px"
                  ></i>
                  <div class="gap-2 align-middle flex-container w-100">
                    <img
                      src="/assets/img/dummy_headshot.png"
                      class="headshot flex-child-shrink"
                      height="40"
                      width="40"
                    />
                    <div class="min-w-0" style="line-height: 16px">
                      <div class="text-sm text-truncate">
                        <span
                          class="search-keyword"
                          v-if="notification.data.object"
                          >{{ notification.data.object }} &nbsp;</span
                        >
                        <span class="text-sm text-muted">{{
                          notification.data.message
                        }}</span>
                      </div>
                      <div class="text-xs text-muted">
                        {{ notification.DateHum }}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li class="divider"></li>
            <li
              v-if="props.auth?.user?.notifications.length"
              class="dropdown-item"
            >
              <a @click="readAll()" class="dropdown-link">
                <div class="align-middle flex-container align-justify">
                  <div class="gap-2 align-middle flex-container">
                    <i
                      v-if="props.site.frontend.sidebar_menu"
                      class="text-lg align-middle fas fa-check headshot text-muted flex-container align-center flex-child-grow"
                      style="height: 38px; width: 38px"
                    ></i>
                    <div class="text-sm">Mark All As Read</div>
                  </div>
                </div>
              </a>
            </li>

            <li class="dropdown-item">
              <Link :href="route('notification.page')" class="dropdown-link">
                <div class="align-middle flex-container align-justify">
                  <div class="gap-2 align-middle flex-container">
                    <i
                      v-if="props.site.frontend.sidebar_menu"
                      class="text-lg align-middle fas fa-bell headshot text-muted flex-container align-center flex-child-grow"
                      style="height: 38px; width: 38px"
                    ></i>
                    <div class="text-sm">Show All Notifications</div>
                  </div>
                  <i class="px-1 text-sm fas fa-chevron-right text-muted"></i>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li v-if="props.auth?.user" class="nav-item cell shrink show-for-large">
        <a
          href="#"
          class="text-sm nav-link"
          style="line-height: 20px"
          v-tippy
          :content="
            props.auth?.user?.coins +
            ' Coins & ' +
            props.auth?.user?.bucks +
            ' Bucks'
          "
          data-tooltip-placement="bottom"
        >
          <div class="text-warning">
            <i class="fas fa-coins" style="width: 22px"></i
            >{{ props.auth?.user?.coins }}
          </div>
          <div class="text-success">
            <i class="fas fa-money-bill-1-wave" style="width: 22px"></i
            >{{ props.auth?.user?.bucks }}
          </div>
        </a>
      </li>
      <li
        v-if="props.auth?.user"
        class="dropdown position-relative nav-item cell shrink ms-1"
        id="user_dropdown"
      >
        <button
          @click="showModal('profile-modal')"
          class="gap-2 align-middle flex-container squish"
        >
          <v-lazy-image
            :src="usePage<any>().props.auth?.user?.headshot"
            width="40"
            class="headshot"
            alt="Avatar"
            src-placeholder="assets/img/dummy_headshot.png"
          />
          <div class="text-start show-for-large">
            <div class="text-sm fw-semibold text-body">
              {{ props.auth?.user?.display_name }}
            </div>
            <div
              v-if="props.auth?.user?.staff"
              class="mb-1 badge badge-position badge-danger fw-semibold"
            >
              {{ props.auth?.user?.position }}
            </div>
            <div
              v-else-if="props.auth?.user?.settings.beta_tester"
              class="mb-1 badge badge-position badge-success fw-semibold"
            >
              Beta Tester
            </div>

            <div v-else class="text-xs text-muted fw-semibold">
              {{ "@" + props.auth?.user?.username }} •
              {{ "Lvl. " + props.auth?.user?.level }}
            </div>
          </div>
          <i class="text-sm fas fa-chevron-down text-muted show-for-large"></i>
        </button>
      </li>
    </ul>
  </nav>

  <slot />
</template>

<script lang="ts">
  import { directive } from 'vue-tippy'

  export default {
    mounted() {
      const theme = localStorage.getItem("theme") || "light";
      this.applyTheme(theme);
    },
    directives: {
      tippy: directive,
    },
    methods: {
      applyTheme(theme) {
        var lowercaseTheme = theme.toLowerCase();

        let style = document.getElementById("theme-style");
        const themeBtn = document.getElementById(lowercaseTheme + "-theme-btn");

        if (!style) {
          style = document.createElement("link");
          style.id = "theme-style";
          style.rel = "stylesheet";
          document.head.appendChild(style);
        }

        style.href = `/assets/css/themes/variables-${lowercaseTheme}.css`;

        // Save the selected theme in localStorage
        localStorage.setItem("theme", theme);
      },
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
      sidebarOpen(): void {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
          if (sidebar.classList.contains("show-for-large")) {
            sidebar.classList.remove("show-for-large");
            sidebar.classList.add("hide-for-large");
          } else {
            sidebar.classList.add("show-for-large");
          }
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
