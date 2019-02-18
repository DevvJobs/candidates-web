<template>
  <div class="nav-user">
    <div class="nav-user__avatar">
      <Avatar :type="'large'" :name="candidate.name"></Avatar>
    </div>
    <div class="nav-user__info">
      <p class="nav-user__name">{{candidate.name}}</p>
      <p class="nav-user__country">{{candidate.country.name}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from '@/core/components/Avatar';

export default {
  components: {
    Avatar
  },
  computed: {
    ...mapGetters({
      candidate: 'profile/candidate'
    })
  }
};
</script>

<style lang="postcss" scoped>
  .nav-user {
    position: relative;
    display: flex;
    align-items: center;
    height: 0;
    min-height: 64px;
    margin-bottom: 40px;
    padding-left: 72px;
  }
  .nav-user__avatar {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 64px;
    height: 64px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: #ECEFF1;
    overflow: hidden;
  }
  .nav-user__info {
    word-break: break-word;
  }
  .nav-user__name {
    font-size: 16px;
    line-height: 20px;
    color: #455A64;
  }
  .nav-user__country {
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
  }
</style>
