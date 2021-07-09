<template>
  <div class="jumbotron vh-100 d-flex flex-column">
    <Navbar />
    <div class="row h-100 m-0">
      <Suspense>
        <Home />
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import { provide } from "@vue/runtime-core";

import store from "./store";
provide("store", store);

const { setUser } = store();

if (sessionStorage.getItem("user")) {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  setUser(userData.id);
}

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
  font-display: auto;
}
</style>
