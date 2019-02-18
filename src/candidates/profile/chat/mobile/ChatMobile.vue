<template>
  <div class="chat">
    <router-view></router-view>
    <transition name="slide">
      <div class="chat__about" v-if="isShowCompanyInfo" v-click-outside="hideChatAbout">
        <ChatCompanyInfo :selected-contact="selectedContact"></ChatCompanyInfo>
      </div>
    </transition>
    <PopupArchiveThreadSuccess
      v-if="showArchivePopupSuccess"
      class="fade-out"
      ></PopupArchiveThreadSuccess>
    <PopupArchiveSingleThread
      v-if="showArchivePopup"
      :id="archiveId"
    ></PopupArchiveSingleThread>
    <PopupArchiveMultipleThreads v-if="showMassArchivePopup"></PopupArchiveMultipleThreads>
    <SelectChatBottomBar></SelectChatBottomBar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ChatCompanyInfo from '@/candidates/profile/chat/shared/ChatCompanyInfo';
import intercomService from '@/core/services/intercom.service';
import SelectChatBottomBar from '@/candidates/profile/chat/SelectChatBottomBar';
import PopupArchiveSingleThread from '@/candidates/profile/chat/PopupArchiveSingleThread';
import PopupArchiveMultipleThreads from '@/candidates/profile/chat/PopupArchiveMultipleThreads';
import PopupArchiveThreadSuccess from '@/candidates/profile/chat/PopupArchiveThreadSuccess';

export default {
  components: {
    ChatCompanyInfo,
    SelectChatBottomBar,
    PopupArchiveSingleThread,
    PopupArchiveMultipleThreads,
    PopupArchiveThreadSuccess
  },
  methods: {
    ...mapMutations({
      updateShowHeader: 'updateShowHeader',
      clearSelectedThreads: 'chat/clearSelectedThreads',
      setCompanyInfoVisibility: 'chat/setCompanyInfoVisibility'
    }),
    hideChatAbout () {
      this.setCompanyInfoVisibility(false);
    }
  },
  computed: {
    ...mapGetters({
      isShowCompanyInfo: 'chat/isShowCompanyInfo',
      selectedContact: 'chat/selectedContact',
      showArchivePopup: 'chat/showArchivePopup',
      showArchivePopupSuccess: 'chat/showArchivePopupSuccess',
      showMassArchivePopup: 'chat/showMassArchivePopup'
    }),
    archiveId () {
      return (this.selectedContact !== null) ? this.selectedContact.id : null;
    }
  },
  mounted () {
    this.updateShowHeader(false);
  },
  beforeRouteEnter (to, from, next) {
    if (window.innerWidth >= 768) {
      next({name: 'ProfileChat'});
    } else {
      next();
    }
  },
  destroyed () {
    this.updateShowHeader(true);
    intercomService.hideLauncher(false);
    this.clearSelectedThreads();
  }
};
</script>

<style lang="postcss" scoped>
  .chat__about {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1002;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    max-width: 250px;
    background-color: #fff;
    box-shadow: -8px 2px 18px -8px rgba(207, 216, 220, .8);
    overflow-y: auto;
  }
  .slide-leave-active,
  .slide-enter-active {
    transition: .3s;
  }

  .slide-enter {
    transform: translate(100%, 0);
  }

  .slide-leave-to {
    transform: translate(100%, 0);
  }
  .chat {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
    @media (--tablet-viewport) {
      height: 100%;
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
