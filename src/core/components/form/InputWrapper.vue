<template>
  <label class="input">
    <span class="input__label" v-if="label">{{label}}</span>
    <slot></slot>
    <span class="input__message" v-if="message" v-bind:title="message">{{message}}</span>
  </label>
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    label: '',
    message: null
  }
};
</script>

<style lang="postcss" scoped>
  .input {
    position: relative;
    display: block;
  }
  .input__label {
    position: relative;
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #90a4ae;
    font-weight: 600;
    text-transform: uppercase;
    font-family: var(--ff-font);
  }
  input {
    padding: 10px 0;
    border-bottom: 1px solid #90a4ae;
    color: #455A64;
    caret-color: #455A64;
    &::placeholder {
      color: #CFD8DC;
    }
    &:focus {
      border-bottom-color: #4DD0E1;
    }
  }
  .sign__input {
    .input__label {
      font-size: 12px;
    }
  }
  .input--search {
    text-align: left;

    input {
      border: 1px solid #90a4ae;
      border-radius: 16px;
      font-size: 12px;
      padding: 9px 10px 8px;
      caret-color: #90a4ae;
    }
    .input__label {
      font-size: 12px;
    }
  }
  .input__message {
    position: absolute;
    top: 100%;
    left: 0;
    padding-top: 2px;
    font-size: 11px;
    line-height: 1;
    color: #4DD0E1;
  }
  .input--search {
    .input__message {
      left: 10px;
      right: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .input--skills {
    position: static;
  }
  .input--error {
    input {
      border-color: #4DD0E1;
    }
  }
  .input__search-ico {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    fill: #CFD8DC;
  }
  .profile-edit-about__item {
    .input__label {
      font-size: 12px;
    }
  }
  .popup-create-template {
    .input__label {
      font-size: 12px;
    }
  }
  .save-as-template {
    .input__label {
      font-size: 12px;
      color: #4DD0E1;
    }
  }
  .sign-message {
    .input--error {
      .input__message {
        padding-top: 25px;
        font-size: 14px;
        right: 0;
      }
    }
  }
  .representative {
    .input__label {
      font-size: 12px;
    }
  }
</style>
