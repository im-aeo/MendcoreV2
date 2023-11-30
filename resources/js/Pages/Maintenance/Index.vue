<!-- resources/js/Pages/MaintenancePage.vue -->
<template>
  <div class="justify-center w-40 grid-x maint-body align-center">
    <div class="mt-5 cell large-5 medium-5">
    <div class="mb-3 card card-body w-100">
      <div class="row align-items-center">
      <div class="text-center col-md-3 text-center-sm">
        <i class="fas fa-user-hard-hat text-info" style="font-size:90px;"></i>
    </div>
    <div class="mt-4 col-md-9">
        <div class="text-xl fw-semibold">Maintenance</div>
        <div class="mt-1 text-sm text-muted">We will be back up soon!</div>
        </div>
      </div>
        <div class="mx-1 my-3 divider"></div>
        <form @submit.prevent="submitPassword">
          <div class="mb-2">
            <input class="form" type="password" placeholder="Developer Password" v-model="password" />
          </div>
          <button class="mb-2 btn btn-info w-100 d-block" type="submit">Enter</button>
        </form>
        <div v-if="showError" class="mb-2 text-xs text-danger fw-bold mini-text">
          {{ errorMsg }}
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
<style scoped>
.col-md-3 {
  flex:0 0 25%;
  max-width:25%;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    }

  .col-md-9, .col-md-3 {
    position: relative;
    width:100;
    padding-right:15px;
    padding-left:15px;
 }

  .col-md-9 {
  flex:0 0 75%;
  max-width:75%;
  }
</style>
<script lang="ts">
import AppFooter from '@/Components/LayoutParts/Footer.vue';
import axios from 'axios'; // Import Axios
import { route, current } from 'momentum-trail'

export default {
  data() {
    return {
      password: "",
      showError: false,
      errorMsg: "",
    };
  },
  methods: {
    submitPassword() {
      this.showError = false; // Reset error msg
      this.errorMsg = '';

      if (!this.password) {
        this.errorMsg = 'Please provide a password.';
        this.showError = true;
        return;
      }

      axios.post(route(`maintenance.authenticate.password`), { password: this.password })
        .then(response => {
          if (response.data.error) {
            this.errorMsg = response.data.error;
            this.showError = true;
          } else {
            location.reload(); // If authenticated successfully, reload the page
          }
        })
        .catch(error => {
          console.error(error);
          this.errorMsg = 'An error occurred while processing the request.';
          this.showError = true;
        });
    },
  },
};
</script>
