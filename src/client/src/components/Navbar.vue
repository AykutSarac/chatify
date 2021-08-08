<template>
  <div class="navbar text-light w-100 d-flex justify-content-between">
    <img v-if="isUserValid" class="menu" :src="menu" alt="menu" @click="toggleChannels" />
    <a href="/">
      <h2 class="m-0">Chatify</h2>
    </a>
    <img v-if="isUserValid" class="users" :src="users" alt="users" @click="toggleUsers" />
  </div>
</template>

<script>
import menu from '../assets/menu.svg';
import users from '../assets/users.svg';
import { inject, ref, toRefs } from '@vue/runtime-core';

export default {
  name: 'Navbar',
  props: {
    hidden: Boolean,
  },
  setup(props) {
    const { hidden } = toRefs(props);

    const store = inject('store');
    const { toggleNavbar } = store();
    const isUserValid = ref(hidden);

    const toggleChannels = function () {
      toggleNavbar('channels');
    };

    const toggleUsers = function () {
      toggleNavbar('users');
    };

    return {
      menu,
      users,
      toggleChannels,
      toggleUsers,
      isUserValid,
    };
  },
};
</script>

<style scoped>
h2 {
  font-weight: 600;
}

.menu,
.users {
  width: 1.6rem;
  filter: invert();
  cursor: pointer;
  display: none;
}

a:hover {
  color: unset;
}

.navbar {
  z-index: 1;
  background: var(--purple1);
  padding: 0.5em 1em;
}

@media screen and (max-width: 968px) {
  .menu,
  .users {
    display: inline-block;
  }

  .navbar {
    padding: 1em;
  }
}
</style>
