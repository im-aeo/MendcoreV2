<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import ForumSidebar from '@/Components/LayoutParts/ForumSidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import AppHead from '@/Components/AppHead.vue';
import VLazyImage from "v-lazy-image";
import { route } from 'momentum-trail'; // If you're using the 'route' function from 'momentum-trail'
import { usePage, useForm } from '@inertiajs/vue3';
import axios from 'axios';

defineProps({
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
    axios.get(`/sanctum/csrf-cookie`).then(() => {
        form.post(route(`forum.create.validate`, { id: usePage<any>().props.topic.id }), {
            onFinish: () => form.reset('body'),
        });
    });
};
</script>

<template>
    <AppHead pageTitle="Discuss"
        :description="'Here, You can discuss with the community surrounding several topics on ' + usePage<any>().props.site.name + '.'"
        :url="route('forum.page', { id: usePage<any>().props.topic.id })" />
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
                <button type="button" class="btn btn-secondary" @click="showModal('forum-modal')">
                    Cancel
                </button>
                <form @submit.prevent="submit">

                    <input type="submit" class="btn btn-success" :disabled="form.processing"
                        :value="'Post in ' + usePage<any>().props.topic.name" />
                </form>
            </div>
        </div>
    </div>
    <Navbar />
    <Sidebar>
        <div class="cell large-2">
            <ForumSidebar :topic="topic" :section_one="section_one" :section_two="section_two"
                :section_three="section_three" />
        </div>
        <div class="cell large-10">
            <div class="mb-2 text-sm fw-semibold">{{ usePage<any>().props.topic.name }} &bullet; {{ usePage<any>().props.topic.description }}</div>
            <div class="card">
                <div class="pb-0 card-body">
                    <div class="gap-3 text-center flex-container flex-dir-column" v-if="!usePage<any>().props.posts.data.length">
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
                    <div class="mb-3 row thread" v-for="(post, index) in usePage<any>().props.posts.data">
                        <div class="mx-1 my-3" :class="{ 'divider': index !== 0 }"></div>
                        <div class="gap-2 align-middle flex-container">
                            <Link :href="route('user.profile', { username: post.username })">
                            <v-lazy-image :src="post.headshot" width="65"
                                class="border headshot flex-child-shrink img-fluid rounded-circle border-secondary bg-dark"
                                alt="Avatar" src-placeholder="assets/img/dummy_headshot.png" />
                            </Link>
                            <div class="flex-wrap col-md-4 d-flex justify-content-center align-content-start"
                                style="flex-direction: column">
                                <div class="text-start">
                                    <Link :href="route('forum.post', { id: post.id, slug: post.seo })" class="text-md">
                                    {{ post.name }} <span v-if="post.pinned"><i class="text-success fas fa-thumbtack"></i></span> <span v-if="post.locked"><i class="text-warning fas fa-lock"></i></span>
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
                    <div :class="{ divider: usePage<any>().props.posts.data.length > 0 }" class="mx-1 my-3"></div>
                </div>

            </div>
        </div>
    </Sidebar>
    <Footer />
</template>