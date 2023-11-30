<script lang="ts" setup>
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import { ref } from 'vue';
import { useForm } from '@inertiajs/inertia-vue3';
import { route, current } from "momentum-trail";
import axios from 'axios';

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
});

const form = useForm({
  title: '',
  body: '',
});

const submit = () => {
axios.get(`/sanctum/csrf-cookie`).then(response => {
    form.post(route(`forum.create.validate`, {id: props.topic.id}), {
        onFinish: () => form.reset('password'),
    });
});
};
const addText = (text) => {
  form.body += text;
};
</script>
<template>
  <Navbar/>
<Sidebar>
    <div class="card card-body">
      <div class="text-xl text-danger bg-primary">Create a Post</div>
      <div class="text-xs text-muted bg-primary">
        Make sure you post in the appropriate sub-forum and that your post does not break any site rules.
      </div>
      <div class="mx-1 my-3 divider"></div>
      <form @submit.prevent="submit">
        <label for="post-title" class="mb-2 text-xs fw-bold text-uppercase">Post Title</label>
        <input id="post-title" class="mb-2 form" type="text" name="title" v-model="form.title" placeholder="Title" maxlength="64">

        <label for="post-body" class="mb-2 text-xs fw-bold text-uppercase">Post Content</label>
        <textarea id="post-body" class="mb-2 form" name="body" v-model="form.body" placeholder="Body" maxlength="4096"></textarea>

        <button class="btn btn-success btn-block" type="submit" :disabled="form.processing">Create</button>
      </form>
      <div class="min-w-0 gap-2 mt-3 flex-container">
        <button class="btn btn-info" @click="addText('[color=#hexcodehere]Colored Text[/color]')">Add Color</button>
        <button class="btn btn-warning" @click="addText('[b]Bold Text[/b]')">Bold Text</button>
        <button class="btn btn-success" @click="addText('[i]Italic Text[/i]')">Italic Text</button>
        <button class="btn btn-success" @click="addText('[u]Underlined Text[/u]')">Underline Text</button>
        <button class="btn btn-info" @click="addText('[img]Image Link[/img]')">Insert an Image</button>
        <button class="btn btn-danger" @click="addText('[url=https://yourlinkhere]Link Text[/url]')">Link To Website</button>
      </div>
    </div>
  </Sidebar>
<Footer/>
</template>
