<template>
  <Navbar />
  <Sidebar>
    <div class="cell medium-7">
      <div class="card text-center">
        <div class="card-body">
          <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size:80px;"></i>
          <h3>{{ props.title }}</h3>
          <p>This feature is currently disabled.</p>
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
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>
