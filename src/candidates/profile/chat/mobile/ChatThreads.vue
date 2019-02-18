<template>
  <div class="chat-navigation-holder">
    <div class="chat-navigation__empty" v-if="emptyNavigationList">No contacts, yet.</div>
    <div class="chat-navigation__header">
      <div class="chat-navigation__title">Chat</div>
    </div>
    <ChatTabs
      :allCount=allCount
      :acceptedCount=acceptedCount
      :pendingCount=pendingCount
    ></ChatTabs>
    <div class="chat-navigation">
      <div class="chat-navigation__list" v-bind:class="{'chat-navigation__list--disabled': processing}">
        <ChatMobileNavigationItem
          v-for="(contact, index) of showedContacts"
          class="chat-navigation-item-wrapper"
          :contact="contact"
          v-bind:key="index"
          :windowWidth="windowWidth"
        ></ChatMobileNavigationItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ChatTabs from '@/candidates/profile/chat/shared/ChatTabs';
import ChatMobileNavigationItem from '@/candidates/profile/chat/shared/navigation/ChatMobileNavigationItem';
export default {
  components: {
    ChatMobileNavigationItem,
    ChatTabs
  },
  data () {
    return {
      processing: false,
      windowWidth: null
    };
  },
  computed: {
    ...mapGetters({
      'contacts': 'chat/contacts',
      'acceptedContacts': 'chat/acceptedContacts',
      'pendingContacts': 'chat/pendingContacts',
      'showedContacts': 'chat/showedContacts'
    }),
    emptyNavigationList () {
      return this.showedContacts.length === 0;
    },
    allCount () {
      return this.contacts.length;
    },
    acceptedCount () {
      return this.acceptedContacts.length;
    },
    pendingCount () {
      return this.pendingContacts.length;
    }
  },
  methods: {
    ...mapActions({
      selectContact: 'chat/selectContact'
    }),
    ...mapMutations({
      setShowThreads: 'chat/setShowThreads'
    }),
    onContactClick (contact) {
      this.selectContact(contact)
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }
};
</script>

<style lang="postcss" scoped>
  .chat-navigation__list {}
  .chat-navigation__list--disabled {
    pointer-events: none;
  }
  .chat-navigation-holder {
    position: relative;
    z-index: 2;
    width: 100%;
    padding-top: 64px;
    flex-shrink: 0;
    box-sizing: border-box;
  }
  .chat-navigation {
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    padding: 0;
    overflow-y: scroll;
    box-shadow: 8px 2px 18px -8px rgba(207, 216, 220, .8);
    box-sizing: border-box;

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
  }
  .chat-navigation__header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    padding: 15px 70px;
    background: #fff;
    border-bottom: 1px solid #ECEFF1;
    box-sizing: border-box;
  }
  .chat-navigation__title {
    display: block;
    font-size: 20px;
    color: #90A4AE;
    text-align: center;
  }
  .chat-navigation__item {
    display: block;
    width: 100%;
    text-align: left;
  }
  .chat-navigation__empty {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 18px;
    line-height: 20px;
    color: #CFD8DC;
  }
  .chat-navigation-item-wrapper {
    position: relative;
    display: flex;
    cursor: pointer;
    &::before,
    &::after {
      content: '';
      position: absolute;
    }
    &::before {
      bottom: 0;
      left: 10px;
      right: 0;
      height: 1px;
      background-color: #ECEFF1;
    }
  }
</style>
