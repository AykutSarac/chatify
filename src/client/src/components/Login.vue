<template>
  <form class="d-flex flex-column justify-content-center align-items-center h-75">
    <div class="form-group mt-25">
      <label for="uid">User ID</label>
      <input
        type="text"
        class="form-control"
        id="uid"
        placeholder="Type 1 or 2..."
        required="true"
      />
      <input class="btn mt-2" type="submit" @click="login" value="Login" />
    </div>
  </form>
</template>

<script>
import { inject } from '@vue/runtime-core';
export default {
  setup() {
    const store = inject('store');
    const { setUser } = store();

    const login = function (e) {
      e.preventDefault();

      const input = document.getElementById('uid');

      if (input && input?.value !== '') {
        setUser(input.value);
      }
    };

    return {
      login,
    };
  },
};
</script>

<style scoped>
.btn {
  background: var(--purple1);
  color: var(--white1);
}

.btn:hover {
  filter: brightness(1.2);
}
</style>
