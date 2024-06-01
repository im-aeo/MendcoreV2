<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';
import { route, current } from 'momentum-trail';
import { useForm, usePage } from '@inertiajs/vue3';
import AeoPagination from '@/Components/Pagination.vue';
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import AppHead from '@/Components/AppHead.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import NewsCard from '@/Components/NewsCard.vue';
import StatusCard from '@/Components/StatusCard.vue';
import NewsCardSkeleton from '@/Components/NewsCardSkeleton.vue';
import VLazyImage from "v-lazy-image";
const form = useForm({
    message: '',
});

interface StatusObject {
    data: {
        name: string;
        dname: string;
        DateHum: string;
        message: string;
        thumbnail: string;
    }
}


const props = defineProps({
    statuses: {
        type: Array as () => StatusObject[],
        default: () => ([] as StatusObject[]),
    },
});

const initialData = ref<StatusObject[]>(props.statuses.data);
const addStatus = (status: string): void => {
    const StatusUpdate: StatusObject = {
        data: {
            name: usePage<any>().props.auth.user.username,
            dname: usePage<any>().props.auth.user.display_name,
            DateHum: "Just Now",
            message: status,
            thumbnail: usePage<any>().props.auth.user.headshot,
        }
    };
    initialData.value.push(StatusUpdate); // Push the single StatusObject
    axios.post(route(`my.dashboard.validate`), {
        message: status,
    }).then((status) => {
        console.log("Your status " + status + "has been posted successfully.");
    }).catch((error) => {
        console.error("Error:", error);
    });
};
const getXPProgressWidth = (currentxp, nextxp) => {
    const progress = (currentxp / nextxp) * 100;
    return `${progress}%`;
};
</script>

<template>
    <AppHead pageTitle="Dashboard" :description="'Login to' + usePage<any>().props.site.name + '.'"
        :url="route('auth.login.page')" />
    <Navbar />
    <Sidebar>
        <div class="cell medium-3">
            <div class="gap-2 mb-3 align-middle card card-body flex-container flex-dir-column">
                <v-lazy-image :src="usePage<any>().props.auth.user.headshot" width="60" class="headshot" alt="Avatar"
                    src-placeholder="assets/img/dummy_headshot.png" />
                <div class="text-center" style="line-height: 16px">
                    <div class="fw-semibold">{{ usePage<any>().props.auth.user.display_name }}</div>
                    <div class="text-xs fw-semibold text-muted">
                        {{ '@' + usePage<any>().props.auth.user.username }}
                    </div>
                </div>
                <div class="divider w-100"></div>
                <div class="w-100">
                    <div class="gap-3 align-middle flex-container">
                        <i class="text-3xl fas fa-medal text-info" style="width: 40px"></i>
                        <div class="w-100">
                            <div class="mb-1 flex-container align-justify">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    Rank {{ 'Lvl. ' + usePage<any>().props.auth.user.level }}
                                </div>
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    {{ usePage<any>().props.auth.user.xp + '/' + usePage<any>
                                        ().props.nextlevelxp }} EXP
                                </div>
                            </div>
                            <div class="progress-bar">
                                <span class="progress"
                                    :style="{ width: getXPProgressWidth(usePage<any>().props.auth.user.xp, usePage<any>().props.nextlevelxp) }"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-1 text-xl fw-semibold">
                The {{ usePage<any>().props.site.name }} Times
            </div>
            <div class="card card-body">
                <div v-if="NewsLoading">
                    <NewsCardSkeleton />
                </div>
                <div v-else>
                    <div class="gap-3 text-center flex-container flex-dir-column" v-if="!Feed">
                        <i class="text-5xl fas fa-face-sleeping text-muted"></i>
                        <div style="line-height: 18px">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                No Blog Posts
                            </div>
                            <div class="text-xs text-muted fw-semibold">
                                When we publish a post it will appear here.
                            </div>
                        </div>
                    </div>
                    <div class="text-sm text-danger fw-semibold" v-else-if="Feed.error">
                        {{ Feed.error }}
                    </div>
                    <NewsCard v-else v-for="Bpost in Feed" :key="Bpost.link" :link="Bpost.link" :creator="Bpost.creator"
                        :image="Bpost.image" :title="Bpost.title" :desc="Bpost.desc" :date="Bpost.date" />
                </div>
            </div>
        </div>
        <div class="cell medium-8">

            <div class="mb-1 text-xl fw-semibold show-for-small-only">
                Feed
            </div>
            <div class="mb-3">
                <div class="position-relative">
                    <textarea class="mb-2 form form-has-button form-has-section-color pe-5" rows="5"
                        v-model="form.message" placeholder="How are you doing?"></textarea>
                    <input type="submit" @click="addStatus(form.message)" class="btn btn-success btn-sm has-ripple"
                        value="Post" style="
                            position: absolute;
                            bottom: 10px;
                            right: 10px;
                        " />
                </div>
            </div>
            <div class="mb-1 text-xl fw-semibold">Posts</div>
            <div class="card card-body">

                <div class="gap-3 text-center flex-container flex-dir-column" v-if="!statuses">
                    <i class="text-5xl fas fa-face-sleeping text-muted"></i>
                    <div style="line-height: 16px">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            No Posts
                        </div>
                        <div class="text-xs text-muted fw-semibold">
                            Start following players and their posts will appear here.
                        </div>
                    </div>
                </div>
                <StatusCard v-else v-for="(status, index) in initialData" :key="index" :DisplayName="status.dname" :Thumbnail="status.thumbnail" :name="status.name"
                    :message="status.message" :date="status.DateHum" />
            </div>
            <AeoPagination v-bind:pagedata="statuses" />
        </div>
    </Sidebar>
    <Footer />
</template>
<script lang="ts">
export default {
    data() {
        return {
            Feed: <any>[],
            NewsLoading: false,
            StatusLoading: false,
        }
    },
    mounted() {
        this.getFeed()
    },

    methods: {
        async getFeed() {
            try {
                this.NewsLoading = true;
                const response = await axios.get(route('api.rss')); // Assuming 'api.rss' is the correct API route
                this.Feed = response.data; // Use response.data directly to get the response content
                this.NewsLoading = false;
            } catch (error) {
                this.NewsLoading = true;
                console.error(error);
            }
        },
    }
}
</script>
