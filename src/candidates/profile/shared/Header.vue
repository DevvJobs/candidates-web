<template>
  <div class="header">
    <div class="header__box header__box--text">
      <div class="header__greeting">
        <span class="header__text" v-if="candidate">Good to see you again, <span>{{candidate.name}}</span>!</span>
      </div>
    </div>
    <div class="header__box">
      <div class="header__menu">
        <svg class="header-menu__icon">
          <use xlink:href="#menu"></use>
        </svg>
        <div class="header-menu__box">
          <div class="header-menu__list">
            <router-link :to="'/privacy-policy'" class="header-menu__link" target="_blank">Privacy Policy</router-link>
            <router-link :to="'/terms-of-service'" class="header-menu__link" target="_blank">Terms of Service</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      candidate: 'profile/candidate'
    })
  }
};
</script>

<style lang="postcss" scoped>
  .header {
    position: relative;
    z-index: 990;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 15px 25px;
    border-bottom: 1px solid #ECEFF1;
    background-color: #fff;
    box-sizing: border-box;
    @media (--tablet-viewport) {
      position: fixed;
      width: 100%;
      padding-left: 70px;
    }
  }
  .header__box--text {
    max-width: 100%;
    padding-right: 44px;
    @media (--tablet-viewport) {
      width: 100%;
      padding-right: 0;
      text-align: right;
    }
  }
  .header__greeting {
    max-width: 100%;
  }
  .header__text {
    font-size: 14px;
    line-height: 18px;
    color: #90A4AE;
    span {
      color: #455A64;
    }
  }
  .header__menu {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    user-select: none;
    &:hover {
      .header-menu__box {
        display: block;
      }
    }
    @media (--tablet-viewport) {
      display: none;
    }
  }
  .header-menu__icon {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 23px;
    height: 5px;
    fill: #cfd8dc;
  }
  .header-menu__box {
    position: absolute;
    top: 35px;
    right: 0;
    display: none;
    width: 135px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 0 15px 2px rgba(207, 216, 220, .6);
  }
  .header-menu__list {
    padding: 15px 0;
  }
  .header-menu__link {
    display: block;
    padding: 15px 18px;
    font-size: 12px;
    line-height: 14px;
    color: #90A4AE;
    white-space: nowrap;
    transition: color .3s ease;
    &:hover {
      color: #455A64;
    }
  }
  .header-menu__link--active {
    color: #455A64;
  }
</style>
