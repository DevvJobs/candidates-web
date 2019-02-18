<template>
  <div
    :class="{'chat-navigation-item--unread': !unreadMessages}"
    exact=""
  >
    <div class="select-checkbox-chat-wrapper" v-if="showSelect">
      <SelectCheckbox value="">
      <input
         class="input-checkbox__input"
         type="checkbox"
         v-on:change="setSelectedThread()"
         v-bind:checked="isSelected">
      </SelectCheckbox>
    </div>
    <li class="chat-navigation__item" @click="onContactClick(contact)">
      <router-link
        :to="routerLink"
        active-class="chat-navigation-item--active"
        class="chat-navigation-item"
        :class="{'chat-navigation-item--unread': !unreadMessages}" exact="">

        <div class="chat-navigation-item__box chat-navigation-item__box--left">
          <Avatar
            :name="contact.latestRepresentative">
          </Avatar>
        </div>

        <div class="chat-navigation-item__box chat-navigation-item__box--center">
          <span class="chat-navigation-item__sent-by">
            {{contact.latestRepresentative}}
          </span>
          <span class="chat-navigation-item__sent-company">
            {{contact.company.name}}
          </span>
          <span class="chat-navigation-item__message">
            {{contact.lastMessage.text}}
          </span>
        </div>

        <div class="chat-navigation-item__box chat-navigation-item__box--right">
          <span class="chat-navigation-item__time">
            {{date(contact.lastMessage.date)}}
          </span>
          <button class="chat-navigation-item__count" v-if="!unreadMessages">
            {{contact.unreadMessagesCount}}
          </button>
        </div>
      </router-link>
    </li>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';

import Avatar from '@/core/components/Avatar';
import SelectCheckbox from '@/core/components/form/SelectCheckbox';

export default {
  name: 'ChatDialogListItem',
  props: {
    contact: null,
    windowWidth: null
  },
  components: {
    Avatar,
    SelectCheckbox
  },
  methods: {
    ...mapActions({
      selectContact: 'chat/selectContact'
    }),
    ...mapMutations({
      addSelectedThread: 'chat/addSelectedThread',
      deleteSelectedThread: 'chat/deleteSelectedThread',
      setShowThreads: 'chat/setShowThreads'
    }),
    onContactClick (contact) {
      this.processing = true;
      this.selectContact(contact)
        .then(() => {
          this.processing = false;
        })
        .catch(() => { /* error */ });
      if (this.windowWidth <= 768) {
        this.setShowThreads(!this.showThreads);
      }
    },
    setSelectedThread () {
      if (!this.isSelected) {
        this.addSelectedThread({ contactId: this.contact.id });
      } else {
        this.deleteSelectedThread({ contactId: this.contact.id });
      };
    },
    date (value) {
      if (value) {
        return moment(String(value)).calendar();
      }
    }
  },
  computed: {
    ...mapGetters({
      'contacts': 'chat/contacts',
      'selectedThreads': 'chat/selectedThreads',
      'showThreads': 'chat/showThreads',
      'activeTab': 'chat/activeTab'
    }),
    isSelected () {
      return this.selectedThreads.includes(this.contact.id);
    },
    showSelect () {
      return (this.activeTab !== 'archived');
    },
    unreadMessages () {
      return this.contact.unreadMessagesCount === 0;
    },
    routerLink () {
      return {name: 'ProfileMobileChatMessages', params: {id: this.contact.id}};
    }
  }
};
</script>

<style lang="postcss" scoped>
  .chat-navigation__item {
    display: block;
    width: 100%;
    text-align: left;
  }
  .chat-navigation-item {
    display: flex;
    position: relative;
    padding: 10px 0 10px 0;
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

  .chat-navigation-item--active {
    &::after {
      top: 5px;
      right: 0;
      bottom: 5px;
      width: 3px;
      background-color: #4DD0E1;
      border-radius: 15px;
      @media (--tablet-viewport) {
        display: none;
      }
    }
  }

  .chat-navigation-item--unread {
    .chat-navigation-item__sent-by,
    .chat-navigation-item__sent-company {
      color: #4DD0E1;
    }
  }
  .chat-navigation-item__box--left {
    margin: 10px 10px 0 20px;
  }
  .chat-navigation-item__box--center {
    flex-shrink: 0;
    max-width: 180px;
    margin-top: 10px;
    white-space: nowrap;
    @media (max-width: 870px) {
      max-width: 100px;
    }
    @media (--tablet-viewport) {
      max-width: 180px;
    }
  }
  .chat-navigation-item__box--right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 8px;
  }

  .chat-navigation-item__sent-by {
    display: block;
    font-size: 18px;
    font-weight: 300;
    text-overflow: ellipsis;
    color: #455A64;
    overflow: hidden;
  }

  .chat-navigation-item__sent-company {
    display: block;
    font-size: 14px;
    font-weight: 400;
    text-overflow: ellipsis;
    color: #90A4AE;
    overflow: hidden;
  }
  .chat-navigation-item__message {
    display: block;
    font-size: 14px;
    text-overflow: ellipsis;
    color: #CFD8DC;
    overflow: hidden;
  }
  .chat-navigation-item__time {
    position: absolute;
    top: 7px;
    right: 10px;
    font-size: 12px;
    color: #90A4AE;
    white-space: nowrap;
  }
  .chat-navigation-item__count {
    margin-top: 23px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 24px;
    font-size: 14px;
    border-radius: 12px;
    color: #fff;
    background-color: #4DD0E1;
    cursor: pointer;
  }
  .select-checkbox-chat-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
