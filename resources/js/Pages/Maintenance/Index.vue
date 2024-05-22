<script setup lang="ts">
import axios from 'axios'; // Import Axios
import { route, current } from 'momentum-trail'
import { ref } from 'vue';
import "../../../../public/assets/css/themes/variables-dark.css";
</script>


<template>
  <div class="modal" id="DeveloperCode">
    <form @submit.prevent="submitPassword">
      <div class="modal-card modal-card-body modal-card-sm">
        <div class="section-borderless">
          <div class="gap-2 align-middle flex-container align-justify">
            <div class="text-lg fw-semibold">Developer Access</div>
            <button @click="showModal('DeveloperCode')" class="btn-circle" data-toggle-modal="#DeveloperCode"
              style="margin-right: -10px">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="section-borderless">
          <div class="mb-2">
            <div class="text-xs fw-bold text-muted text-uppercase">
              Enter Your Developer Code
            </div>
            <input class="form" type="password" placeholder="Developer Code" v-model="password" />
          </div>
          <div v-if="showError" class="text-xs text-danger fw-semibold">
            {{ errorMsg }}
          </div>
        </div>
        <div class="flex-wrap gap-2 flex-container justify-content-end section-borderless">
          <button class="btn btn-secondary" @click="showModal('DeveloperCode')">
            Cancel
          </button>
          <button class="btn btn-info" type="submit">Enter</button>
        </div>
      </div>
    </form>
  </div>
  <main class="container px-4 text-center flex-dir-column loading-page">
    <i class="fas fa-hammer text-7xl text-info" focusable="false" id="icon" :class="{ ...toggleClassArray }"
      @click="countClicks"></i>
    <h1 class="mt-3 mb-0">We'll be back soon!</h1>
    <h3 class="mt-0 text-muted">We're performing some maintenance at the moment.</h3>

    <div class="flex-wrap gap-2 flex-container justify-content-center align-center section-borderless">
      <a href="https://discord.gg/n9vcmaR8Y2" target="_blank" class="text-2xl footer-media text-muted">
        <i class="fab fa-discord"></i>
      </a>
      <a href="https://twitter.com/playvextoria" target="_blank" class="text-2xl footer-media text-muted">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
  </main>
</template>
<style scoped>
.col-md-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-md-9,
.col-md-3 {
  position: relative;
  width: 100;
  padding-right: 15px;
  padding-left: 15px;
}

.col-md-9 {
  flex: 0 0 75%;
  max-width: 75%;
}
</style>
<script lang="ts">
export default {
  data() {
    return {
      password: "",
      showError: false,
      errorMsg: "",
      activation: 0,
      classOptions: [
        'text-muted',
        'text-upgrade',
        'text-danger',
        'text-info',
        'text-warning',
      ],
    };
  },
  methods: {
    countClicks() {
      this.activation++
      this.changeClassByNumber("icon", this.activation, this.classOptions)
      if (this.activation >= 5) {
        this.showModal('DeveloperCode')
      }
    },
    showModal(modalId: string): void {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle("active");
      }
    },
    changeClassByNumber(element, val, classes) {
      for (const className of classes) {
        if (classes.length) {
          const iconwheel = document.getElementById(element);

          iconwheel.classList.add(classes[val]); // Add 'text-muted' class for val = 1
          return; // Exit the loop after adding the desired class
        } else if (val !== 1) {
          iconwheel.classList.remove(className); // Remove other classes if val != 1
        }
      }
    },

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
