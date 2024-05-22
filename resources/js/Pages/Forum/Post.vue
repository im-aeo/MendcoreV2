<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import AeoPagination from '@/Components/Pagination.vue';
import { route, current } from "momentum-trail";
import { ref } from 'vue';
import axios from 'axios';
import { useForm, usePage } from '@inertiajs/vue3';

defineProps<{
    topic?: Object,
    post?: Array<any>,
    replies?: Array<any>,
}>()

const form = useForm({
    body: '',
});

const submit = () => {
    axios.get(`/sanctum/csrf-cookie`).then(response => {
        form.post(route(`forum.reply.validate`, { id: usePage<any>().props.props.usePage<any>().props.post.id }), {
            onFinish: () => form.reset('body'),
        });
    });
};
const addText = (text) => {
    form.body += text;
};

const isHidden = ref(true);
</script>

<style>
.headerDivider {
    border-left: 1px solid #38546d;
    border-right: 1px solid #16222c;
    height: 80px;
    position: absolute;
    right: 249px;
    top: 10px;
}
</style>
<template>
    <Navbar />
    <Sidebar>
        <div class="cell medium-11">
            <div class="gap-2 align-middle flex-container">
                    <img src="/assets/img/dummy_headshot.png" class="headshot" alt="headshot" width="40">
                    <v-lazy-image :src="usePage<any>().props.post.creator.headshot" width="40" class="headshot flex-child-shrink" alt="Avatar"
                        src-placeholder="assets/img/dummy_headshot.png" />
                    <div class="text-start show-for-large">
                <div class="mb-2 text-xl fw-semibold">{{ usePage<any>().props.post.title }} </div>
                <div class="mb-2 text-xs text-muted fw-semibold">A post by: {{ usePage<any>().props.post.creator.username }}</div>
            </div>
            </div>
            <div class="card card-body">
                <div class="gap-2 align-middle flex-container">
                    <div class="gap-2 mb-3 align-middle flex-container flex-dir-column">
                        <Link :href="route('user.profile', { username: usePage<any>().props.post.creator.username })">
                            <v-lazy-image :src="usePage<any>().props.post.creator.thumbnail" style="max-width:136px" class="border img-fluid" :alt="usePage<any>().props.post.creator.username"
                                src-placeholder="assets/img/dummy.png" />                        </Link>
                        <div class="text-center" style="line-height: 16px">
                            <div class="fw-semibold">{{ usePage<any>().props.post.creator.display_name }}
                            </div>
                            <div class="text-xs fw-semibold text-muted">
                                {{ '@' + usePage<any>().props.post.creator.username }}
                            </div>
                        </div>
                    </div>
                    <div class="divider verticalDivider"></div>
                    <div class="card card-body w-100">
                        <div class="gap-1 flex-container flex-dir-column">
                            <div class="mb-2 text-sm text-muted fw-semibold"><i class="fas fa-clock"></i>&nbsp; Post by: {{
                                usePage<any>().props.post.creator.username }}, <b>{{ usePage<any>().props.post.DateHum }}</b></div>
                            <div class="mb-2" v-html="usePage<any>().props.post.body" style="white-space: pre-wrap;"></div>
                        </div>
                    </div>
                </div>
                <div class="mx-1 my-3 divider"></div>
                <div v-if=" usePage<any>().props.replies?.data.length">
                <div v-for="reply in  usePage<any>().props.replies.data" class="card-body">
                    <div class="gap-2 align-middle flex-container">
                        <div class="gap-2 mb-3 align-middle flex-container flex-dir-column">
                            <Link :href="route('user.profile', { username: reply.creator.username })">
                                <v-lazy-image :src="reply.creator.thumbnail" style="max-width:136px" class="border img-fluid" :alt="usePage<any>().props.post.creator.usernam"
                                    src-placeholder="assets/img/dummy.png" />
                            </Link>
                            <div class="text-center" style="line-height: 16px">
                                <div class="fw-semibold">{{ reply.creator.display_name }} 
                                </div>
                                <div class="text-xs fw-semibold text-muted">
                                    {{ '@' + reply.creator.username }}
                                </div>
                            </div>
                        </div>
                        <div class="divider verticalDivider"></div>
                        <div class="card card-body w-100">
                            <div class="gap-1 flex-container flex-dir-column">
                                <div class="mb-2 text-sm text-muted fw-semibold"><i class="fas fa-clock"></i>&nbsp; Reply by:
                                    {{ reply.creator.username }}, <b>{{ reply.DateHum }}</b></div>
                                <div class="mb-2" v-html="reply.body" style="white-space: pre-wrap;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="divider verticalDivider"></div>
                </div>
            </div>
                <AeoPagination v-bind:pagedata="replies" />
            </div>
            <div v-if="!isHidden" class="cell medium-9">
                <div class="card card-body">
                    <div class="text-xl text-danger bg-primary">Reply to {{ usePage<any>().props.post.title }}</div>
                    <div class="mx-1 my-3 divider"></div>
                    <form @submit.prevent="submit">
                        <label for="post-body" class="mb-2 text-xs fw-bold text-uppercase">Reply Body</label>
                        <textarea id="post-body" class="form" v-model="form.body" placeholder="Body"
                            maxlength="4096"></textarea>
                        <button class="btn btn-success btn-block" type="submit" :disabled="form.processing">Create</button>
                    </form>
                </div>
            </div>
            <div class="section flex-container align-center">
                <a v-on:click="isHidden = !isHidden" class="btn btn-success"><i class="fas fa-reply"></i>&nbsp;Reply</a>
            </div>
        </div>
    </Sidebar>
    <Footer />
    </template>
