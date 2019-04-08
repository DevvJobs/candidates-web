<template>
  <div class="loader">
    <div class="loader__title" v-if="text">Please wait...</div>
    <div class="loader__icon-holder">
      <svg class="loader__icon">
        <use xlink:href="#loader"></use>
      </svg>
    </div>
    <div class="loader__description" v-if="text">Hang tight, while we prepare your profile</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="postcss" scoped>
  .loader {
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 30px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .loader--small {
    position: absolute;
    top: 0;
    left: 0;
    .loader__icon-holder {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      margin: -25px 0 0 -25px;
    }
  }
  .loader__title {
    margin-bottom: 100px;
    font-size: 32px;
    line-height: 34px;
    color: #455A64;
  }
  .loader__description {
    font-size: 20px;
    line-height: 24px;
    color: #90A4AE;
    text-align: center;
  }
  .loader__icon-holder {
    position: relative;
    display: block;
    width: 105px;
    height: 105px;
    margin-bottom: 100px;
    background-color: rgba(255, 255, 255, .4);
  }
  .loader__icon {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: spin .6s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
