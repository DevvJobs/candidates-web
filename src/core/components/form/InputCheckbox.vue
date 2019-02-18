<template>
  <label class="input-checkbox">
    <slot></slot>
    <i class="input-checkbox__icon">
      <svg>
        <use xlink:href="#check"></use>
      </svg>
    </i>
    <span class="input-checkbox__text">{{ value }}</span>
  </label>
</template>

<script>
/* eslint-disable */
import Check from '@/assets/check.svg';
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
  .profile-edit-about__item {
    .input-checkbox__text {
      font-size: 16px;
      line-height: 21px;
    }
  }
  .input-checkbox__icon {
    position: absolute;
    top: 2px;
    left: 0;
    width: 18px;
    height: 18px;
    border: 2px solid #CFD8DC;
    border-radius: 1px;
    box-sizing: border-box;
    cursor: pointer;
    svg {
      display: none;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 19px;
      height: 16px;
      fill: #455a64
    }
  }
</style>
