<template>
  <Suspense>
    <Home />
  </Suspense>
</template>

<script setup>
import Home from "./components/Home.vue";
import { provide } from "@vue/runtime-core";

import store from "./store";
provide("store", store);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: unset;
}

body {
  scroll-behavior: smooth;
  font-family: "Roboto", sans-serif;
}
</style>
