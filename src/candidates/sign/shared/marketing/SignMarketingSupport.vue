<template>
  <div class="sign-marketing-support">
    <h3 class="sign-marketing-support__title">WE ARE THERE FOR YOU</h3>
    <div class="sign-marketing-support__content">
      <svg class="sign-marketing-support__icon">
        <use xlink:href="#intercom"></use>
      </svg>
      <p class="sign-marketing-support__text">
        The devv.jobs-team is always around, we support you to get started, get you matched and with career insights.
        And we are only a message away.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
  .sign-marketing-support {
    padding-top: 207px;
    background: url("/static/marketing/background-right.png") no-repeat 50% 0;
    background-size: contain;
    @media (--desktopLarge-viewport) {
      padding-top: 350px;
    }
    @media (--desktop-viewport) {
      padding-top: 300px;
    }
    @media (--desktopSmall-viewport) {
      padding-top: 250px;
    }
    @media (--tablet-viewport) {
      padding-top: 200px;
    }
    @media (--phoneLarge-viewport) {
      padding-top: 170px;
    }
    @media (--phone-viewport) {
      padding-top: 140px;
    }
  }
  .sign-marketing-support__title {
    position: relative;
    display: block;
    margin-bottom: 50px;
    padding: 0 20px 27px;
    font-size: 36px;
    line-height: 42px;
    color: #455A64;
    text-align: center;
    text-transform: uppercase;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 140px;
      height: 4px;
      border-radius: 4px;
      background-color: #4DD0E1;
      @media (--phone-viewport) {
        width: 70px;
        height: 2px;
      }
    }
    @media (--desktopLarge-viewport) {
      font-size: 36px;
      line-height: 42px;
    }
    @media (--desktop-viewport) {
      font-size: 42px;
      line-height: 58px;
    }
    @media (--desktopSmall-viewport) {
      margin-bottom: 70px;
      font-size: 38px;
      line-height: 44px;
    }
    @media (--tablet-viewport) {
      margin-bottom: 50px;
      padding-bottom: 20px;
      font-size: 32px;
      line-height: 40px;
    }
    @media (--phoneLarge-viewport) {
      margin-bottom: 50px;
      padding-bottom: 15px;
      font-size: 30px;
      line-height: 36px;
    }
    @media (--phone-viewport) {
      margin-bottom: 30px;
      font-size: 22px;
      line-height: 30px;
    }
  }
  .sign-marketing-support__content {
    position: relative;
    max-width: 685px;
    min-height: 160px;
    margin: 0 auto 35px;
    padding: 0 20px 0 236px;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      padding-left: 216px;
    }
    @media (--desktop-viewport) {
      padding-left: 196px;
    }
    @media (--tablet-viewport) {
      min-height: auto;
      padding-left: 166px;
      max-width: 620px;
    }
    @media (--phoneLarge-viewport) {
      padding-left: 136px;
    }
    @media (--phone-viewport) {
      margin-bottom: 50px;
      padding-left: 20px;
    }
  }
  .sign-marketing-support__icon {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    width: 160px;
    height: 160px;
    @media (--desktop-viewport) {
      width: 140px;
      height: 140px;
    }
    @media (--tablet-viewport) {
      width: 120px;
      height: 120px;
    }
    @media (--phoneLarge-viewport) {
      width: 90px;
      height: 90px;
    }
    @media (--phone-viewport) {
      display: none;
    }
  }
  .sign-marketing-support__text {
    font-size: 18px;
    line-height: 30px;
    color: #90A4AE;
    @media (--desktopLarge-viewport) {
      font-size: 20px;
      line-height: 28px;
    }
    @media (--desktop-viewport) {
      font-size: 24px;
      line-height: 30px;
    }
    @media (--tablet-viewport) {
      font-size: 20px;
      line-height: 30px;
    }
    @media (--phoneLarge-viewport) {
      font-size: 20px;
      line-height: 26px;
    }
    @media (--phone-viewport) {
      font-size: 18px;
      line-height: 28px;
    }
  }
</style>
