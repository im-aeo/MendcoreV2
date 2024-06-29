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
  <Sidebar>
    <div class="cell large-12">
      <div class="mb-2 align-middle grid-x">
        <div class="cell large-3">
          <div class="mb-2 text-xl fw-semibold">Spaces</div>
        </div>
        <div class="cell large-9">
          <div class="gap-2 align-middle flex-container-lg">
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
      <div class="grid-x grid-margin-x grid-padding-y">
        <a href="#" class="d-block squish">
          <v-lazy-image
            sizes="(max-width: 320px) 280px, 440px"
            src="https://img.freepik.com/free-vector/overlapping-forms-background_23-2148642590.jpg?size=626&ext=jpg&ga=GA1.1.1313891279.1718199690&semt=ais_user"
            class="mb-2 space-thumbnail"
          />
          <div style="line-height: 18px">
            <div class="d-block fw-semibold text-body">
              <Link style="color: inherit; font-weight: 600">{{ usePage<any>().props.space.name }}</Link>
            </div>
            <div class="text-xs text-muted fw-semibold text-truncate">
              {{ usePage<any>().props.space.description ?? "This space does not have a description." }}
            </div>
            <div class="mt-1 text-xs fw-semibold text-muted">
              {{ usePage<any>().props.space.DateHum }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </Sidebar>
  <Footer />
</template>
