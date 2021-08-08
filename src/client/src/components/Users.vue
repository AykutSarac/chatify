<template>
  <div class="col-2 d-flex flex-column p-0 users" :class="{ hide: navbar.users }">
    <a
      v-for="user in channelUsers"
      :key="user.id"
      href="#"
      class="profile p-1 m-2 mx-2 d-flex flex-row align-items-center gap-2"
    >
      <img :src="user?.avatar || avatar1" width="38" height="38" alt="avatar" />
      <span class="fw-bold">{{ user.username }}</span>
    </a>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
import avatar1 from '../assets/avatar1.svg';

export default {
  name: 'Users',
  setup() {
    const store = inject('store');

    const { channelUsers, navbar } = store();

    return {
      avatar1,
      channelUsers,
      navbar,
    };
  },
};
</script>

<style scoped>
.users {
  background: var(--white2);
}

a:hover {
  background: var(--purple1hover);
  color: var(--white1);
  border-radius: 5px;
}

.profile span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media screen and (max-width: 968px) {
  .users {
    position: absolute;
    top: 0;
    right: 0;
    width: 16rem;
    height: 100vh;
    filter: drop-shadow(-5px 0 20px #aaaaaa);
    z-index: 2;
  }

  .users.hide {
    display: none !important;
  }
}
</style>
