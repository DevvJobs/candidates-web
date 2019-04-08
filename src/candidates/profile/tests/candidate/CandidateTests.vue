<template>
  <div class="tests">
    <TestHeader></TestHeader>
    <TestTabs></TestTabs>
  </div>
</template>

<script>
import TestHeader from '@/candidates/profile/tests/candidate/shared/TestsHeader';
import TestTabs from '@/candidates/profile/tests/candidate/shared/TestsTabs';
import { mapActions } from 'vuex';
export default {
  components: {
    TestHeader,
    TestTabs
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
    padding: 40px 70px;
    @media (--desktopLarge-viewport) {
      padding: 40px 30px;
    }
    @media (--phoneLarge-viewport) {
      padding: 30px 20px;
    }
  }
</style>
