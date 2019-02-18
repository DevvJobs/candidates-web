<template>
  <div class="chat__message" :class="{'chat__message--right': message.isSentByCandidate() }">
    <div v-if="!message.isSentBySystem()" class="chat__message-data" >
      <div class="chat__message-top-box">
        <Avatar :name="message.sender.name"></Avatar>
      </div>
      <div class="chat__message-box">
        <p class="chat__message-text">
          {{ message.text }}
        </p>
        <p class="chat__message-time">{{ message.chatFormatedDate }}</p>
      </div>
    </div>
    <p v-if="message.isSentBySystem()" class="chat__main-info-text">{{ message.text }}</p>
  </div>
</template>

<script>
import Avatar from '@/core/components/Avatar';
export default {
  name: 'ChatMessage',
  props: ['message'],
  components: {
    Avatar
  }
};
</script>

<style lang="postcss" scoped>
  .chat__message {
    margin: 10px 25px;
    @media (--phone-viewport) {
      margin: 10px 15px;
    }
  }
  .chat__message-data {
    display: inline-block;
    max-width: 430px;
  }
  .chat__message-box {
    padding-left: 35px;
  }
  .chat__message--right {
    text-align: right;
    padding-left: 25px;

    .chat__message-top-box {
      justify-content: flex-end;
    }

    .chat__message-box {
      padding-left: 0;
      padding-right: 35px;
    }
    .chat__message-text {
      margin-left: initial;
      background-color: #FFFFFF;
      box-shadow: 0 0 15px 2px rgba(207, 216, 220, .8);
      color: #455A64;
    }
    .chat__message-time {
      max-width: 430px;
      margin-left: 0;
    }
  }
  .chat__message-top-box {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  .chat__message-text {
    margin-left: auto;
    padding: 15px;
    font-size: 14px;
    line-height: 1.3em;
    border-radius: 20px;
    color: #fff;
    background-color: #4DD0E1;
    hyphens: auto;
    text-align: justify;
    box-sizing: border-box;
  }
  .chat__message-time {
    margin-top: 5px;
    margin-left: 40px;
    font-size: 12px;
    text-align: right;
    color: #90A4AE;
  }
  .chat__main-info-text {
    padding: 15px 45px;
    text-align: center;
    color: #90A4AE;
    font-size: 14px;
  }
</style>
