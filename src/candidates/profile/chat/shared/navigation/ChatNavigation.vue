<template>
  <div class="chat-navigation-holder">
    <div class="chat-navigation__header">
      <div class="chat-navigation__title">Chat</div>
    </div>
    <div class="chat-navigation">
      <ChatSearch class="chat-tabs__search"
        :value="searchText" @changeInput="setSearchText"></ChatSearch>
      <ChatTabs
        :allCount=allCount
        :acceptedCount=acceptedCount
        :pendingCount=pendingCount
      ></ChatTabs>
      <div class="chat-navigation__list" v-bind:class="{'chat-navigation__list--disabled': processing}">
          <ChatNavigationItem
            v-for="(contact, index) of filterItemsMatchingSearch(showedContacts)"
            class="chat-navigation-item-wrapper"
            :contact="contact"
            v-bind:key="index"
            :windowWidth="windowWidth"
          ></ChatNavigationItem>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ChatTabs from '@/candidates/profile/chat/shared/ChatTabs';
import ChatNavigationItem from '@/candidates/profile/chat/shared/navigation/ChatNavigationItem';
import ChatSearch from '@/candidates/profile/chat/shared/ChatSearch';

export default {
  name: 'ChatDialogList',
  components: {
    ChatTabs,
    ChatNavigationItem,
    ChatSearch
  },
  data () {
    return {
      processing: false,
      windowWidth: null,
      searchText: null
    };
  },
  computed: {
    ...mapGetters({
      'contacts': 'chat/contacts',
      'acceptedContacts': 'chat/acceptedContacts',
      'pendingContacts': 'chat/pendingContacts',
      'archivedContacts': 'chat/archivedContacts',
      'showedContacts': 'chat/showedContacts',
      'selectedContact': 'chat/selectedContact',
      'activeTab': 'chat/activeTab'
    }),
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
    filterItemsMatchingSearch (list) {
      if (!this.searchText) {
        return list;
      }

      const includesIgnoreCase = (str, suffix) =>
        str.toLowerCase().includes(suffix.toLowerCase());

      return list.filter((item) => {
        const company = item.company.name;
        const rep = item.latestRepresentative;

        const matchesCompany = includesIgnoreCase(company, this.searchText);
        const matchesRepresentative = includesIgnoreCase(rep, this.searchText);

        return matchesCompany || matchesRepresentative;
      });
    },
    setSearchText (value) {
      this.searchText = value;
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
    });
  },
  created () {
    const firstContact = this.showedContacts[0];
    if (firstContact) {
      this.selectContact(firstContact)
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
    }
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
    width: 320px;
    height: 100vh;
    flex-shrink: 0;
    box-sizing: border-box;
    @media (--desktop-viewport) {
      width: 250px;
    }
    @media (max-width: 870px) {
      width: 180px;
    }
    @media (--tablet-viewport) {
      width: 100%;
      padding: 64px 0 0 0;
    }
  }
  .chat-navigation {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 15px 0;
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
    @media (--tablet-viewport) {
      padding-top: 0;
      overflow-y: scroll;
    }
  }
  .chat-navigation__header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    display: none;
    height: 64px;
    padding: 15px 70px;
    background: #fff;
    border-bottom: 1px solid #ECEFF1;
    box-sizing: border-box;
    @media (--tablet-viewport) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .chat-navigation__title {
    display: block;
    font-size: 20px;
    color: #90A4AE;
    text-align: center;
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
