<template>
  <div v-if="links.length > 3">
    <div class="flex flex-wrap -mb-1">
      <template v-for="(link, key) in links">
        <div v-if="link.url === null" :key="key"
          class="px-4 py-3 mb-1 mr-1 text-sm leading-4 text-gray-400 border rounded" v-html="link.label"></div>
        <Link v-else :key="k3y"
          class="px-4 py-3 mb-1 mr-1 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
          :class="{ 'bg-white': link.active }" :href="link.url" v-html="link.label">
        </Link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineProps } from 'vue';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-vue3';

interface Link {
  isActive: boolean;
  url: string | null;
  label: string;
  index: number;
}

export default {
  props: {
    links: Array as () => Link[],
  },
  components: {
    Link,
  },
  setup(props) {
    const links = ref(props.links);

    const gotoPage = (page: Link) => {
      if (page.url) {
        Inertia.visit(page.url, { replace: true });
      }
    };

    return {
      links,
      gotoPage,
    };
  },
};
</script>
