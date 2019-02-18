<template>
  <div class="sign-steps">
    <div class="sign-steps__content">
      <div class="sign-steps__title">How it works</div>
      <div class="sign-steps__list">
        <div class="sign-steps__item">
          <svg class="sign-steps__arrow">
            <use xlink:href="#arrow-long"></use>
          </svg>
          <div class="sign-steps__data">
            <div class="sign-steps__number">Step 1</div>
            <svg class="sign-steps__icon sign-steps__icon--survey">
              <use xlink:href="#survey"></use>
            </svg>
            <div class="sign-steps__caption">Sign up</div>
            <div class="sign-steps__text">Create an anonymous free profile and setup with relevant skills.</div>
          </div>
        </div>
        <div class="sign-steps__item">
          <svg class="sign-steps__arrow">
            <use xlink:href="#arrow-long"></use>
          </svg>
          <div class="sign-steps__data">
            <div class="sign-steps__number">Step 2</div>
            <svg class="sign-steps__icon sign-steps__icon--code">
              <use xlink:href="#code"></use>
            </svg>
            <div class="sign-steps__caption">TAKE TESTS</div>
            <div class="sign-steps__text">Test your technical skills and improve your profile visibility.</div>
          </div>
        </div>
        <div class="sign-steps__item">
          <svg class="sign-steps__arrow">
            <use xlink:href="#arrow-long"></use>
          </svg>
          <div class="sign-steps__data">
            <div class="sign-steps__number">Step 3</div>
            <svg class="sign-steps__icon sign-steps__icon--find">
              <use xlink:href="#find"></use>
            </svg>
            <div class="sign-steps__caption">LET EMPLOYERS FIND YOU</div>
            <div class="sign-steps__text">Accept contact requests from potential employers</div>
          </div>
        </div>
        <div class="sign-steps__item">
          <div class="sign-steps__data">
            <div class="sign-steps__number">Step 4</div>
            <svg class="sign-steps__icon sign-steps__icon--connect">
              <use xlink:href="#connect"></use>
            </svg>
            <div class="sign-steps__caption">CONNECT</div>
            <div class="sign-steps__text">Chat with employers to land the job of your dreams!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="postcss" scoped>
  .sign-steps {
    padding: 87px 30px 30px;
    background-color: #fff;
    @media (--phone-viewport) {
      padding: 50px 30px 10px;
    }
  }
  .sign-steps__content {
    width: 100%;
    max-width: 1092px;
    margin: 0 auto;
  }
  .sign-steps__title {
    position: relative;
    display: block;
    margin-bottom: 69px;
    padding-bottom: 27px;
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
      font-size: 38px;
      line-height: 44px;
    }
    @media (--tablet-viewport) {
      padding-bottom: 20px;
      font-size: 32px;
      line-height: 40px;
    }
    @media (--phoneLarge-viewport) {
      padding-bottom: 15px;
      font-size: 30px;
      line-height: 36px;
    }
    @media (--phone-viewport) {
      margin-bottom: 50px;
      font-size: 22px;
      line-height: 30px;
    }
  }
  .sign-steps__list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
    @media (--desktopSmall-viewport) {
      flex-wrap: wrap;
      margin: 0 -30px 40px;
    }
    @media (--phone-viewport) {
      margin: 0 -30px 30px;
    }
  }
  .sign-steps__item {
    position: relative;
    width: 25%;
    padding-right: 80px;
    padding-bottom: 30px;
    &:last-child {
      padding-right: 0;
    }
    @media (--desktopSmall-viewport) {
      width: 50%;
      padding: 0 30px 40px;
      box-sizing: border-box;
      &:last-child {
        padding-right: 30px;
      }
    }
    @media (--phone-viewport) {
      width: 100%;
      padding: 0 30px 60px;
    }
  }
  .sign-steps__arrow {
    position: absolute;
    top: 40%;
    right: 0;
    width: 80px;
    height: 5px;
    @media (--desktopSmall-viewport) {
      display: none;
    }
  }
  .sign-steps__data {
    max-width: 216px;
    @media (--desktopSmall-viewport) {
      max-width: 100%;
    }
  }
  .sign-steps__number {
    position: relative;
    z-index: 1;
    width: 72px;
    margin: 0 auto 35px;
    padding: 7px 15px;
    font-size: 12px;
    font-family: var(--ff-font);
    text-transform: uppercase;
    text-align: center;
    color: #4DD0E1;
    background-color: transparent;
    border: 0;
    border-radius: 16px;
    outline: 0;
    box-sizing: border-box;
    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background-color: #fff;
      border-radius: 16px;
      opacity: 1;
      transition: opacity .3s ease;
    }
    &::after {
      content: '';
      position: absolute;
      z-index: -2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
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
    @media (--desktopSmall-viewport) {
      margin: 0 auto 25px;
      width: 82px;
      font-size: 14px;
    }
  }
  .sign-steps__icon {
    display: block;
    margin: 0 auto 32px;
    fill: #CFD8DC;
  }
  .sign-steps__icon--survey {
    width: 72px;
    height: 72px;
  }
  .sign-steps__icon--code {
    width: 124px;
    height: 72px;
  }
  .sign-steps__icon--find{
    width: 78px;
    height: 72px;
  }
  .sign-steps__icon--connect {
    width: 102px;
    height: 72px;
  }
  .sign-steps__caption {
    display: block;
    font-size: 14px;
    line-height: 18px;
    color: #455A64;
    text-transform: uppercase;
    text-align: center;
    @media (--tablet-viewport) {
      font-size: 20px;
      padding-bottom: 6px;
    }
    @media (--phone-viewport) {
      font-size: 18px;
      padding-bottom: 4px;
    }
  }
  .sign-steps__text {
    display: block;
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
    text-align: center;
    @media (--tablet-viewport) {
      font-size: 18px;
      line-height: 24px;
    }
    @media (--phone-viewport) {
      font-size: 16px;
      line-height: 22px;
    }
  }
</style>
