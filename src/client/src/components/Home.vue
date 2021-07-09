<template>
  <Login v-if="hidden" />
  {{ currentUser.value?.id }}
    <Suspense>
      <Channels v-if="!hidden" />
    </Suspense>
    <Suspense>
      <ChatScreen v-if="!hidden" />
    </Suspense>
    <Suspense>
      <Users v-if="!hidden" />
    </Suspense>
</template>

<script>
import Login from "./Login.vue";
import Channels from "./Channels.vue";
import ChatScreen from "./ChatScreen.vue";
import Users from "./Users.vue";
import { inject, onUpdated, ref } from "@vue/runtime-core";

export default {
  async setup() {
    const store = inject("store");
    const hidden = ref(true);
    const { currentChannel, currentUser } = store();

    onUpdated(() => {
      hidden.value = false
    })

    return {
      currentChannel,
      currentUser,
      hidden,
    };
  },
  components: { Channels, ChatScreen, Users, Login }
};
</script>