<script setup lang="ts">
import { ref, onMounted, watch, computed, Suspense } from "vue";
import { Link, usePage } from "@inertiajs/vue3";
import axios from "axios";
import { route, current } from "momentum-trail";
import Button from "@/Components/Button.vue";
import Navbar from "@/Components/LayoutParts/Navbar.vue";
import AppHead from "@/Components/AppHead.vue";
import Footer from "@/Components/LayoutParts/Footer.vue";
import Sidebar from "@/Components/LayoutParts/Sidebar.vue";
import VLazyImage from "v-lazy-image";

defineProps({
  spaces: { type: Array, required: true },
});

// Define the SpaceSearchResult interface
interface SpaceSearchResult {
  url: string;
  thumbnail: string;
  name: string;
  // Add other properties if needed
}
const SpaceSearchLoading = ref(false);

const search = ref("");
// Update the type of results to be an array of SpaceSearchResult
const results = ref<SpaceSearchResult[]>([]);

const performSearch = async () => {
  if (search.value !== "") {
    SpaceSearchLoading.value = true;
    await axios
      .get(route("spaces.page", { search: search.value }))
      .then((response) => {
        // Assuming the response.data is an array of SpaceSearchResult
        results.value = response.data.results;
        SpaceSearchLoading.value = false;
      })
      .catch((err) => console.log(err));
  } else {
    SpaceSearchLoading.value = true;
    results.value = [];
  }
};
</script>
<template>
  <AppHead
    pageTitle="Spaces"
    description="Find a space to join or create one!"
    :url="route(`spaces.page`)"
  />

  <Navbar />
  <Sidebar image="https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg">
    <div class="grid-x grid-margin-x grid-padding-y align-center">
      <div class="cell medium-3">
          <div class="mb-2 card card-body">
              <img width="512" height="512" src="file:///home/chronos/u-b99c190e11ee42e371d918a0399d97cb71a388b8/MyFiles/eclipse-frontend/assets/img/space_placeholder.png">
          </div>
          <div class="text-danger">
              <i class="fas fa-ban"></i>&nbsp; Space Alert Here
          </div>
          <div class="mt-2 mb-2">
              <div class="fw-semibold">{{ usePage<any>().props.space.name }}</div>
              <div class="text-xs fw-semibold text-muted">{{ usePage<any>().props.space.description ?? "This space does not have a description." }}</div>
          </div>
          <div class="gap-3 mt-3 mb-3 align-middle">
              <button class="mb-2 btn btn-info btn-xs w-100">
              <i class="fa-solid fa-torii-gate"></i>
                  Join {{ usePage<any>().props.space.name }}
              </button>
              <button class="mb-2 btn btn-danger btn-xs w-100" onclick="showModal('space-leave-modal')">
              <i class="fa-solid fa-ban"></i>
                  Leave {{ usePage<any>().props.space.name }}
              </button>
              <button class="mb-2 btn btn-secondary btn-disabled btn-xs w-100">
              <i class="fa-solid fa-clock"></i>
              Join Request Pending
              </button>
              
          </div>
          <div class="mb-1 text-xl fw-semibold">Statistics</div>
          <div class="mb-3 card card-body">
              <div class="gap-1 align-middle flex-container flex-dir-column">

                  <div class="text-sm text-info w-100">
                      <i class="text-center fas fa-users-crown" style="width: 26px"></i>
                      {{ usePage<any>().props.space.creator.username }}
                  </div>
                  <div class="text-sm w-100">
                      <i class="text-center fas fa-user-group text-muted" style="width: 26px"></i>
                     10k+ Members
                  </div>
                  <div class="text-sm w-100">
                      <i class="text-center fas fa-clock text-muted" style="width: 26px"></i>
                      {{ usePage<any>().props.space.DateHum }}
                  </div>
              </div>
          </div>
      </div>
      <div class="cell medium-8">
          <div style="height: 6px"></div>

          <div class="mb-1 align-middle flex-container align-justify">
              <div class="mb-1 text-xl fw-semibold">About</div>
          </div>
          <div class="mb-3 card card-body">
              <div class="gap-3 flex-container flex-dir-column">
                      The council would like to speak with you.....
              </div>

          </div>
          <div class="mb-3 card card-body">
              <div class="section">
                  <ul class="tabs">
                      <li class="tab-item">
                          <a href="#" class="tab-link active squish">Members</a>
                      </li>
                      <li class="tab-item">
                          <a href="#" class="tab-link squish">Posts</a>
                      </li>
                  </ul>
              </div>
              <div class="section">
                  <div class="mb-2 align-middle grid-x">
                      <div class="cell large-3">
                          <div class="mb-2 text-xl fw-semibold">
                              Members
                          </div>
                      </div>
                      <div class="cell large-9">
                          <div class="gap-2 align-middle flex-container-lg">
                              <input type="text" class="mb-2 form form-xs form-has-section-color" placeholder="Search Members...">
                              <select class="mb-2 form form-xs form-select form-has-section-color">
                                  <option value="1" selected="">
                                      Members
                                  </option>
                                  <option value="2">
                                      Administrators
                                  </option>
                                   <option value="3" disabled="">
                                      Creators
                                  </option>

                              </select>
                          </div>
                      </div>
                  </div>
                  <div class="flex-wrap gap-3 mt-2 mb-2 flex-container">
                      <div class="min-w-0 text-center" style="width: 80px">
                          <img src="file:///home/chronos/u-b99c190e11ee42e371d918a0399d97cb71a388b8/MyFiles/eclipse-frontend/assets/img/dummy_headshot.png" class="headshot flex-child-grow" alt="headshot">
                          <div class="text-sm text-info fw-semibold text-truncate">
                              Aeo
                          </div>
                      </div>
                      <div class="min-w-0 text-center" style="width: 80px">
                          <img src="file:///home/chronos/u-b99c190e11ee42e371d918a0399d97cb71a388b8/MyFiles/eclipse-frontend/assets/img/dummy_headshot.png" class="headshot flex-child-grow" alt="headshot">
                          <div class="text-sm text-danger fw-semibold text-truncate">
                              Aeo
                          </div>
                      </div>
                      <div class="min-w-0 text-center" style="width: 80px">
                          <img src="file:///home/chronos/u-b99c190e11ee42e371d918a0399d97cb71a388b8/MyFiles/eclipse-frontend/assets/img/dummy_headshot.png" class="headshot flex-child-grow" alt="headshot">
                          <div class="text-sm fw-semibold text-truncate">
                              Aeo
                          </div>
                      </div>
                  </div>

                  </div>
                  <div class="section">
                      <ul class="pagination flex-container align-center">
                          <button class="page-link page-disabled">
                              <i class="fa-regular fa-chevron-left"></i>
                          </button>
                          <button class="page-link page-active">1</button>
                          <button class="page-link">2</button>
                          <button class="page-link">3</button>
                          <button class="page-link">
                              <i class="fa-regular fa-chevron-right"></i>
                          </button>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  </Sidebar>
  <Footer />
</template>
