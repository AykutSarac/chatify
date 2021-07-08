<template>
  <div class="jumbotron vh-100 d-flex flex-column" v-if="currentChannel">
    <Navbar />
    <div class="row h-100 m-0">
      <Suspense>
        <Channels />
      </Suspense>
      <Suspense>
        <ChatScreen />
      </Suspense>
      <Suspense>
        <Users />
      </Suspense>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Channels from "./Channels.vue";
import ChatScreen from "./ChatScreen.vue";
import Users from "./Users.vue";
import { inject } from "@vue/runtime-core";

export default {
  async setup() {
    const store = inject("store");
    const { setUser, currentChannel } = store();

    await setUser(1);

    return {
      currentChannel,
    };
  },
  components: { Navbar, Channels, ChatScreen, Users },
};
</script>