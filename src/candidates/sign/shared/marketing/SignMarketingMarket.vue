<template>
  <div class="sign-marketing-market">
    <h3 class="sign-marketing-market__title">SIT BACK, RELAX AND LET US EXPLORE YOUR MARKET</h3>
    <div class="sign-marketing-market__content">
      <div class="sign-marketing-market__description">
        <p class="sign-marketing-market__text">We know how intense finding a good job or project can be.</p>
        <p class="sign-marketing-market__text">Our mission is to do the exploring for you. All you need to do is to sign up, take a test, then sit back and be notified once we matched you with a company that has a relevant tech stack to your skills.</p>
        <p class="sign-marketing-market__text">Eliminating the stress for you and of course, you decide which company you want to talk to.</p>
      </div>
      <img src="/static/marketing/technologies-search.png" alt="technologies search" class="sign-marketing-market__img">
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
  .sign-marketing-market {
    padding-top: 207px;
    background: url("/static/marketing/background-left.png") no-repeat 50% 0;
    background-size: contain;
    @media (--desktopLarge-viewport) {
      padding-top: 330px;
    }
    @media (--desktop-viewport) {
      padding-top: 300px;
    }
    @media (--desktopSmall-viewport) {
      padding-top: 280px;
    }
    @media (--tablet-viewport) {
      padding-top: 250px;
    }
    @media (--phoneLarge-viewport) {
      padding-top: 200px;
    }
    @media (--phone-viewport) {
      padding-top: 140px;
    }
  }
  .sign-marketing-market__title {
    position: relative;
    display: block;
    margin: 0 auto 50px;
    padding: 0 20px 27px;
    font-size: 36px;
    line-height: 42px;
    color: #455A64;
    text-align: center;
    text-transform: uppercase;
    max-width: 880px;
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
      padding-bottom: 20px;
      margin-bottom: 50px;
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
      padding-right: 10px;
      padding-left: 10px;
    }
  }
  .sign-marketing-market__content {
    display: flex;
    justify-content: center;
    max-width: 1460px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .sign-marketing-market__img {
    display: block;
    width: 300px;
    height: 300px;
    @media (--desktopLarge-viewport) {
      width: 240px;
      height: 240px;
    }
    @media (--desktop-viewport) {
      width: 280px;
      height: 280px;
    }
    @media (--desktopSmall-viewport) {
      width: 250px;
      height: 250px;
    }
    @media (--tablet-viewport) {
      width: 200px;
      height: 200px;
    }
    @media (--phoneLarge-viewport) {
      display: none;
    }
  }
  .sign-marketing-market__description {
    display: block;
    max-width: 600px;
    padding: 30px 20px 0 0;
    box-sizing: border-box;
    @media (--tablet-viewport) {
      padding: 30px 20px 0 20px;
    }
    @media (--phoneLarge-viewport) {
      padding: 0px 0px 0 0;
    }
  }
  .sign-marketing-market__text {
    display: block;
    margin-bottom: 34px;
    font-size: 18px;
    line-height: 24px;
    color: #90A4AE;
    @media (--desktopLarge-viewport) {
      margin-bottom: 20px;
      font-size: 20px;
      line-height: 28px;
    }
    @media (--desktop-viewport) {
      margin-bottom: 15px;
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
