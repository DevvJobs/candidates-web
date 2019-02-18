<template>
  <header class="legislation-header">
    <router-link :to="{path: '/'}" class="legislation-header__item">
      <img class="legislation-header__logo" src="/static/logo.svg" alt="logo">
    </router-link>
  </header>
</template>

<script>
export default {
};
</script>

<style lang="postcss" scoped>
  .legislation-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin: 0 auto;
    padding: 10px 30px 10px;
    text-align: center;
    box-shadow: 0 2px 0 0 #ECEFF1;
    background-color: #fff;
    box-sizing: border-box;
    @media (--phoneLarge-viewport) {
      justify-content: center;
    }
  }
  .legislation-header__logo {
    display: inline-block;
    width: 90px;
    height: 13px;
  }
  .legislation-header__item {
    display: block;
  }
</style>
