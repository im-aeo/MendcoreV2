<template>
<AppHead :pageTitle="props.username + '\'s Profile'" :description="'Login to' + usePage<any>().props.site.name + '.'" :url="route('auth.login.page')" />
  <Navbar />
  <Sidebar>
    <div class="cell medium-7">
      <div class="text-center card">
        <div class="card-body">
          <i class="mb-3 fas fa-shield-plus text-muted" style="font-size:80px;"></i>
          <h3>Nothing to see here</h3>
          <p>{{ props.username }} has their profile disabled.</p>
        </div>
      </div>
    </div>
  </Sidebar>
  <Footer />
</template>
<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import { route, current } from 'momentum-trail';
import { usePage } from '@inertiajs/vue3';

interface Props {
  username: string
}

const props = defineProps<Props>()
</script>
