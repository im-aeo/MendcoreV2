<script setup lang="ts">
import { ref, computed, provide } from "vue";
import axios from "axios";
import { usePage } from "@inertiajs/vue3";
import MarketSidebar from "@/Components/LayoutParts/MarketSidebar.vue";
import MarketSorting from "@/Components/LayoutParts/MarketSorting.vue";
import AppHead from "@/Components/AppHead.vue";
import Navbar from "@/Components/LayoutParts/Navbar.vue";
import Sidebar from "@/Components/LayoutParts/Sidebar.vue";
import Footer from "@/Components/LayoutParts/Footer.vue";
import { route, current } from "momentum-trail";
import ItemCardSkeleton from "@/Components/ItemCardSkeleton.vue";

const props = defineProps({
  categories: Object,
});

const items = ref<any>([]);
const categories = computed<any>(() => props.categories);

const ItemLoading = ref(false);

const selectedCategory = ref(""); // Ref to store the currently selected category

// Fetch items for the selected category
async function fetchItems(selectedcat) {
  if (selectedCategory) {
    try {
      selectedCategory.value = selectedcat.name;
      ItemLoading.value = true;
      const response = await axios.get(
        route(`api.store.items`, { category: selectedcat.internal })
      );
      items.value = response.data;
      ItemLoading.value = false;
    } catch (error) {
      console.error(error);
    }
  }
}

// Function to handle category selection
function selectCategory(category) {
  selectedCategory.value = category;
  ItemLoading.value = true;
}

function onImgErrorSmall(id) {
  let source = document.getElementById(id);
  source.src = "/assets/img/dummy-error.png";
  source.onerror = "";

  return true;
}
// Computed properties
const itemRoute = (itemId) => route(`store.item`, { id: itemId });
const creatorRoute = (username) => route(`user.profile`, { username: username });
provide("selectedCategory", selectedCategory);
</script>

<template>
  <AppHead
    pageTitle="Market"
    description="Level up your style."
    :url="route(`store.page`)"
  />
  <Navbar :landing="false" />
  <Sidebar>
    <div class="cell large-2">
      <MarketSidebar
        :categories="categories"
        @category-selected="fetchItems"
        :selectCategory="selectCategory"
      />
    </div>
    <div class="cell large-10">
      <MarketSorting :selectedCategory="selectedCategory" />
      <div
        v-if="ItemLoading || (items && items.length > 0)"
        class="grid-x grid-margin-x grid-padding-y"
      >
        <template v-if="ItemLoading">
          <ItemCardSkeleton v-for="n in 12" :key="n" />
        </template>
        <div
          v-else
          class="cell large-2 medium-3 small-6"
          v-for="(item, index) in items"
          :key="index"
        >
          <Link :href="itemRoute(item.id)" class="d-block">
            <div class="p-2 mb-1 card card-item position-relative">
              <div style="position: absolute; bottom: 10px; left: 10px">
                <div v-if="item.in_event" class="mb-1 badge badge-warning fw-semibold">
                  <i class="fas fa-calendar-star" style="width: 18px"></i>Event
                </div>
                <div v-else-if="item.rare" class="mb-1 badge badge-info fw-semibold">
                  <i class="fas fa-star" style="width: 18px"></i>Rare
                </div>
                <div
                  v-else-if="item.sale_ongoing"
                  class="mb-1 badge badge-danger fw-semibold"
                >
                  <i class="fas fa-badge-percent" style="width: 18px"></i
                  >{{ item.percent_off + "%" }} off
                </div>

                <div
                  v-else-if="item.time_off_sale != null"
                  class="mb-1 badge badge-warning fw-semibold"
                >
                  <i class="fas fa-clock" style="width: 18px"></i>Timed
                </div>
              </div>
              <img
                :src="item.thumbnail"
                :id="item.thumbnail"
                @error="onImgErrorSmall(item.thumbnail)"
              />
            </div>
            <div class="gap-2 align-middle flex-container">
              <div class="mb-2 text-success w-100">
                <i class="fas fa-money-bill-1-wave">&nbsp;</i>{{ item.cost_bucks }}
              </div>
              <div class="mb-2 text-warning w-100">
                <i class="fas fa-coins">&nbsp;</i>{{ item.cost_coins }}
              </div>
            </div>
            <div class="text-body fw-semibold text-truncate">
              {{ item.name }}
            </div>
          </Link>
          <div class="text-xs fw-semibold text-truncate">
            <span class="text-muted">By:</span>&nbsp;
            <Link :href="creatorRoute(item.creator.username)">
              {{ "@" + item.creator.username
              }}<i class="fas fa-shield-check text-success ms-1"></i
            ></Link>
          </div>
        </div>
      </div>
      <div v-else-if="items.message" class="">
        <div class="pb-0 card-body">
          <div class="gap-3 mb-2 text-center flex-container flex-dir-column">
            <i class="text-5xl fas fa-store-slash text-muted"></i>
            <div style="line-height: 16px">
              <div class="text-xs fw-bold text-muted">
                Looks like a gremlin got into the code again! We're sending our best
                programmers with bug spray to fix the issue
              </div>
              <div class="text-muted fw-semibold">
                <p class="text-xs">{{ items.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="">
        <div class="pb-0 card-body">
          <div class="gap-3 mb-2 text-center flex-container flex-dir-column">
            <i class="text-5xl fas fa-face-sad-cry text-muted"></i>
            <div style="line-height: 16px">
              <div class="text-xs fw-bold text-muted text-uppercase">No Items</div>
              <div class="text-muted fw-semibold">
                <p class="text-xs">There are currently no items in this category.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
  <Footer />
</template>
