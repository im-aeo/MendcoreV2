<script setup lang="ts">
import Navbar from "@/Components/LayoutParts/Navbar.vue";
import { useForm, usePage } from "@inertiajs/vue3";
import { ref } from "vue";
import { route } from "momentum-trail";
import FlashMessages from "@/Components/Messages/FlashMessages.vue";
import AppHead from "@/Components/AppHead.vue";
import Sidebar from "@/Components/LayoutParts/Sidebar.vue";
import axios from "axios";
import Footer from "@/Components/LayoutParts/Footer.vue";

const ConfirmingAuth = ref(false);

const form = useForm({
  username: "",
  password: "",
  remember: false,
});

const submit = () => {
  axios.get(`/sanctum/csrf-cookie`).then(() => {
    form.post(route(`auth.login.validate`), {
      onFinish: () => form.reset("password"),
    });
  });
};

const ConfirmUserAuth = () => {
  ConfirmingAuth.value = true;
};
</script>
<template>
  <AppHead pageTitle="Login" :description="'Login to ' + usePage<any>().props.site.name + ''"
    :url="route('auth.login.page')" />
  <Navbar />
  <Sidebar>
    <FlashMessages />
    <div class="cell medium-4">
      <div class="mb-2">
        <div class="text-2xl fw-semibold">Log In</div>
        <div class="text-sm text-muted fw-semibold">
          Don't have an account?
          <a href="#" class="d-inline-block squish">Sign Up</a>
        </div>
      </div>
      <div></div>
      <div class="card card-body">
        <form @submit.prevent="submit">
          <div class="mb-2">
            <div
              :class="{ 'text-danger': form.errors.username }"
              class="text-xs fw-bold text-muted text-uppercase"
            >
              Username
            </div>
            <input
              type="text"
              v-model="form.username"
              class="form"
              placeholder="Username..."
            />
            <div v-if="form.errors.username" class="text-xs text-danger fw-semibold">
              {{ form.errors.username }}
            </div>
          </div>
          <div class="mb-2">
            <div
              :class="{ 'text-danger': form.errors.password }"
              class="text-xs fw-bold text-muted text-uppercase"
            >
              Password
            </div>
            <input
              type="password"
              v-model="form.password"
              class="mb-2 form"
              placeholder="Password..."
            />
            <div v-if="form.errors.password" class="text-xs text-danger fw-semibold">
              {{ form.errors.password }}
            </div>
          </div>
          <div class="align-middle flex-container align-justify">
            <input
              type="submit"
              class="btn btn-success"
              v-bind:class="{ 'is-loading': ConfirmingAuth }"
              :disabled="form.processing"
              @click="ConfirmUserAuth"
              value="Log In"
            />
            <Link :href="route('auth.forgot.page')" class="text-sm fw-semibold squish"
              >Forgot Password?</Link
            >
          </div>
        </form>
        <div class="mx-1 my-3 divider"></div>
        <a
          as="button"
          :href="route(`auth.login.google`)"
          class="my-2 mt-2 btn btn-secondary btn-block"
        >
          <i class="fab fa-google me-1"></i>
          Log In with Google
        </a>

        <button class="mt-2 btn btn-discord btn-block">
          <i class="fab fa-discord me-1"></i> Log In with Discord
        </button>
      </div>
    </div>
  </Sidebar>
  <Footer />
</template>
