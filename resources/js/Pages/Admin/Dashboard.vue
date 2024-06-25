<script setup lang="ts">
  import axios from "axios";
  import { route } from "momentum-trail";
  import { usePage } from "@inertiajs/vue3";
  import Navbar from "@/Components/LayoutParts/Admin/Navbar.vue";
  import AppHead from "@/Components/AppHead.vue";
  
  const EnableMaintenance = async () => {
    await axios
      .post(route(`api.admin.enableMaintenance`))
      .then()
      .catch((err) => console.log(err));
  };
  
  const DisableMaintenance = async () => {
    await axios
      .post(route(`api.admin.disableMaintenance`))
      .then()
      .catch((err) => console.log(err));
  };
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
                :src="usePage<any>().props.auth?.user?.headshot"
              />
            </figure>
          </div>
          <div class="column is-5">
            <br />

            <p class="title is-2">Welcome back, {{ usePage<any>().props.auth?.user?.username }}</p>
          </div>
          <div class="column is-3">
            <br />
            <span class="tag is-danger is-large">Your Position is: {{ usePage<any>().props.auth?.user?.position }}</span>
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
              <p class="title">{{ usePage<any>().props.auth?.user?.DateHum }}</p>
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
        <a class="button" :class="{ 'is-active': usePage<any>().props.siteSettings.inMaintenance ? true : false }" @click="!usePage<any>().props.siteSettings.inMaintenance ?  EnableMaintenance() : DisableMaintenance()">Turn Maintenance {{ !usePage<any>().props.siteSettings.inMaintenance ? "ON" : "OFF" }}</a>
      </div>
    </div>
  </Navbar>
</template>