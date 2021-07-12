<template>
  <div class="jumbotron vh-100 d-flex flex-column">
    <Navbar />
    <div class="main row h-100 m-0">
      <Suspense>
        <Home />
      </Suspense>
    </div>
  </div>
  <CreateChannelModal />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import CreateChannelModal from "./components/CreateChannelModal.vue";
import { provide } from "@vue/runtime-core";

import store from "./store";
provide("store", store);

const { setUser, addMessage, currentChannel } = store();

if (sessionStorage.getItem("user")) {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  setUser(userData.id);
}

connection.onmessage = function (e) {
  const data = JSON.parse(e.data);

  if (data.channelId === currentChannel.value.id) {
    addMessage(data);
  }

};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@keyframes animateLeft {
  from {
    clip-path: polygon(100% 0, 100% 0%, 100% 100%, 100% 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
  }
}

@keyframes animateRight {
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
  }
}

body {
  overflow: hidden;
}

.main {
  position: relative;
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
