<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import AppHead from '@/Components/AppHead.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import { route, current } from "momentum-trail";
import axios from 'axios';
import { ref, watch } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';


let following = ref(usePage<any>().props.users.data.is_following); // Initial follow status

const toggleFollow = (id) => {
    if (following.value) {
        // Execute the unfollow logic here
        unfollowUser(id);
    } else {
        // Execute the follow logic here
        followUser(id);
    }
};

const showSuccessMessage = (message) => {

    console.log('Success:', message);
};
const followUser = (id) => {
    // Send a POST request to follow the user
    // Update the API endpoint and payload based on your server-side implementation
    axios.get(route(`api.user.follow`, { user: id }))
        .then(response => {
            // Handle the success response here
            const successMessage = response.data.message;
            showSuccessMessage(successMessage);
            following.value = true;
        })
        .catch(error => {
            // Handle the error response here
            console.error('Error following user:', error);
        });
};

const unfollowUser = (id) => {
    // Send a POST request to unfollow the user
    // Update the API endpoint and payload based on your server-side implementation
    axios.post(route(`api.user.unfollow`, { user: id }))
        .then(response => {
            // Handle the success response here
            const successMessage = response.data.message;
            showSuccessMessage(successMessage);
            following.value = false;
        })
        .catch(error => {
            // Handle the error response here
            console.error('Error unfollowing user:', error);
        });
};

watch(following, (newValue, oldValue) => {
    console.log("Following variable changed from", oldValue, "to", newValue);
});
</script>

<template>
    <AppHead pageTitle="Users" description="View all users here." :url="route(`user.page`)" />
    <Navbar />
    <Sidebar>
        <div class="cell small-12">
            <div class="mb-2 text-3xl fw-semibold align-center">Users</div>
            <div class="grid-x align-center">
                <div class="mx-2 mb-3 row card avatar card-body card-status"
                    :class="[user.online ? 'online' : 'offline']" v-for="user in usePage<any>().props.users.data" :key="usePage<any>().props.users.id">
                    <div class="gap-2 align-middle flex-container">
                        <Link :href="route('user.profile', { username: user.username })">
                        <img :src="user.avatar" style="max-width:65px"
                            class="border img-fluid headshot rounded-circle border-secondary bg-dark"
                            :alt="user.username">
                        </Link>
                        <div class="flex-wrap col-md-4 d-flex justify-content-center align-content-start"
                            style="flex-direction: column">
                            <div class="text-start">
                                <Link :href="route('user.profile', { username: user.username })" class="text-md">
                                {{ user.dname }}
                                </Link>
                                <div></div>
                                <Link :href="route('user.profile', { username: user.username })"
                                    class="text-sm fw-semibold text-body">
                                {{ '@' + user.username }}
                                </Link>
                                <div></div>
                            </div>
                        </div>

                    </div>
                    <div v-if="usePage<any>().props.auth.user" class="mx-1 my-2 divider"></div>
                    <button v-if="usePage<any>().props.auth.user && usePage<any>().props.auth.user.id != user.id"
                        :class="['btn', 'btn-info', 'btn-block', following ? 'btn-danger' : 'btn-info']"
                        @click="toggleFollow(user.id)">
                        {{ following ? 'Unfollow' : 'Follow' }}
                    </button>
                    <Link as="button" v-else-if="usePage<any>().props.auth.user" :href="route(`user.settings.page`)" :class="['btn', 'btn-info', 'btn-block']">
                        <i class="fas fa-cog"></i> Settings
                    </Link>
                </div>
            </div>
            <div class="mx-3 my-3 divider"></div>
        </div>
    </Sidebar>
    <Footer />
</template>
