<template>
  <div class="col-2 d-flex flex-column p-2 channels" :class="{ hide: navbar.channels }">
    <div class="d-flex flex-column">
      <div class="d-flex flex-row justify-content-between mx-1 mb-4 m-2 w-90">
        <h5 class="fw-bold mt-auto mr-2">Channel List</h5>
        <button data-bs-toggle="modal" data-bs-target="#exampleModal">+</button>
      </div>

      <a
        href="#"
        v-for="channel in channels"
        :key="channel.id"
        class="d-flex flex-column mb-3 mx-2"
        :class="{ current: channel.id === currentChannel.id }"
        :id="channel.id"
        @click="setCurrentChannel"
      >
        <h6 class="fw-bold">{{ channel.name }}</h6>
        <span>Last message...</span>
      </a>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'Channels',
  async setup() {
    const store = inject('store');
    const { channels, setChannel, currentChannel, navbar, toggleNavbar } = store();

    const setCurrentChannel = function (e) {
      let id = e.target.closest('a').id;

      setChannel(id);
      toggleNavbar('channels');
    };

    return {
      channels,
      currentChannel,
      setCurrentChannel,
      navbar,
    };
  },
};
</script>

<style scoped>
.current,
.current:hover {
  background: var(--black1);
  color: var(--white1);
}

.current span {
  color: var(--white1);
}

a {
  padding: 0.5em;
  border-radius: 5px;
  background: var(--white1);
  filter: drop-shadow(1px 2px 4px rgb(170, 170, 170));
}

a span {
  color: var(--gray1);
}

a:hover {
  background: #e4e4e4;
}

.channels {
  background: var(--white2);
}

button {
  font-size: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  background: var(--purple1);
  border-radius: 50%;
  color: var(--white1);
  font-weight: 600;
  padding: 0.3em 0.8em;
}

button:hover {
  background: var(--purple1hover);
}

h5 {
  font-size: clamp(0.5rem, 5vw, 1.2rem);
}

@media screen and (max-width: 968px) {
  .channels {
    position: absolute;
    top: 0;
    left: 0;
    width: 16rem;
    height: 100vh;
    filter: drop-shadow(-5px 0 20px #aaaaaa);
    z-index: 2;
  }

  .channels.hide {
    display: none !important;
  }
}
</style>
