<template>
  <div class="test-conduct">
    <div class="test-conduct__header" v-if="currentConductTest">
      <div class="test-conduct__title">{{currentConductTest.name}}</div>
      <div class="test-conduct__progress">{{currentConductTest.currentQuestionNumber}} of {{currentConductTest.amountOfQuestions}}</div>
      <div class="test-conduct__btn-back">
        <router-link :to="{name: 'CandidateTests'}">
          <svg>
            <use xlink:href="#chevron-left"></use>
          </svg>
        </router-link>
      </div>
    </div>
    <div class="test-conduct__progress-bar">
      <div class="test-conduct__progress-bar-value" :style="{width: progressbarFill}"></div>
    </div>

    <Loader v-if="isLoadingTests" class="loader" :text="loaderText"></Loader>

    <TestConductQuestion
      :answers="answers"
      v-if="currentConductTest"
      @toggleAnswer="toggleAnswer"
      @onSubmitAnswer="onSubmitAnswer"
    ></TestConductQuestion>
  </div>
</template>

<script>
/**
 * Components
 */
import Loader from '@/core/components/Loader';
import TestConductQuestion from '@/candidates/profile/tests/conduct/test-conduct-question/TestConductQuestion';
/**
 * Helpers js
 */
import { Parser } from '@/candidates/profile/tests/conduct/parser.service';
import { ConductTestFactory } from '@/candidates/profile/tests/conduct/conduct-test.factory';

/**
 * Libraries
*/
import hljs from 'highlightjs';

/**
 * Mixins
*/
import { textHelpers } from '@/core/mixins/textHelpers';
/**
 * Vuex
 */
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { FINISHED } from '@/candidates/profile/tests/store/tests-status-types';

export default {
  mixins: [
    textHelpers
  ],
  components: {
    Loader,
    TestConductQuestion
  },
  data () {
    return {
      answers: [],
      loaderText: 'Hang tight, while we prepare your test'
    };
  },
  computed: {
    ...mapGetters({
      'currentConductTest': 'tests/currentConductTest',
      'isLoadingTests': 'tests/isLoadingTests'
    }),

    progressbarFill () {
      if (this.currentConductTest) {
        const currentStep = this.currentConductTest.currentQuestionNumber;
        const totalSteps = this.currentConductTest.amountOfQuestions;

        return `${currentStep * 100 / totalSteps}%`;
      } else {
        return '0%';
      }
    }
  },
  methods: {
    ...mapMutations({
      'setTestsLoader': 'tests/setTestsLoader',
      'setCurrentTestTab': 'tests/setCurrentTestTab'
    }),
    ...mapActions({
      'fetchTest': 'tests/fetchConductTest',
      'submitCurrentTest': 'tests/submitCurrentTest'
    }),
    onFetchTest () {
      this.setTestsLoader(true);

      this.fetchTest()
        .then(resp => {
          this.mapAndParseApply(resp);

          this.setTestsLoader(false);
        }, (error) => console.log(error))
        .catch(() => { /* error */ });
    },
    mapAndParseApply (resp) {
      this.answers = resp.nextQuestion.answers.slice().map(answer => {
        return {
          id: answer.id,
          text: answer.text,
          chosen: false
        };
      });
      /**
       * IMPORTANT! NextTick is needeed for running only after the
       entire view has been rendered. For more information, read https://vuejs.org/v2/api/#Vue-nextTick-callback-context
       */
      this.$nextTick(() => {
        this.parsetitle();
        this.parseAnswers();
        this.highlightCode();
      });
    },
    parsetitle () {
      let parsedTitle = new Parser(this.currentConductTest.nextQuestion.text).parse();

      parsedTitle.forEach(string => {
        let wrapper = document.getElementsByClassName('test-conduct-question__title')[0];
        let DOMelement = new ConductTestFactory(string).applyMethod();

        wrapper.appendChild(DOMelement);
      });
    },
    parseAnswers () {
      this.answers.forEach((answer, index) => {
        // let testAnswer = '*Italic* is **Bold** \n <ul><li>fgdfg</li><li>fsdfdsfsd</li></ul> <xmp>\n  from functools import reduce\n  from operator import mul\n\n  def myfunc(x):\n  return reduce(mul, range(1, x+1), 1)\n\n  print(myfunc(3))\n</xmp>\n And this is code <xmp>\n "Sammy".slice(0) \n "Sammy".slice(1,2) \n "Sammy".slice(1..4) </xmp> \n <table> <tr> <th>Firstname</th> <th>Lastname</th> <th>Age</th> </tr> <tr> <td>Jill</td> <td>Smith</td> <td>50</td> </tr> <tr> <td>Eve</td> <td>Jackson</td> <td>94</td> </tr> <tr> <td>John</td> <td>Doe</td> <td>80</td> </tr> </table>';
        let parsedAnswer = new Parser(answer.text).parse();

        parsedAnswer.forEach(string => {
          let wrapper = document.getElementsByClassName('test-conduct-question__answer')[index];
          let DOMelement = new ConductTestFactory(string, true).applyMethod();

          wrapper.appendChild(DOMelement);
        });
      });
    },
    highlightCode () {
      const codeBlocks = document.querySelectorAll('.hljs-code-snippet-custom');

      codeBlocks.forEach((block) => {
        hljs.highlightBlock(block);
      });
    },
    isChosenTest (index) {
      return this.answers[index].chosen;
    },
    toggleAnswer (index) {
      this.answers[index].chosen = !this.answers[index].chosen;
    },
    onSubmitAnswer () {
      this.setTestsLoader(true);

      let answer = {
        questionId: this.currentConductTest.nextQuestion.id,
        answers: this.answers.map(selected => {
          return {
            chosen: selected.chosen,
            id: selected.id
          };
        })
      };

      this.submitCurrentTest(answer)
        .then(resp => {
          if (!resp) {
            this.setCurrentTestTab(FINISHED);
            this.$router.replace({ name: 'CandidateTests' });

            return this.setTestsLoader(false);
          }

          this.mapAndParseApply(resp);

          this.setTestsLoader(false);
        })
        .catch(() => { /* error */ });
    }
  },
  created () {
    this.onFetchTest();
  }
};
</script>

<style lang="postcss" scoped>
  .test-conduct {
    background-color: #fff;
  }
  .test-conduct__header {
    position: relative;
    padding: 20px 60px 10px 60px;
    text-align: center;
  }
  .test-conduct__title {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 20px;
    color: #90A4AE;
    @media(--phone-viewport) {
      font-size: 18px;
      line-height: 22px;
    }
  }
  .test-conduct__progress {
    display: block;
    font-size: 14px;
    line-height: 18px;
    color: #4DD0E1;
  }
  .test-conduct__btn-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    cursor: pointer;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 18px;
      fill: #CFD8DC;
    }
  }
  .test-conduct__progress-bar {
    position: relative;
    width: 100%;
    height: 9px;
    border-radius: 4px;
    background-color: #E6F1F4;
  }
  .test-conduct__progress-bar-value {
    position: absolute;
    top: 0;
    left: 0;
    height: 9px;
    border-radius: 4px;
    background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
  }
</style>
