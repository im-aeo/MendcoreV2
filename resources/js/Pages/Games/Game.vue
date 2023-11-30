<script setup lang="ts">
import AppHead from '@/Components/AppHead.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';


//import { Head, Link } from '@inertiajs/vue3';

</script>

<template>
<AppHead title="Aeo's Game" />
<Navbar/>
<Sidebar>
    <div class="cell medium-3">
        <div class="mb-2 text-xl fw-semibold">Games</div>
        <ul class="tabs flex-dir-column">
            <li class="tab-item">
                <a href="#" class="tab-link active squish"
                    >Thumbnail</a
                >
            </li>
            <li class="tab-item">
                <a href="#" class="tab-link squish"
                    >Description </a
                >
            </li>
            <li class="tab-item">
                <a href="#" class="tab-link squish">Comments</a>
            </li>
        </ul>
    </div>
    <div class="cell medium-8">

    </div>
</Sidebar>
</template>
