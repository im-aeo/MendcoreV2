<script setup lang="ts">
import Navbar from "@/Components/LayoutParts/Navbar.vue";
import Sidebar from "@/Components/LayoutParts/Sidebar.vue";
import Footer from "@/Components/LayoutParts/Footer.vue";
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios"; // Import Axios
import { route } from "momentum-trail";
import { usePage } from "@inertiajs/vue3";
import VLazyImage from "v-lazy-image";

const colors = usePage<any>().props.colors;
const currentcat = ref("hat");
const CategoryItems = ref([]);
const wearingItems = ref([]);
const wearingHats = ref([]);
const SelectedItemID = ref<Number>();
const slotValue = ref<Number>();

var userAvatar = reactive({
  color_head: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["color_head"]
  ),
  color_torso: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["color_torso"]
  ),
  color_left_arm: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["color_left_arm"]
  ),
  color_right_arm: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["color_right_arm"]
  ),
  color_left_leg: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["color_left_leg"]
  ),
  color_right_leg: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["color_right_leg"]
  ),
  image: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["thumbnail"]
  ),
  current_face: computed<any>(
    () => (usePage<any>().props.avatar as Record<string, unknown>)?.["current_face"]
  ),
});

const selectedPart = ref<string | null>(null);
const selectedColor = ref<string | null>(null); // Initialize with a default color, e.g., white

const VrcRequest = ref(false); // Initialize as false
const imageRefreshKey = ref(0); // Initialize with 0

let thumbnail = "";

// Function to show a modal by toggling its "active" class
function showModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.toggle("active");
  }
}

// Mapping of internal part names to user-friendly names
const partNames = {
  head: "Head",
  left_arm: "Left Arm",
  torso: "Torso",
  right_arm: "Right Arm",
  left_leg: "Left Leg",
  right_leg: "Right Leg",
};
// Function to submit the selected part's color to the API

function VRCReset(): Promise<void> {
  VrcRequest.value = true;
  const requestData = {
    action: "reset",
  };
  axios
    .post(route(`avatar.update`), requestData)
    .then((response) => {
      // Handle the response from the server
      console.log(response.data);
      imageRefreshKey.value += 1;
      thumbnail = response.data;
      VrcRequest.value = false;
    })
    .catch((error) => {
      VrcRequest.value = false;

      // Handle any errors
      console.error(error);
    });
  console.log(`Resetting`);
}

// Function to change the color of a body part
function changeColor(color: string, part: string): Promise<void> {
  if (!part) {
    console.error("Part is null or undefined");
    return Promise.reject("Part is null or undefined");
  } else {
    console.log(part);
  }

  VrcRequest.value = true;
  const requestData = {
    action: "color",
    body_part: part,
    color: color,
  };

  axios
    .post(route(`avatar.update`), requestData)
    .then((response) => {
      // Handle the response from the server
      imageRefreshKey.value += 1;
      thumbnail = response.data;
      selectedColor.value = color;
      VrcRequest.value = false;
    })
    .catch((error) => {
      VrcRequest.value = false;
      // Handle any errors
      console.error(error);
    });

  const updatedUserAvatar = { ...userAvatar };
  if (part === "head") {
    updatedUserAvatar.color_head = color;
  } else if (part === "left_arm") {
    updatedUserAvatar.color_left_arm = color;
  } else if (part === "torso") {
    updatedUserAvatar.color_torso = color;
  } else if (part === "right_arm") {
    updatedUserAvatar.color_right_arm = color;
  } else if (part === "left_leg") {
    updatedUserAvatar.color_left_leg = color;
  } else {
    updatedUserAvatar.color_right_leg = color;
  }
  userAvatar = updatedUserAvatar;

  console.log(`Changing ${part} color to: ${color}`);
}

// Function to select a body part
function selectPart(part: string): void {
  selectedPart.value = part;
}
function setColor(color: string): void {
  selectedColor.value = color;
}

function handlePartSelection(part: string): void {
  showModal("PartsModal");
  selectPart(part);
}
const SortItemByType = async (id: number, type: string) => {
  if (type === "hat") {
    SelectedItemID.value = id;
    showModal("SlotModal");
  } else {
    WearItem(id, "none");
  }
};

const getItemsbyCategory = async (category) => {
  try {
    const response = await axios.get(route(`api.avatar.items`, { category: category }));
    CategoryItems.value = response.data;
    currentcat.value = category;
  } catch (error) {
    console.error("Error fetching all items:", error);
    return [];
  }
};

const getCurrentlyWearingItems = async () => {
  try {
    const response = await axios.get(route(`api.avatar.wearing-items`));
    wearingItems.value = response.data;
  } catch (error) {
    console.error("Error fetching currently wearing items:", error);
    return [];
  }
};

const getCurrentlyWearingHats = async () => {
  try {
    const response = await axios.get(route(`api.avatar.wearing-hats`));
    wearingHats.value = response.data;
  } catch (error) {
    console.error("Error fetching currently wearing items:", error);
    return [];
  }
};

const WearItem = async (id, slot) => {
  try {
    const response = await axios.get(
      route(`api.avatar.wear-item`, { id: id, slot: slot })
    );
    getCurrentlyWearingItems();
  } catch (error) {
    console.error("Error fetching currently wearing items:", error);
    return [];
  }
};
function setSlotValue(e) {
  slotValue.value = e.target.value;
}

onMounted(() => {
  getCurrentlyWearingItems(), getCurrentlyWearingHats();
});
</script>
<template>
  <Navbar />
  <Sidebar>
    <div class="modal" id="SlotModal">
      <div class="modal-card modal-card-body modal-card-sm">
        <div class="section-borderless">
          <div class="gap-2 align-middle flex-container align-justify">
            <div class="text-lg fw-semibold">Pick a Slot</div>
            <button
              @click="showModal('SlotModal')"
              class="btn-circle"
              data-toggle-modal="#SlotModal"
              style="margin-right: -10px"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="section-borderless">
          <div class="mb-2">
            <div class="flex-wrap gap-1 flex-container align-center">
              <button
                class="btn btn-info"
                v-for="n in 6"
                :key="n"
                :value="n"
                @click="setSlotValue($event)"
              >
                <i class="mr-1 fa-solid fa-hat-beach"></i>
                Slot {{ n }}
              </button>
            </div>
          </div>
        </div>
        <div
          class="flex-wrap gap-2 flex-container justify-content-end section-borderless"
        >
          <button type="button" class="btn btn-secondary" @click="showModal('SlotModal')">
            Cancel
          </button>
          <button
            v-if="!VrcRequest"
            type="submit"
            class="btn btn-success"
            @click="WearItem(SelectedItemID, slotValue)"
          >
            Wear
          </button>
        </div>
      </div>
    </div>
    <div class="modal" id="PartsModal">
      <div class="modal-card modal-card-body modal-card-sm">
        <div class="section-borderless">
          <div class="gap-2 align-middle flex-container align-justify">
            <div v-if="selectedPart" class="text-lg fw-semibold">
              Change {{ partNames[selectedPart] }} Color
            </div>
            <div v-else class="text-lg fw-semibold">
              Select a part to change its color
            </div>
            <button
              @click="showModal('PartsModal')"
              class="btn-circle"
              data-toggle-modal="#PartsModal"
              style="margin-right: -10px"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="mr-2 section-borderless grid-x">
          <div class="mr-2" v-for="(color, index) in colors" :key="index">
            <div
              class="ColorPickerItem"
              @click="setColor(color)"
              :class="{
                active:
                  selectedColor === color ||
                  userAvatar[`color_${selectedPart}`] === color,
              }"
              :style="{
                backgroundColor: '#' + color,
                display: 'inline-block',
                width: '32px',
                height: '32px',
              }"
            ></div>
          </div>
          <div class="text-xs text-muted fw-semibold">
            After changing your avatar part your avatar will rerender with the changes
            applied.
          </div>
          <div
            class="flex-wrap gap-2 flex-container justify-content-end section-borderless"
          >
            <button class="btn btn-secondary" @click="showModal('PartsModal')">
              Cancel
            </button>
            <input
              v-if="selectedPart && !VrcRequest"
              @click="changeColor(selectedColor, selectedPart)"
              type="submit"
              class="btn btn-success"
              value="Submit"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="cell medium-3">
      <div class="mb-3 card card-body">
        <div id="avatarDiv">
          <v-lazy-image
            :src="thumbnail"
            :src-placeholder="userAvatar.image"
            style="display: block; margin: 0 auto !important"
          />
          <div
            v-if="VrcRequest"
            id="avatar-loading"
            style="
              width: inherit;
              height: inherit;
              visibility: none;
              position: absolute;
              inset: 0px;
              background-color: rgba(0, 0, 0, 0.58);
              display: inline-grid;
              justify-content: center;
              align-items: center;
            "
          >
            <i
              class="justify-center text-3xl text-center align-middle fa-duotone fa-spinner flex-container flex-dir-column text-info"
              style="
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-name: spin;
                animation-duration: 0.7s;
                font-size: 3em;
              "
            ></i>
          </div>
        </div>
        <div class="min-w-0 gap-2 mt-3 flex-container">
          <button @click="VRCReset()" class="btn btn-danger btn-sm text-truncate w-100">
            Reset
          </button>
          <button class="btn btn-info btn-sm text-truncate w-100">Random</button>
        </div>
      </div>
      <div class="text-center">
        <div class="card card-body">
          <div style="">
            <div style="margin-bottom: 2.5px">
              <button
                class="avatar-body-part"
                id="head"
                :style="{
                  backgroundColor: '#' + userAvatar.color_head,
                  padding: '5px',
                  borderRadius: '15px',
                  marginTop: '-1px',
                }"
                @click="handlePartSelection('head')"
              >
                <VLazyImage
                  :src="userAvatar.current_face"
                  :src-placeholder="usePage<any>().props.site.production.domains.storage + '/assets/default.png'"
                  width="50"
                  height="50"
                />
              </button>
            </div>
            <div style="margin-bottom: 2.5px">
              <button
                class="avatar-body-part"
                id="left_arm"
                :style="{
                  backgroundColor: '#' + userAvatar.color_left_arm,
                  padding: '50px',
                  paddingRight: '0px',
                }"
                @click="handlePartSelection('left_arm')"
              ></button>

              <button
                class="avatar-body-part"
                id="torso"
                :style="{
                  backgroundColor: '#' + userAvatar.color_torso,
                  padding: '50px',
                }"
                @click="handlePartSelection('torso')"
              ></button>

              <button
                class="avatar-body-part"
                id="right_arm"
                :style="{
                  backgroundColor: '#' + userAvatar.color_right_arm,
                  padding: '50px',
                  paddingRight: '0px',
                }"
                @click="handlePartSelection('right_arm')"
              ></button>
            </div>
            <div>
              <button
                class="avatar-body-part"
                name="left_leg"
                @click="handlePartSelection('left_leg')"
                :style="{
                  backgroundColor: '#' + userAvatar.color_left_leg,
                  padding: '50px',
                  paddingRight: '0px',
                  paddingLeft: '47px',
                }"
              ></button>

              <button
                class="avatar-body-part"
                name="right_leg"
                @click="handlePartSelection('right_leg')"
                :style="{
                  backgroundColor: '#' + userAvatar.color_right_leg,
                  padding: '50px',
                  paddingRight: '0px',
                  borderBottom: '15px',
                  paddingLeft: '47px',
                }"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cell medium-8">
      <div class="mb-3 card card-body">
        <div class="mb-1 align-middle flex-container align-justify">
          <div class="mb-1 text-xl fw-semibold">Currently Wearing</div>
        </div>
        <div class="section">
          <div class="gap-3 text-center flex-container flex-dir-column">
            <div class="grid-x grid-margin-x">
              <div
                v-for="item in wearingItems.data"
                class="cell large-2 medium-3 small-3"
              >
                <div class="d-block">
                  <div class="p-2 mb-1 card card-inner position-relative">
                    <img :src="item.thumbnail" />
                  </div>
                  <Link
                    :href="route(`store.item`, { id: item.id })"
                    class="text-body fw-semibold text-truncate"
                  >
                    {{ item.name }}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="!wearingItems.length"
            class="gap-3 text-center flex-container flex-dir-column"
          >
            <i class="text-5xl fas fa-wand-magic-sparkles text-muted"></i>
            <div style="line-height: 16px">
              <div class="text-xs fw-bold text-muted text-uppercase">No Items.</div>
              <div class="text-xs text-muted fw-semibold">
                You are not wearing any items.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3 card card-body">
        <div class="mb-2 align-middle grid-x">
          <div class="cell large-7">
            <div class="mb-2 text-xl fw-semibold">Inventory</div>
          </div>
          <div class="cell large-5">
            <div class="gap-2 align-middle flex-container-lg">
              <select
                @change="getItemsbyCategory($event.target.value)"
                class="mb-2 form form-xs form-select form-has-section-color"
              >
                <option
                  v-for="category in usePage<any>().props.categories"
                  :key="category.internal"
                  :value="category.internal"
                >
                  <span
                    class="tab-link squish"
                    :class="{ active: currentcat === category.internal }"
                  >
                    {{ category.name }}
                  </span>
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="gap-3 text-center flex-container flex-dir-column">
            <div class="grid-x grid-margin-x">
              <div
                v-for="item in CategoryItems.data"
                class="cell large-2 medium-3 small-3"
                @click="SortItemByType(item.id, item.type)"
              >
                <div class="d-block">
                  <div class="p-2 mb-1 card card-inner position-relative">
                    <img :src="item.thumbnail" />
                  </div>
                  <Link
                    :href="route(`store.item`, { id: item.id })"
                    class="text-body fw-semibold text-truncate"
                  >
                    {{ item.name }}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Pagination v-if="CategoryItems.length" v-bind:pagedata="CategoryItems.data" />

          <div
            v-if="!CategoryItems.length"
            class="gap-3 text-center flex-container flex-dir-column"
          >
            <i class="text-5xl fas fa-crate-apple text-muted"></i>
            <div style="line-height: 16px">
              <div class="text-xs fw-bold text-muted text-uppercase">No Items</div>
              <div class="text-xs text-muted fw-semibold">
                You have no items in this category.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
  <Footer />
  <!--
    {{ AVATAR CLASSES }}
    Body Colors:
    {{ userAvatar.color_head }}
    {{ userAvatar.color_torso }}
    {{ userAvatar.color_left_arm }}
    {{ userAvatar.color_right_arm }}
    {{ userAvatar.color_left_leg }}
    {{ userAvatar.color_right_leg }}

    Items: [
        Hats [
    {{ userAvatar.items[0].hats.hat_1 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_2 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_3 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_4 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_5 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_6 ?? 'none' }}
],
    {{ userAvatar.items[0].face ?? 'none' }}
    {{ userAvatar.items[0].gear ?? 'none' }}
    {{ userAvatar.items[0].shirt ?? 'none' }}
    {{ userAvatar.items[0].pants ?? 'none' }}

    ];
!-->
</template>
