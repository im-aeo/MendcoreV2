
<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import "../../../../css/Admin/melody.css";
</script>
<template>
<nav class="navbar is-white " role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="background-color: #1b1b1b;">
      <div class="navbar-item has-text-white" href="dashboard.html" style="background-color: #1b1b1b;">
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
  
        <a href="dashboard.html" class="navbar-item has-text-link">
          <i class="far fa-user"></i>&nbsp;Dashboard</a>
        <a href="user.html" class="navbar-item has-text-white">
          <i class="fad fa-user"></i>&nbsp;User Search</a>
        <a href="item.html" class="navbar-item has-text-white">
          <i class="fad fa-tshirt"></i>&nbsp;Item Search</a>
        <a href="group.html" class="navbar-item has-text-white">
          <i class="fad fa-chess"></i>&nbsp;Space Search</a>
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