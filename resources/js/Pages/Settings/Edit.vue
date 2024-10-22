<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { route, current } from 'momentum-trail'
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import axios from "axios";
import AppHead from '@/Components/AppHead.vue';

defineProps<{
    mustVerifyEmail?: Boolean,
    status?: String,
    categories?: Array<string>,
    themes?: Object,
}>();

function showModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle("active");
    }
};


const ActiveCategory: Ref<string> = ref("general");

function setActiveCategory(category): void {
    ActiveCategory.value = category;
};
function changeCountry(country): void {
    axios.post(route(`api.settings.changeCountry`, { country: country }))
        .then(response => {
            // Handle the success response here
            console.error('Success:', response);

        })
        .catch(error => {
            // Handle the error response here
            console.error('Error setting your country:', error);
        });
    console.log(country);
};

const currentTheme = localStorage.getItem('theme');


const isVerifiedEmail = computed(() => {
    return usePage<any>().props.auth.user.settings.verified_email || false;
});    
</script>

<template>
    <AppHead
    pageTitle="Account Settings"
    description="Change your account Settings."
    :url="route(`store.create.page`)"
  />
    <Navbar />
    <Sidebar>
        <div class="modal" id="email-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">Change Email</div>
                        <button @click="showModal('email-modal')" class="btn-circle" data-toggle-modal="#email-modal"
                            style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="mb-2">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            New Email
                        </div>
                        <input type="text" class="form" placeholder="New Email..." />
                    </div>
                    <div class="mb-2">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            Password
                        </div>
                        <input type="password" class="form" placeholder="Password..." />
                    </div>
                    <div class="text-xs text-muted fw-semibold">
                        After changing your email address, a confirmation email
                        will be sent to your inbox to confirm your identity.
                    </div>
                </div>
                <div class="flex-wrap gap-2 flex-container justify-content-end section-borderless">
                    <button class="btn btn-secondary" @click="showModal('email-modal')">
                        Cancel
                    </button>
                    <input type="submit" class="btn btn-success" value="Change Email" />
                </div>
            </div>
        </div>
        <div class="modal" id="username-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">Change Username</div>
                        <button @click="showModal('username-modal')" class="btn-circle"
                            data-toggle-modal="#username-modal" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="mb-2">
                        <div class="text-xs fw-bold text-danger text-uppercase">
                            Username
                        </div>
                        <input type="text" class="form" placeholder="New Username..." />
                        <div class="text-xs text-danger fw-semibold">
                            This username is already taken. Try @Nabrious123
                            instead.
                        </div>
                    </div>
                    <div class="mb-2">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            Password
                        </div>
                        <input type="password" class="form" placeholder="Password..." />
                    </div>
                    <div class="text-xs text-muted fw-semibold">
                        Changing your username costs
                        <span class="mx-1 text-success">
                            <i class="fas fa-money-bill-1-wave"></i>
                            {{ usePage<any>().props.site.price.username }}
                        </span>
                    </div>
                </div>
                <div class="flex-wrap gap-2 flex-container justify-content-end section-borderless">
                    <button class="btn btn-secondary" @click="showModal('username-modal')">
                        Cancel
                    </button>
                    <input type="submit" class="btn btn-success" value="Change Username" />
                </div>
            </div>
        </div>
        <div class="modal" id="displayname-modal">
            <div class="modal-card modal-card-body modal-card-sm">
                <div class="section-borderless">
                    <div class="gap-2 align-middle flex-container align-justify">
                        <div class="text-lg fw-semibold">
                            Change Display Name
                        </div>
                        <button class="btn-circle" @click="showModal('displayname-modal')" style="margin-right: -10px">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="text-xs fw-bold text-muted text-uppercase">
                        New Display Name
                    </div>
                    <input type="text" class="mb-2 form" placeholder="New Display Name..." />
                    <div class="text-xs fw-bold text-muted text-uppercase">
                        Password
                    </div>
                    <input type="password" class="mb-2 form" placeholder="Password..." />
                    <div class="text-xs text-muted fw-semibold">
                        Changing your your display name is free but can only be
                        done once every two weeks.
                    </div>
                </div>
                <div class="flex-wrap gap-2 flex-container justify-content-end section-borderless">
                    <button class="btn btn-secondary" @click="showModal('displayname-modal')">
                        Cancel
                    </button>
                    <input type="submit" class="btn btn-success" value="Change Display Name" />
                </div>
            </div>
        </div>

        <div class="cell medium-3">
            <div class="mb-2 text-xl fw-semibold">Account Settings</div>
            <ul class="tabs flex-dir-column">
                <li class="tab-item" v-for="category in categories">
                    <a href="#" @click="setActiveCategory(category)" :class="{ active: category === ActiveCategory }"
                        class="tab-link squish">
                        {{ capitalized(category) }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="cell medium-8">
            <div v-if="ActiveCategory === 'general'">
                <div class="mb-2 align-middle flex-container align-justify">
                    <div class="mb-2 text-xl fw-semibold">General</div>
                    <div class="gap-2 align-middle flex-container-lg">
                        <select @change="changeCountry($event.target.value)"
                            class="mb-2 form form-xs form-select form-has-section-color">
                            <option v-for="country in usePage<any>().props.countries" :key="country.code"
                                :value="country.code">
                                <span class="tab-link squish">
                                    {{ country.name }}
                                </span>
                            </option>
                        </select>
                    </div>
                </div>

                <div class="section-borderless">
                    <div class="card card-body">
                        <div class="mb-2 text-xl fw-semibold">
                            Account Information
                        </div>
                        <div class="section-borderless">
                            <div class="grid-x grid-margin-x">
                                <div class="mb-3 cell medium-6">
                                    <div
                                        class="gap-2 align-middle card card-body card-inner flex-container align-justify h-100">
                                        <div class="min-w-0">
                                            <div class="text-xs text-truncate fw-bold text-muted text-uppercase">
                                                User ID
                                            </div>
                                            <div class="text-truncate fw-semibold">
                                                {{ usePage<any>().props.auth.user.id }}
                                            </div>
                                        </div>
                                        <DeleteUserForm />
                                    </div>
                                </div>
                                <div class="mb-3 cell medium-6">
                                    <div
                                        class="gap-2 align-middle card card-body card-inner flex-container align-justify">
                                        <div class="min-w-0">
                                            <div class="text-xs text-truncate fw-bold text-muted text-uppercase">
                                                Username
                                            </div>
                                            <div class="text-truncate fw-semibold">
                                                {{ '@' + usePage<any>().props.auth.user.username }}
                                            </div>
                                        </div>
                                        <button class="btn btn-info btn-circle" @click="showModal('username-modal')">
                                            <i class="fas fa-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-3 cell medium-6">
                                    <div
                                        class="gap-2 align-middle card card-body card-inner flex-container align-justify">
                                        <div class="min-w-0">
                                            <div class="text-xs text-truncate fw-bold text-muted text-uppercase">
                                                Display Name
                                            </div>
                                            <div class="text-truncate fw-semibold">
                                                {{ usePage<any>().props.auth.user.display_name }}
                                            </div>
                                        </div>
                                        <button class="btn btn-info btn-circle" @click="showModal('displayname-modal')">
                                            <i class="fas fa-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-3 cell medium-6">
                                    <div
                                        class="gap-2 align-middle card card-body card-inner flex-container align-justify">
                                        <div class="min-w-0">
                                            <div class="text-xs text-truncate fw-bold text-muted text-uppercase">
                                                Email Address
                                                <span style="font-size: 10px"
                                                    :class="{ 'text-success': isVerifiedEmail, 'text-danger': !isVerifiedEmail }"
                                                    class="ms-2">
                                                    <i class="fas me-1"
                                                        :class="{ 'fa-check': isVerifiedEmail, 'fa-times': !isVerifiedEmail }"></i>
                                                    {{ isVerifiedEmail ? 'Verified' : 'Unverified' }}
                                                </span>
                                            </div>
                                            <div class="text-truncate fw-semibold">
                                                {{ usePage<any>().props.auth.user.email }}
                                            </div>
                                        </div>
                                        <button class="btn btn-info btn-circle" @click="showModal('email-modal')">
                                            <i class="fas fa-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-3 cell medium-6">
                                    <div
                                        class="gap-2 align-middle card card-body card-inner flex-container align-justify">
                                        <div class="min-w-0">
                                            <div class="text-xs text-truncate fw-bold text-muted text-uppercase">
                                                Date of Birth
                                            </div>
                                            <div class="text-truncate fw-semibold">
                                                {{ usePage<any>().props.auth.user.birthdate }}
                                            </div>
                                            <div class="text-xs fw-semibold text-muted">
                                                If you want to change your
                                                date of birth,
                                                <a href="#">contact support</a>.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                About You
                            </div>
                            <div class="mb-3 position-relative">
                                <textarea class="form form-has-button pe-5"
                                    rows="5">{{ usePage<any>().props.auth.user.about_me }}</textarea>
                                <input type="button" class="btn btn-success btn-sm" value="Update" style="
                                            position: absolute;
                                            bottom: 10px;
                                            right: 10px;
                                        " />
                            </div>
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                Forum Signature
                            </div>
                            <div class="gap-2 align-middle flex-container">
                                <input type="text" class="form form-sm btn-sm"
                                    :value="usePage<any>().props.auth.user.Signature" />
                                <input type="submit" class="btn btn-success btn-sm" value="Update" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="card card-body">
                        <div class="mb-2 text-xl fw-semibold">
                            Website Theme
                        </div>

                        <div id="theme-switcher-container" class="grid-x grid-margin-x grid-padding-y">
                            <div class="cell large-6" v-for="theme in themes">
                                <!-- Move v-if inside the loop -->
                                <div v-if="theme.available" :class="{ active: currentTheme === theme.lowercase }"
                                    class="mb-2 theme-selection squish card card-body card-inner mb-lg-0"
                                    :id="theme.lowercase + '-theme-btn'" @click="setTheme(theme.lowercase)">
                                    <div class="gap-4 align-middle flex-container">
                                        <div class="selection-circle flex-child-grow show-for-large"></div>
                                        <div class="gap-1 align-middle flex-container flex-dir-column"
                                            style="min-width: 0">
                                            <div :class="'theme-circle ' + theme.lowercase"></div>
                                            <div class="text-lg fw-semibold text-truncate">
                                                {{ theme.name }} Theme
                                            </div>
                                            <div class="selection-circle flex-child-grow show-for-small hide-for-large">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div v-if="ActiveCategory === 'account'">
                <div class="mb-1 text-xl fw-semibold">
                    Security & Privacy
                </div>
                <div class="section-borderless">
                    <div class="card card-body">
                        <div class="mb-2 text-xl fw-semibold">Security</div>
                        <div class="grid-x grid-margin-x grid-padding-y">
                            <div class="cell medium-12">
                                <div class="card card-inner card-body">
                                    <div class="mb-2">
                                        <div class="mb-2 text-xl fw-semibold">
                                            Change Password
                                        </div>
                                        <div class="mb-2">
                                            <div class="text-xs fw-bold text-muted text-uppercase">
                                                Current Password
                                            </div>
                                            <input type="password" class="form form-has-section-color"
                                                placeholder="Current Password..." />
                                        </div>
                                        <div class="mb-2">
                                            <div class="text-xs fw-bold text-muted text-uppercase">
                                                New Password
                                            </div>
                                            <input type="password" class="form form-has-section-color"
                                                placeholder="Current Password..." />
                                        </div>
                                        <div class="mb-2">
                                            <div class="text-xs fw-bold text-muted text-uppercase">
                                                Confirm Password
                                            </div>
                                            <input type="password" class="form form-has-section-color"
                                                placeholder="Current Password..." />
                                        </div>
                                    </div>
                                    <button class="btn btn-success">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-borderless">
                    <div class="card card-body">
                        <div class="mb-2 text-xl fw-semibold">Other</div>
                        <div class="mb-3 card card-inner card-body">
                            <div class="mb-2 text-xl fw-semibold">
                                Privacy
                            </div>
                            <div class="mb-2">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    Who Can view My Profile
                                </div>
                                <select class="form form-select form-has-section-color">
                                    <option value="1">Everyone</option>
                                    <option value="2">No One</option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    Who Can See My Posts?
                                </div>
                                <select class="form form-select form-has-section-color">
                                    <option value="1">Everyone</option>
                                    <option value="2">
                                        Followers Only
                                    </option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    Who Can Send Me Messages
                                </div>
                                <select class="form form-select form-has-section-color">
                                    <option value="1">Everyone</option>
                                    <option value="2">
                                        Followers Only
                                    </option>
                                    <option value="3">No One</option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    Who Can Send Me Trade Requests
                                </div>
                                <select class="form form-select form-has-section-color">
                                    <option value="1">Everyone</option>
                                    <option value="2">
                                        Followers Only
                                    </option>
                                    <option value="3">No One</option>
                                </select>
                            </div>
                            <button class="btn btn-success">
                                Save Settings
                            </button>
                        </div>
                        <div class="card card-inner card-body">
                            <div class="mb-2 text-xl fw-semibold">
                                Blocked Players
                            </div>
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                Player Username
                            </div>
                            <div class="gap-2 mb-2 flex-container">
                                <input type="text" class="form form-has-section-color"
                                    placeholder="Player Username..." />
                                <button class="btn btn-danger">
                                    Block
                                </button>
                            </div>
                            <div class="card card-body">
                                <div class="gap-3 text-center flex-container flex-dir-column">
                                    <i class="text-5xl fas fa-user-slash text-muted"></i>
                                    <div style="line-height: 16px">
                                        <div class="text-xs fw-bold text-muted text-uppercase">
                                            No Blocked Players
                                        </div>
                                        <div class="text-xs text-muted fw-semibold">
                                            Yahoo! You have not blocked any
                                            players.
                                        </div>
                                    </div>
                                </div>
                                <!--
                    <div class="section">
                    <div class="align-middle flex-container align-justify">
                      <a href="#" class="gap-2 align-middle flex-container">
                        <img
                          src="/assets/img/dummy_headshot.png"
                          class="headshot"
                          width="50"
                        />
                        <div style="line-height: 18px">
                          <div class="text-body fw-semibold">Nabrious</div>
                          <div class="text-xs fw-semibold text-muted">
                            @Nabrious
                          </div>
                        </div>
                      </a>
                      <button class="btn btn-info btn-sm">Unblock</button>
                    </div>
                  </div>
                  <div class="section">
                    <div class="align-middle flex-container align-justify">
                      <a href="#" class="gap-2 align-middle flex-container">
                        <img
                          src="/assets/img/dummy_headshot.png"
                          class="headshot"
                          width="50"
                        />
                        <div style="line-height: 18px">
                          <div class="text-body fw-semibold">Nabrious</div>
                          <div class="text-xs fw-semibold text-muted">
                            @Nabrious
                          </div>
                        </div>
                      </a>
                      <button class="btn btn-info btn-sm">Unblock</button>
                    </div>
                  </div>
                  <div class="section">
                    <div class="align-middle flex-container align-justify">
                      <a href="#" class="gap-2 align-middle flex-container">
                        <img
                          src="/assets/img/dummy_headshot.png"
                          class="headshot"
                          width="50"
                        />
                        <div style="line-height: 18px">
                          <div class="text-body fw-semibold">Nabrious</div>
                          <div class="text-xs fw-semibold text-muted">
                            @Nabrious
                          </div>
                        </div>
                      </a>
                      <button class="btn btn-info btn-sm">Unblock</button>
                    </div>
                  </div>
                  -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="ActiveCategory === 'billing'">
                <div class="mb-2 align-middle flex-container align-justify">
                    <div class="text-xl fw-semibold">Billing</div>
                    <a href="#" class="btn btn-upgrade btn-sm"><i class="fas fa-rocket-launch me-2"></i>Upgrade</a>
                </div>
                <div class="mb-3 card card-body">
                    <div class="mb-2 text-xl fw-semibold">
                        Active Membership
                    </div>
                    <div class="card card-inner card-body">
                        <div class="gap-3 text-center flex-container flex-dir-column">
                            <i class="text-5xl fas fa-rocket-launch text-muted"></i>
                            <div style="line-height: 16px">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    No Active Membership
                                </div>
                                <div class="text-xs text-muted fw-semibold">
                                    You currently do not have any active
                                    membership to manage.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-body">
                    <div class="mb-2 text-xl fw-semibold">
                        Previous Purchases
                    </div>
                    <!--
              <div class="table">
              <div class="table-header">
                <div class="align-middle grid-x flex-nowrap">
                  <div class="cell medium-4">Product</div>
                  <div class="cell medium-4">Price</div>
                  <div class="cell medium-4">Payment Method</div>
                </div>
              </div>
              <div class="table-body">
                <div class="align-middle grid-x flex-nowrap">
                  <div class="cell medium-4">
                    <div class="gap-2 align-middle flex-container text-warning">
                      <i
                        class="text-xl text-center fas fa-coins"
                        style="width: 30px"
                      ></i>
                      <div class="fw-semibold">5000 Coins</div>
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="fw-semibold">
                      <span class="text-muted">$</span> 4.99
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="fw-semibold">
                      <i class="fab fa-paypal text-muted me-2"></i>PayPal
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-body table-body-darker">
                <div class="align-middle grid-x flex-nowrap">
                  <div class="cell medium-4">
                    <div class="gap-2 align-middle flex-container text-success">
                      <i
                        class="text-xl text-center fas fa-money-bill-1-wave"
                        style="width: 30px"
                      ></i>
                      <div class="fw-semibold">1000 Bucks</div>
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="fw-semibold">
                      <span class="text-muted">$</span> 9.99
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="fw-semibold">
                      <i class="fas fa-credit-card text-muted me-2"></i>Credit
                      Card
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-body">
                <div class="align-middle grid-x flex-nowrap">
                  <div class="cell medium-4">
                    <div
                      class="gap-2 align-middle flex-container text-membership"
                    >
                      <img src="/assets/img/membership_dummy.png" width="30" />
                      <div class="fw-semibold">Membership</div>
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="gap-2 align-middle flex-container text-success">
                      <i class="text-center fas fa-money-bill-1-wave"></i>
                      <div class="fw-semibold">500 Bucks</div>
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="fw-semibold">
                      <i class="fas fa-money-bill-1-wave text-muted me-2"></i
                      >Bucks
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-body table-body-darker">
                <div class="align-middle grid-x flex-nowrap">
                  <div class="cell medium-4">
                    <div
                      class="gap-2 align-middle flex-container text-membership"
                    >
                      <img src="/assets/img/membership_dummy.png" width="30" />
                      <div class="fw-semibold">Membership</div>
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="fw-semibold">
                      <span class="text-muted">$</span> 9.99
                    </div>
                  </div>
                  <div class="cell medium-4">
                    <div class="fw-semibold">
                      <i class="fab fa-bitcoin text-muted me-2"></i>Crypto
                    </div>
                  </div>
                </div>
              </div>
            </div>
            -->

                    <div class="card card-inner card-body">
                        <div class="gap-3 text-center flex-container flex-dir-column">
                            <i class="text-5xl fas fa-envelope-open-text text-muted"></i>
                            <div style="line-height: 16px">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    No Previous Purchases
                                </div>
                                <div class="text-xs text-muted fw-semibold">
                                    You have not made any purchases.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Sidebar>
    <Footer />
</template>

<script lang="ts">
export default {
    data() {
        return {
            activeTheme: '',
        };
    },
    mounted() {
        const theme = localStorage.getItem('theme') || 'light';
        this.activeTheme = theme;
        this.applyTheme(theme);
        const storedTheme = localStorage.getItem('theme');

        const themeBtn = document.getElementById(theme + "-theme-btn");

        if (themeBtn) {
            if (themeBtn.classList.contains('active')) {
                themeBtn.classList.remove('active');
            } else if (storedTheme === theme || this.activeTheme === theme) {
                themeBtn.classList.add('active');
            }
        }
    },
    methods: {
        capitalized(name: string) {
            const capitalizedFirst = name[0].toUpperCase();
            const rest = name.slice(1);

            return capitalizedFirst + rest;
        },
        applyTheme(theme) {
            var lowercaseTheme = theme.toLowerCase();

            let style = document.getElementById('theme-style');
            const themeBtn = document.getElementById(lowercaseTheme + "-theme-btn");

            if (!style) {
                style = document.createElement('link');
                style.id = 'theme-style';
                style.rel = 'stylesheet';
                document.head.appendChild(style);
            }

            style.href = `/assets/css/themes/variables-${lowercaseTheme}.css`;

            // Save the selected theme in localStorage
            localStorage.setItem('theme', theme);
            const storedTheme = localStorage.getItem('theme');

            if (themeBtn) {
                if (themeBtn.classList.contains('active')) {
                    themeBtn.classList.remove('active');
                } else if (storedTheme === theme || this.activeTheme === theme) {
                    themeBtn.classList.add('active');
                }
            }
        },
        setTheme(theme) {

            const storedTheme = localStorage.getItem('theme') || 'light';
            const newtheme = theme || 'light';

            if (storedTheme != newtheme) {
                document.getElementById(storedTheme + "-theme-btn").classList.remove('active');
            }

            this.applyTheme(theme);

            if (storedTheme === newtheme) {
                document.getElementById(theme + "-theme-btn").classList.add('active');
            }

        },
    },
};
</script>
