<template>
  <div class="tests">
    <ul class="tests__list" v-if="finishedTestsCount">
      <DashboardTestsItem v-for="(test, index) in finishedTestsWithResults" v-bind:key="index" :test="test"></DashboardTestsItem>
    </ul>
    <div class="tests-message" v-if="!finishedTestsCount">
      <div class="tests-message__text">You haven’t done any tests yet.</div>
      <router-link :to="{name: 'AllTests'}" class="tests-message__link">Take tests</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import DashboardTestsItem from '@/candidates/profile/dashboard/shared/DashboardTestsItem';
export default {
  components: {
    DashboardTestsItem
  },
  computed: {
    ...mapGetters({
      'finishedTests': 'tests/finishedTests'
    }),
    finishedTestsWithResults () {
      return _.filter(this.finishedTests, (o) => o.result !== null);
    },
    finishedTestsCount () {
      return this.finishedTestsWithResults.length !== 0;
    }
  },
  methods: {
    ...mapActions({
      'fetchTests': 'tests/fetchTests'
    })
  },
  created () {
    this.fetchTests()
      .then(() => { /* success */ })
      .catch(() => { /* error */ });
  }
};
</script>

<style lang="postcss" scoped>
  .tests {
  }
  .tests__list {
    max-height: 348px;
    overflow-y: auto;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      width: 9px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 9px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 9px;
      background-color: #ECEFF1;
    }
  }
  .tests-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    height: 0;
    min-height: 140px;
  }

  .tests-message__text {
    margin-bottom: 35px;
    font-size: 16px;
    line-height: 20px;
    color: #90A4AE;
  }

  .tests-message__link {
    position: relative;
    z-index: 1;
    display: block;
    width: 100px;
    height: 40px;
    padding: 10px 15px 9px;
    font-size: 12px;
    line-height: 20px;
    font-family: var(--ff-font);
    color: #4DD0E1;
    text-align: center;
    background-color: transparent;
    border: 0;
    border-radius: 20px;
    outline: 0;
    cursor: pointer;
    box-sizing: border-box;
    transition: color .3s ease;
    &::after {
      content: '';
      position: absolute;
      z-index: -2;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
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
