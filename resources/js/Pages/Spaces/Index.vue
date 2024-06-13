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
  search: { type: String, required: false },
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
  <Sidebar>
    <div class="cell large-12">
      <div class="mb-2 align-middle grid-x">
        <div class="cell large-3">
          <div class="mb-2 text-xl fw-semibold">Spaces</div>
        </div>
        <div class="cell large-9">
          <div class="gap-2 align-middle flex-container-lg">
            <input
              type="text"
              class="mb-2 form form-xs form-has-section-color"
              placeholder="Search..."
              name="search"
              v-model="search"
              @input="performSearch"
            />
            <select class="mb-2 form form-xs form-select form-has-section-color">
              <option value="1" selected disabled>Advanced Sorting...</option>
            </select>
            <div class="mb-2 flex-container flex-child-grow">
              <input type="submit" class="btn btn-xs btn-success w-100" value="Search" />
            </div>
            <div class="mb-2 flex-container flex-child-grow">
              <a href="#" class="text-center btn btn-info btn-xs flex-child-grow"
                >Buy Currency</a
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="spaces.data.length" class="grid-x grid-margin-x grid-padding-y">
        <div
          class="cell large-3 medium-6 small-3"
          v-for="(space, index) in spaces.data"
          :key="index"
        >
          <a href="#" class="d-block squish">
            <v-lazy-image
              sizes="(max-width: 320px) 280px, 440px"
              src="https://img.freepik.com/free-vector/overlapping-forms-background_23-2148642590.jpg?size=626&ext=jpg&ga=GA1.1.1313891279.1718199690&semt=ais_user"
              class="mb-2 space-thumbnail"
            />
            <div style="line-height: 18px">
              <div class="d-block fw-semibold text-body">
                <Link
                  :href="route('spaces.view', { id: space.id, slug: space.slug })"
                  style="color: inherit; font-weight: 600"
                  >{{ space.name }}</Link
                >
              </div>
              <div class="text-xs text-muted fw-semibold text-truncate">
                {{ space.description ?? "This space does not have a description." }}
              </div>
              <div class="mt-1 text-xs fw-semibold text-muted">
                {{ space.member_count }} Members <span class="mx-1">&bullet;</span>Created
                {{ space.DateHum }}
              </div>
            </div>
          </a>
        </div>
      </div>
      <div v-else class="">
        <div class="pb-0 card-body">
          <div class="gap-3 mb-2 text-center flex-container flex-dir-column">
            <i class="text-5xl fas fa-face-sad-cry text-muted"></i>
            <div style="line-height: 16px">
              <div class="text-xs fw-bold text-muted text-uppercase">
                No spaces found.
              </div>
              <div class="text-muted fw-semibold">
                <p class="text-xs">
                  There are currently no spaces found, maybe you should create one!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
  <Footer />
</template>
