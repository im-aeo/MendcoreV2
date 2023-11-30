<script lang="ts">
import { Link } from '@inertiajs/vue3';

export default {
    components: {
        Link,
    },
    props: {
        pagedata: {
            type: Object as () => {
                current_page: number;
                last_page: number;
                total: number;
            },
            required: true,
            default: () => ({
                current_page: 0,
                last_page: 0,
                total: 0
            })
        }
    },
    methods: {
        getPageClick(page: number): string {
            if (page >= 1 && page <= this.pagedata.last_page) {
                this.$emit('page-clicked', page);
                return `?page=${page}`;
            }
            return '';
        },
    }
}
</script>

<template>
    <div class="mb-2 section">
        <ul class="pagination flex-container align-center">
            <Link class="page-link" as="button" :href="getPageClick(pagedata.current_page - 1)"
                v-bind:class="{ 'page-disabled': (pagedata.current_page == 1) }">
            <i class="fa-regular fa-chevron-left"></i>
            </Link>
            <Link class="page-link" as="button" v-for="page in pagedata.last_page"
                v-bind:class="{ 'page-active': (pagedata.current_page == page) }" :key="page" :href="getPageClick(page)">
            {{ page }}
            </Link>
            <Link class="page-link" as="button" :href="getPageClick(pagedata.current_page + 1)"
                v-bind:class="{ 'page-disabled': (pagedata.current_page == pagedata.last_page) }">
            <i class="fa-regular fa-chevron-right"></i>
            </Link>
        </ul>
    </div>
</template>
