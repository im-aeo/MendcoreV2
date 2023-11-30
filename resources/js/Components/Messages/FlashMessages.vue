<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';

const { props } = usePage<any>();
const show = ref(true);

// Extracting props
const message = computed(() => props.message);
const errorMessage = computed(() => props.error);
const errors = computed(() => props.error);
const hasError = computed(() => errors.value || Object.keys(errors.value || {}).length > 0);

// Watchers
watch([message, hasError], () => {
    show.value = true;
}, { deep: true });
</script>

<template>
    <div v-if="message && show" class="mb-3 text-center alert alert-success fw-semibold" @click="show = false">
        {{ message }}
    </div>
    <div v-if="hasError && show" class="mb-3 text-center alert alert-danger fw-semibold" @click="show = false">
        <div v-if="errorMessage">{{ errorMessage }}</div>
        <div v-else>
            <span v-if="Object.keys(errors).length === 1">You have an error in your request.</span>
            <div>You have {{ Object.keys(errors).length }} errors in your request.</div>
        </div>
    </div>
</template>