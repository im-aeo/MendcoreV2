
<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import "../../../../css/Admin/melody.css";
import { route } from "momentum-trail";
import AdminNavLink from "@/Components/AdminNavLink.vue";
const topbar = [
  {
    url: route(`admin.page`),
    active_link: "admin.page",
    icon: "far fa-user",
    en: { title: "Dashboard" },
    es: { title: "Dashboard" },
    ru: { title: "Панель приборов" },
    ja: { title: "ダッシュボード" },
  },
  {
    url: route(`admin.users.page`),
    active_link: "admin.users.page",
    icon: "fad fa-user",
    en: { title: "User Search" },
    es: { title: "búsqueda de usuarios" },
    ru: { title: "Поиск пользователей" },
    ja: { title: "ユーザー検索" },
  },
  {
    url: route(`admin.items.page`),
    active_link: "admin.items.*",
    icon: "fad fa-tshirt",
    en: { title: "Item Search" },
    es: { title: "Búsqueda de artículos" },
    ru: { title: "Поиск предметов" },
    ja: { title: "アイテム検索" },
  },
  {
    url: route(`spaces.page`),
    active_link: "spaces.*",
    icon: "fad fa-planet-ringed",
    en: { title: "Space Search" },
    es: { title: "Espacios" },
    ru: { title: "Поиск групп" },
    ja: { title: "スペース" },
  },
];
const lang = computed<any>(() => props.locale);

const { props } = usePage<any>();
</script>
<template>
<nav class="navbar is-white " role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="background-color: #1b1b1b;">
      <div class="navbar-item has-text-white" style="background-color: #1b1b1b;">
        {{ usePage<any>().props.site.name }} Administration
      </div>
  
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbar " class="navbar-menu">
      <div class="navbar-start ">
        <a class="navbar-item has-text-white" :href="usePage<any>().props.site.production.domains.main" style="background-color: #1b1b1b;">
        <i class="fas fa-arrow-left"></i> &nbsp;
      Return To {{ usePage<any>().props.site.name }}
    </a>
        <AdminNavLink
        v-for="topbarlinks in topbar"
        :link="topbarlinks.url"
        :active_link="topbarlinks.active_link"
      >
        <i :class="topbarlinks.icon"></i> &nbsp;
        {{ topbarlinks[lang].title }}
      </AdminNavLink>
      <div class="navbar-dropdown">
  
        </div>
      </div>
    </div>
  
    <div class="navbar-end">
      <div class="navbar-item">
        <a href="report.html" class="navbar-item has-text-white">
          <i class="far fa-flag"></i>&nbsp;Reports&nbsp;<span class="tag is-danger">9+</span></a>
        <a href="content.html" class="navbar-item has-text-white">
          <i class="far fa-folder"></i>&nbsp;Content Approval&nbsp;<span class="tag is-danger">9+</span></a>
      </div>
    </div>
  </nav>
  <br/>
  <div class="container">
    <slot/><!-- content will be inserted here -->
  </div>
</template>