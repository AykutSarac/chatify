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
      <div
        class="
          d-flex
          flex-column
          m-auto
          text-center
          justify-content-center
          mb-2
          header
        "
      >
        <h2 class="text-success fw-bold">{{ currentChannel.name }}</h2>
        <p class="text-muted" v-if="channelMessages.length === 0">
          This place is so quiet, start chatting...
        </p>
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
              <span v-html="convertToLink(msg.message)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form>
      <input
        type="text"
        class="chatbox p-2"
        placeholder="Send a message..."
        @keyup.enter="userSendMsg"
      />
    </form>
  </div>
</template>

<script>
import { inject, onUpdated } from "@vue/runtime-core";
import avatar1 from "../assets/avatar1.svg";

export default {
  name: "ChatScreen",
  async setup() {
    const store = inject("store");

    const { channelMessages, currentUser, currentChannel, sendMessage } =
      store();

    onUpdated(() => {
      const chatList = document.getElementsByClassName("chatlist")[0];

      if (chatList) {
        chatList.scrollTop = chatList.scrollHeight;
      }
    });

    const userSendMsg = function (e) {
      sendMessage(
        currentUser.value.id,
        currentChannel.value.id,
        e.target.value
      );
      e.target.value = "";
    };

    return {
      avatar1,
      currentUser,
      channelMessages,
      currentChannel,
      userSendMsg,
    };
  },
  methods: {
    convertToLink: function (text) {
      const URLMatcher =
        /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

      return text.replace(
        URLMatcher,
        (text) => `<a class="text-primary" rel="noreferrer" target="_blank" href="${text}">${text}</a>`
      );
    },
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

.header {
  width: 100%;
  border-bottom: 2px #8dbd8d solid;
}

.chatlist {
  overflow: auto;
  min-height: 60vh;
  max-height: 70vh;
  padding-right: 1em;
}

.chatlist::-webkit-scrollbar {
  background: #d8d6d6;
  width: 8px;
  border-radius: 5px;
}

.chatlist::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #8dbd8d;
}

input {
  width: 100%;
}

.chatfield {
  background: #c6d8e4;
}

.chatbox:focus,
.self .chatfield {
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

img {
  -webkit-user-drag: none;
}

@media screen and (max-width: 1024px) {
  .chatScreen {
    width: 100%;
  }
}
</style>