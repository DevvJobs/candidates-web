<template>
  <div class="loading">
    <svg class="loading__icon">
      <use xlink:href="#loader"></use>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
  .loading {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 30px;
    background-color: rgba(255,255,255,.5);
    box-sizing: border-box;
  }
  .loading__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    animation: spin .6s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
