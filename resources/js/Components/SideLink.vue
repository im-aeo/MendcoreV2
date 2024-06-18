<script setup lang="ts">
import { defineProps } from "vue";
import { current } from "momentum-trail";

// Props
defineProps({
  link: { type: String },
  ActiveLink: { type: String, default: "none" },
});
</script>
<template>
  <li class="side-item">
    <Link class="side-link" :href="link" :class="[current(ActiveLink) ? 'active' : '']">
      <slot />
    </Link>
  </li>
</template>
