<template>
  <div class="skills">
    <div class="skills-form">
      <div class="skills-form__title">Add new skills</div>
      <div class="skills-form__list">
        <div class="skills-form__item skills-form__item--skill">
          <span class="skills-form__text">SKILL</span>
          <InputWrapper v-bind:message="error">
            <div id="skills-form__input-wrapper">
              <v-autocomplete
                v-model="chosenSkills"
                @input="showExperienceError"
                v-bind:class="{ 'v-autocomplete--error': error }"
                @update-items="getSkills"
                :items="items"
                :input-attrs="{
                  name: 'skill',
                  autocomplete: 'off',
                  id: 'skill-input'
                 }"
                :get-label="getLabel"
                :component-item='template'
                :min-len="0"
                :placeholder="'Type skill'"
                @focus="clearError()"
                :auto-select-one-item="false"
                :wait="300">
              </v-autocomplete>
            </div>
          </InputWrapper>
        </div>
        <div class="skills-form__item">
          <span class="skills-form__text">EXPERIENCE (years and months)</span>
          <div class="skills-form__input-holder">
            <span class="skills-form__input">
              <InputWrapper v-bind:message="yearsError">
                <input v-model="years" v-on:input="hideExperienceError() || hideYearsError()" name="years" type="number" min="0" max="39" placeholder="Years">
              </InputWrapper>
            </span>
            <span class="skills-form__input">
              <InputWrapper v-bind:message="monthError">
                <input v-model="month" v-on:input="hideExperienceError() || hideMonthError()" name="month" type="number" min="0" max="11" placeholder="Months">
              </InputWrapper>
            </span>
          </div>
          <span class="skills-form__error" v-if="experienceError">Please enter years or months of experience</span>
        </div>
        <div class="skills-form__item">
          <button class="skills__button-add"
                  v-on:click="addSkill()" type="button" :disabled="disableForm">
            <svg>
              <use xlink:href="#small-plus"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="skills__content">
      <span class="skills__title">
        SKILLS
        <span class="skills__count">{{skillsLength}}</span>
      </span>
      <div class="skills__list">
        <ProfileEditSkill
          v-for="(skill, index) of candidate.skills"
          v-bind:key="index"
          v-on:delete-skill="deleteSkill(skill.id, index)"
          v-on:input-changed="setMessage('MESSAGE_ERROR')"
          :skillsLength="skillsLength"
          :skill="skill">
        </ProfileEditSkill>
      </div>
      <div class="skills__actions">
        <Button v-on:clicked="updateSkills" :type="'button'" :text="'Save'" class="skills__btn btn--h40"></Button>
        <span class="skills__msg skills__msg--error" v-if="showMessageError">You have unsaved changes</span>
        <span class="skills__msg skills__msg--success" v-if="showMessageSuccess">Changes saved successfully!</span>
        <span class="skills__msg skills__msg--loading" v-if="showMessageLoading">
          <svg class="skills__icon">
            <use xlink:href="#loader"></use>
          </svg>
          Saving changes...
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { autocomplete } from '@/core/mixins/autocomplete';
import { formError } from '@/core/mixins/formErrorHanding';
import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import ProfileEditSkill from '@/candidates/profile/edit/shared/ProfileEditSkill';
import { CandidateSkill } from '@/candidates/profile/edit/shared/skill';
import { putSkillString } from '@/candidates/profile/edit/shared/putSkillString';

export default {
  data () {
    return {
      chosenSkills: null,
      skillId: null,
      years: null,
      month: null,
      skills: null,
      yearsError: null,
      monthError: null,
      experienceError: null,
      addSkillDisableForm: true,
      btnMessage: ''
    };
  },
  mixins: [
    formError,
    autocomplete
  ],
  components: {
    InputWrapper,
    Button,
    ProfileEditSkill
  },
  computed: {
    ...mapGetters({
      candidate: 'profile/candidate'
    }),
    skillsLength () {
      return this.candidate.skills.length;
    },
    disableForm () {
      let experience = this.years || this.month;
      if (this.chosenSkills && experience) {
        return false;
      } else {
        return true;
      }
    },
    experience () {
      if (this.years || this.month) {
        return this.years * 12 + +this.month;
      } else {
        this.clearYears();
        this.clearMonths();
        return undefined;
      }
    },
    /* eslint-disable-next-line */
    showExperienceError () {
      let years = this.chosenSkills && !this.years;
      let month = this.chosenSkills && !this.month;
      if (years && month) {
        this.setExperienceError(true);
      } else {
        this.setExperienceError(false);
      }
    },
    showMessageError () {
      return this.btnMessage === 'MESSAGE_ERROR';
    },
    showMessageSuccess () {
      return this.btnMessage === 'MESSAGE_SUCCESS';
    },
    showMessageLoading () {
      return this.btnMessage === 'MESSAGE_LOADING';
    }
  },
  methods: {
    ...mapActions({
      fetchSkills: 'profile/fetchSkills',
      putSkills: 'profile/putSkills',
      deleteProfileSkill: 'profile/deleteSkill'
    }),
    ...mapMutations({
      setCandidateSkills: 'profile/setCandidateSkills',
      removeCandidateSkills: 'profile/removeCandidateSkills',
      addCandidateSkill: 'profile/addCandidateSkill'
    }),
    hideExperienceError () {
      this.experienceError = false;
    },
    hideYearsError () {
      this.yearsError = null;
    },
    hideMonthError () {
      this.monthError = null;
    },
    setExperienceError (value) {
      this.experienceError = value;
    },
    clearMonths () {
      this.month = null;
    },
    clearYears () {
      this.years = null;
    },
    defaultStateSkills () {
      this.skills = [...this.candidate.skills];
    },
    addSkillDefaultState () {
      this.chosenSkills = null;
      this.error = null;
      this.years = null;
      this.month = null;
    },
    updateSkills () {
      this.setMessage('MESSAGE_LOADING');
      const data = putSkillString(this.candidate.skills);
      this.putSkills(data)
        .then(() => {
          this.setMessage('MESSAGE_SUCCESS');
          setTimeout(() => {
            this.setMessage(null);
          }, 5000);
          this.defaultStateSkills();
        })
        .catch(() => {
          // TODO add error handling
        });
    },
    getSkills (searchText) {
      this.fetchSkills(searchText)
        .then((items) => {
          this.items = items;
        })
        .catch(() => { /* error */ });
    },
    deleteSkill (id) {
      this.deleteProfileSkill(id)
        .then(() => {
          this.removeCandidateSkills(id);
        })
        .catch(() => {
          // TODO add error handling
        });
    },
    pushSkill () {
      this.defaultStateSkills();
      this.addCandidateSkill(
        new CandidateSkill(
          this.experience,
          this.chosenSkills
        ));
      this.addSkillDefaultState();
      this.setMessage('MESSAGE_ERROR');
    },
    addSkill () {
      this.defaultStateSkills();
      if (this.years > 39) {
        this.yearsError = 'max value 39';
      }
      if (this.month > 11) {
        this.monthError = 'max value 11';
      }
      if (!this.candidate.skills && this.years <= 39 && this.month <= 11) {
        this.pushSkill();
      }
      if (this.candidate.skills && this.years <= 39 && this.month <= 11) {
        const skill = this.candidate.skills.some((skill) => skill.skill.id === this.chosenSkills.id);
        if (!skill) {
          this.pushSkill();
        } else {
          this.error = 'Skill already exist';
        }
      }
    },
    setMessage (text) {
      this.btnMessage = text;
    }
  },
  created () {
    this.defaultStateSkills();
    const inputSkill = document.getElementById('skill-input');

    if (this.$isAndroid) {
      inputSkill.type = 'password';

      this.$nextTick(() => {
        inputSkill.type = 'search';
      });
    }
  },
  destroyed () {
    this.setCandidateSkills(this.skills);
  }
};
</script>

<style lang="postcss" scoped>
  .skills {
    position: relative;
    max-width: 520px;
    width: 100%;
    padding: 24px 0 0 0;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      padding-top: 40px;
      max-width: 640px;
    }
    @media (--tablet-viewport) {
      max-width: 100%;
    }
  }
  /* Add skill form */
  .skills-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
  }
  .skills-form__title {
    display: block;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 26px;
    color: #90A4AE;
  }
  .skills-form__list {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 -10px;
    @media (--desktopLarge-viewport) {
      justify-content: flex-start;
    }
    @media (--phoneLarge-viewport) {
      flex-wrap: wrap;
    }
    @media (--phone-viewport) {
      margin: 0 -7px;
    }
  }
  .skills-form__item {
    position: relative;
    padding: 0 10px;
    box-sizing: border-box;
    @media (--phone-viewport) {
      padding: 0 7px;
    }
  }
  .skills-form__item--skill {
    position: relative;
    z-index: 100;
    flex: 1;
    @media (--phoneLarge-viewport) {
      flex: 0 0 auto;
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .skills-form__text {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    font-family: var(--ff-font);
    line-height: 20px;
    color: #90a4ae;
    font-weight: 600;
  }
  .skills-form__input-holder {
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin: 0 -12px;
  }
  .skills-form__input {
    display: block;
    width: 80px;
    padding: 0 12px;
  }
  .skills__button-add {
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-image: linear-gradient(-90deg, #009EB6 0%, #80DDE9 100%);
    box-sizing: border-box;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      fill: #fff;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .skills__button-add:disabled {
    cursor: default;
    width: 44px;
    height: 44px;
    background: none;
    border: 2px solid #90A4AE;
    svg {
      fill: #90A4AE;
    }
  }
  /* Skills list */
  .skills__content {
    display: block;
    margin-bottom: 35px;
    padding: 20px 10px 20px 20px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 15px 2px rgba(207, 216, 220, .6);
    box-sizing: border-box;
  }
  .skills__list {
    display: block;
    max-height: 246px;
    margin-bottom: 15px;
    padding-right: 30px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 9px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 9px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 9px;
      background-color: #ECEFF1;
    }
  }
  .skills__title {
    display: block;
    margin-bottom: 25px;
    font-size: 12px;
    font-family: var(--ff-font);
    line-height: 20px;
    color: #90A4AE;
    font-weight: 600;
  }
  .skills__count {
    display: inline-block;
    width: 40px;
    height: 24px;
    margin-left: 15px;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    background-color: #90A4AE;
    border-radius: 15px;
    font-weight: 400;
  }
  .skills__btn {
    display: inline-block;
    width: 110px;
    margin-right: 24px;
  }
  .skills__msg {
    position: relative;
    display: inline-block;
    padding: 5px 0;
    font-size: 12px;
    line-height: 24px;
  }
  .skills__msg--error {
    color: #4DD0E1;
  }
  .skills__msg--success {
    color: #36D7B7;
  }
  .skills__msg--loading {
    padding-left: 34px;
    color: #CFD8DC;
  }
  .skills__icon {
    position: absolute;
    top: 5px;
    left: 0;
    width: 24px;
    height: 24px;
    animation: spin .6s linear infinite;
  }
  .input {
    z-index: 99;
  }
  .skills-form__error {
    position: absolute;
    top: 100%;
    left: 12px;
    padding-top: 2px;
    font-size: 11px;
    line-height: 1;
    color: #4DD0E1;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
