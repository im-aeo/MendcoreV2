<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import axios from "axios";
import { route } from "momentum-trail";
import { usePage } from "@inertiajs/vue3";
import AeoPagination from "@/Components/Pagination.vue";
import Navbar from "@/Components/LayoutParts/Admin/Navbar.vue";
import AppHead from "@/Components/AppHead.vue";
</script>

<template>
  <AppHead
    pageTitle="Manage Item"
    description="Login to Vestora."
    :url="route('admin.items.manage-item', { id: usePage<any>().props.item.id })"
  />
  <Navbar>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column is-2">
            <figure class="image">
              <img
                class="is-rounded"
                :src="usePage<any>().props.item.thumbnail"
              />
            </figure>
          </div>
          <div class="column is-5">
            <br />

            <p class="title is-2">{{ usePage<any>().props.item.name }}</p>
            <div class="content">
              <blockquote>
                {{ usePage<any>().props.item.description ?? "This is the items description" }}
              </blockquote>
            </div>
          </div>
          <div class="column">
            <label><strong>Moderation Actions:</strong></label>
            <br />
            <a href="purgeitem.html" class="button is-danger is-outlined"
              >Purge Item Name</a
            >
            <a href="purgeitem.html" class="button is-danger is-outlined"
              >Purge Item Description</a
            >
            <a href="purgeitem.html" class="button is-danger is-outlined">Delete Item</a>
          </div>
        </div>

        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">ID</p>
              <p class="title">{{ usePage<any>().props.item.id }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Category</p>
              <p class="title">{{ usePage<any>().props.item.item_type }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Sold Amount</p>
              <p class="title">{{ usePage<any>().props.item.sold }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Onsale?</p>
              <p class="title">{{ usePage<any>().props.item.isOnsale ? "Yes" : "No" }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Rare?</p>
              <p class="title">
                {{ usePage<any>().props.item.isRare ? "Yes" : "No" }}
              </p>
            </div>
          </div>
          <div v-if="usePage<any>().props.item.isRare" class="level-item has-text-centered">
            <div>
              <p class="heading">Stock</p>
              <p class="title">{{ usePage<any>().props.item.remaining_stock }} out of
                {{ usePage<any>().props.item.initial_stock }}</p>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <br />
    <div class="card">
      <div class="card-content">
        <p class="title is-4">Item Status</p>
        <div class="columns">
          <div class="column is-7">
            <div class="select title is-6 is-fullwidth">
              <select>
                <option>Onsale</option>
                <option>Offsale</option>
              </select>
            </div>
          </div>
          <div class="column">
            <a class="button is-fullwidth" href="itemsubmit.html">Submit</a>
          </div>
        </div>
        <p class="title is-4">Make Item Rare</p>
        <p class="subtitle is-6">Provide quantity below</p>
        <div class="columns">
          <div class="column is-3">
            <div class="select title is-6 is-fullwidth">
              <select>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div class="column is-7">
            <input class="input" type="ID" placeholder="Input" />
          </div>
          <div class="column">
            <a class="button is-fullwidth" href="itemsubmit.html">Submit</a>
          </div>
        </div>
        <p class="title is-4">Change Item Price</p>
        <div class="columns">
          <div class="column is-3">
            <div class="select title is-6 is-fullwidth">
              <select>
                <option>Cash</option>
                <option>Coins</option>
              </select>
            </div>
          </div>
          <div class="column is-7">
            <input class="input" type="ID" placeholder="Input" />
          </div>
          <div class="column">
            <a class="button is-fullwidth" href="itemsubmit.html">Submit</a>
          </div>
        </div>
      </div>
    </div>
  </Navbar>
</template>
