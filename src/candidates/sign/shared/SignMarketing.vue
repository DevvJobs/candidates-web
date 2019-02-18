<template>
  <div class="sign-marketing">
    <SignMarketingCompanies></SignMarketingCompanies>
    <SignMarketingMarket></SignMarketingMarket>
    <SignMarketingSupport></SignMarketingSupport>
    <SignMarketingExplore></SignMarketingExplore>
    <SignMarketingFooter></SignMarketingFooter>
  </div>
</template>

<script>
import SignMarketingCompanies from '@/candidates/sign/shared/marketing/SignMarketingCompanies';
import SignMarketingMarket from '@/candidates/sign/shared/marketing/SignMarketingMarket';
import SignMarketingSupport from '@/candidates/sign/shared/marketing/SignMarketingSupport';
import SignMarketingExplore from '@/candidates/sign/shared/marketing/SignMarketingExplore';
import SignMarketingFooter from '@/candidates/sign/shared/marketing/SignMarketingFooter';

export default {
  components: {
    SignMarketingCompanies,
    SignMarketingMarket,
    SignMarketingSupport,
    SignMarketingExplore,
    SignMarketingFooter
  }
};
</script>

<style lang="postcss" scoped>
  .sign-marketing {
    margin-top: -100px;
  }
</style>
