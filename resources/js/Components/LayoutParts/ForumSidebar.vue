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
function setActiveTopCat(categoryName): void {
    // Select the element with the matching ID
    const element = document.getElementById(categoryName);
    if (element) {
        // Add or remove the desired class
        element.classList.add('active'); // Replace 'active' with your class name
    } else {
        console.warn(`Element with ID '${categoryName}' not found.`);
    }
}
</script>

<template>
    <div class="flex-container align-justify align-middle gap-2 mb-2">
        <div class="text-2xl fw-semibold">Forum</div>
        <a href="#" class="btn btn-danger btn-circle" @click="showModal('forum-modal')"
            v-if="usePage<any>().props.auth.user && usePage<any>().props.auth.user.staff != false"
            data-tooltip-title="Create" data-tooltip-placement="bottom" style="margin-right: -14px"><i
                class="fas fa-plus"></i></a>
        <a href="#" class="btn btn-success btn-circle" @click="showModal('forum-modal')"
            v-else-if="usePage<any>().props.auth.user && usePage<any>().props.auth.user.staff != true && topic.is_staff_only_posting == '0'"
            data-tooltip-title="Create" data-tooltip-placement="bottom" style="margin-right: -14px"><i
                class="fas fa-plus"></i></a>
    </div>
    <div class="collapsible" @click="setActiveTopCat('Official')" id="Official">
        <button class="d-block w-100 market-section-item">
            <div class="flex-container align-justify align-middle">
                <div class="text-sm text-danger"> <i class="fa-solid fa-megaphone fa-xs"></i>&nbsp;Official</div>
                <i class="fas fa-chevron-down text-xs text-muted"></i>
            </div>
        </button>
        <div class="collapsible-menu mb-2">
            <Link as="button" v-for="Official in section_one" :key="Official.id"
                :href="route('forum.page', { id: Official.id })" class="market-section-item text-xs"
                :class="[current('forum.page', Official.id) ? 'active' : '']">
            <i v-if="Official.is_staff_only_posting == '1'" class="fas fa-lock"></i>&nbsp;{{ Official.name }}
            </Link>
        </div>
    </div>
    <div class="collapsible" @click="setActiveTopCat('Community')" id="Community">
        <button class="d-block w-100 market-section-item">
            <div class="flex-container align-justify align-middle">
                <div class="text-sm text-warning"> <i class="fa-solid fa-party-horn fa-xs"></i>&nbsp;Community</div>
                <i class="fas fa-chevron-down text-xs text-muted"></i>
            </div>
        </button>
        <div class="collapsible-menu mb-2">
            <Link as="button" v-for="Community in section_two" :key="Community.id"
                :href="route('forum.page', { id: Community.id })" class="market-section-item text-xs"
                :class="[current('forum.page', Community.id) ? 'active' : '']">
            <i v-if="Community.is_staff_only_posting == '1'" class="fas fa-lock"></i>&nbsp;{{ Community.name }}
            </Link>
        </div>
    </div>
    <div class="collapsible" @click="setActiveTopCat('Serious')" id="Serious">
        <button class="d-block w-100 market-section-item">
            <div class="flex-container align-justify align-middle">
                <div class="text-sm text-info"> <i class="fa-solid fa-triangle-exclamation fa-xs"></i>&nbsp;Serious</div>
                <i class="fas fa-chevron-down text-xs text-muted"></i>
            </div>
        </button>
        <div class="collapsible-menu mb-2">
            <Link as="button"  v-for="Serious in section_three" :key="Serious.id"
                :href="route('forum.page', { id: Serious.id })" class="market-section-item text-xs"
                :class="[current('forum.page', Serious.id) ? 'active' : '']">
            <i v-if="Serious.is_staff_only_posting == '1'" class="fas fa-lock"></i>&nbsp;{{ Serious.name }}
            </Link>
        </div>
    </div>
</template>
