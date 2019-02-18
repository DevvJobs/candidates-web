<template>
  <header>
    <div class="sign-header__item sign-header__item-logo">
      <router-link :to="{path: '/'}" class="sign-header__link">
        <img class="sign-header__logo" src="/static/logo.svg" alt="logo">
      </router-link>
      <a v-if="showLink" class="btn btn--grey btn--w80" :href="linkTo">HIRING?</a>
    </div>
    <div class="sign-header__item">
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showLink: false
  },
  computed: {
    linkTo () {
      return process.env.COMPANIES_LINK;
    }
  }
};
</script>

<style lang="postcss" scoped src="@/core/components/form/Button.css"></style>
<style lang="postcss" scoped>
.sign-header {
  position: absolute;
  z-index: 990;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  padding: 10px 30px 15px;
  background-color: #fff;
  box-sizing: border-box;
  text-align: center;
  @media (--tablet-viewport) {
    flex-wrap: wrap;
    height: 110px;
    padding: 10px 10px 15px;
  }
}
.sign-header__item {
  display: block;
  @media (--tablet-viewport) {
    width: 100%;
    text-align: center;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.sign-header__item-logo {
  display: flex;
  align-items: center;
  @media (--tablet-viewport) {
    justify-content: center;
    margin-bottom: 5px;
  }
  .btn {
    margin: 0 15px;
  }
}
.sign-header__link {
  display: block;
}
.sign-header--logo {
  position: relative;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 66px 10px 76px;
  box-sizing: border-box;
  .sign-header__logo {
    display: inline-block;
    width: 140px;
    height: 21px;
    vertical-align: middle;
  }
}
.sign-header__logo {
  display: inline-block;
  width: 90px;
  height: 13px;
}
</style>
