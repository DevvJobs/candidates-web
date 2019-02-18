<template>
  <div class="chat__main-date-box">
    <span class="chat__main-date-text">Wednesday, August 1, 2018</span>
  </div>
</template>

<script>
export default {
  name: 'ChatMessageDate'
};
</script>

<style lang="postcss" scoped>
  .chat__main-date-box {
    position: relative;
    margin: 20px 0;
    font-size: 12px;
    color: #90A4AE;
    text-align: center;
    &::before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50px;
      right: 50px;
      height: 1px;
      background-color: #ECEFF1;
    }
  }
  .chat__main-date-text {
    position: relative;
    display: inline-block;
    padding: 0 5px;
    background-color: #fff;
  }
</style>
