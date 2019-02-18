<template>
  <div class="tests-header">
    <div class="tests-header__title">My knowledge tests</div>
    <router-link :to="{name: 'AllTests'}" class="tests-header-btn">
      <span class="tests-header-btn__text">Add new tests</span>
      <svg class="tests-header-btn__icon">
        <use xlink:href="#plus-sign"></use>
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>
<style lang="postcss" scoped>
  .tests-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 30px;
    @media (--tablet-viewport) {
      margin-bottom: 60px;
    }
    @media (--phone-viewport) {
      align-items: center;
    }
  }
  .tests-header__title {
    flex: 1;
    display: block;
    margin: 0 55px 15px 0;
    padding-bottom: 10px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 300;
    color: #90A4AE;
    border-bottom: 1px solid #ECEFF1;
    @media (--phoneLarge-viewport) {
      margin: 0 30px 0 0;
    }
  }
  .tests-header-btn {
    position: relative;
    z-index: 1;
    display: block;
    width: 130px;
    height: 40px;
    padding: 7px 15px 7px 30px;
    text-align: center;
    border: 0;
    border-radius: 30px;
    background-color: #009EB7;
    cursor: pointer;
    outline: 0;
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
      opacity: 1;
      transition: opacity .3s ease;
    }
    &:hover,
    &:focus {
      &::after {
        opacity: 0;
      }
    }
    @media (--phone-viewport) {
      width: 40px;
      padding: 0;
      .tests-header-btn__text {
        display: none;
      }
    }
  }
  .tests-header-btn__text {
    font-size: 14px;
    line-height: 24px;
    font-family: var(--ff-font);
    color: #fff;
  }
  .tests-header-btn__icon {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 10px;
    height: 10px;
    fill: #fff;
    @media (--phone-viewport) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
