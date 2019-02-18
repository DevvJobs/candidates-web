<template>
  <div class="sign-marketing-explore">
    <div class="sign-marketing-explore__content">
      <h3 class="sign-marketing-explore__title">Don’t wait, make yourself available for matching and explore new and interesting opportunities</h3>
      <a href="#signUp" class="sign-marketing-explore__btn">Create free profile!</a>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="postcss" scoped>
  .sign-marketing-explore {
    margin-bottom: 0px;
    padding-top: 307px;
    background: url("/static/marketing/background-gradient.png") no-repeat 50% 0;
    background-size: contain;
    @media (--desktopLarge-viewport) {
      padding-top: 300px;
      margin-bottom: 0px;
    }
    @media (--desktop-viewport) {
      padding-top: 300px;
    }
    @media (--tablet-viewport) {
      padding-top: 270px;
      margin-bottom: 0;
    }
    @media (--phoneLarge-viewport) {
      margin-bottom: 0;
      padding-top: 200px;
    }
    @media (--phone-viewport) {
      padding-top: 120px;
    }
  }
  .sign-marketing-explore__content {
    max-width: 1580px;
    margin: 0 auto;
    padding: 0 20px 0 140px;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      padding: 0 100px 0 100px;
    }
    @media (--desktop-viewport) {
      padding: 0 20px;
    }
    @media (--tablet-viewport) {
      padding: 0 100px 0 100px;
    }
    @media (--phoneLarge-viewport) {
      padding: 0 20px;
    }
  }
  .sign-marketing-explore__title {
    display: block;
    max-width: 924px;
    margin-bottom: 49px;
    padding-top: 146px;
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;
    color: #455A64;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      padding-top: 0;
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
      margin-bottom: 30px;
      padding-bottom: 20px;
      font-size: 32px;
      line-height: 40px;
    }
    @media (--phoneLarge-viewport) {
      margin-bottom: 30px;
      padding-bottom: 15px;
      font-size: 30px;
      line-height: 36px;
      text-align: center;
    }
    @media (--phone-viewport) {
      font-size: 22px;
      line-height: 32px;
    }
  }
  .sign-marketing-explore__btn {
    position: relative;
    z-index: 1;
    display: block;
    width: 200px;
    height: 50px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 16px;
    font-family: var(--ff-font);
    color: #fff;
    text-align: center;
    border-radius: 50px;
    border: 0;
    background-color: #009EB7;
    cursor: pointer;
    outline: 0;
    text-transform: uppercase;
    box-sizing: border-box;
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
    }
    &:hover,
    &:focus {
      &::after {
        opacity: 0;
      }
    }
    @media (--phoneLarge-viewport) {
      margin: 0 auto;
    }
  }
</style>
