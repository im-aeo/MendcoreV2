<script setup lang="ts">
import { defineProps } from 'vue';

// Props
defineProps<{
    name?: string,
    DisplayName?: string,
    date?: string,
    message?: string,

}>();
</script>
<template>
    <div class="gap-3 section flex-container flex-dir-column-sm">
        <div class="mx-auto flex-child-grow" style="width: 100px">
            <a href="#" class="text-sm text-center d-block squish">
                <img src="/assets/img/dummy_headshot.png" class="mb-1 headshot" width="60" />
                <div style="line-height: 16px">
                    <div class="text-truncate">{{ DisplayName }}</div>
                    <div class="text-xs text-muted text-truncate">
                        {{ '@' + name }}
                    </div>
                </div>
            </a>
        </div>
        <div class="card card-body card-inner w-100">
            <div class="align-middle flex-container align-justify">
                <div class="w-100">
                    <div class="text-xs text-muted">
                        <i class="far fa-clock me-1" style="vertical-align: middle;margin-top: -2.5px;font-size: 10px;"></i>
                        Posted {{ date }}
                    </div>
                    <div>
                        {{ message }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>