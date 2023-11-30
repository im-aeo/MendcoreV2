<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import ForumSidebar from '@/Components/LayoutParts/ForumSidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import AppHead from '@/Components/AppHead.vue';

import { route } from 'momentum-trail'; // If you're using the 'route' function from 'momentum-trail'
import { usePage, useForm } from '@inertiajs/vue3';
import axios from 'axios';

const props = defineProps({
    posts: { type: Object },
    section_one: { type: Object },
    section_two: { type: Object },
    section_three: { type: Object },
    topic: {
        type: Object,
        required: true,
    },
});


const form = useForm({
    title: '',
    body: '',
});

function showModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle("active");
    }
};

const submit = () => {
    axios.get(`/sanctum/csrf-cookie`).then(response => {
        form.post(route(`forum.create.validate`, { id: props.topic.id }), {
            onFinish: () => form.reset('password'),
        });
    });
};
const addText = (text) => {
    form.body += text;
};
</script>

<template>
    <AppHead pageTitle="Discuss"
        :description="'Here, You can discuss with the community surrounding several topics on ' + usePage<any>().props.site.name + '.'"
        :url="route('forum.page', { id: topic.id })" />
    <div class="modal" id="forum-modal">
        <div class="modal-card modal-card-body modal-card-sm">
            <div class="section-borderless">
                <div class="gap-2 align-middle flex-container align-justify">
                    <div class="text-lg fw-semibold">New Post</div>
                    <button @click="showModal('forum-modal')" class="btn-circle" data-toggle-modal="#forum-modal"
                        style="margin-right: -10px">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="section-borderless">
                <div class="mb-2">
                    <div class="text-xs fw-bold text-muted text-uppercase">
                        Post Title
                    </div>
                    <input type="text" class="form" name="title" v-model="form.title" placeholder="Title..." />
                </div>
                <div class="mb-2">
                    <div class="text-xs fw-bold text-muted text-uppercase">
                        Post Body
                    </div>
                    <textarea id="post-body" class="mb-2 form" name="body" v-model="form.body" placeholder="Body"
                        maxlength="4096"></textarea>
                </div>
            </div>
            <div class="flex-wrap gap-2 flex-container justify-content-end section-borderless">
                <form @submit.prevent="submit">
                    <button type="button" class="btn btn-secondary" @click="showModal('forum-modal')">
                        Cancel
                    </button>
                    <input type="submit" class="btn btn-success" :disabled="form.processing"
                        :value="'Post in ' + topic.name" />
                </form>
            </div>
        </div>
    </div>
    <Navbar />
    <Sidebar>
        <div class="cell medium-4">
            <ForumSidebar :topic="topic" :section_one="section_one" :section_two="section_two"
                :section_three="section_three" />
        </div>
        <div class="cell medium-8">
            <div class="mb-2 text-sm fw-semibold">{{ topic.name }} &bullet; {{ topic.description }}</div>
            <div class="card">
                <div class="pb-0 card-body">
                    <div class="gap-3 text-center flex-container flex-dir-column" v-if="!posts.data.length">
                        <i class="text-5xl fas fa-message-xmark text-muted"></i>
                        <div style="line-height: 16px">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                No Forum Posts
                            </div>
                            <div class="text-muted fw-semibold">
                                <p class="text-xs">There are currently no posts in this category.</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 row thread" v-for="post in posts.data">
                        <div class="mx-1 my-3 divider"></div>
                        <div class="gap-2 align-middle flex-container">
                            <a :href="route('user.profile', { username: post.username })">
                                <img :src="post.headshot" style="max-width:65px"
                                    class="border img-fluid headshot rounded-circle border-secondary bg-dark"
                                    alt="2oddMacs1">
                            </a>
                            <div class="flex-wrap col-md-4 d-flex justify-content-center align-content-start"
                                style="flex-direction: column">
                                <div class="text-start">
                                    <Link :href="route('forum.post', { id: post.id, slug: post.seo })" class="text-md">
                                    {{ post.name }}
                                    </Link>
                                    <div></div>
                                    <Link :href="route('user.profile', { username: post.username })"
                                        class="text-sm fw-semibold text-body">
                                    {{ post.display_name }} &bullet; {{ post.DateHum }}
                                    </Link>
                                    <div class="text-xs text-muted fw-semibold text-body">
                                        @{{ post.username }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mx-1 my-3 divider"></div>
                </div>

            </div>
        </div>
    </Sidebar>
    <Footer />
</template>

<script lang="ts">
export default {
    props: {
        topic: Object,
        posts: Object,
        section_one: Object,
        section_two: Object,
        section_three: Object,
    },
    methods: {
        getCurrentpath(id) {
            if (route('forum.page', { id }) === window.location.href) {
                return window.location.pathname
            }
        }
    },
};
</script>
