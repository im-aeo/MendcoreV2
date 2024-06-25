<script setup lang="ts">
  import { ref, onMounted, defineProps } from "vue";
  import axios from "axios";
  import { route } from "momentum-trail";
  import { useForm, usePage } from "@inertiajs/vue3";
  import AeoPagination from "@/Components/Pagination.vue";
  import Navbar from "@/Components/LayoutParts/Admin/Navbar.vue";
  import AppHead from "@/Components/AppHead.vue";
</script>

<template>
  <AppHead
    pageTitle="User Index"
    description="Login to Vestora."
    :url="route('auth.login.page')"
  />
  <Navbar>
    <div class="card">
        <div class="card-content">
  
          <div class="columns">
            <div class="column is-2">
  
              <figure class="image">
                <img class="is-rounded" :src="usePage<any>().props.user.headshot">
              </figure>
  
            </div>
            <div class="column is-5">
              <br/>
            <p class="title is-2">{{ usePage<any>().props.user.display_name }}
                <p class="title is-size-6 has-text-grey">{{ "@" + usePage<any>().props.user.username }}</p>

            </p>
              <div class="content">
  
                <blockquote>{{ usePage<any>().props.user.about_me  ?? usePage<any>().props.user.username + " does not hava a description yet."}}</blockquote>
              </div>
              <label><strong>UID:</strong></label> <label>{{ usePage<any>().props.user.id }}</label>
              <br>
              <label><strong>IP:</strong></label> <label>{{ usePage<any>().props.user.lastIp }}</label>
              <br>
              <label><strong>Email:</strong></label> <label>{{ usePage<any>().props.user.email }}</label>
              <br>
              <label><strong>Past Usernames:</strong></label> <label>Username, Usersname, User, Bitch</label>
            </div>
            <div class="column ">
              <div v-if="usePage<any>().props.permissions.canMangeUser">
              <label><strong>User:</strong></label>
              <br>
              <a href="" class="button is-dark is-outlined">View Profile</a>
              <a href="grant.html" class="button is-dark is-outlined">Grant Achievement</a>
              <a href="grant.html" class="button is-dark is-outlined">Grant Item</a>
            </div>
              <div v-if="usePage<any>().props.permissions.canMangeUserSettings">
              <br>
              <label><strong>Moderation Actions:</strong></label>
              <br>
              <a href="purge.html" class="button is-danger is-outlined">Purge Username</a>
              <a href="purge.html" class="button is-danger is-outlined">Purge Bio</a>
              <a href="banuser.html" class="button is-danger is-outlined">Ban User</a>
            </div>
            </div>
  
          </div>
  
          <nav class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Bucks</p>
                <p class="title">{{ usePage<any>().props.user.bucks }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Coins</p>
                <p class="title">{{ usePage<any>().props.user.coins }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Last Seen</p>
                <p class="title">{{ usePage<any>().props.user.DateHum }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Registered On</p>
                <p class="title">{{ usePage<any>().props.user.joined }}</p>
              </div>
            </div>
          </nav>
  
        </div>
      </div>
  </Navbar>
</template>
