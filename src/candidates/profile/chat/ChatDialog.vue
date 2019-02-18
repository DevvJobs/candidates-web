<template>
  <div class="chat__main">
    <div class="chat__main chat__main--data" v-if="selectedContact">
      <div class="chat__main-top-box">
        <h2 class="chat__title">
          <span class="chat__title-hr-name">{{selectedContact.latestRepresentative}}</span>
          <span class="chat__title-company-name">({{selectedContact.company.name}})</span>
        </h2>
        <button class="chat__title-btn" type="button" @click="backToThreads()">
          <svg class="chat__title-ico">
            <use xlink:href="#arrow"></use>
          </svg>
        </button>
        <ChatMenu></ChatMenu>
      </div>

      <div class="chat__main-center-box" ref="messagesScrollContainer">
        <ChatMessagesList></ChatMessagesList>
      </div>

      <div class="chat__main-bottom-box" v-if="showChatMessageRequest">
        <ChatMessageRequest></ChatMessageRequest>
      </div>
      <div class="chat__main-bottom-box" v-if="allowToSendMessages">
        <MessageInput @scrollToLastMessage="scrollToLastMessage" v-on:message-submited="onMessageSubmit"></MessageInput>
      </div>
      <PopupArchiveThreadSuccess
        v-if="showArchivePopupSuccess"
        class="fade-out"
        ></PopupArchiveThreadSuccess>
      <PopupArchiveSingleThread
        v-if="showArchivePopup"
        :id="archiveId"
      ></PopupArchiveSingleThread>
    </div>
    <Loader v-if="chatLoader"></Loader>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { REQUEST_SENT, ACCEPTED } from '@/core/modules/chat/contactStatuses';
import Loader from '@/core/components/Loader';
import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import ChatMessageDate from '@/candidates/profile/chat/shared/ChatDate';
import ChatMessage from '@/candidates/profile/chat/shared/ChatMessage';
import ChatMessagesList from '@/candidates/profile/chat/shared/ChatMessagesList';
import ChatMessageCancelRequest from '@/candidates/profile/chat/shared/ChatCancelRequest';
import ChatMessageRequest from '@/candidates/profile/chat/shared/candidate/ChatMessageRequest';
import ChatMenu from '@/candidates/profile/chat/shared/actions/ChatMenu';
import MessageInput from '@/candidates/profile/chat/shared/MessageInput';
import PopupArchiveSingleThread from '@/candidates/profile/chat/PopupArchiveSingleThread';
import PopupArchiveThreadSuccess from '@/candidates/profile/chat/PopupArchiveThreadSuccess';

export default {
  name: 'Chat',
  data () {
    return {
      showLoader: false
    };
  },
  components: {
    InputWrapper,
    Button,
    Loader,
    ChatMessagesList,
    ChatMessage,
    ChatMessageDate,
    MessageInput,
    ChatMessageCancelRequest,
    ChatMessageRequest,
    ChatMenu,
    PopupArchiveSingleThread,
    PopupArchiveThreadSuccess
  },
  computed: {
    ...mapGetters({
      contacts: 'chat/contacts',
      candidate: 'profile/candidate',
      messages: 'chat/messages',
      chatLoader: 'chat/chatLoader',
      selectedContact: 'chat/selectedContact',
      showThreads: 'chat/showThreads',
      showArchivePopup: 'chat/showArchivePopup',
      showArchivePopupSuccess: 'chat/showArchivePopupSuccess'
    }),
    allowToSendMessages: function () {
      return this.selectedContact.status === ACCEPTED;
    },
    showChatMessageRequest: function () {
      return this.selectedContact.status === REQUEST_SENT;
    },
    archiveId () {
      return (this.selectedContact !== null) ? this.selectedContact.id : null;
    }
  },
  methods: {
    ...mapMutations({
      setShowThreads: 'chat/setShowThreads'
    }),
    ...mapActions({
      selectContact: 'chat/selectContact',
      sendMessage: 'chat/sendMessage'
    }),
    onMessageSubmit (messageText) {
      this.sendMessage({text: messageText, senderName: this.candidate.name})
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
    },
    scrollToLastMessage () {
      this.$nextTick(() => {
        let container = this.$refs.messagesScrollContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    backToThreads () {
      this.$router.push({name: 'ProfileMobileChatThreads'});
    }
  },
  created () {
    if (!this.selectedContact) {
      const contact = _.find(this.contacts, (obj) => obj.id === this.$route.params.id);
      this.selectContact(contact)
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
    }
    this.scrollToLastMessage();
  },
  watch: {
    messages (old, newMessages) {
      if (old && old.length !== newMessages.length) {
        this.scrollToLastMessage();
      }
    },
    showThreads (val) {
      this.scrollToLastMessage();
    }
  }
};
</script>

<style lang="postcss" scoped>
  .chat__main {
    position: relative;
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    @media (--tablet-viewport) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }
  }
  .chat__main--data {
  }
  .chat__main .loader {
    position: absolute;
  }
  .chat__main-top-box {
    position: relative;
    padding: 15px 0;
    text-align: center;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #ECEFF1;
    }
    @media (--tablet-viewport) {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 64px;
      padding: 15px 70px;
      background-color: #fff;
      box-sizing: border-box;
    }
  }

  .chat__title {
    display: inline-block;
    padding: 0 15px;
    font-size: 18px;
    line-height: 22px;
    box-sizing: border-box;
    @media (--tablet-viewport) {
      width: 100%;
    }
  }

  .chat__title-hr-name {
    color: #455A64;
    @media (--tablet-viewport) {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .chat__title-company-name {
    color: #90A4AE;
    @media (--tablet-viewport) {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .chat__title-btn {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 64px;
    height: 64px;
    @media (--tablet-viewport) {
      display: block;
    }
  }
  .chat__title-ico {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(180deg);
    width: 20px;
    height: 15px;
    fill: #cfd8dc;
  }

  .chat__main-center-box {
    flex: 1;
    min-height: 0;
    margin: 0 5px 0 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 9px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 9px;
      background-color: #ECEFF1;
    }
    @media (--tablet-viewport) {
      position: fixed;
      top: 64px;
      bottom: 88px;
      width: 100%;
      background-color: #fff;
    }
  }
  .chat__main-bottom-box {
    position: relative;
    display: block;
    width: 100%;
    padding: 25px 0;
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 15px;
      right: 15px;
      height: 2px;
      background-color: #ECEFF1;
    }
    @media (--tablet-viewport) {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20px 0;
      background-color: #fff;
    }
    @media (--phone-viewport) {
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility:hidden;
    }
  }
  @-moz-keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility:hidden;
    }
  }
  @-webkit-keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility:hidden;
    }
  }
  @-ms-keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility:hidden;
    }
  }
  @-o-keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility:hidden;
    }
  }
  .fade-out {
    animation-name: fadeout;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-delay: 2s;
  }
</style>
