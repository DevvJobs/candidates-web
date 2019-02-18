<template>
  <div class="profile-create__content">
    <ProfileCreateProgress progress="50"></ProfileCreateProgress>
    <div class="profile-create__data profile-create__data--big">
      <ProfileCreateTitle title="What are your main skills?"></ProfileCreateTitle>
      <div class="skills-form">
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
                  :placeholder="'Select skill'"
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
      <ul class="profile-create-skills__list">
        <li class="profile-create-skills__item" v-for="(item, index) of skills" v-bind:key="index">
          <span class="profile-create-skills__title" :title="item.skill.name" v-if="item.skill.name">{{item.skill.name}}</span>
          <span class="profile-create-skills__description"
                v-if="item.monthsOfExperience">
            <span v-if="yearsOfExperience(item.monthsOfExperience)">
              {{yearsOfExperience(item.monthsOfExperience)}}
              {{ 'year' | pluralize(yearsOfExperience(item.monthsOfExperience)) }}
            </span>
            <span v-if="monthOfExperience(item.monthsOfExperience)">
              {{monthOfExperience(item.monthsOfExperience)}}
              {{ 'month' | pluralize(monthOfExperience(item.monthsOfExperience)) }}
            </span> of experience
          </span>
          <span class="profile-create-skills__description" v-if="!item.monthsOfExperience">no experience</span>
          <button class="profile-create-skills__button-remove" v-on:click="deleteSkill(item.id, index)">
            <svg>
              <use xlink:href="#trash"></use>
            </svg>
          </button>
        </li>
      </ul>
      <button class="profile-create__btn" type="button" :disabled="!skills.length" v-on:click="finishStep()">
        <svg class="profile-create__btn-icon">
          <use xlink:href="#arrow"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import ProfileCreateTitle from '@/candidates/profile/create/shared/ProfileCreateTitle';
import ProfileCreateProgress from '@/candidates/profile/create/shared/ProfileCreateProgress';
import candidateService from '@/candidates/core/services/candidate.service';
import { autocomplete } from '@/core/mixins/autocomplete';
import { formError } from '@/core/mixins/formErrorHanding';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { CandidateSkill } from '@/candidates/profile/edit/shared/skill';
import { putSkillString } from '@/candidates/profile/edit/shared/putSkillString';
import _ from 'lodash';
import moment from 'moment';

export default {
  data () {
    return {
      chosenSkills: null,
      skillId: null,
      years: null,
      month: null,
      skills: [],
      yearsError: null,
      monthError: null,
      experienceError: null,
      addSkillDisableForm: true
    };
  },
  mixins: [
    formError,
    autocomplete
  ],
  components: {
    InputWrapper,
    Button,
    ProfileCreateTitle,
    ProfileCreateProgress
  },
  computed: {
    ...mapGetters({
      'candidate': 'profile/candidate'
    }),
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
    }
  },
  methods: {
    ...mapActions({
      fetchSkills: 'profile/fetchSkills'
    }),
    ...mapMutations({
      setCandidateSkills: 'profile/setCandidateSkills'
    }),
    yearsOfExperience (monthsOfExperience) {
      return moment.duration(monthsOfExperience, 'months').years();
    },
    monthOfExperience (monthsOfExperience) {
      return moment.duration(monthsOfExperience, 'months').months().toFixed();
    },
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
    addSkillDefaultState () {
      this.chosenSkills = null;
      this.error = null;
      this.years = null;
      this.month = null;
    },
    finishStep () {
      if (this.skills.length > 0) {
        candidateService.updateCandidateProfileSkills(
          putSkillString(this.skills),
          () => {
            this.$router.push({name: 'ProfileCreateRelocate'});
            this.setCandidateSkills(this.skills);
          }
        );
      } else {
        this.error = 'Please add at least one skill';
      }
    },
    getSkills (searchText) {
      this.fetchSkills(searchText)
        .then((items) => {
          this.items = items;
        })
        .catch(() => { /* error */ });
    },
    deleteSkill (id, index) {
      candidateService.removeCandidateSkill(id);

      this.setCandidateSkills(this.skills.splice(index, 1));
    },
    pushSkill () {
      this.skills.push(
        new CandidateSkill(
          this.experience,
          this.chosenSkills
        )
      );
      this.addSkillDefaultState();
    },
    addSkill () {
      if (this.years > 39) {
        this.yearsError = 'max value 28';
      }
      if (this.month > 11) {
        this.monthError = 'max value 11';
      }
      if (!this.skills && this.years <= 39 && this.month <= 11) {
        this.pushSkill();
      }
      if (this.skills && this.years <= 39 && this.month <= 11) {
        const skill = this.skills.some((skill) => skill.skill.id === this.chosenSkills.id);
        if (!skill) {
          this.pushSkill();
        } else {
          this.error = 'Skill already exist';
        }
      }
    }
  },
  mounted () {
    const inputSkill = document.getElementById('skill-input');

    if (this.$isAndroid) {
      inputSkill.type = 'password';

      this.$nextTick(() => {
        inputSkill.type = 'search';
      });
    }

    this.skills = _.cloneDeep(this.candidate.skills);
  }
};
</script>

<style lang="postcss" src="./ProfileCreate.css"></style>
<style lang="postcss" scoped>
  .skills {
    position: relative;
    max-width: 900px;
    width: 100%;
    padding: 54px 0 0 200px;
    box-sizing: border-box;
  }
  /* Add skill form */
  .skills-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }
  .skills-form__title {
    display: block;
    margin-bottom: 40px;
    font-size: 22px;
    line-height: 26px;
    color: #90A4AE;
  }
  .skills-form__list {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 -10px;
    @media (--phoneLarge-viewport) {
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
  .skills-form__item {
    position: relative;
    margin-bottom: 20px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .skills-form__item--skill {
    position: relative;
    z-index: 100;
    flex: 1 0 auto;
    max-width: 237px;
    width: 100%;
    @media (--phoneLarge-viewport) {
      max-width: 100%;
    }
  }
  .skills-form__text {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: var(--ff-font);
    line-height: 20px;
    color: #90a4ae;
    font-weight: 400;
  }
  .skills-form__input-holder {
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin: 0 -12px;
  }
  .skills-form__input {
    display: block;
    width: 104px;
    padding: 0 12px;
    box-sizing: border-box;
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
    padding: 20px 10px 40px 20px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 15px 2px rgba(207, 216, 220, .6);
    box-sizing: border-box;
  }
  .skills__list {
    display: block;
    max-height: 300px;
    padding-right: 30px;
    overflow-y: auto;
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
  .skills__btn {
    width: 150px;
    text-transform: uppercase;
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
</style>
