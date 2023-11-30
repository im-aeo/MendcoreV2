<template>
  <div>
    <div class="mb-2 text-xl fw-semibold">Market</div>
    <Link v-if="usePage<any>().props.auth.user"  class="mb-2 btn btn-success btn-xs btn-block forum-button">
      New Item
    </Link>
    <ul class="tabs flex-dir-column">
      <li class="tab-item">
        <a
          class="tab-link squish"
          v-for="category in categories"
          :href="temporaryLink"
          :key="category.name"
          @click="() => selectCategory(category)"
          :class="{ active: selectedCategory === category }"
        >
          <i :class="category.icon"></i>&nbsp;{{ pluralType(category.name) }}
    </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { defineProps, ref, onMounted, defineEmits } from 'vue';

function pluralType(inputString) {
    const words = inputString.split(" ");
    const modifiedWords = [];

    for (const word of words) {
        if (word.toLowerCase() === "pants" || word.toLowerCase() === "recent") {
            modifiedWords.push(word);
        } else {
          if (word.toLowerCase() === "accessory"){
           return "Accessories";
          }
            modifiedWords.push(word + "s");
        }
    }

    return modifiedWords.join(" ");
}

interface Category {
  name: string;
  icon: string;
}

interface Props {
  categories: Category[];
}

const { categories } = defineProps<Props>();
const selectedCategory = ref<Category | null>(null);
const emit = defineEmits(); // Define the emit function to emit custom events

// Function to handle category selection
function selectCategory(category: Category) {
  selectedCategory.value = category;
  // Emit the 'category-selected' event with the selected category
  emit('category-selected', category);
}

const temporaryLink = '#';


// Trigger the selection on the first category when the component is mounted
onMounted(() => {
  if (categories.length > 0) {
    selectCategory(categories[0]);
  }
});
</script>
