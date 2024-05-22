<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import { Head, Link } from '@inertiajs/vue3';
import { route, current } from "momentum-trail";

</script>

<template>
<Navbar>
    <div class="cell ">
            <div class="justify-center text-center row card card-body align-center scatball-card">
                <div class="col-md-8 align-center text-center-sm">
                    <h1 class="text-warning">The place to create.</h1>
                    <p class="text-upgrade">{{ $page.props.site.name }} is an online 3D gaming platform where users can enable their creativity. Customize your character, create your own clothing, participate in a virtual economy, create groups, chat with others, and much more.</p>
                </div>
            </div>
            <div class="justify-center mt-2 mb-2 text-start card card-body align-center stat-card">
                <div class="col-md-8 align-center text-center-sm">
                    <h1>With over: 100+ users</h1>
                    <p class="fs-2">And over 150 items,</p>

                </div>
            </div>

            <div class="justify-center mt-2 mb-2 text-center card card-body align-center reg-card">
                <div class="col-md-8 align-center text-center-sm">
                    <h3>What are you wating for?</h3>
                    <p>Register to {{ $page.props.site.name }} below.</p>
                    <div class="buttons">
                        <a :href="route('auth.register.page')" class="btn btn-success"><i class="mr-1 fas fa-user-plus"></i> Create Account</a>
                        <a :href="route('auth.login.page')" class="btn btn-warning"><i class="mr-1 fas fa-key"></i> Existing User</a>
                    </div>
                </div>
            </div>
        </div>
</Navbar>
</template>
