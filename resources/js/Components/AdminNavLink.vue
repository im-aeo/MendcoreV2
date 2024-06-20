<script setup lang="ts">
import { defineProps } from 'vue';
import { current } from 'momentum-trail';

// Props
defineProps<{
    link?: string,
    active_link?: string,
}>();
</script>
<template>
            <Link :href="link" :class="[current(active_link) ? 'has-text-link' : 'has-text-white']" class="navbar-item">
                <slot />
            </Link>
           
</template>