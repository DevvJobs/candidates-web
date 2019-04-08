<template>
  <div class="search">
    <div class="search__title">Filter by</div>
    <div class="search-input" :class="{'search-input--focused': isInputFocused}">
      <ul class="search-tag__list">
        <SearchTag
          v-for="(searchTag, index) of searchParams"
          v-bind:key="index"
          v-on:remove-tag="removeSearchTag(index)"
          :item="searchTag"
        ></SearchTag>
      </ul>
      <v-autocomplete
        ref="autocomplete"
        class="search-input__field"
        v-model="selectedSearchParam"
        @input="onAutoCompleteSubmit"
        @focus="onAutoCompleteFocused"
        @blur="isInputFocused = false"
        @update-items="updateSearchParamsVariants"
        :min-len="0"
        :input-attrs="{
          name: 'search',
          autocomplete: 'off',
          disabled: disableAutoComplete
        }"
        :wait="300"
        :items="searchParamVariants"
        :get-label="getVariantLabel"
        :component-item="selectTemplate"
        :placeholder="placeholderText()"
        :auto-select-one-item="false">
      </v-autocomplete>
      <button type="button" class="search-input__btn-clear" @click="clearSearchTags()">Clear all</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapMutations } from 'vuex';
import Select from '@/core/components/form/Select.vue';
import SearchTag from './SearchTag';

export default {
  components: {
    SearchTag
  },
  computed: {
    ...mapGetters({
      'templates': 'tests/templates',
      'proficiencyLevels': 'tests/proficiencyLevels',
      'searchParams': 'tests/searchParams'
    }),
    isSkillAdded () {
      const skill = _.find(this.searchParams, (param) => param.type === 'skill');
      if (!skill) {
        return false;
      } else {
        return true;
      }
    },
    isProficiencyLevelAdded () {
      const level = _.find(this.searchParams, (param) => param.type === 'level');
      if (!level) {
        return false;
      } else {
        return true;
      }
    },
    disableAutoComplete () {
      return this.isSkillAdded && this.isProficiencyLevelAdded;
    },
    searchParamsSkills () {
      const allSkills = this.templates.map((item) => { return {name: item.skill.name, type: 'skill'}; });
      const foundNames = {};
      const uniqueSkills = allSkills.filter(function (item) {
        if (foundNames[item.name] === true) {
          return false;
        } else {
          foundNames[item.name] = true;
          return true;
        }
      });

      return uniqueSkills;
    },
    searchParamsProficiencyLevels () {
      return this.proficiencyLevels.map((item) => { return { name: item.name, type: 'level' }; });
    }
  },
  data () {
    return {
      isInputFocused: false,
      item: null,
      searchParamVariants: [],
      selectedSearchParam: null,
      selectTemplate: Select
    };
  },
  methods: {
    ...mapMutations({
      setSearchParams: 'tests/setSearchParams',
      addSearchParam: 'tests/addSearchParam',
      removeSearchParam: 'tests/removeSearchParam'
    }),
    placeholderText () {
      if (this.isProficiencyLevelAdded && this.isSkillAdded) {
        return '';
      }
      if (this.isSkillAdded) {
        return 'Type proficiency level';
      }
      if (this.isProficiencyLevelAdded) {
        return 'Type skill';
      }
      return 'Type skill or proficiency level';
    },
    onAutoCompleteFocused () {
      this.isInputFocused = true;
    },
    onAutoCompleteSubmit () {
      if (!this.selectedSearchParam) { return; }
      this.addSearchParam(this.selectedSearchParam);
      this.selectedSearchParam = null;
      this.updateSearchParamsVariants();
    },
    updateSearchParamsVariants (searchText = '') {
      let variants = this.searchParamsSkills.concat(this.searchParamsProficiencyLevels);
      if (this.isSkillAdded) {
        variants = this.searchParamsProficiencyLevels;
      }
      if (this.isProficiencyLevelAdded) {
        variants = this.searchParamsSkills;
      }
      this.searchParamVariants = variants.filter((item) => item.name.toLowerCase().match(searchText.toLowerCase()));
    },
    getVariantLabel (item) {
      if (!this.selectedSearchParam) { return ''; }
      return item && item.name;
    },
    removeSearchTag (index) {
      this.removeSearchParam(index);
      this.updateSearchParamsVariants();
    },
    clearSearchTags () {
      this.setSearchParams([]);
      this.updateSearchParamsVariants();
    }
  },
  created () {
    this.searchParamVariants = this.searchParamsSkills.concat(this.searchParamsProficiencyLevels);
  }
};
</script>

<style lang="postcss" scoped>
  .search {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 720px;
    width: 100%;
    margin-bottom: 55px;
  }
  .search__title {
    flex: 1 0 auto;
    display: block;
    margin-right: 24px;
    font-size: 12px;
    line-height: 16px;
    color: #90A4AE;
    text-transform: uppercase;
    @media (--phone-viewport) {
      display: none;
    }
  }
  .search-input {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 2px 16px 2px;
    border-radius: 32px;
    border: 1px solid #ECEFF1;
    background-color: #fff;
    color: #455A64;
    transition: border-color .3s ease;
    box-sizing: border-box;
  }
  .search-input--focused {
    border-color: #90A4AE;
  }
  .search-input__icon {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 24px;
    height: 24px;
    fill: #CFD8DC;
    z-index: 10;
  }
  .search-tag__list {
    display: block;
  }
  .search__btn {
    flex: 1 0 auto;
    position: relative;
    z-index: 1;
    width: 100px;
    height: 45px;
    margin-left: 35px;
    padding: 7px 10px 7px 35px;
    border-radius: 30px;
    background-color: #009EB7;
    cursor: pointer;
    outline: 0;
    text-align: left;
    box-sizing: border-box;
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 30px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
    }
    &:hover,
    &:focus {
      &::after {
        opacity: 0;
      }
    }
    &:disabled {
      background-color: transparent;
      border: 1px solid #CFD8DC;
      cursor: default;
      pointer-events: none;
      &::after {
        background-image: none;
      }
      .search__icon {
        fill: #CFD8DC;
      }
      .search__text {
        color: #CFD8DC;
      }
    }
    @media (--phone-viewport) {
      width: 45px;
      margin-left: 15px;
      .search__text {
        display: none;
      }
    }
  }
  .search__btn--applied {
    transition: color .3s ease;
    background-color: transparent;
    &::after {
      z-index: -2;
      width: 100%;
      height: 100%;
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
      border-radius: 30px;
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
      .search__icon {
        fill: #fff;
      }
      .search__text {
        color: #fff;
      }
    }
    .search__icon {
      fill: #4DD0E1;
    }
    .search__text {
      color: #4DD0E1;
    }
  }
  .search__icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    fill: #fff;
    @media (--phone-viewport) {
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
  .search__text {
    display: block;
    font-size: 14px;
    line-height: 18px;
    color: #fff;
  }
  .search-input__btn-clear {
    position: absolute;
    top: 100%;
    right: 10px;
    margin-top: 7px;
    font-size: 11px;
    line-height: 14px;
    font-weight: 600;
    color: #90A4AE;
    text-transform: uppercase;
    transition: color .3s ease;
    &:hover {
      color: #455A64;
    }
  }
</style>
