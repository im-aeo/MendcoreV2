<!-- resources/js/Pages/MaintenancePage.vue -->

<template>
  <main class="container">
    <div class="grid-x">
      <div class="cell medium-7 p-2">
        <div class="text-xl fw-semibold mb-1">Roadmap - {{ $page.props.site.name }} <i class="fas fa-globe text-warning"></i></div>
        <div class="card card-body mb-3">
          <div class="mb-3">
              {{ $page.props.site.name }} is a new website where you can imagine something you've always wanted to build, and then bring that imagination into a creation of your own. {{ $page.props.site.name }} is pretty new and were still setting everything up to be ready for you.
              
            <p>We can not wait to see you on {{ $page.props.site.name }}! ❤️</p>

            <div class="text-xl">Frequently Asked Questions</div>
            <div class="mx-1 my-2 divider"></div>
            <p><b>Will {{ $page.props.site.name }} have a game client &amp; workshop?</b></p>
            <p>Yes, {{ $page.props.site.name }} will have an official game client and workshop! Our client is specifically
              being made in the Godot engine, so users can have everything they need to start bring their imagination to
              life.</p>
            <p><b>Can I reserve my username?</b></p>
            <p>As of right now, it is not possible to reserve a username, although we will be opening this up in the near
              future close to {{ $page.props.site.name }}'s release. You will only be able to reserve one username,
              including spaced
              usernames.</p>
          </div>
        </div>
      </div>
    <div class="cell medium-5 p-2">
    <div class="text-xl fw-semibold mb-1">Progress <i class="fas fa-bars-progress fa-flip-horizontal text-warning"></i></div>
      <div class="card card-body mb-2">
        <div class="mb-2">
        <ul class="tabs flex-dir-column">
                        <li class="tab-item">
                            <a href="#" class="tab-link active squish"
                                ><i class="fas fa-check">&nbsp;</i>Authentication</a
                            >
                        </li>
                        <li class="tab-item mt-1">
                            <a href="#" class="tab-link active squish"
                                ><i class="fas fa-check">&nbsp;</i>Item Shop</a
                            >
                        </li>
                        <li class="tab-item mt-1">
                            <a href="#" class="tab-link active squish"
                                ><i class="fas fa-check">&nbsp;</i>Forums</a
                            >
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish"
                                ><i class="fas fa-clock text-warning">&nbsp;</i>Settings</a
                            >
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish"><i class="fas fa-clock text-warning">&nbsp;</i>Real Life Purchasing</a>
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish"
                                ><i class="fas fa-clock text-warning">&nbsp;</i>Settings</a
                            >
                        </li>
                        <li class="tab-item">
                            <a href="#" class="tab-link squish"><i class="fas fa-clock text-warning">&nbsp;</i>Real Life Purchasing (Memberships)</a>
                        </li>
                        
                        
                    </ul>
        </div>
      </div>
      <div class="card card-body mb-3">
      <div class="text-xl">Maintenance Code</div>
       <div class="text-sm mt-1 text-muted">We will be back up soon!</div>
            <div class="mx-1 my-3 divider"></div>
      <form @submit.prevent="submitPassword">
          <div class="mb-2">
        <input class="form" type="password" placeholder="Developer Password" v-model="password" />
        </div>
        <button class="btn btn-info mb-2 w-100 d-block" type="submit">Enter</button>
      </form>
      <div v-if="showError" class="text-xs text-danger fw-bold mini-text mb-2">
        Incorrect password. Please try again.
      </div>
      </div>
    </div>
    </div>
  </main>
  <Footer />
</template>

<script lang="ts">
import Footer from '@/Components/LayoutParts/Footer.vue';
import { route, current } from 'momentum-trail'
export default {
  data() {
    return {
      password: "",
      showError: false,
    };
  },
  methods: {
    submitPassword() {
      // Make an API call to the server to validate the password
      this.$inertia.post("/maintenance", { password: this.password }).then(() => {
        // If the password is correct, reload the page to access the maintenance content
        location.reload();
      }).catch(() => {
        // Show the error message if the password is incorrect
        this.showError = true;
      });
    },
  },
};
</script>
