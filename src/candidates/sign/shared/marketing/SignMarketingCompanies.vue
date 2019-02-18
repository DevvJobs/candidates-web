<template>
  <div class="sign-marketing-companies">
    <h3 class="sign-marketing-companies__title">SOME OF THE COMPANIES THAT MATCH THROUGH DEVV.JOBS</h3>
    <div class="sign-marketing-companies__content">
      <div class="sign-marketing-companies__list">
        <div class="sign-marketing-companies__item">
          <img src="/static/marketing/companies/sentiance.png" alt="sentiance" class="sign-marketing-companies__img">
        </div>
        <div class="sign-marketing-companies__item">
          <img src="/static/marketing/companies/drooms.png" alt="drooms" class="sign-marketing-companies__img">
        </div>
        <div class="sign-marketing-companies__item">
          <img src="/static/marketing/companies/securitas.png" alt="securitas" class="sign-marketing-companies__img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
  .sign-marketing-companies {
    padding-top: 207px;
    background: url("/static/marketing/background-right.png") no-repeat 50% 0;
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
      padding-top: 150px;
    }
  }
  .sign-marketing-companies__title {
    position: relative;
    display: block;
    max-width: 880px;
    margin: 0 auto 20px;
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
      margin-bottom: 50px;
      font-size: 38px;
      line-height: 44px;
    }
    @media (--tablet-viewport) {
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
      font-size: 22px;
      line-height: 30px;
      padding-right: 10px;
      padding-left: 10px;
    }
  }
  .sign-marketing-companies__content {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 0 50px 0 120px;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      padding: 0 20px;
    }
  }
  .sign-marketing-companies__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 -12px;
    @media (--desktopLarge-viewport) {
      flex-wrap: wrap;
      justify-content: center;
    }
    @media (--phoneLarge-viewport) {
      margin: 0;
    }
  }
  .sign-marketing-companies__item {
    display: block;
    width: 33.3333%;
    padding: 20px 60px 0;
    font-size: 0;
    text-align: center;
    box-sizing: border-box;
    @media (--desktop-viewport) {
      width: 50%;
    }
    @media (--phoneLarge-viewport) {
      width: 100%;
      padding-top: 40px;
      padding-right: 100px;
      padding-left: 100px;
      padding-bottom: 30px;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-top: 0;
      }
    }
  }
  .sign-marketing-companies__img {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }
</style>
