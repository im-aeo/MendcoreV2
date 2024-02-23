<script setup lang="ts">
import { usePage, router } from '@inertiajs/vue3';
import { ref, onUnmounted } from 'vue';
const page = usePage();
const isLoading = ref(false);
  
const emit = defineEmits<{
  (event: 'sidebarToggle'): void;
}>();
  
// Check if it's the first visit or user is not connected to the internet
const isFirstVisit = localStorage.getItem('firstVisit') === 'true';
const isOnline = navigator.onLine;

const handleRouteChange = (event) => {
  if ((isFirstVisit || !isOnline) && (event.detail.visit.completed || event.detail.visit.interrupted)) {
    // Delay hiding the loading indicator for 2 seconds
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  } else if (event.detail.visit.cancelled) {
    // Delay hiding the loading indicator for 2 seconds
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};

// Attach the route change handler
const unregister = router.on('navigate', handleRouteChange);

// Cleanup the handler when the component is unmounted
onUnmounted(() => {
  unregister();
});

// Show the loading indicator when a new visit starts (only on the first visit or when offline)
if (isFirstVisit || !isOnline) {
    isLoading.value = true;
}

// Set firstVisit flag in localStorage after the first visit
if (isFirstVisit) {
  localStorage.setItem('firstVisit', 'false');
}
</script>
<template>
    <Transition>
        <div v-if="isLoading" class="loading-page flex-dir-column py-5">
            <div class="loader__container flex-container-lg align-center">
                <div class="mb-1">
                    <img :src="usePage<any>().props.site.icon" class="pulse" width="150" height="150" />
                    <div class="text-xl fw-semibold">
                        {{ !isOnline ? "You are offline" : "" }}
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
html,
body {
    margin: 0;
    height: 100%;
    overflow: hidden
}

.loading-page {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100vh;
    z-index: 9999;
    position: fixed;
    margin: 0;
    top: 0;
    bottom: 0;
    background: var(--section-bg);
    background-size: cover;
}

.pulse {
    animation: pulse 3s infinite ease-in-out alternate;
}

@keyframes pulse {
    from {
        transform: scale(0.8);
    }

    to {
        transform: scale(1);
    }
}

.loader__container {
    /* Sizing */
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    /* Flexbox stuff */
    display: flex;
    margin: 0;
    justify-content: center;
    align-items: center;

    /* Text styles */
    text-align: center;
}

/* we will explain what these classes do next! */
.v-enter-active {
    transition: opacity 0.2s ease;
    animation: bounce-in 0.4s;
}

.v-leave-active {
    transition: opacity 1s ease;
    animation: bounce-in 0.5s reverse;

}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>
