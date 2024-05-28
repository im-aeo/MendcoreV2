<script setup lang="ts">
import AppHead from '@/Components/AppHead.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';

import Footer from '@/Components/LayoutParts/Footer.vue';
import { computed, ref } from 'vue';
import { usePage, useForm } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";
import axios from 'axios';

const site = computed(() => usePage<any>().props.site)


const Uploading = ref(false);

const form = useForm({
    type: '',
    name: '',
    description: '',
    price_coins: '',
    price_bucks: '',
    image: '',
});

const submit = () => {
    axios.get(`/sanctum/csrf-cookie`).then(response => {
        form.post(route(`store.create.validate`), {
            onFinish: () => form.reset('description'),
        });
    });
};

const AttemptUpload = () => {
    Uploading.value = true;
};
</script>
<template>
<AppHead pageTitle="Create" description="create your dream item here" :url="route(`store.create.page`)" />
    <Navbar/>
    <Sidebar>
        <div class="cell medium-5">
            <div class="mb-2">
                <div class="text-2xl fw-semibold">Create Item</div>
                <div class="text-sm text-muted fw-semibold">
                   Need the template? Download it 
                    <a href="#" class="d-inline-block squish">here</a>
                </div>
            </div>
            <div></div>
            <div class="card card-body">
                <form @submit.prevent="submit">
                    <div class="mb-2">
                        <div :class="{ 'text-danger': form.errors.type }"
                            class="text-xs fw-bold text-muted text-uppercase">
                            Item Type
                        </div>
                    <select class="form form-select" v-model="form.type">
                        <option value="shirt">Shirt</option>
                        <option value="tshirt">T-shirt</option>
                        <option value="pants">Pants</option>
                    </select>
                    <div v-if="form.errors.type" class="text-xs text-danger fw-semibold">
                        {{ form.errors.type }}
                    </div>
                </div>
                    <div class="mb-2">
                        <div :class="{ 'text-danger': form.errors.name }"
                            class="text-xs fw-bold text-muted text-uppercase">
                            Item Name
                        </div>
                        <input type="text" v-model="form.name" class="form" placeholder="Item Name..." />
                        <div v-if="form.errors.name" class="text-xs text-danger fw-semibold">
                            {{ form.errors.name }}
                        </div>
                    </div>
                    <div class="mb-2">
                        <div :class="{ 'text-danger': form.errors.description }"
                            class="text-xs fw-bold text-muted text-uppercase">
                            Description
                        </div>
                        <textarea type="password" v-model="form.description" class="mb-2 form pe-5" rows="5"
                        placeholder="Description...."></textarea>
                        <div v-if="form.errors.description" class="text-xs text-danger fw-semibold">
                            {{ form.errors.description }}
                        </div>
                    </div>
                    <div class="gap-3 text-sm flex-container align-center">
                        <div class="w-100">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                Price Coins
                            </div>
                            <input type="text" v-model="form.price_coins" class="form" placeholder="1">
                            <div v-if="form.errors.price_coins" class="text-xs text-danger fw-semibold">
                                {{ form.errors.price_coins }}
                            </div>
                        </div>
                        <div class="w-100">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                Price Bucks
                            </div>
                            <input type="text" v-model="form.price_bucks" class="form" placeholder="10">
                            <div v-if="form.errors.price_bucks" class="text-xs text-danger fw-semibold">
                                {{ form.errors.price_bucks }}
                            </div>
                        </div>
                    </div>
                    <div class="gap-3 text-sm flex-container align-center">
                        <div class="w-100">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                Image
                            </div>
                            <input class="form text-body" @input="form.image = $event.target.files[0]" type="file">
                            <div v-if="form.errors.image" class="text-xs text-danger fw-semibold">
                                {{ form.errors.image }}
                            </div>
                        </div>
                    </div>
                
                <div class="mx-1 my-3 divider"></div>
                <button  :disabled="form.processing" @click="AttemptUpload" v-bind:class="{ 'is-loading': Uploading }" value="Upload" class="my-2 mt-2 btn btn-success btn-block">
                    <i class="fab fa-cloud-arrow me-1"></i>
                    Upload
                </button>
            </form>
            </div>
        </div>
</Sidebar>
<Footer/>
</template>