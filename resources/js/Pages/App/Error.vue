<script setup lang="ts">
import { defineProps, computed } from 'vue'
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import { route, current } from 'momentum-trail';

defineProps<{
    status: number
    adonis_error: string
    message: string
    icon: string
}>()

</script>

<template>
      <AppHead :pageTitle="status + usePage<any>().props.site.name" :description="message" :url="route('Welcome')" />

    <Navbar />
    <Sidebar>
        <div class="cell medium-7">
            <div class="card text-center">
                <div class="card-body">
                    <i class="mb-3" :class="icon" style="font-size:80px;"></i>
                    <h3>{{ status }}</h3>
                    <p>{{ message }}</p>
                </div>
            </div>
            <p class="mt-2 text-muted">
                <i>
                    {{ adonis_error }}
                </i>
            </p>
        </div>
    </Sidebar>
    <Footer />
</template>
