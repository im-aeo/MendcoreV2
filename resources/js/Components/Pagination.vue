<script lang="ts" setup>
import { usePaginator } from "momentum-paginator";

const props = defineProps<{
    pagedata: Array
}>();

const { from, to, total, previous, next, pages } = usePaginator(props.pagedata);
</script>

<template>
  <div class="section">
      <ul class="pagination flex-container align-center">
    <component
      is="button"
      :href="previous.url"
      :class="{
        'page-link page-active': previous.isActive,
        'page-link page-disabled': !previous.isActive,
      }"
    >
     <i class="fa-regular fa-chevron-left"></i>
    </component>

    <component
      v-for="page in pages"
      is="button"
      :href="page.url"
      :class="{
        'page-link page-active': page.isCurrent,
        'page-link': page.isActive,
        'page-link': !page.isCurrent && page.isActive,
      }"
    >
      {{ page.label }}
    </component>

    <component
      is="button"
      :href="next.url"
      :class="{
        'page-link page-active': next.isActive,
        'page-link page-disabled': !next.isActive,
      }"
    >
      <i class="fa-regular fa-chevron-right"></i>
    </component>
          </ul>
  </div>
</template>
