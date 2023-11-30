<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";

const props = usePage<any>().props;
</script>

<template>
        <!-- ======= Footer ======= -->
        <footer class="footer footer-fixed">
            <main class="container py-3">
                <div class="align-middle grid-x grid-margin-x">
                    <div class="cell small-1">
		      <div class="gap-3 flex-container align-right align-center-sm">
			<img :src="props.site.icon" />
		      </div>
		    </div>
		    <div class="cell large-6">
                        <div class="mb-1 text-lg fw-semibold mb-lg-0">
                            Copyright &copy; 2023
                            {{ props.site.name }}. All rights reserved.
                        </div>
                        <div class="mb-2 flex-container-lg mb-lg-0">
                            <a href="#" class="text-sm footer-link fw-semibold">TERMS OF SERVICE</a>
                            <a href="#" class="text-sm footer-link fw-semibold">PRIVACY POLICY</a>
                            <a href="#" class="text-sm footer-link fw-semibold">JOBS</a>
                            <a href="#" class="text-sm footer-link fw-semibold">CONTACT</a>
                        </div>
                    </div>
                    <div class="cell large-5">
                        <div class="gap-3 flex-container align-right align-center-sm">
                            <button href="#" class="text-2xl footer-media text-muted" content="Language"
                                @click="showModal('LanguageSettings')" v-tippy><i class="fas fa-language"></i></button>
                            <a :href="props.site.socials.discord" class="text-2xl footer-media text-muted" content="Join us on Discord" v-tippy><i
                                class="fab fa-discord"></i></a>
                            <a :href="props.site.socials.twitter" class="text-2xl footer-media text-muted" content="Follow us on Twitter" v-tippy><i
                                class="fab fa-twitter"></i></a>
                            <a :href="props.site.socials.twitch" class="text-2xl footer-media text-muted" content="Follow us on Twitch" v-tippy><i
                                class="fab fa-twitch"></i></a>
                            <a :href="props.site.socials.tiktok" class="text-2xl footer-media text-muted" content="Follow us on TikTok" v-tippy><i
                                class="fab fa-tiktok"></i></a>
                            <a :href="usePage().props.site.socials.facebook" class="text-2xl footer-media text-muted" content="Follow us on Facebook" v-tippy><i
                                class="fab fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </main>
        </footer><!-- End  Footer -->
</template>

<script lang="ts">
export default {
    methods: {
        showModal(modalId: string): void {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.toggle("active");
            }
        },
        addActiveClass(elementId: string): void {
            const element = document.getElementById(elementId);
            if (element) {
                element.classList.toggle('active');
            }
        },
        sidebarOpen(): void {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('show-for-large');
            }
        },
        addActiveClassSSInput(elementId: string): void {
            const element = document.getElementById(elementId) as HTMLInputElement;
            const isEmpty = (str: string): boolean => !str.trim().length;

            if (element) {
                element.addEventListener('input', function () {
                    if (isEmpty(this.value)) {
                        return;
                    } else {
                        element.classList.toggle('hide');
                    }
                });
            }
        }
    }
};
</script>

