<script setup lang="ts">
  import { ref, onMounted, defineProps } from "vue";
  import axios from "axios";
  import { route } from "momentum-trail";
  import { useForm, usePage } from "@inertiajs/vue3";
  import AeoPagination from "@/Components/Pagination.vue";
  import Navbar from "@/Components/LayoutParts/Admin/Navbar.vue";
  import AppHead from "@/Components/AppHead.vue";

  // Define props and initialize News ref
  defineProps({
    slist: { type: Object },
    News: { type: Array },
  });

  const form = useForm({
    message: "",
  });

  const submit = () => {
    form
      .transform((data) => ({
        ...data,
        remember: form.remember ? "on" : "",
      }))
      .post(route("my.dashboard.validate"), {
        onFinish: () => form.reset("message"),
      });
  };

  const getNewsList = () => {
    var rsspapi = route(`api.rss`);

    axios
      .get(rsspapi)
      .then(function (response) {
        if (response.data.hasOwnProperty("success")) {
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
  <AppHead
    pageTitle="Admin Dashboard"
    description="Login to Vestora."
    :url="route('auth.login.page')"
  />
  <Navbar>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column is-2">
            <figure class="image">
              <img
                class="is-rounded"
                :src="usePage<any>().props.auth.user.headshot"
              />
            </figure>
          </div>
          <div class="column is-5">
            <br />

            <p class="title is-2">Welcome back, {{ usePage<any>().props.auth.user.username }}</p>
          </div>
          <div class="column is-3">
            <br />
            <span class="tag is-info is-large">Moderator</span>
            <span class="tag is-danger is-large">Administrator</span>
          </div>
          <div class="column"></div>
        </div>

        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Admin Points</p>
              <p class="title">{{ usePage<any>().props.stats.adminPoints }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Content Approved</p>
              <p class="title">1,500</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Reports Dealt With</p>
              <p class="title">34,247</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Last Seen</p>
              <p class="title">26/05/2024</p>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <br />
    <div class="card" v-if="usePage<any>().props.stats.canControlMaintenance">
      <div class="card-content">
        <p class="title is-4">Maintenance Mode</p>
        <p class="subtitle is-6">Maintenance is currently {{ usePage<any>().props.siteSettings.inMaintenance ? "ON" : "OFF" }}!</p>
        <a class="button" :class="{ 'is-active': usePage<any>().props.siteSettings.inMaintenance ? true : false }" href="">Turn Maintenance On</a>
        <a class="button is-active is-static" href="">Turn Maintenance Off</a>
      </div>
    </div>
  </Navbar>
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
        return ""; // Return empty string if no URL is found
      },
      getStatusList(page: number | undefined): void {
        var vm = this;
        var pageUrl = page ? `/my/dashboard?page=${page}` : "/my/dashboard";

        axios
          .get(pageUrl)
          .then(function (response) {
            if (response.data.hasOwnProperty("success")) {
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
  };
</script>
