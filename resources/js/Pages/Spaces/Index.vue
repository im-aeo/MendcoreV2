<script setup lang="ts">
import { ref, onMounted, watch, computed, Suspense } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { route, current } from "momentum-trail";
import Button from "@/Components/Button.vue";
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import AppHead from '@/Components/AppHead.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import VLazyImage from "v-lazy-image";

defineProps({
    spaces: { type: Object },
});


// Define the SpaceSearchResult interface
interface SpaceSearchResult {
    url: string;
    thumbnail: string;
    name: string;
    // Add other properties if needed
}
const SpaceSearchLoading = ref(false);

const search = ref('');
// Update the type of results to be an array of SpaceSearchResult
const results = ref<SpaceSearchResult[]>([]);

const performSearch = async () => {
    if (search.value !== '') {
        SpaceSearchLoading.value = true
        await axios
            .get(route('spaces.index', { search: search.value }))
            .then((response) => {
                // Assuming the response.data is an array of SpaceSearchResult
                results.value = response.data.results;
                SpaceSearchLoading.value = false;
            })
            .catch((err) => console.log(err));
    } else {
        SpaceSearchLoading.value = true;
        results.value = [];
    }
};

</script>
<template>
    <Navbar />
    <Sidebar>
        <div class="row mb-1">
            <div class="col">
                <h3>Spaces</h3>
            </div>
            <div class="col text-right">
                <Link href="#" class="btn btn-success"><i class="fas fa-plus"></i> Create</Link>
            </div>
        </div>
        <div class="input-group mb-3">
            <input type="text" name="search" placeholder="Search for spaces..." v-model="search" class="form"
                @input="performSearch">
            <div class="input-group-append">
                <button class="btn btn-success" type="submit">
                    <i class="fas fa-search"></i>
                    <span class="hide-sm">Search</span>
                </button>
            </div>
        </div>
        <div v-if="spaces">
            <div v-for="space in spaces" class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4 col-md-2">
                            <Link :href="route('spaces.view', { id: space.id, slug: space.slug })">
                            <v-lazy-image sizes="(max-width: 512px) 280px, 512px" :src="space.thumbnail"
                                style="background:var(--section_bg_inside);border-radius:6px;"
                                class="mb-2 blog-thumbnail" />
                            </Link>
                        </div>
                        <div class="col-8 col-md-8 align-self-center">
                            <h5 class="text-truncate">
                                <Link :href="route('spaces.view', { id: space.id, slug: space.slug })"
                                    style="color:inherit;font-weight:600;">{{ space.name }}</Link>
                            </h5>
                            <div class="text-muted show-sm-only" style="margin-top:-5px;">{{ space.member_count }} Members
                            </div>
                            <div style="max-height:125px;overflow:hidden;">{{ space.description ?? 'This space does not have a description.' }}</div>
                        </div>
                        <div class="col-md-2 text-center align-self-center hide-sm" style="font-weight:600;">
                            <h3>{{ space.member_count }}</h3>
                            <h4 class="text-muted" style="margin-top:-10px;margin-bottom:0;">MEMBERS</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No spaces found.</p>
        </div>
    </Sidebar>
    <Footer />
</template>