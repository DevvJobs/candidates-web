<template>
  <div class="tests-preview">
    <div class="tests-preview__title" :title="test.name">{{ test.name }}</div>
    <div class="tests-preview__tag">
      <div class="tests-preview__tag-item" :title="test.skill.name">{{ test.skill.name }}</div>
      <div class="tests-preview__tag-item">{{ test.proficiencyLevel.name }}</div>
    </div>
    <div class="tests-preview__actions" v-if="!isButtonStatusFinished">
      <button @click="onStartTest" class="tests-preview__btn" type="button">{{button}}</button>
    </div>
    <div class="tests-preview__actions tests-preview__actions--results" v-if="isButtonStatusFinished">
      <span class="tests-preview-progress__title">SCORE</span>
      <span class="tests-preview-progress" v-if="isButtonStatusFinished && isTestResultExist">
        <span class="tests-preview-progress__text">{{test.result}}%</span>
        <svg class="tests-preview-progress__ico" xmlns="http://www.w3.org/2000/svg"
             viewBox="-1 -1 34 34">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#009EB6"></stop>
              <stop offset="100%" stop-color="#80DDE9"></stop>
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="15.9155" class="tests-preview-progress__background"></circle>
          <circle stroke="url(#gradient)" v-bind:style="{strokeDashoffset: calculateTestAccuracyProgressBar}" cx="16" cy="16" r="15.9155" class="tests-preview-progress__value"></circle>
        </svg>
      </span>
      <span class="tests-preview-progress" v-if="!isTestResultExist">
        <svg class="tests-preview-progress__ico" xmlns="http://www.w3.org/2000/svg"
             viewBox="-1 -1 34 34">
          <circle cx="16" cy="16" r="15.9155" class="tests-preview-progress__background"></circle>
        </svg>
        <span class="tests-preview-progress__text tests-preview-progress__text--small">
          <span class="tests-preview-progress__sign">Please wait</span>
          Calculating results...
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import {
  FINISHED,
  NOT_STARTED,
  IN_PROGRESS
} from '@/candidates/profile/tests/store/tests-status-types';
import { devTestsAuth } from '@/candidates/profile/tests/conduct/dev-tests.service';

export default {
  props: {
    test: null
  },
  computed: {
    button () {
      switch (this.test.status) {
        case NOT_STARTED:
          return 'Start test';
        case IN_PROGRESS:
          return 'Continue';
      }
    },
    isButtonStatusFinished () {
      return this.test.status === FINISHED;
    },
    calculateTestAccuracyProgressBar () {
      return 100 - this.test.result;
    },
    isTestResultExist () {
      return this.test.result !== null;
    }
  },
  methods: {
    onStartTest () {
      devTestsAuth.setToken(this.test.token);

      this.$router.push({
        name: 'ConductTest'
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
  .tests-preview {
    position: relative;
    width: 100%;
    min-height: 200px;
    padding: 25px 10px 15px;
    background-color: #fff;
    border-radius: 22px;
    box-shadow: 0 0 15px 2px rgba(207, 216, 220, .6);
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      padding: 32px 20px 30px;
      min-height: 220px;
    }
    @media (--desktop-viewport) {
      padding: 32px 15px 30px;
    }
  }
  .tests-preview__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 54px;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 24px;
    color: #455A64;
    text-align: center;
    overflow: hidden;
    word-break: break-word;
    @media (--phoneLarge-viewport) {
      height: auto;
      font-size: 22px;
      line-height: 32px;
    }
  }
  .tests-preview__tag {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    @media (--desktopLarge-viewport) {
      margin-bottom: 20px;
    }
  }
  .tests-preview__tag-item {
    display: block;
    max-width: 50%;
    margin-right: 4px;
    padding: 3px 6px;
    font-size: 11px;
    line-height: 13px;
    color: #455A64;
    border: 1px solid #CFD8DC;
    border-radius: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    @media (--phoneLarge-viewport) {
      font-size: 16px;
      padding: 8px 8px;
      border-radius: 30px;
    }
  }
  .tests-preview__actions {
    padding: 15px 0 0;
    border-top: 1px solid #ECEFF1;
    text-align: center;
    @media (--desktopLarge-viewport) {
      padding: 20px 0 0;
    }
  }
  .tests-preview__actions--results {
    padding-top: 10px;
  }
  .tests-preview__btn {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 10px 15px 9px;
    color: #4DD0E1;
    font-size: 12px;
    font-family: var(--ff-font);
    background-color: transparent;
    border: 0;
    border-radius: 16px;
    outline: 0;
    box-sizing: border-box;
    transition: color .3s ease;
    cursor: pointer;
    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background-color: #fff;
      border-radius: 16px;
      opacity: 1;
      transition: opacity .3s ease;
      @media (--tablet-viewport) {
        border-radius: 40px;
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -2;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
      @media (--tablet-viewport) {
        border-radius: 40px;
      }
    }
    &:hover,
    &:focus {
      color: #fff;
      &::after {
        opacity: 1;
      }
      &::before {
        opacity: 0;
      }
    }
    @media (--tablet-viewport) {
      font-size: 20px;
      padding: 12px 24px;
      border-radius: 40px;
    }
  }
  .tests-preview-progress {
    position: relative;
    display: flex;
    text-align: center;
    width: 118px;
    height: 118px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #455A64;
    line-height: 1.2;
  }
  .tests-preview-progress__ico {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .tests-preview-progress__background {
    fill: none;
    stroke: #ECEFF1;
    stroke-width: var(--progress-bar-stroke-width);
  }
  .tests-preview-progress__value {
    fill: none;
    stroke-dasharray: 100 100;
    stroke-dashoffset: 100;
    stroke-linecap: round;
    stroke-width:var(--progress-bar-stroke-width);
    transition: stroke-dashoffset 1s ease-in-out;
  }
  .tests-preview-progress__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .tests-preview-progress__text--small {
    color: #90A4AE;
    font-size: 16px;
    line-height: 1.2;
  }
  .tests-preview-progress__sign {
    display: block;
    margin-bottom: 15px;
    color: #CFD8DC;
    font-size: 12px;
    line-height: 1.2;
  }
  .tests-preview-progress__title {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 1.2;
    color: #90A4AE;
    font-weight: 600;
  }
</style>
