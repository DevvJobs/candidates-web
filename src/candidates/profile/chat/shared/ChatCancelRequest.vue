<template>
  <div class="chat-message-cancel-request">
    <Button text="Cancel request" class="chat-message-cancel-request__btn btn--grey btn--w180 btn--h50"></Button>
    <p class="chat-message-cancel-request__text">Dont worry, you can always send a new request if you change your mind!</p>
  </div>
</template>

<script>
import Button from '@/core/components/form/Button';

export default {
  components: {
    Button
  }
};
</script>

<style lang="postcss" scoped>
  .chat-message-cancel-request {
    display: flex;
    align-items: center;
  }
  .chat-message-cancel-request__text {
    display: block;
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
  }
  .chat-message-cancel-request__btn {
    margin-right: 20px;
  }
</style>
