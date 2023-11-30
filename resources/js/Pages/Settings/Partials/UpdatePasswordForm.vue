<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
//import { route, current } from "momentum-trail";

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }
            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <section>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
                <label for="current_password" value="Current Password" />

                <input
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="block w-full mt-1"
                    autocomplete="current-password"
                />

                <div :message="form.errors.current_password" class="mt-2" />
            </div>

            <div>
                <label for="password" value="New Password" />

                <input
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="block w-full mt-1"
                    autocomplete="new-password"
                />

                <input :message="form.errors.password" class="mt-2" />
            </div>

            <div>
                <label for="password_confirmation" value="Confirm Password" />

                <input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="block w-full mt-1"
                    autocomplete="new-password"
                />

                <div :message="form.errors.password_confirmation" class="mt-2" />
            </div>

            <div class="flex items-center gap-4">
                <button :disabled="form.processing">Save</button>
            </div>
        </form>
    </section>
</template>
