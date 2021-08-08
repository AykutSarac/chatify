<template>
  <Suspense>
    <Home />
  </Suspense>
  <CreateChannelModal />
</template>

<script setup>
import Home from './components/Home.vue';
import CreateChannelModal from './components/CreateChannelModal.vue';
import { provide } from '@vue/runtime-core';

import store from './store';
provide('store', store);

const { setUser, addMessage, currentChannel } = store();

// Get user from sessionStorage if exist
if (sessionStorage.getItem('user')) {
  const userData = JSON.parse(sessionStorage.getItem('user'));
  setUser(userData.id);
}

/**
 * Here we're checking the message sent from the server
 * through websocket. If the channelId from message and
 * our current channelId matches we are adding it to
 * our channelMessages state.
 */
connection.onmessage = function (message) {
  const data = JSON.parse(message.data);

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

:root {
  --white1: #ffffff;
  --white2: #f9fbfc;
  --white3: #f0f0f0;
  --black1: #30333d;
  --purple1: #6a00ffb3;
  --purple1hover: linear-gradient(
    90deg,
    rgba(106, 0, 255, 0.42930675688244047) 0%,
    rgba(209, 0, 255, 0.43) 100%
  );
  --purple2: #e9eff4;
  --gray1: #a4acb2;
}

.main {
  position: relative;
}

a {
  text-decoration: none;
  color: unset;
}

html,
body {
  height: 100%;
}

body {
  scroll-behavior: smooth;
  font-family: 'Nunito', sans-serif;
  font-display: auto;
  overflow: hidden;
}
</style>
