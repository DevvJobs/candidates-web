<template>
  <form v-on:submit.prevent="onSubmit" class="profile-nav__logout">
    <button class="profile-nav__logout-btn" type="submit">
      <svg class="profile-nav__logout-icon">
        <use xlink:href="#logout"></use>
      </svg>
      <span class="profile-nav__logout-text">Log out</span>
    </button>
  </form>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import intercomService from '@/core/services/intercom.service';

export default {
  destroyed () {
    intercomService.shutdown();
  },
  methods: {
    ...mapMutations({
      'resetChatState': 'chat/setDefaultState',
      'resetSignState': 'sign/setDefaultState',
      'resetTestsState': 'tests/setDefaultState',
      'resetProfileState': 'profile/setDefaultState',
      'updateShowMenu': 'updateShowMenu'
    }),
    ...mapActions({
      'logout': 'sign/logout'
    }),
    async onSubmit () {
      try {
        await this.logout();
      } catch (e) {};
      this.$router.push({ path: '/sign/in' });
      this.resetChatState();
      this.resetProfileState();
      this.resetSignState();
      this.resetTestsState();
      this.updateShowMenu(false);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .profile-nav__logout {
    display: block;
    padding-top: 10px;
    box-shadow: 0 -1px 0 0 #ECEFF1;
  }
  .profile-nav__logout-btn {
    position: relative;
    width: 100%;
    padding: 15px 6px 15px 45px;
    text-align: left;
    box-sizing: border-box;
    &:hover {
      .profile-nav__logout-icon {
        fill: #455A64;
      }
      .profile-nav__logout-text {
        color: #455A64;
      }
    }
  }
  .profile-nav__logout-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    width: 16px;
    height: 18px;
    fill: #90A4AE;
    transition: fill .3s ease;
  }
  .profile-nav__logout-text {
    display: block;
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
    transition: color .3s ease;
  }
</style>
