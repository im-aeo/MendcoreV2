<script setup lang="ts">
import { defineProps } from 'vue';
import VLazyImage from "v-lazy-image";

// Props
defineProps<{
    link?: string,
    title?: string,
    desc?: string,
    creator?: string,
    date?: string,
    image?: string,

}>();
</script>
<template>
    <div class="section">
        <a :href="link" class="d-block squish">
            <v-lazy-image sizes="(max-width: 320px) 280px, 440px" :src="image" class="mb-2 blog-thumbnail" />
            <div style="line-height: 18px">
                <div class="d-block fw-semibold text-body">
                    {{ title }}
                </div>
                <div class="text-xs text-muted fw-semibold text-truncate">
                    {{ desc }}
                </div>
                <div class="mt-1 text-xs fw-semibold text-muted">
                    {{ creator }}<span class="mx-1">&bullet;</span>{{ date }}
                </div>
            </div>
        </a>
    </div>
</template>