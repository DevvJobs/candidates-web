<template>
  <div class="sign-marketing-footer__bottom">
    <SocialLinks class="sign-marketing-footer__social"></SocialLinks>
    <div class="sign-marketing-footer__copyright">
      <p class="sign-marketing-footer__text">Devv.jobs AB</p>
      <p class="sign-marketing-footer__text">(556976-5372)</p>
      <p class="sign-marketing-footer__text">Devv.jobs UAB</p>
      <p class="sign-marketing-footer__text">COPYRIGHT 2018</p>
    </div>
  </div>
</template>

<script>
import SocialLinks from '@/core/components/SocialLinks';
export default {
  components: {
    SocialLinks
  }
};
</script>

<style lang="postcss" scoped>
  .sign-marketing-footer__bottom {
    padding-top: 268px;
    padding-bottom: 40px;
    background: url("/static/marketing/background-bottom.png") no-repeat 50% 100%;
    background-size: 100% 100%;
    @media (--desktopLarge-viewport) {
      padding-top: 300px;
    }
    @media (--desktop-viewport) {
      padding-top: 250px;
    }
    @media (--tablet-viewport) {
      padding-top: 200px;
    }
    @media (--phoneLarge-viewport) {
      padding-top: 180px;
      background-size: cover;
    }
  }
  .sign-marketing-footer__social {
    margin-bottom: 114px;
    @media (--tablet-viewport) {
      margin-bottom: 40px;
    }
  }
  .sign-marketing-footer__copyright {}
  .sign-marketing-footer__text {
    display: block;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    text-align: center;
    color: #90A4AE;
  }
</style>
