<template>
  <div class="tests-message" >
    <div class="tests-message__description">
      <p class="tests-message__text">Your list of knowledge tests is currently empty.</p>
      <p class="tests-message__text">Take some tests to demonstrate your skills!</p>
    </div>
    <router-link :to="{name: 'AllTests'}" class="tests-message__btn btn btn--transparent btn--h40">Let's do it!</router-link>
  </div>
</template>

<script>
import Tabs from '@/candidates/profile/tests/candidate/shared/TestsTabs';
import { mapGetters } from 'vuex';
export default {
  components: {
    Tabs
  },
  computed: {
    ...mapGetters({
      'tests': 'tests/tests'
    })
  }
};
</script>

<style lang="postcss" scoped>
  .tests-message {
    margin: 0 auto;
    text-align: center;
  }
  .tests-message__description {
    margin-bottom: 40px;
  }
  .tests-message__text{
    font-size: 18px;
    line-height: 28px;
    color: #CFD8DC;
  }
  .tests-message__btn {
    position: relative;
    z-index: 1;
    display: inline-block;
    width: 120px;
    height: 40px;
    padding: 10px 15px 9px;
    font-size: 16px;
    color: #4DD0E1;
    font-family: var(--ff-font);
    border-radius: 20px;
    background-color: transparent;
    outline: 0;
    border: 0;
    cursor: pointer;
    box-sizing: border-box;
    transition: color .3s ease;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -2;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
    }
    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background-color: #fff;
      border-radius: 20px;
      opacity: 1;
      transition: opacity .3s ease;
    }
    &:hover,
    &:focus {
      color: #fff;
      &::after {
        opacity: 1;
      }
      &::before {
        opacity: 0;
      }
    }
  }
</style>
