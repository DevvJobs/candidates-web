<template>
  <div>
    <div class="tests-tab" v-if="!isShowMessage">
      <div class="tests-tab__item" v-for="(test, index) in tests" v-bind:key="index">
        <TabsPreview :test="test"></TabsPreview>
      </div>
    </div>
    <div v-if="isShowMessage">
      <TestsMessage></TestsMessage>
    </div>
  </div>
</template>

<script>
import TabsPreview from '@/candidates/profile/tests/candidate/shared/TestsPreview';
import TestsMessage from '@/candidates/profile/tests/candidate/shared/TestsMessage';
export default {
  components: {
    TabsPreview,
    TestsMessage
  },
  props: {
    tests: null
  },
  computed: {
    isShowMessage () {
      return this.tests.length === 0;
    }
  }
};
</script>

<style lang="postcss" scoped>
  .tests-tab {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    @media (--desktopLarge-viewport) {
      margin: 0 -15px;
    }
    @media (--desktop-viewport) {
      margin: 0 -12px;
    }
    @media (--phone-viewport) {
      justify-content: center;
    }
  }
  .tests-tab__item {
    width: 25%;
    max-width: 250px;
    padding: 0 20px 40px;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      width: 33.3333%;
      max-width: 100%;
      padding: 0 15px 30px;
    }
    @media (--desktop-viewport) {
      padding: 0 12px 24px;
    }
    @media (--desktopSmall-viewport) {
      width: 50%;
    }
    @media (--phone-viewport) {
      width: 100%;
      max-width: 350px;
    }
  }
</style>
