<script setup lang="ts">
import { defineProps } from 'vue';
import dayjs from 'dayjs';
import { usePage, Head } from '@inertiajs/vue3';

// Props
defineProps({
    pageTitle: { type: String },
    description: { type: String },
    url: { type: String },
    cover: { type: String },
    item: { type: Boolean, default: false },
    iid: { type: Number },
    itime: { type: Number, default: null },
});
// Function to format the date using dayjs
const getFormattedDate = (timeStamp: number) => {
    // Check if timeStamp is not null and valid number
    if (timeStamp !== null && !isNaN(timeStamp)) {
        return dayjs(timeStamp).format('m-d-Y H:i');
    }
    return null; // Return an empty string if timeStamp is a null or an invalid number
};
</script>

<template>
    <Head>
        <title>{{ pageTitle }}</title>

        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#03a9f4">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta name="robots" content="index,follow">
        <link rel="shortcut icon" type="image/x-icon" :href="usePage<any>().props.site.icon" />

        <meta :content="pageTitle" name="title" />
        <meta :content="description" name="description" />

        <meta content="website" property="og:type" />
        <meta :content="url" property="og:url" />
        <meta :content="pageTitle" property="og:title" />
        <meta :content="description" property="og:description" />
        <meta :content="cover || usePage<any>().props.site.icon" property="og:image">

        <meta content="summary_large_image" property="twitter:card" />
        <meta :content="url" property="twitter:url" />
        <meta :content="pageTitle" property="twitter:title" />
        <meta :content="description" property="twitter:description" />
        <meta :content="cover || usePage<any>().props.site.icon" property="twitter:image">
        <meta v-if="item" name="item-info" :data-id="iid" :data-onsale-until="getFormattedDate(itime)" />
    </Head>
</template>
