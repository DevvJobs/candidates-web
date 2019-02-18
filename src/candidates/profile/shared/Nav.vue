<template>
  <div class="nav">
    <div class="nav__box">
      <router-link :to="'/profile'" class="nav__link">
        <img class="nav__logo" src="/static/logo.svg" alt="logo">
      </router-link>
      <NavUser></NavUser>
      <NavLinks></NavLinks>
    </div>
    <div class="nav__box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import NavLinks from '@/candidates/profile/shared/NavLinks.vue';
import NavUser from '@/candidates/profile/shared/NavUser.vue';

export default {
  components: {
    NavLinks,
    NavUser
  }
};
</script>

<style lang="postcss" scoped>
  .nav {
    position: fixed;
    z-index: 991;
    top: 0;
    left: 0;
    display: flex;
    padding: 25px 9px;
    width: 252px;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 20px rgba(207, 216, 220, .8);
    box-sizing: border-box;
    @media (--tablet-viewport) {
      display: none;
    }
  }
  .nav__box {
  }
  .nav__link {
    display: block;
    text-align: center;
    margin-bottom: 70px;
  }
  .nav__logo {
    display: inline-block;
    width: 90px;
    height: 13px;
  }
</style>
