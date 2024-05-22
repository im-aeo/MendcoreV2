<script setup lang="ts">
import { usePage, router } from '@inertiajs/vue3';
import { ref, onUnmounted } from 'vue';
const page = usePage();
const isLoading = ref(false);
  
const emit = defineEmits<{
  (event: 'sidebarToggle'): void;
}>();

// Show the loading indicator when a new visit starts



router.on('start', () => {
    isLoading.value = true
});

const loadingMessages = [
  'Loading...',
  'Please wait... (unless you have better things to do)',
  'One moment... gathering magical space hamsters to power this up.',
  'Fetching data faster than a squirrel with a nut allergy!',
  'We are not crashing, we are just taking a very scenic route.',
  'Hold on, coding a tiny dance for the loading bar.',
  'Just making sure the internet isn\'t filled with cat videos first.',
  'Shh, be vewy vewy quiet. We\'re hunting bugs.',
  'Did you know? The inventor of the loading bar is still waiting for it to finish.',
  'Don\'t worry, we paused Netflix for this.',
  'Please wait patiently... or impatiently, we don\'t judge.',
  'If this takes too long, blame the internet, not us.',
  'Calibrating the awesome meter. It\'s almost there!',
  'Just making sure it looks good on your grandma\'s flip phone.',
  'Taking a coffee break. You should too!',
  'Unicorns are galloping to bring you the data.',
  'Would you prefer a hamster wheel or a dance break while you wait?',
  'Warning: May cause extreme boredom or existential dread.',
  'Success is just around the corner... maybe.',
  'We are currently out of patience. Please send more coffee.',
];

const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
// Check if it's the first visit or user is not connected to the internet
const isOnline = navigator.onLine;

router.on('start', () => {
    isLoading.value = true;
})

router.on('progress', (event) => {
    if (event.detail.progress.percentage) {
        const progressBar = event.detail.progress.percentage / 100 * 0.9
    }
})

const handleRouteChange = (event) => {
    if (event.detail.visit.completed) {
      isLoading.value = false;
    } else if (event.detail.visit.interrupted) {
        isLoading.value = true;
  } else if (event.detail.visit.cancelled) {
    isLoading.value = false;
  }
};

// Attach the route change handler
const unregister = router.on('finish', handleRouteChange);

// Cleanup the handler when the component is unmounted
onUnmounted(() => {
  unregister();
});

</script>
<template>
    <Transition>
        <div v-if="isLoading" class="loading-page flex-dir-column py-5">
            <div class="loader__container flex-container-lg align-center">
                <div class="mb-1">
                    <img :src="usePage<any>().props.site.icon"  width="150" height="150" />
                    <div v-if="usePage<any>().props.site.loading_messages" class="text-md text-muted fw-semibold">
                        {{ randomMessage }}
                    </div>
                    <div class="progress" :style="{ width: progressBar }"></div>
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
.progress {
  width: 300px;
  max-width: 85vw;
  height: 4px;
  position: absolute;
  bottom: 39vh;
  left: 50%;
  border-radius: 4px;
  background: rgba(var(--section-bg), .5);
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.progress::after { /* Use double colon for pseudo-element */
  content: '';
  display: block;
  width: 100%; /* Inherit width from parent */
  height: 4px; /* Inherit height from parent */
  background-color: var(--info-600); /* Solid white background */
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
