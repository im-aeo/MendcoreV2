<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
import { route, current } from 'momentum-trail';
import { useForm, usePage } from '@inertiajs/vue3';
import AeoPagination from '@/Components/Pagination.vue';
import FlashMessages from '@/Components/Messages/FlashMessages.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import AppHead from '@/Components/AppHead.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';

// Define props and initialize News ref
defineProps({
    slist: { type: Object },
    News: { type: Array },
});

const form = useForm({
    message: '',
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('my.dashboard.validate'), {
        onFinish: () => form.reset('message'),
    });
};

const getNewsList = () => {
  var rsspapi = route(`api.rss`);

  axios
    .get(rsspapi)
    .then(function (response) {
      if (response.data.hasOwnProperty('success')) {
       usePage().props.News = response.data.News; // Update the News variable with the fetched data
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

onMounted(() => {
   getNewsList();
});
</script>

<template>
  <AppHead pageTitle="Dashboard" description="Login to Vestora." :url="route('auth.login.page')" />
  <Navbar />
  <Sidebar>
    <main class="container">
            <div class="grid-x grid-margin-x grid-padding-y">
                <div class="cell medium-3">
                    <div class="mb-2 text-xl fw-semibold">Staff Panel</div>
                    <ul class="tabs flex-dir-column">
                        <li class="tab-item">
                            <a href="#" class="tab-link active squish"
                                >Staff Information</a
                            >
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish"
                                >Reviews</a
                            >
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish"
                                >Security</a
                            >
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish">Logs</a>
                        </li>
                    </ul>
                </div>
                <div class="cell medium-8">
                    <div
                        class="mb-3 text-center alert alert-success fw-semibold"
                    >
                        Header Box Successfully Changed
                    </div>
                    <div class="mb-1 text-xl fw-semibold">Staff</div>
                    <div class="section-borderless">
                        <div class="card card-body">
                            <div class="mb-2 text-xl fw-semibold">
                                Staff Information
                            </div>
                            <div class="section-borderless">
                                <div class="grid-x grid-margin-x">
                                    <div class="mb-3 cell medium-6">
                                        <div
                                            class="gap-2 align-middle card card-body card-inner flex-container align-justify h-100"
                                        >
                                            <div class="min-w-0">
                                                <div
                                                    class="text-xs text-truncate fw-bold text-muted text-uppercase"
                                                >
                                                    Users Registered
                                                </div>
                                                <div
                                                    class="text-truncate fw-semibold"
                                                >
                                                    2
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3 cell medium-6">
                                        <div
                                            class="gap-2 align-middle card card-body card-inner flex-container align-justify"
                                        >
                                            <div class="min-w-0">
                                                <div
                                                    class="text-xs text-truncate fw-bold text-muted text-uppercase"
                                                >
                                                    Staff Members
                                                </div>
                                                <div
                                                    class="text-truncate fw-semibold"
                                                >
                                                    8
                                                </div>
                                            </div>
                                            <button
                                                class="btn btn-info btn-circle"
                                                data-toggle-modal="#staff-change"
                                            >
                                                <i class="fas fa-pencil"></i>
                                            </button>
                                        </div>
                                    </div>
                                  
                                    <div class="mb-3 cell medium-6">
                                        <div
                                            class="gap-2 align-middle card card-body card-inner flex-container align-justify"
                                        >
                                            <div class="min-w-0">
                                                <div
                                                    class="text-xs text-truncate fw-bold text-muted text-uppercase"
                                                >
                                                    Users Emails<span
                                                        style="font-size: 10px"
                                                        class="text-success ms-2"
                                                        ><i
                                                            class="fas fa-check me-1"
                                                        ></i
                                                        >Verified</span
                                                    >
                                                    <!-- <span style="font-size: 10px;" class="text-danger ms-2"><i class="fas fa-times me-1"></i>Unverified</span> -->
                                                </div>
                                                <div
                                                    class="text-truncate fw-semibold"
                                                >
                                                    3
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="mb-3 cell medium-6">
                                        <div
                                            class="gap-2 align-middle card card-body card-inner flex-container align-justify"
                                        >
                                            <div class="min-w-0">
                                                <div
                                                    class="text-xs text-truncate fw-bold text-muted text-uppercase"
                                                >
                                                    Website Stats for Nerds
                                                </div>
                                                <div
                                                    class="text-truncate fw-semibold"
                                                >
                                                    Created: 31/08/2023
                                                </div>
                                                <div
                                                    class="text-xs fw-semibold text-muted"
                                                >
                                                  Website version - <span
                                                  style="font-size: 10px"
                                                  class="text-info ms-2"
                                                  ><i
                                                  class="fas fa-bolt me-1"
                                              ></i
                                              >69.420 AdonisJs</span>
                                                  <br>
                                                  Up time - <span
                                                  style="font-size: 10px"
                                                  class="text-success ms-2"
                                                  ><i
                                                      class="fas fa-clock me-1"
                                                  ></i
                                                  >6 minutes</span>
                                                  <br>
                                                  Website Name - <span
                                                  style="font-size: 10px"
                                                  class="text-info ms-2"
                                                  ><i
                                                  class="fas fa-hashtag me-1"
                                              ></i
                                              >Vextoria</span>
                                                  <br>
                                                  API up time - <span
                                                  style="font-size: 10px"
                                                  class="text-success ms-2"
                                                  ><i
                                                      class="fas fa-clock me-1"
                                                  ></i
                                                  >6 minutes</span>
                                                  <br>
                                                  Client Servers - <span
                                                  style="font-size: 10px"
                                                  class="text-success ms-2"
                                                  ><i
                                                      class="fa fa-circle-check me-1"
                                                  ></i
                                                  >Responsive</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
      
                                <div
                                    class="text-xs fw-bold text-muted text-uppercase"
                                >
                                    Header Box Announcements
                                </div>
                                <div class="gap-2 align-middle flex-container">
                                    <input
                                        type="text"
                                        class="form form-sm btn-sm"
                                        value="Write it here..."
                                    />
                                    <input
                                        type="submit"
                                        class="btn btn-success btn-sm"
                                        value="Update"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section-borderless">
                        <div class="card card-body">
                            <div class="mb-2 text-xl fw-semibold">
                                Website Holiday Themes
                            </div>
                            <div class="grid-x grid-margin-x">
                                <div class="cell large-6">
                                    <div
                                        class="mb-2 theme-selection squish card card-body card-inner mb-lg-0"
                                        data-theme="easter"
                                    >
                                        <div
                                            class="gap-4 align-middle flex-container"
                                        >
                                            <div
                                                class="selection-circle flex-child-grow show-for-large"
                                            ></div>
                                            <div
                                                class="gap-1 align-middle flex-container flex-dir-column"
                                                style="min-width: 0"
                                            >
                                                <div
                                                    class="theme-circle light"
                                                ></div>
                                                <div
                                                    class="text-lg fw-semibold text-truncate"
                                                >
                                                    Easter Theme
                                                </div>
                                                <div
                                                    class="selection-circle flex-child-grow show-for-small hide-for-large"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell large-6">
                                    <div
                                        class="theme-selection squish card card-body card-inner"
                                        data-theme="Halloween"
                                    >
                                        <div
                                            class="gap-4 align-middle flex-container"
                                        >
                                            <div
                                                class="selection-circle flex-child-grow show-for-large"
                                            ></div>
                                            <div
                                                class="gap-1 align-middle flex-container flex-dir-column"
                                            >
                                                <div
                                                    class="theme-circle dark"
                                                ></div>
                                                <div
                                                    class="text-lg fw-semibold text-truncate"
                                                >
                                                    Halloween Theme
                                                </div>
                                                <div
                                                    class="selection-circle flex-child-grow show-for-small hide-for-large"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                            <div class="cell large-6">
                                                <div
                                                    class="mb-2 theme-selection squish card card-body card-inner mb-lg-0"
                                                    data-theme="christmas"
                                                >
                                                    <div
                                                        class="gap-4 align-middle flex-container"
                                                    >
                                                        <div
                                                            class="selection-circle flex-child-grow show-for-large"
                                                        ></div>
                                                        <div
                                                            class="gap-1 align-middle flex-container flex-dir-column"
                                                            style="min-width: 0"
                                                        >
                                                            <div
                                                                class="theme-circle dark"
                                                            ></div>
                                                            <div
                                                                class="text-lg fw-semibold text-truncate"
                                                            >
                                                                Christmas Theme
                                                            </div>
                                                            <div
                                                                class="selection-circle flex-child-grow show-for-small hide-for-large"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  </Sidebar>
  <Footer />
</template>
<script lang="ts">
export default {
    methods: {
    extractImageUrl(imageString) {
      const regex = /src="(.*?)"/; // Regex to capture the URL within src=""
      const matches = regex.exec(imageString);
      if (matches && matches.length > 1) {
        return matches[1]; // Return the captured URL
      }
      return ''; // Return empty string if no URL is found
    },
    getStatusList(page: number | undefined): void {
      var vm = this;
      var pageUrl = page ? `/my/dashboard?page=${page}` : '/my/dashboard';

      axios
        .get(pageUrl)
        .then(function (response) {
          if (response.data.hasOwnProperty('success')) {
            vm.users = response.data.users;
            vm.tags = response.data.users.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
},
    props: {
        slist: Object,
        News: Array,
    },
}
</script>
