<script setup lang="ts">
import { defineProps } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { route, current } from 'momentum-trail';

const { topic, section_one, section_two, section_three } = defineProps([
    'topic',
    'section_one',
    'section_two',
    'section_three',
]);

function showModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle("active");
    }
};
</script>

<template>
    <div class="mb-2 text-xl fw-semibold">Forum</div>
    <button v-if="usePage<any>().props.auth.user && usePage<any>().props.auth.user.staff != false"
        class="mb-2 btn btn-danger btn-xs btn-block forum-button" @click="showModal('forum-modal')">
        New Post
    </button>
    <button
        v-else-if="usePage<any>().props.auth.user && usePage<any>().props.auth.user.staff != true && topic.is_staff_only_posting == '0'"
        class="mb-2 btn btn-success btn-xs btn-block forum-button" @click="showModal('forum-modal')">
        New Post
    </button>
    <div class="divider w-100" />
    <ul class="tabs flex-dir-column">
        <button class="mb-2 btn btn-danger btn-xs btn-block btn-no-anim  forum-button mt-2">
            <i class="fa-solid fa-megaphone fa-xs"></i>&nbsp;Official
        </button>
        <li v-for="Official in section_one" :key="Official.id" class="tab-item">
            <Link :href="route('forum.page', { id: Official.id })" class="tab-link squish"
                :class="[current('forum.page', Official.id) ? 'active' : '']">
            <i v-if="Official.is_staff_only_posting == '1'" class="fas fa-lock"></i>&nbsp;{{ Official.name }}
            <div class="text-xs">{{ Official.description }}</div>
            </Link>
        </li>
        <button class="mb-2 btn btn-warning btn-xs btn-block btn-no-anim forum-button mt-2">
            <i class="fa-solid fa-party-horn fa-xs"></i>&nbsp;Community
        </button>
        <li v-for="Community in section_two" class="tab-item">
            <Link :href="route('forum.page', { id: Community.id })" class="tab-link squish"
                :class="[current('forum.page', Community.id) ? 'active' : '']">
            {{ Community.name }}
            <div class="text-xs">{{ Community.description }}</div>
            </Link>
        </li>
        <button class="mb-2 btn btn-info btn-xs btn-block btn-no-anim forum-button mt-2">
            <i class="fa-solid fa-triangle-exclamation fa-xs"></i>&nbsp;Serious
        </button>
        <li v-for="Serious in section_three" class="tab-item">
            <Link :href="route('forum.page', { id: Serious.id })" class="tab-link squish"
                :class="[current('forum.page', Serious.id) ? 'active' : '']">
            {{ Serious.name }}
            <div class="text-xs">{{ Serious.description }}</div>
            </Link>
        </li>
    </ul>
</template>
