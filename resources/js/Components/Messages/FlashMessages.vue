<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';

const { props } = usePage<any>();
const show = ref(true);

// Extracting props
const message = computed(() => props.flash?.message);
const type = computed(() => props.flash?.type);

const handleClick = () => {
  // Toggle animation class
  document.querySelector('.toast-menu')?.classList.toggle('toast-menu-slide');

  // Hide toast after animation (adjust delay based on animation duration)
  setTimeout(() => {
    show.value = false;
  }, 500); // Adjust delay as needed
};

// Watchers
watch([message, type], () => {
    show.value = true;
}, { deep: true });
</script>

<template>
      <nav v-if="message && show" class="toast-menu" @click="handleClick">
      <div
      v-if="type == 'success' && message && show" class="alert alert-toast alert-success fw-semibold mb-1 text-center py-2"
      >
        <div class="flex-container align-middle gap-2">
          <i class="far fa-check-circle text-lg"></i>
          {{ message }}
        </div>
      </div>
      <div v-if="type == 'error' && show" class="alert alert-danger fw-semibold mb-1 text-center py-2">
        <div class="flex-container align-middle gap-2">
          <i class="far fa-circle-xmark text-lg"></i>
          <div>{{ message }}</div>
        </div>
      </div>
      <div v-if="type == 'warning' && message && show" class="alert alert-warning fw-semibold mb-1 text-center py-2">
        <div class="flex-container align-middle gap-2">
          <i class="far fa-exclamation-circle text-lg"></i>
          <div>{{ message }}</div>
        </div>
      </div>
    </nav>
</template>
<script lang="ts">
  $(document).ready(function () {
    setTimeout(function () {
      $(".toast-menu").toggleClass("toast-menu-slide");
    }, 1000);

    setTimeout(function () {
      $(".toast-menu").toggleClass("toast-menu-slide");
    }, 6000);
  });
</script>