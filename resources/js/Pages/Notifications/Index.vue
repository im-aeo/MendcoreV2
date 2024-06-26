<script setup lang="ts">
  import Navbar from "@/Components/LayoutParts/Navbar.vue";
  import Sidebar from "@/Components/LayoutParts/Sidebar.vue";
  import Footer from "@/Components/LayoutParts/Footer.vue";
  import { usePage } from "@inertiajs/vue3";
  import { route, current } from "momentum-trail";

  function typeIcon(type: string): string | null {
    const iconMap = {
      user: "fas fa-user",
      // Add more icon mappings here
    };

    return iconMap[type] || null;
  }
</script>

<template>
  <Navbar />
  <Sidebar>
    <div class="cell large-10 medium-12">
      <div class="mb-2 align-middle flex-container align-justify">
        <div class="text-xl fw-semibold">Notifications</div>
        <a href="#" class="btn btn-success btn-sm"
          ><i class="fas fa-envelope me-2"></i>Read All</a
        >
      </div>
      <div class="card card-body">
        <li
          v-if="!usePage<any>().props.auth?.user?.notifications.length"
          class="px-2 py-2 text-center dropdown-item"
        >
          <div class="gap-3 flex-container flex-dir-column">
            <i class="text-5xl fas fa-face-sleeping text-muted"></i>
            <div style="line-height: 16px">
              <div class="text-xs fw-bold text-muted text-uppercase">
                No Notifications
              </div>
              <div class="text-xs text-muted fw-semibold">
                You have not recieved any notifications recently.
              </div>
            </div>
          </div>
        </li>

        <div
          v-else
          v-for="notification in usePage<any>().props.auth?.user?.notifications"
          class="dropdown-item"
        >
          <Link :href="notification.data.route" class="dropdown-link">
            <div class="gap-1 align-middle flex-container">
              <i
                class="text-lg text-center fas fa-comments-alt text-info flex-child-grow"
                style="width: 38px"
              ></i>
              <div class="gap-2 align-middle flex-container w-100">
                <img
                  src="/assets/img/dummy_headshot.png"
                  class="headshot flex-child-shrink"
                  height="40"
                  width="40"
                />
                <div class="min-w-0" style="line-height: 16px">
                  <div class="text-sm text-truncate">
                    <span class="search-keyword" v-if="notification.data.object"
                      >{{ notification.data.object }} &nbsp;</span
                    >
                    <span class="text-sm text-muted">{{
                      notification.data.message
                    }}</span>
                  </div>
                  <div class="text-xs text-muted">
                    {{ notification.DateHum }}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div
          :class="{ divider: usePage<any>().props.auth?.user?.notifications?.data > 0 }"
          class="mx-1 my-3"
        ></div>
      </div>
    </div>
  </Sidebar>
  <Footer />
</template>
