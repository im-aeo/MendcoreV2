<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import { Head, Link } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";

</script>

<template>
<Navbar/>
<Sidebar>
    <div class="cell medium-3">
        <div class="mb-2 text-xl fw-semibold">Games</div>
        <ul class="tabs flex-dir-column">
            <li class="tab-item">
                <a href="#" class="tab-link active squish"
                    >Recent</a
                >
            </li>
            <p class="text-xl">Categories</p>
            <li class="tab-item">
                <a href="#" class="tab-link squish"
                    >Adventure </a
                >
            </li>
            <li class="tab-item">
                <a href="#" class="tab-link squish">Comedy</a>
            </li>
        </ul>
    </div>
    <div class="cell medium-8">

    </div>
</Sidebar>
<Footer/>
</template>
