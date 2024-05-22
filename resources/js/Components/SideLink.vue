<script setup lang="ts">
import { defineProps } from 'vue';
import { current } from 'momentum-trail';

// Props
defineProps({
    link: { type: String },
    active_link: { type: String, default: "none" },
});
</script>
<template>
    <li class="side-item">
        <Link class="side-link" :href="link" :class="[current(active_link) ? 'active' : '']">
            <slot />
        </Link>
    </li>
</template>