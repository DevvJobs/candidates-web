<template>
  <div class="profile-edit-skills__item">
    <span class="profile-edit-skills__box profile-edit-skills__box--skill">
      <span class="profile-edit-skills__value" :title="skill.skill.name">{{skill.skill.name}}</span>
    </span>
    <div class="profile-edit-skills__box">
      <span class="profile-edit-skills__data">
        <span class="profile-edit-skills__field"
              :class="{'profile-edit-skills__field--error': years}">
          <InputWrapper class="profile-edit-skills__input input input--skills"
                        v-bind:message="years">
            <input
              v-on:change="onYearsChange"
              :value="yearsOfExperience" type="number" min="0" max="39">
          </InputWrapper>
          <span class="profile-edit-skills__text">{{ 'year' | pluralize(yearsOfExperience) || 'year'}}</span>
        </span>
        <span class="profile-edit-skills__field"
              :class="{'profile-edit-skills__field--error': months}">
          <InputWrapper class="profile-edit-skills__input input input--skills"
                        v-bind:message="months"
                        v-bind:class="{ 'input--error': formErrorAdd(['months']) }">
            <input
              v-on:change="onMonthChange"
              :value="monthOfExperience" type="number" min="0" max="11">
          </InputWrapper>
          <span class="profile-edit-skills__text">{{ 'month' | pluralize(monthOfExperience) }}</span>
        </span>
      </span>
    </div>
    <div class="profile-edit-skills__box profile-edit-skills__box--btn">
      <button class="profile-edit-skills__button-remove" v-if="skillsLength !== 1" v-on:click="deleteSkill">
        <svg>
          <use xlink:href="#trash"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import ProfileCreateTitle from '@/candidates/profile/create/shared/ProfileCreateTitle';
import { autocomplete } from '@/core/mixins/autocomplete';
import { formError } from '@/core/mixins/formErrorHanding';
import { parseMonthYears } from '@/core/mixins/parseMonthYears';
import moment from 'moment';

const MONTHS_IN_YEAR = 12;
const MAX_YEARS = 39;

export default {
  props: {
    skillsLength: null,
    skill: {
      id: null,
      monthsOfExperience: null
    }
  },
  data () {
    return {
      years: null,
      months: null,
      monthsOfExperienceValue: null
    };
  },
  mixins: [
    formError,
    autocomplete,
    parseMonthYears
  ],
  components: {
    InputWrapper,
    Button,
    ProfileCreateTitle
  },
  computed: {
    yearsOfExperience () {
      return moment.duration(this.skill.monthsOfExperience, 'months').years();
    },
    monthOfExperience () {
      return moment.duration(this.skill.monthsOfExperience, 'months').months().toFixed();
    }
  },
  methods: {
    ...mapMutations({
      updateCandidateSkills: 'profile/updateCandidateSkills'
    }),
    setObject (monthsOfExperience) {
      return {
        id: this.skill.id,
        monthsOfExperience: monthsOfExperience,
        skill: {
          id: this.skill.skill.id,
          name: this.skill.skill.name
        },
        __typename: 'Skill'
      };
    },
    onYearsChange (e) {
      let value = parseFloat(e.target.value) || 0;
      if (value <= MAX_YEARS) {
        this.$emit('input-changed');
        const skill = this.setObject(value * MONTHS_IN_YEAR + parseFloat(this.monthOfExperience));
        this.updateCandidateSkills(skill);
        this.$forceUpdate();
      } else {
        this.years = 'Max value 39';
        setTimeout(() => {
          this.years = '';
        }, 3000);
      }
    },
    onMonthChange (e) {
      let value = parseFloat(e.target.value) || 0;
      if (value <= 11) {
        this.$emit('input-changed');
        const skill = this.setObject(parseFloat(this.yearsOfExperience) * MONTHS_IN_YEAR + value);
        this.updateCandidateSkills(skill);
        this.$forceUpdate();
      } else {
        this.months = 'Max value 11';
        setTimeout(() => {
          this.months = '';
        }, 3000);
      }
    },
    deleteSkill () {
      this.$emit('delete-skill');
    }
  }
};
</script>

<style lang="postcss" scoped>
  .profile-edit-skills__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 -10px;
    padding-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    @media (--phoneLarge-viewport) {
      flex-wrap: wrap;
    }
  }

  .profile-edit-skills__box {
    padding: 0 10px;
  }

  .profile-edit-skills__box--btn {
    width: 30px;
    height: 42px;
  }

  .profile-edit-skills__box--skill {
    @media (--phoneLarge-viewport) {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  .profile-edit-skills__value {
    display: block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 120px;
    height: 36px;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 24px;
    color: #455A64;
    text-align: center;
    border: 1px solid #CFD8DC;
    border-radius: 30px;
    overflow: hidden;
    box-sizing: border-box;
    @media (--phone-viewport) {
      width: 100%;
      max-width: 225px;
    }
  }

  .profile-edit-skills__data {
    display: flex;
  }

  .profile-edit-skills__field {
    position: relative;
    display: flex;
    width: 80px;
    margin-right: 25px;
    padding: 6px 0;
    border-bottom: 1px solid #CFD8DC;
    user-select: none;
    &:last-child {
      margin-right: 0;
    }
    @media (--phone-viewport) {
      width: 65px;
    }
  }
  .profile-edit-skills__field--error {
    border-bottom-color: #4DD0E1;
  }

  .profile-edit-skills__input {
    input {
      padding: 0;
      border-bottom: none;
      font-size: 14px;
    }
  }

  .profile-edit-skills__text {
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
  }

  .profile-edit-skills__button-remove {
    position: relative;
    display: block;
    width: 30px;
    height: 42px;
    transition: fill .3s ease;
    &:hover {
      fill: #4DD0E1;
      svg {
        fill: #90A4AE;
      }
    }
    svg {
      display: block;
      width: 14px;
      height: 30px;
      margin: 0 auto;
      fill: #CFD8DC;
    }
  }
</style>
