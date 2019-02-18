<template>
  <div>
    <div class="tests-tabs">
      <div class="tests-tabs__box tests-tabs__box--tabs">
        <div class="tests-tabs__list">
          <button
            class="tests-tabs__btn"
            v-for="(tab, index) in tabs"
            v-bind:key="index"
            v-bind:class="{ 'tests-tabs__btn--active': currentTestsTab === tab.component }"
            v-on:click="chooseTab(tab.component)">
            <span>{{tab.name}} ({{tab.count}})</span>
          </button>
        </div>
      </div>
      <div class="tests-tabs__box tests-tabs__box--search">
        <TestsSearch class="tests-tabs__search" :value="searchText" @changeInput="setSearchText"></TestsSearch>
      </div>
    </div>
    <TestsTab :tests="sortList(chooseTabContent)"></TestsTab>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import TestsTab from '@/candidates/profile/tests/candidate/shared/TestsTab';
import TestsSearch from '@/candidates/profile/tests/candidate/shared/TestsSearch';
import {
  FINISHED,
  IN_PROGRESS,
  NOT_STARTED
} from '@/candidates/profile/tests/store/tests-status-types';

export default {
  components: {
    TestsTab,
    TestsSearch
  },
  data () {
    return {
      searchText: null
    };
  },
  computed: {
    ...mapGetters({
      'finishedTests': 'tests/finishedTests',
      'inProgressTests': 'tests/inProgressTests',
      'notStartedTests': 'tests/notStartedTests',
      'currentTestsTab': 'tests/currentTestsTab'
    }),
    tabs () {
      return [{
        component: NOT_STARTED,
        count: this.notStartedTests.length,
        name: 'Not started'
      }, {
        component: IN_PROGRESS,
        count: this.inProgressTests.length,
        name: 'In Progress'
      }, {
        component: FINISHED,
        count: this.finishedTests.length,
        name: 'Finished'
      }];
    },
    chooseTabContent () {
      switch (this.currentTestsTab) {
        case NOT_STARTED:
          return this.notStartedTests;
        case IN_PROGRESS:
          return this.inProgressTests;
        case FINISHED:
          return this.finishedTests;
      }
    }
  },
  methods: {
    ...mapMutations({
      'setCurrentTestTab': 'tests/setCurrentTestTab'
    }),
    chooseTab (tab) {
      this.setSearchText('');
      this.setCurrentTestTab(tab);
    },
    sortList (list) {
      if (this.searchText) {
        return list.filter((item) => {
          return item.name.toLowerCase().match(this.searchText.toLowerCase());
        });
      } else {
        return list;
      }
    },
    setSearchText (value) {
      this.searchText = value;
    }
  }
};
</script>

<style lang="postcss" scoped>

  .tests-tabs {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    padding-bottom: 12px;
    border-bottom: 2px solid #ECEFF1;
    @media (--desktopLarge-viewport) {
      margin-bottom: 80px;
    }
    @media (--desktop-viewport) {
      flex-wrap: wrap;
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
  .tests-tabs__box {
    box-sizing: border-box;
  }
  .tests-tabs__box--tabs {
    width: calc(100% - 350px);
    @media (--desktopLarge-viewport) {
      width: calc(100% - 270px);
    }
    @media (--desktop-viewport) {
      width: 100%;
      padding-bottom: 15px;
      margin-bottom: 50px;
      border-bottom: 2px solid #ECEFF1;
    }
  }
  .tests-tabs__box--search {
    width: 350px;
    text-align: right;
    @media (--desktopLarge-viewport) {
      width: 270px;
    }
    @media (--desktop-viewport) {
      width: 100%;
    }
  }
  .tests-tabs__search {
    @media (--desktop-viewport) {
      margin-bottom: 30px;
    }
  }
  .tests-tabs__list {
    display: flex;
    justify-content: space-between;
    @media (--phone-viewport) {
      flex-wrap: wrap;
    }
  }
  .tests-tabs__btn {
    position: relative;
    z-index: 1;
    display: block;
    padding: 0 10px;
    font-size: 12px;
    line-height: 24px;
    color: #90A4AE;
    box-shadow: inset 0 0 0 1px rgba(207, 216, 220, 0);
    border-radius: 20px;
    text-transform: uppercase;
    transition: color .3s ease, box-shadow .3s ease;
    cursor: pointer;
    box-sizing: border-box;
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 20px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 0;
      transition: opacity .3s ease
    }
    &:disabled {
      opacity: .3;
      &:hover {
        color: #90A4AE;
        &::after {
          display: none;
        }
      }
    }
    &:hover {
      color: #fff;
      box-shadow: inset 0 0 0 1px rgba(207, 216, 220, 0);
      &::after {
        opacity: 1;
      }
    }
    @media (--desktopLarge-viewport) {
      font-size: 14px;
      line-height: 32px;
    }
    @media (--phone-viewport) {
      width: calc(50% - 5px);
      margin-bottom: 10px;
      box-shadow: inset 0 0 0 1px rgba(207, 216, 220, 1);
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .tests-tabs__btn--active {
    color: #fff;
    cursor: default;
    &::after {
      opacity: 1;
    }
    @media (--phone-viewport) {
      box-shadow: inset 0 0 0 1px rgba(144, 164, 174, 0);
    }
  }
</style>
