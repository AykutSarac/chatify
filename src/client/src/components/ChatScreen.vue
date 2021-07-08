<template>
  <div
    class="
      col-8
      d-flex
      flex-column
      p-0
      justify-content-between
      p-3
      border border-top-0
      chatScreen
    "
  >
    <div class="d-flex flex-column justify-content-between chat">
      <div class="d-flex justify-content-center mb-5">
        <h2 class="text-success fw-bold">{{ currentChannel.name }}</h2>
      </div>

      <div class="chatlist">
        <div
          v-for="msg in channelMessages"
          :key="msg.id"
          class="d-flex gap-2 w-75 mb-4 bubble"
          :class="{ self: currentUser.id === msg.userId }"
        >
          <img
            :src="msg?.avatar || avatar1"
            width="50"
            height="50"
            alt="avatar"
          />
          <div class="text">
            <div class="username">{{ msg.username }}</div>
            <div class="chatfield p-2 rounded">
              {{ msg.message }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <input type="text" class="chatbox p-2" placeholder="Send a message..." />
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";
import avatar1 from "../assets/avatar1.svg";

export default {
  name: "ChatScreen",
  async setup() {
    const store = inject("store");

    const { channelMessages, currentUser, currentChannel } = store();

    return {
      avatar1,
      currentUser,
      channelMessages,
      currentChannel
    };
  },
};
</script>

<style scoped>
.chatbox {
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: #f0f0f0;
  transition: 0.2s;
  color: #383838;
}

.chatlist {
  overflow: auto;
  height: 65vh;
}

input {
  width: 100%;
}

.chatbox:focus,
.chatfield {
  background: #dfecd1;
}

.chatfield {
  font-size: 1rem;
  width: fit-content;
}

.bubble {
  flex-flow: row;
}

.bubble.self {
  flex-flow: row-reverse;
}

.self .chatfield {
  float: right;
}

.self {
  text-align: right;
  float: right;
  flex-flow: row-reverse;
}

.self .chatfield {
  background: #c6d8e4;
}

img {
  -webkit-user-drag: none;
}

@media screen and (max-width: 1024px) {
  .chatScreen {
    width: 100%;
  }
}
</style>