<template>
  <div class="col-2 d-flex flex-column p-0 users">
    <a
      href="#"
      class="profile p-1 m-3 mx-2 d-flex flex-row align-items-center gap-2"
    >
      <img :src="avatar1" width="38" height="38" alt="avatar" />
      Aykut
    </a>
  </div>
</template>

<script>
import avatar1 from "../assets/avatar1.svg";

export default {
  name: "Users",
  setup() {
    return {
      avatar1,
    };
  },
};
</script>

<style scoped>
.users {
  background: #f5f5f5;
}

a:hover {
  background: #ecd1d1;
  border-radius: 5px;
}

@media screen and (max-width: 1024px) {
  .users {
    display: none !important;
  }
}
</style>