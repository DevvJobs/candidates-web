<template>
  <div class="chat-tabs">
    <button :class=allTabClass @click="changeActiveTab('all')">
      <span>All</span>
      <span>({{allCount}})</span>
    </button>
    <button :class=acceptedTabClass @click="changeActiveTab('accepted')">
      <span>Accepted</span>
      <span>({{acceptedCount}})</span>
    </button>
    <button :class=pendingTabClass @click="changeActiveTab('pending')">
      <span>Pending</span>
      <span>({{pendingCount}})</span>
    </button>
    <button :class=archivedTabClass @click="showArchived">
      <span>Archived</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    allCount: Number,
    acceptedCount: Number,
    pendingCount: Number
  },
  computed: {
    ...mapGetters({
      'activeTab': 'chat/activeTab'
    }),
    allTabClass () {
      return (this.activeTab === 'all') ? 'chat-tabs__btn chat-tabs__btn--active' : 'chat-tabs__btn';
    },
    acceptedTabClass () {
      return (this.activeTab === 'accepted') ? 'chat-tabs__btn chat-tabs__btn--active' : 'chat-tabs__btn';
    },
    pendingTabClass () {
      return (this.activeTab === 'pending') ? 'chat-tabs__btn chat-tabs__btn--active' : 'chat-tabs__btn';
    },
    archivedTabClass () {
      return (this.activeTab === 'archived') ? 'chat-tabs__btn chat-tabs__btn--active' : 'chat-tabs__btn';
    }
  },
  methods: {
    ...mapActions({
      fetchArchivedContacts: 'chat/fetchArchivedContacts',
      setActiveTab: 'chat/setActiveTab'
    }),
    changeActiveTab (tab) {
      this.setActiveTab(tab);
    },
    async showArchived () {
      try {
        await this.fetchArchivedContacts();
        await this.setActiveTab('archived');
      } catch (error) {};
    }
  }
};
</script>

<style lang="postcss" scoped>
  .chat-tabs {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #eceff1;
    }
    @media (--tablet-viewport) {
      justify-content: space-around;
      padding: 20px 20px 0;
    }
  }
  .chat-tabs__btn {
    position: relative;
    z-index: 1;
    display: block;
    padding: 10px 10px 15px;
    font-size: 12px;
    line-height: 14px;
    color: #90a4ae;
    border-bottom: 1px solid transparent;
    transition: color .3s ease, border-bottom-color .3s ease;
    cursor: pointer;
    &:hover {
      color: #4dd0e1;
      border-bottom-color: #4DD0E1;
    }
    @media (--tablet-viewport) {
      padding: 10px 20px 15px;
    }
  }
  .chat-tabs__btn--active {
    color: #4dd0e1;
    border-bottom-color: #4DD0E1;
    cursor: default;
  }
</style>
