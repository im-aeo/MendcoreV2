<script setup lang="ts">
import AppHead from "@/Components/AppHead.vue";
import Navbar from "@/Components/LayoutParts/Navbar.vue";
import Footer from "@/Components/LayoutParts/Footer.vue";
import { computed } from "vue";
import VLazyImage from "v-lazy-image";
import { usePage } from "@inertiajs/vue3";
import { route } from "momentum-trail";

const site = computed<any>(() => usePage<any>().props.site);

defineProps({
  LandingItems: { type: Object },
});
const Welcome = [
  {
    en: {
      message: `Welcome to ${usePage<any>().props.site.name}`,
      desc: `${usePage<any>().props.site.name} is a collaborative 3D sandbox community. Work together to build amazing things and have fun along the way!`,

    },
    es: {
      message: `Bienvenido a ${usePage<any>().props.site.name}`,
      desc: `${usePage<any>().props.site.name} es una comunidad colaborativa de sandbox 3D. ¡Trabajad juntos para construir cosas increíbles y divertíos en el camino!`,

    },
    ru: {
      message: `Добро пожаловать в ${usePage<any>().props.site.name}`,
      desc: `${usePage<any>().props.site.name}— это совместное сообщество 3D-песочниц. Работайте вместе, чтобы создавать удивительные вещи, и получайте от этого удовольствие!`,
    },
    ja: {
      message: `${usePage<any>().props.site.name}へようこそ`,
      desc: `${usePage<any>().props.site.name} は、協力的な 3D サンドボックス コミュニティです。協力して素晴らしいものを作り、その過程を楽しみましょう!`
    },
  },
];
const lang = computed<any>(() => usePage<any>().props.locale);

</script>
<style scoped src="@/Pages/landing.css"></style>
<template>
  <AppHead pageTitle="Welcome"
    description="Join in on the action today. Buy &amp; sell items, participate in spaces, make friends, and more."
    :url="route(`Welcome`)" />
  <Navbar landing="true">
    <header class="masthead-landing bg-info row-landing">
      <div class="cell large-4">
        <div class="justify-center row-landing align-center">
          <div class="row-landing justify-content-center">
            <div class="text-center text-white">
              <!-- Page heading-->
              <span class="text-5xl fw-semibold">
                <span v-for="messages in Welcome">
                  {{ messages[lang].message }}
                </span>
              </span>
              <!--h1 class="mb-5">
            <v-lazy-image :src="site.logo" width="300px" />
          </h1-->
              <h3 class="p-2 mt-3 fw-semibold" v-for="desc in Welcome">
                {{ desc[lang].desc }}
              </h3>
              <div class="min-w-0 gap-4 mt-3 flex-container align-center">
                <Link :href="route('auth.register.page')" class="btn btn-landing btn-success">
                <i class="mr-1 fa-solid fa-person-to-portal"></i>
                Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="container">
      <div class="justify-center grid-x grid-margin-x align-center grid-padding-y">
        <div class="cell large-12">
          <div class="align-middle grid-x">
            <div class="p-2 mb-4 cell large-4">
              <div class="landing-text-landing fw-semibold">Customize your Character</div>
              <div>
                Pick and choose from a collection of items created by the community to
                create you own unique character with.
              </div>
            </div>
            <div class="cell large-8">
              <div class="grid-x grid-margin-x grid-padding-y">
                <div class="cell large-2 medium-4 small-6" v-for="item in LandingItems?.['data']">
                  <Link :href="route(`store.item`, { id: item.id })" class="d-block">
                  <div class="p-2 mb-1 card card-item position-relative">
                    <img :src="item.thumbnail" />
                  </div>
                  <div class="text-body fw-semibold text-truncate">
                    {{ item.name }}
                  </div>
                  </Link>
                  <div class="text-xs fw-semibold">
                    <span class="text-muted">By</span>
                    <a href="#" class="text-danger">{{ "@" + item.creator_username }}
                      <i class="fas fa-shield-check text-success ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cell large-12">
          <div class="mb-1 align-middle grid-x">
            <div class="cell large-8">
              <div class="grid-x grid-margin-x grid-padding-y">
                <div class="mb-1 cell large-6 medium-6 small-6">
                  <div class="card card-post card-body section-borderless">
                    <div class="section">
                      <div class="gap-2 align-middle flex-container align-justify">
                        <div class="gap-2 align-middle flex-container">
                          <i class="text-2xl fa-solid fa-messages text-warning"></i>
                          <div class="w-100">
                            <div class="fw-semibold">Nabrious</div>
                            <div class="text-sm fw-semibold text-muted">Nabrious</div>
                          </div>
                        </div>
                        <a href="#" class="min-w-0 btn btn-info btn-sm text-truncate show-for-large-only">View Post</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-1 cell large-6 medium-6 small-6">
                  <div class="card card-post card-body section-borderless">
                    <div class="section">
                      <div class="gap-2 align-middle flex-container align-justify">
                        <div class="gap-2 align-middle flex-container">
                          <i class="text-2xl fa-solid fa-messages text-warning"></i>
                          <div class="w-100">
                            <div class="fw-semibold">Nabrious</div>
                            <div class="text-sm fw-semibold text-muted">Nabrious</div>
                          </div>
                        </div>
                        <a href="#" class="min-w-0 btn btn-info btn-sm text-truncate show-for-large-only">View Post</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid-x grid-margin-x grid-padding-y">
                <div class="mb-1 cell large-6 medium-6 small-6">
                  <div class="card card-post card-body section-borderless">
                    <div class="section">
                      <div class="gap-2 align-middle flex-container align-justify">
                        <div class="gap-2 align-middle flex-container">
                          <i class="text-2xl fa-solid fa-messages text-warning"></i>
                          <div class="w-100">
                            <div class="fw-semibold">Nabrious</div>
                            <div class="text-sm fw-semibold text-muted">Nabrious</div>
                          </div>
                        </div>
                        <a href="#" class="min-w-0 btn btn-info btn-sm text-truncate show-for-large-only">View Post</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-1 cell large-6 medium-6 small-6">
                  <div class="card card-post card-body section-borderless">
                    <div class="section">
                      <div class="gap-2 align-middle flex-container align-justify">
                        <div class="gap-2 align-middle flex-container">
                          <i class="text-2xl fa-solid fa-messages text-warning"></i>
                          <div class="w-100">
                            <div class="fw-semibold">Nabrious</div>
                            <div class="text-sm fw-semibold text-muted">Nabrious</div>
                          </div>
                        </div>
                        <a href="#" class="min-w-0 btn btn-info btn-sm text-truncate show-for-large-only">View Post</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2 mt-4 cell large-4">
              <div class="landing-text-landing fw-semibold">Socialize With Others</div>
              <div>
                Head over to Discussion to socialize with all kinds of users on
                {{ site.name }}, from the funny to the professional, and find new friends!
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </Navbar>
</template>