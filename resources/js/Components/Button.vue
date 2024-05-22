<script setup lang="ts">
import { defineProps } from 'vue';
import { current } from 'momentum-trail';

// Props
defineProps({
    link: { type: String },
    IsBlock: { type: Boolean },
    ColorClass: { type: String },
});
</script>
<template>
    <Link v-if="link" :href="link">
        <div class="btn" :class="[IsBlock ? 'my-2 mt-2 btn-block' : '', ColorClass]">
            <slot />
        </div>
    </Link>
</template>