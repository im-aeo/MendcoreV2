<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import { Head, Link } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";

</script>

<template>
    <Navbar>
        <div class="card card-body">
            <div class="mb-2 title is-1 has-text-weight-normal">
                Your account has been deleted.
            </div>
            <div class="mb-3 title is-5 has-text-grey-light has-font-weight-light">
                Farewell.
            </div>
        </div>
    </Navbar>
</template>
