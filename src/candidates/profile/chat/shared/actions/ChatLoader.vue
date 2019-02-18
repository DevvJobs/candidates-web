<template>
  <div class="chat__message-loader">
    <span class="chat__message-loader-dot"></span>
    <span class="chat__message-loader-dot"></span>
    <span class="chat__message-loader-dot"></span>
  </div>
</template>

<script>
export default {
  name: 'ChatMessageLoader'
};
</script>

<style lang="postcss" scoped>
  @keyframes blink {
    0% {
      opacity: .2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: .2;
    }
  }
  .chat__message-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 27px;
    border-radius: 13px;
    background-color: #4DD0E1;
  }
  .chat__message-loader-dot {
    width: 8px;
    height: 8px;
    margin: 0 3px;
    border-radius: 50%;
    background-color: #fff;
    animation-name: blink;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    &:nth-child(2) {
      animation-delay: .2s;
    }
    &:nth-child(3) {
      animation-delay: .4s;
    }
  }
</style>
