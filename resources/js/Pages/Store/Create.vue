<script setup lang="ts">
import AppHead from '@/Components/AppHead.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';

import Footer from '@/Components/LayoutParts/Footer.vue';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";

const site = computed(() => usePage<any>().props.site)

defineProps({
    LandingItems: { type: Object, default: null },
});
</script>
<template>
<AppHead pageTitle="Create" description="create your dream item here" :url="route(`Welcome`)" />
    <Navbar/>
    <Sidebar>
soon
</Sidebar>
</template>