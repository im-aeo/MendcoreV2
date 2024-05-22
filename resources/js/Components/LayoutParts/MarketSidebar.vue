<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { defineProps, ref, onMounted, defineEmits, computed } from 'vue';
import type { Ref } from 'vue';

interface Category {
  name: string;
  icon: string;
}

interface Props {
  categories: Record<string, any>; // Adjusted type to handle mixed structure
    selectCategory: Function, // or specify the expected type if it's not a function
    categorySelected: Function, // or specify the expected type if it's not a function
}

const { categories } = defineProps<Props>();
const selectedCategory = ref<Category | null>(null);
const selectedSubCategory: Ref<string> = ref("general");

const emit = defineEmits(); // Define the emit function to emit custom events
const user = computed(() => usePage<any>().props.auth?.user); // Access user from Inertia props

// Function to handle category selection
function selectCategory(category: Category) {
  selectedCategory.value = category;
  // Emit the 'category-selected' event with the selected category
  emit('category-selected', category);
}

function setActiveTopCat(categoryName): void {
    // Select the element with the matching ID
    selectedSubCategory.value = categoryName;
    const element = document.getElementById(categoryName);
    if (element) {
      // Add or remove the desired class
      element.classList.add('active'); // Replace 'active' with your class name
    } else {
      console.warn(`Element with ID '${categoryName}' not found.`);
    }
}

onMounted(() => {
  if (categories?.['length'] > 0) {
    selectCategory(categories[0]);
  }
});
</script>
<template>
  <div class="flex-container align-justify align-middle gap-2 mb-2">
    <div class="text-2xl fw-semibold">Market</div>
    <a v-if="user" href="#" class="btn btn-success btn-circle" content="Create"
 style="margin-right: -14px" v-tippy="{ placement : 'bottom' }"><i class="fas fa-plus"></i></a>
  </div>
  <div class="collapsible" v-for="(category, categoryName) in categories" @click="setActiveTopCat(categoryName)" :id="categoryName">
    <button  class="d-block w-100 market-section-item">
      <div class="flex-container align-justify align-middle">
        <div class="text-sm"><i :class="category.icon" class="text-md icon-fixed-width">&nbsp</i>{{ categoryName }}</div>
        <i class="fas fa-chevron-down text-xs text-muted"></i>
      </div>
    </button>
    <div v-if="selectedSubCategory === categoryName" :id="categoryName + '_List'" class="collapsible-menu mt-1 mb-1">
      <button v-for="(item, index) in category" @click="() => selectCategory(item)" :class="{ active: selectedCategory === item.name }" :key="index" class="market-section-item text-xs">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>