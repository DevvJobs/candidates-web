<template>
  <div class="popup">
    <div class="popup__box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
  .popup {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .popup__box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 0;
    min-height: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
