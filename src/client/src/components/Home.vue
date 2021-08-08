<template>
  <div class="jumbotron vh-100 d-flex flex-column">
    <Navbar :hidden="!hidden" />
    <div class="main row h-100 m-0">
      <Login v-if="hidden" />
      {{ currentUser.value?.id }}
      <Suspense>
        <template v-if="!hidden">
          <Channels />
          <ChatScreen />
          <Users />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Login from './Login.vue';
import Channels from './Channels.vue';
import ChatScreen from './ChatScreen.vue';
import Users from './Users.vue';

import { inject, onUpdated, ref } from '@vue/runtime-core';

export default {
  async setup() {
    const store = inject('store');
    const hidden = ref(true);
    const { currentChannel, currentUser } = store();

    onUpdated(() => {
      hidden.value = false;
    });

    return {
      currentChannel,
      currentUser,
      hidden,
    };
  },
  components: {
    Channels,
    ChatScreen,
    Users,
    Login,
    Navbar,
  },
};
</script>
