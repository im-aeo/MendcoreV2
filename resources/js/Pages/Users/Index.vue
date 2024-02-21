<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import AppHead from '@/Components/AppHead.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import { route, current } from "momentum-trail";
import axios from 'axios';
import { ref } from 'vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';

defineProps({
  users: { type: Object },
});
</script>

<template>
    <Navbar />
    <Sidebar>
        <div class="cell small-12">
            <div class="mb-2 text-3xl fw-semibold align-center">Users</div>
            <div class="grid-x align-center">
                <div class="mx-2 mb-3 row card avatar card-body" :class="['mb-3', 'card', 'card-body', 'card-status', userStatusClass]" v-for="user in users.data" :key="users.id">
                    <div class="gap-2 align-middle flex-container">
                        <Link :href="route('user.profile', { username: user.username })">
                        <img :src="user.avatar" style="max-width:65px"
                            class="border img-fluid headshot rounded-circle border-secondary bg-dark" alt="2oddMacs1">
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
                    <div class="mx-1 my-2 divider"></div>
                    <button class="btn btn-info btn-block">Follow User</button>
                </div>
            </div>
            <div class="mx-3 my-3 divider"></div>
        </div>
    </Sidebar>
    <Footer />
</template>

<script lang="ts">
export default {
    data() {
    return {
      currentPage: slist.current_page,
      totalPages: slist.last_page, // Set the total number of pages
      // Your data here
    };
  },
    methods: {
        getUserList(page: number | undefined): void {
            var vm = this;
            var pageUrl = page ? `/users/discover/?page=${page}` : '/users/discover';

            axios
                .get(pageUrl)
                .then(function (response) {
                    if (response.data.hasOwnProperty('success')) {
                        vm.users = response.data.users;
                        vm.tags = response.data.users.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
	async fetchUserStatus() {
            this.userstat.fetchingStatus = true;
            const cachedOnlineStatus = this.userstat.online;
            try {
                const response = await axios.get(route(`api.user.online`, { id: this.userstat.id })); // Update the API endpoi>
                this.userstat.online = response.data.online;
            } catch (error) {
                console.error(error);
                this.userstat.online = cachedOnlineStatus;
            } finally {
                this.userstat.fetchingStatus = false;
            }
        },
    },
    data() {
        return {
            userstat: { // Replace this with your actual user object
                online: false,
                id: this.users.id,
                fetchingStatus: false,
            },
        };
    },
    created() {
        this.fetchUserStatus();
    },
    computed: {
        userStatus() {
            return this.userstat.online ? 'Online' : 'Offline';
        },
        userStatusClass() {
            return this.userstat.online ? 'online' : 'offline';
        },
    },
}
</script>
