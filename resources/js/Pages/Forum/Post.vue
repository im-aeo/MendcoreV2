<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import { route, current } from "momentum-trail";
import { ref } from 'vue';
import axios from 'axios';
import { useForm, usePage } from '@inertiajs/vue3';

defineProps<{
    topic?: object,
    post?: Array<any>,
    replies?: Array<any>,
}>()

const form = useForm({
    body: '',
});

const submit = () => {
    axios.get(`/sanctum/csrf-cookie`).then(response => {
        form.post(route(`forum.reply.validate`, { id: usePage<any>().props.post.id }), {
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
        <div class="cell medium-9">
            <div class="mb-2">
                <div class="mb-2 text-xl fw-semibold">{{ post.title }} </div>
                <div class="mb-2 text-xs text-muted fw-semibold">A post by: {{ post.creator.username }}</div>
            </div>
            <div class="card-body">
                <div class="gap-2 align-middle flex-container">
                    <div class="gap-2 mb-3 align-middle flex-container flex-dir-column">
                        <Link :href="route('user.profile', { username: post.creator.username })">
                        <img src="/assets/img/dummy.png" style="max-width:136px" class="border img-fluid" alt="2oddMacs1">
                        </Link>
                        <div class="text-center" style="line-height: 16px">
                            <div class="fw-semibold">{{ post.creator.display_name }} <i
                                    class="ml-1 fas fa-shield-check text-success" style="font-size:13px;"
                                    title="This user is verified." data-toggle="tooltip"></i>
                            </div>
                            <div class="text-xs fw-semibold text-muted">
                                {{ '@' + post.creator.username }}
                            </div>
                        </div>
                    </div>
                    <div class="divider verticalDivider"></div>
                    <div class="card card-body w-100">
                        <div class="gap-1 flex-container flex-dir-column">
                            <div class="mb-2 text-sm text-muted fw-semibold"><i class="fas fa-clock"></i>&nbsp; Post by: {{
                                post.creator.username }}, <b>{{ post.DateHum }}</b></div>
                            <div class="mb-2" v-html="post.body" style="white-space: pre-wrap;"></div>
                        </div>
                    </div>
                </div>
                <div class="mx-1 my-3 divider"></div>
                <div class="section">
                    <ul class="pagination flex-container align-center">
                        <button class="page-link page-disabled">
                            <i class="fa-regular fa-chevron-left"></i>
                        </button>
                        <button class="page-link page-active">1</button>
                        <button class="page-link">2</button>
                        <button class="page-link">3</button>
                        <button class="page-link">
                            <i class="fa-regular fa-chevron-right"></i>
                        </button>
                    </ul>
                </div>
            </div>
            <div v-if="replies">
                <div v-for="reply in replies" class="card-body">
                    <div class="gap-2 align-middle flex-container">
                        <div class="gap-2 mb-3 align-middle flex-container flex-dir-column">
                            <Link :href="route('user.profile', { username: reply.creator.username })">
                            <img src="/assets/img/dummy.png" style="max-width:136px" class="border img-fluid"
                                alt="2oddMacs1">
                            </Link>
                            <div class="text-center" style="line-height: 16px">
                                <div class="fw-semibold">{{ reply.creator.display_name }} <i
                                        class="ml-1 fas fa-shield-check text-success" style="font-size:13px;"
                                        title="This user is verified." data-toggle="tooltip"></i>
                                </div>
                                <div class="text-xs fw-semibold text-muted">
                                    {{ '@' + reply.creator.username }}
                                </div>
                            </div>
                        </div>
                        <div class="divider verticalDivider"></div>
                        <div class="card card-body w-100">
                            <div class="gap-1 flex-container flex-dir-column">
                                <div class="mb-2 text-sm text-muted fw-semibold"><i class="fas fa-clock"></i>&nbsp; Post by:
                                    {{ reply.creator.username }}, <b>{{ reply.DateHum }}</b></div>
                                <div class="mb-2" v-html="reply.body" style="white-space: pre-wrap;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!isHidden" class="cell medium-9">
                <div class="card card-body">
                    <div class="text-xl text-danger bg-primary">Reply to {{ post.title }}</div>
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
    <Footer /></template>
