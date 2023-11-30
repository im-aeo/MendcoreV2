<script setup lang="ts">

import { route, current } from "momentum-trail";
import Button from "./Button.vue";
</script>
<template>
    <p class="text-white fw-semibold text-xl">Register</p>
    <div class="card card-body">
        <form>
            <div class="mb-2">
                <div class="text-xs fw-bold text-muted text-uppercase">
                    Username
                </div>
                <input type="text" class="form" placeholder="Username..." />
            </div>
            <div class="mb-2">
                <div class="text-xs fw-bold text-muted text-uppercase">
                    Email
                </div>
                <input type="email" class="mb-2 form" placeholder="Email..." />
                
            </div>
            <div class="mb-2">
                <div class="text-xs fw-bold text-muted text-uppercase">
                    Password
                </div>
                <input type="password" class="mb-2 form" placeholder="Password..." />
                
            </div>
            <div class="mb-2">
                <div class="grid-x grid-margin-x grid-padding-y">

            <div class="cell small-4">
                <div class="mb-1 text-xs fw-bold text-muted text-uppercase">
                    Month
                </div>
                <select  class="form form-select"
                    name="birth_month" @change="updateDays">
                    <option value="">Select Month</option>
                    <option v-for="month in months" :key="month.value" :value="month.value">
                        {{
                            month.label }}</option>
                </select>
            </div>
            <div class="cell small-4">
                <div class="mb-1 text-xs fw-bold text-muted text-uppercase">
                    Day
                </div>
                <select  class="form form-select"
                    name="birth_day">
                    <option value="">Select Day</option>
                    <option v-for="day in days" :key="day.value" :value="day.value">{{
                        day.label
                    }}</option>
                </select>
            </div>
            <div class="cell small-4">
                <div class="mb-1 text-xs fw-bold text-muted text-uppercase">
                    Year
                </div>
                <select  class="form form-select"
                    name="birth_year" @change="updateDays()">
                    <option value="">Select Year</option>
                    <option v-for="year in years" :key="year.value" :value="year.value">{{
                        year.label }}</option>
                </select>
            </div>
        </div>
        </div>
        </form>
        <div class="mx-1 my-2 divider"></div>
            <Button type="submit" link="#" class="btn-block" :IsBlock="true" ColorClass="btn-success">
                Register
            </Button>
        <a as="button" :href="route(`auth.login.google`)" class="my-2 mt-2 btn btn-secondary btn-block">
            <i class="fab fa-google me-1"></i>
            Log In with Google
        </a>

        <button class="mt-2 btn btn-discord btn-block">
            <i class="fab fa-discord me-1"></i> Log In with
            Discord
        </button>
    </div>
</template>