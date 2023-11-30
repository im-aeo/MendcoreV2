<script setup lang="ts">
import { defineProps } from 'vue';

// Props
defineProps<{
    link?: String,
    name?: String,
    image?: String,
}>();
</script>

<template>
    <li class="dropdown-item">
        <Link :href="link" class="dropdown-link">
        <div class="align-middle flex-container align-justify">
            <div class="gap-2 align-middle flex-container">
                <img class="headshot flex-child-grow" alt="headshot" width="40" :src="image" />
                <div>{{ name }}</div>
            </div>
            <i class="px-1 fas fa-chevron-right text-muted"></i>
        </div>
        </Link>
    </li>
</template>