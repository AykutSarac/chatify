<template>
  <form
    class="
      d-flex
      flex-column
      justify-content-center
      align-items-center
      h-75
    "
  >
    <div class="form-group mt-25">
      <label for="uid">User ID</label>
      <input
        type="text"
        class="form-control"
        id="uid"
        placeholder="Enter your user ID"
      />
      <button class="btn btn-success mt-2" @click="login">Login</button>
    </div>
  </form>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  setup() {
    const store = inject("store");
    const { setUser } = store();

    const login = function (e) {
      e.preventDefault();

      const input = document.getElementById("uid");

      if (input) {
        setUser(input.value);
      }
    };

    return {
      login,
    };
  },
};
</script>