<script setup lang="ts">
import dayjs from "dayjs";
import { usePage, Head } from "@inertiajs/vue3";
// Props
defineProps({
  pageTitle: { type: String },
  maintenance: { type: Boolean, default: false },
  description: { type: String },
  url: { type: String },
  cover: { type: String },
  item: { type: Boolean, default: false },
  iid: { type: Number },
  itime: { type: Number, default: null },
});
// Function to format the date using dayjs
const getFormattedDate = (timeStamp: number) => {
  // Check if timeStamp is not null and valid number
  if (timeStamp !== null && !isNaN(timeStamp)) {
    return dayjs(timeStamp).format("m-d-Y H:i");
  }
  return null; // Return an empty string if timeStamp is a null or an invalid number
};
const currentTheme = localStorage.getItem("theme") || "light";
</script>

<template>
  <Head>
    <title>{{ pageTitle }}</title>

    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="theme-color" content="#03a9f4" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <meta name="robots" content="index,follow" />
    <link
      rel="shortcut icon"
      type="image/x-icon"
      :href="usePage<any>().props.site.icon"
    />

    <meta :content="pageTitle" name="title" />
    <meta :content="description" name="description" />

    <meta content="website" property="og:type" />
    <meta :content="url" property="og:url" />
    <meta :content="pageTitle" property="og:title" />
    <meta :content="description" property="og:description" />
    <meta :content="cover || usePage<any>().props.site.icon" property="og:image" />

    <meta content="summary_large_image" property="twitter:card" />
    <meta :content="url" property="twitter:url" />
    <meta :content="pageTitle" property="twitter:title" />
    <meta :content="description" property="twitter:description" />
    <meta :content="cover || usePage<any>().props.site.icon" property="twitter:image" />
    <meta
      v-if="item == true"
      name="item-info"
      :data-id="iid"
      :data-onsale-until="getFormattedDate(itime)"
    />
    <meta name="msapplication-TileColor" content="#03a9f4" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0 maximum-scale=1.0"
    />
    <meta http-equiv="Content-Type" content="application/x-html+html; charset=UTF-8" />
    <meta name="robots" content="index,follow" />
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    <!-- Scripts -->
    <meta name="msapplication-config" content="/browserconfig.ae3u4gn3.xml" />
    <link rel="manifest" href="/Aeow2mf3.webmanifest" crossorigin="use-credentials" />
    <!-- Fonts -->
    <link
      rel="stylesheet"
      href="https://kit-pro.fontawesome.com/releases/v6.1.2/css/pro.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"
    />
    <link
      v-if="maintenance"
      rel="stylesheet"
      href="/assets/css/themes/variables-dark.css"
    />
  </Head>
  <div v-if="currentTheme === 'xmas'" class="snowflakes" aria-hidden="true">
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
    <div class="snowflake">❅</div>
    <div class="snowflake">❆</div>
    <div class="snowflake">❄</div>
  </div>
</template>
<style scoped>
/* customizable snowflake styling */
.snowflake {
  color: #fff;
  font-size: 1em;
  font-family: Arial;
  text-shadow: 0 0 1px #000;
}
@-webkit-keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@-webkit-keyframes snowflakes-shake {
  0% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
  50% {
    -webkit-transform: translateX(80px);
    transform: translateX(80px);
  }
  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}
@keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@keyframes snowflakes-shake {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(80px);
  }
  100% {
    transform: translateX(0px);
  }
}
.snowflake {
  position: fixed;
  top: -10%;
  z-index: 9999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: snowflakes-fall, snowflakes-shake;
  -webkit-animation-duration: 10s, 3s;
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: snowflakes-fall, snowflakes-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}
.snowflake:nth-of-type(0) {
  left: 1%;
  -webkit-animation-delay: 0s, 0s;
  animation-delay: 0s, 0s;
}
.snowflake:nth-of-type(1) {
  left: 10%;
  -webkit-animation-delay: 1s, 1s;
  animation-delay: 1s, 1s;
}
.snowflake:nth-of-type(2) {
  left: 20%;
  -webkit-animation-delay: 6s, 0.5s;
  animation-delay: 6s, 0.5s;
}
.snowflake:nth-of-type(3) {
  left: 30%;
  -webkit-animation-delay: 4s, 2s;
  animation-delay: 4s, 2s;
}
.snowflake:nth-of-type(4) {
  left: 40%;
  -webkit-animation-delay: 2s, 2s;
  animation-delay: 2s, 2s;
}
.snowflake:nth-of-type(5) {
  left: 50%;
  -webkit-animation-delay: 8s, 3s;
  animation-delay: 8s, 3s;
}
.snowflake:nth-of-type(6) {
  left: 60%;
  -webkit-animation-delay: 6s, 2s;
  animation-delay: 6s, 2s;
}
.snowflake:nth-of-type(7) {
  left: 70%;
  -webkit-animation-delay: 2.5s, 1s;
  animation-delay: 2.5s, 1s;
}
.snowflake:nth-of-type(8) {
  left: 80%;
  -webkit-animation-delay: 1s, 0s;
  animation-delay: 1s, 0s;
}
.snowflake:nth-of-type(9) {
  left: 90%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}
</style>
