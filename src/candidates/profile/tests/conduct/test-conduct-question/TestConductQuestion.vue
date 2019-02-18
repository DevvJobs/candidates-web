<template>
  <div class="test-conduct-question">
    <div class="test-conduct-question__title"></div>
    <div class="test-conduct-question__content">
      <div class="test-conduct-question__list">
        <div class="test-conduct-question__option"
             @click="toggleAnswer(index)"
             :class="{'test-conduct-question__option test-conduct-question__option--chosen': isChosenTest(index)}"
             v-for="(answer, index) in answers" :key="index">
          <div class="test-conduct-question__option-number">{{toAlphabetChar(index)}}</div>
          <div class="test-conduct-question__answer">
          </div>
        </div>
      </div>
      <div class="test-conduct-question__actions">
        <Button class="btn btn--h50 test-conduct-question__btn"
                :disabled="isNoAnswers"
                @clicked="onSubmitAnswer()"
                text="Next"></Button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Components
*/
import Button from '@/core/components/form/Button';

/**
 * Mixins
*/
import { textHelpers } from '@/core/mixins/textHelpers';

export default {
  props: [
    'answers'
  ],
  components: {
    Button
  },
  mixins: [
    textHelpers
  ],
  computed: {
    isNoAnswers () {
      return this.answers.every(answer => !answer.chosen);
    }
  },
  methods: {
    isChosenTest (index) {
      return this.answers[index].chosen;
    },
    toggleAnswer (index) {
      this.$emit('toggleAnswer', index);
    },
    onSubmitAnswer () {
      this.$emit('onSubmitAnswer');
    }
  }
};
</script>

<style lang="postcss" scoped>
  .test-conduct-question {
    padding: 45px 130px 60px;
    @media (--desktopLarge-viewport) {
      padding: 60px 40px;
    }
    @media (--tablet-viewport) {
      padding: 30px 40px;
    }
    @media (--phoneLarge-viewport) {
      padding: 30px 15px;
    }
  }
  .test-conduct-question__title {
    display: block;
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 16px;
    color: #455A64;
    @media(--phone-viewport) {
      margin-bottom: 50px;
    }
  }
  .test-conduct-question__content {
    max-width: 800px;
    width: 100%;
  }
  .test-conduct-question__list {
    margin-bottom: 40px;
  }
  .test-conduct-question__option {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 20px;
    padding: 18px 18px 18px 75px;
    border: 1px solid #ECEFF1;
    border-radius: 20px;
    box-shadow: 0 5px 0 0 #ECEFF1;
    cursor: pointer;
    transition: border-color .3s ease, box-shadow .3s ease;
    box-sizing: border-box;
  &:hover {
     border-color: #CFD8DC;
     box-shadow: 0 5px 0 0 #CFD8DC;
   }
  }
  .test-conduct-question__option--chosen {
    border-color: #4DD0E1;
    box-shadow: 0 5px 0 0 #4DD0E1;
    &:hover {
       border-color: #4DD0E1;
       box-shadow: 0 5px 0 0 #4DD0E1;
    }
    .test-conduct-question__option-number {
      color: #4DD0E1;
      border-color: #4DD0E1;
    }
  }
  .test-conduct-question__option-number {
    position: absolute;
    top: 8px;
    left: 10px;
    width: 33px;
    height: 33px;
    font-size: 12px;
    line-height: 31px;
    color: #CFD8DC;
    text-align: center;
    text-transform: uppercase;
    border: 1px solid #CFD8DC;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .test-conduct-question__answer {
    font-size: 12px;
    line-height: 14px;
    color: #455A64;
    overflow-y: hidden;
    overflow-x: auto;
    &::-webkit-scrollbar {
       height: 9px;
     }
    &::-webkit-scrollbar-track {
       border-radius: 9px;
     }
    &::-webkit-scrollbar-thumb {
       border-radius: 9px;
       background-color: #ECEFF1;
    }
    pre {
      margin: 0;
    }
  }
  .test-conduct-question__actions {
    text-align: right;
    @media(--phone-viewport) {
      text-align: center;
    }
  }
  .test-conduct-question__btn {
    display: inline-block;
    width: 120px;
    @media(--phone-viewport) {
      width: 180px;
    }
  }
</style>
