<template>
  <div class="chat">
    <ChatNavigation class="chat__navigation" v-bind:class="{'chat__navigation--hide': !showThreads}">
      <div class="chat-navigation__empty" v-if="emptyNavigationList">No contacts, yet.</div>
    </ChatNavigation>
    <div class="chat__messages" v-bind:class="{'chat__messages--show': !showThreads}">
      <div class="chat-empty" v-if="emptyNavigationList">
        <div class="chat-empty__title">
          <svg class="chat-empty__icon">
            <use xlink:href="#message"></use>
          </svg>
          No messages, yet.
        </div>
        <div class="chat-empty__text">That’s ok! When companies message you, they’ll show up here. Do knowledge tests to boost your chances of getting noticed!</div>
      </div>
      <router-view></router-view>
    </div>
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
import { clickOutside } from '@/core/directives/clickOutside';
import intercomService from '@/core/services/intercom.service';
import ChatNavigation from '../shared/navigation/ChatNavigation';
import ChatCompanyInfo from '../shared/ChatCompanyInfo';
import SelectChatBottomBar from '@/candidates/profile/chat/SelectChatBottomBar';
import PopupArchiveSingleThread from '@/candidates/profile/chat/PopupArchiveSingleThread';
import PopupArchiveMultipleThreads from '@/candidates/profile/chat/PopupArchiveMultipleThreads';
import PopupArchiveThreadSuccess from '@/candidates/profile/chat/PopupArchiveThreadSuccess';

export default {
  name: 'Chat',
  components: {
    ChatNavigation,
    ChatCompanyInfo,
    SelectChatBottomBar,
    PopupArchiveSingleThread,
    PopupArchiveMultipleThreads,
    PopupArchiveThreadSuccess
  },
  data () {
    return {
      windowWidth: null
    };
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
      showedContacts: 'chat/showedContacts',
      showThreads: 'chat/showThreads',
      isShowCompanyInfo: 'chat/isShowCompanyInfo',
      selectedContact: 'chat/selectedContact',
      showArchivePopup: 'chat/showArchivePopup',
      showArchivePopupSuccess: 'chat/showArchivePopupSuccess',
      showMassArchivePopup: 'chat/showMassArchivePopup'
    }),
    emptyNavigationList () {
      return this.showedContacts.length === 0;
    },
    archiveId () {
      return (this.selectedContact !== null) ? this.selectedContact.id : null;
    }
  },
  directives: {
    clickOutside
  },
  mounted () {
    this.updateShowHeader(false);
  },
  beforeRouteEnter (to, from, next) {
    if (window.innerWidth <= 768) {
      next({name: 'ProfileMobileChatThreads'});
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
  .chat__navigation--hide {
    @media (--tablet-viewport) {
      display: none;
    }
  }
  .chat__messages {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    height: 100%;
    @media (--tablet-viewport) {
      display: none;
    }
  }
  .chat__messages--show {
    display: flex;
  }
  .chat__about {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    max-width: 250px;
    background-color: #fff;
    box-shadow: -8px 2px 18px -8px rgba(207, 216, 220, .8);
    overflow-y: auto;
  }
  .chat-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 640px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
  }
  .chat-empty__title {
    position: relative;
    display: block;
    margin-bottom: 16px;
    padding-top: 90px;
    font-size: 24px;
    font-weight: 300;
    line-height: 30px;
    color: #90A4AE;
  }
  .chat-empty__icon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 92px;
    height: 67px;
    margin-bottom: 50px;
    fill: #CFD8DC;
  }
  .chat-empty__text {
    margin-bottom: 40px;
    display: block;
    font-size: 16px;
    line-height: 22px;
    color: #90A4AE;
    padding-left: 80px;
    padding-right: 80px;
  }
  .chat-empty__link {
    position: relative;
    z-index: 1;
    height: 40px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 40px;
    font-family: var(--ff-font);
    color: #4DD0E1;
    border: 0;
    border-radius: 20px;
    background-color: transparent;
    cursor: pointer;
    outline: 0;
    box-sizing: border-box;
    transition: color .3s ease;
    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background-color: #fff;
      border-radius: 20px;
      opacity: 1;
      transition: opacity .3s ease;
    }
    &::after {
      content: '';
      position: absolute;
      z-index: -2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
    }
    &:hover,
    &:focus {
      color: #fff;
      &::after {
        opacity: 1;
      }
      &::before {
        opacity: 0;
      }
    }
  }
  .chat-navigation__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 16px;
    line-height: 20px;
    color: #CFD8DC;
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
