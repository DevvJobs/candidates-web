<template>
  <router-link :to="{name: 'ProfileChat'}" class="dashboard-message">
    <svg class="dashboard-message__icon">
      <use xlink:href="#message"></use>
    </svg>
    <span class="dashboard-message__description">
      <span class="dashboard-message__count">{{ candidate.totalUnreadMessagesCount }} new</span>
      <span class="dashboard-message__text">{{'message' | pluralize(candidate.totalUnreadMessagesCount) || 'messages'}}</span>
    </span>
    <span class="dashboard-message__description">
      <span class="dashboard-message__count">{{candidate.totalContactRequestsCount}} new</span>
      <span class="dashboard-message__text">{{'request' | pluralize(candidate.totalContactRequestsCount) || 'requests'}}</span>
    </span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      candidate: 'profile/candidate',
      'unreadCounter': 'chat/unreadMessagesCount'
    })
  }
};
</script>

<style lang="postcss" scoped>
  .dashboard-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
  }
  .dashboard-message__icon {
    display: block;
    width: 48px;
    height: 40px;
    margin-bottom: 10px;
    fill: #4dd0e1;
  }
  .dashboard-message__description {
    display: block;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .dashboard-message__count {
    display: inline-block;
    font-size: 16px;
    line-height: 20px;
    color: #4dd0e1;
  }
  .dashboard-message__text {
    display: inline-block;
    font-size: 16px;
    line-height: 20px;
    color: #90A4AE;
  }
</style>
