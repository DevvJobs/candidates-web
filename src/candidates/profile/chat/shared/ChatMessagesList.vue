<template>
  <div>
    <ChatMessage v-for="(message, index) of messages" :message="message" v-bind:key="index"></ChatMessage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import ChatMessage from '@/candidates/profile/chat/shared/ChatMessage';
import ChatMessageDate from '@/candidates/profile/chat/shared/ChatDate';

export default {
  name: 'Chat',
  components: {
    InputWrapper,
    Button,
    ChatMessage,
    ChatMessageDate
  },
  data () {
    return {
      fetchMessagesTimer: null
    };
  },
  computed: {
    ...mapGetters({
      messages: 'chat/messages',
      selectedContact: 'chat/selectedContact'
    })
  },
  methods: {
    ...mapActions({
      refreshSelectedContactMessages: 'chat/refreshSelectedContactMessages'
    }),
    startFetchMessagesTimer () {
      this.fetchMessagesTimer = setInterval(() => {
        this.refreshSelectedContactMessages()
          .then(() => { /* success */ })
          .catch(() => { /* error */ });
      }, 10000);
    }
  },
  created () {
    this.startFetchMessagesTimer();
  },
  destroyed () {
    clearInterval(this.fetchMessagesTimer);
  }
};
</script>
