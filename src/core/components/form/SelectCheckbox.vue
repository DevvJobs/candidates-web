<template>
  <label class="input-checkbox">
    <slot></slot>
    <i class="input-checkbox__icon">
      <svg>
        <use xlink:href="#check-thin"></use>
      </svg>
    </i>
    <span class="input-checkbox__text">{{ value }}</span>
  </label>
</template>

<script>
/* eslint-disable */
import Check from '@/assets/check-thin.svg';
/* eslint-disable */

export default {
  props: {
    value: ''
  }
};
</script>

<style lang="postcss" scoped>
  .input-checkbox {
    position: relative;
    display: inline-block;
  }
  .input-checkbox__input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    opacity: 0;
    &:checked + .input-checkbox__icon {
      background: #455a64;
      border-color: #455a64;
      svg {
        display: block;
      }
    }
    &:checked ~ .input-checkbox__text {
      color: #455a64;
    }
  }
  .input-checkbox__text {
    position: relative;
    display: block;
    padding-left: 36px;
    font-size: 18px;
    line-height: 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    cursor: pointer;
    color: #90A4AE;
    transition: color .3s ease;
  }
  .input-checkbox__icon {
    position: absolute;
    top: -16px;
    left: 0px;
    width: 16px;
    height: 16px;
    border: 1px solid #90A4AE;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    svg {
      display: none;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 13px;
      height: 10px;
      fill: #FFFFFF;
    }
  }
  .select-checkbox-chat-wrapper {
    .input-checkbox {
      width: 100%;
      height: 100%;
    }
    .input-checkbox__icon {
      top: 28px;
      left: 10px;
      @media (--tablet-viewport) {
        left: 20px;
      }
    }
  }
</style>
