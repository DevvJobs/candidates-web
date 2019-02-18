<template>
  <div class="all-tests">
    <router-link class="all-tests__link" :to="{name: 'CandidateTests'}">
      <svg class="all-tests__link-icon">
        <use xlink:href="#chevron-left"></use>
      </svg>
      Back to my tests
    </router-link>
    <div class="all-tests__header">
      <div class="all-tests__title">
        <svg class="all-tests__icon">
        <use xlink:href="#plus-sign"></use>
        </svg>
        Add knowledge tests
      </div>
    </div>
    <div class="all-tests__content">
      <SearchBar></SearchBar>
      <div class="all-tests__list">
        <div class="all-tests__item" v-for="(template, index) in getTemplates()" v-bind:key="index">
          <AllTestsPreview :template="template"></AllTestsPreview>
        </div>
      </div>
      <div class="tests-message" v-if="getTemplates().length === 0">
        <div class="tests-message__description">
          <p class="tests-message__text">No items for this search parameters.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AllTestsPreview from '@/candidates/profile/tests/all/AllTestsPreview';
import SearchBar from '@/candidates/profile/tests/all/search/SearchBar';

export default {
  components: {
    AllTestsPreview,
    SearchBar
  },
  computed: {
    ...mapGetters({
      'templates': 'tests/templates',
      'searchParams': 'tests/searchParams'
    })
  },
  methods: {
    getTemplates () {
      if (this.searchParams.length !== 0) {
        let params = {};
        this.searchParams.forEach(param => {
          params[param.type] = param.name;
        });
        if (params['level'] && params['skill']) {
          console.log(this.templates.filter(template => {
            return template.proficiencyLevel.name === params['level'] && template.skill.name === params['skill'];
          }));
          return this.templates.filter(template => {
            return template.proficiencyLevel.name === params['level'] && template.skill.name === params['skill'];
          });
        }
        if (params['skill']) {
          return this.templates.filter(template => {
            return template.skill.name === params['skill'];
          });
        }
        if (params['level']) {
          return this.templates.filter(template => {
            return template.proficiencyLevel.name === params['level'];
          });
        }
      } else {
        return this.templates;
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
  .all-tests {
    padding: 30px 70px;
    @media (--desktopLarge-viewport) {
      padding: 30px;
    }
    @media (--phoneLarge-viewport) {
      padding: 15px 20px;
    }
  }
  .all-tests__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .all-tests__title {
    position: relative;
    flex: 1;
    display: block;
    padding: 0 0 15px 25px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 300;
    color: #90A4AE;
    border-bottom: 1px solid #ECEFF1;
  }
  .all-tests__icon {
    position: absolute;
    top: 9px;
    left: 0;
    width: 13px;
    height: 14px;
    fill: #CFD8DC;
  }
  .all-tests__content {
    padding-left: 40px;
    @media (--desktopLarge-viewport) {
      padding-left: 0;
    }
  }
  .all-tests__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -13px;
    @media (--phone-viewport) {
      justify-content: center;
      margin: 0;
    }
  }
  .all-tests__item {
    width: 25%;
    max-width: 250px;
    padding: 0 13px 48px;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      width: 33.3333%;
    }
    @media (--desktopSmall-viewport) {
      width: 50%;
    }
    @media (--tablet-viewport) {
      width: 33.3333%;
    }
    @media (--phoneLarge-viewport) {
      width: 50%;
    }
    @media (--phone-viewport) {
      width: 100%;
      max-width: 300px;
      padding: 0 0 25px;
    }
  }
  .all-tests__link {
    position: relative;
    margin-bottom: 30px;
    display: inline-block;
    padding-left: 17px;
    vertical-align: top;
    color: #4DD0E1;
    font-size: 14px;
  }
  .all-tests__link-icon {
    position: absolute;
    top: 50%;
    left: 0;
    width: 8px;
    height: 12px;
    margin-top: -5px;
    font-size: 14px;
    line-height: 1.2;
    fill: #4DD0E1;
  }

  .tests-message {
    display: flex;
    height: 350px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
  }
  .tests-message__description {
    margin-bottom: 45px;
  }
  .tests-message__text{
    font-size: 24px;
    line-height: 28px;
    color: #CFD8DC;
  }
  .tests-message__btn {
    position: relative;
    z-index: 1;
    display: inline-block;
    width: 160px;
    height: 40px;
    padding: 10px 15px 9px;
    font-size: 16px;
    color: #4DD0E1;
    font-family: var(--ff-font);
    border-radius: 20px;
    background-color: transparent;
    outline: 0;
    border: 0;
    cursor: pointer;
    box-sizing: border-box;
    transition: color .3s ease;
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
      border-radius: 20px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
    }
    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background-color: #fff;
      border-radius: 20px;
      opacity: 1;
      transition: opacity .3s ease;
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
  }
</style>
