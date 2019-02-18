<template>
  <div class="dashboard-skills">
    <div class="dashboard-skills__item" v-for="(item, index) of skills" v-bind:key="index">
      <div class="dashboard-skills__skill">
        <span class="dashboard-skills__value" :title="item.skill.name">{{item.skill.name}}</span>
      </div>
      <span class="dashboard-skills__experience">
        <span class="dashboard-skills__experience-item" v-if="parseYears(item.monthsOfExperience)">
          <span class="dashboard-skills__experience-number">{{parseYears(item.monthsOfExperience)}}</span>
          <span class="dashboard-skills__experience-text">{{ 'year' | pluralize(parseYears(item.monthsOfExperience)) }}</span>
        </span>
        <span class="dashboard-skills__experience-item" v-if="parseMonth(item.monthsOfExperience)">
          <span class="dashboard-skills__experience-number">{{parseMonth(item.monthsOfExperience)}}</span>
          <span class="dashboard-skills__experience-text">{{ 'month' | pluralize(parseMonth(item.monthsOfExperience)) }}</span>
        </span>
        <span class="dashboard-skills__experience-item" v-if="!item.monthsOfExperience">
          <span class="dashboard-skills__experience-text">no experience</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>

import { parseMonthYears } from '@/core/mixins/parseMonthYears';
export default {
  mixins: [
    parseMonthYears
  ],
  props: {
    skills: null
  }
};
</script>

<style lang="postcss" scoped>
  .dashboard-skills {
    max-height: 180px;
    padding-right: 10px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
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
  .dashboard-skills__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .dashboard-skills__skill {
    display: inline-flex;
    max-width: 50%;
    border: 1px solid #CFD8DC;
    border-radius: 15px;
    box-sizing: border-box;
  }
  .dashboard-skills__value {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    min-width: 0;
    max-width: 100%;
    height: 28px;
    padding: 0 15px;
    color: #455A64;
    font-size: 14px;
    line-height: 28px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .dashboard-skills__experience {
    display: flex;
    width: 50%;
    padding-left: 7px;
    box-sizing: border-box;
  }
  .dashboard-skills__experience-item {
    display: flex;
    width: 50%;
    padding-right: 4px;
    box-sizing: border-box;
  }
  .dashboard-skills__experience-number {
    display: block;
    padding-right: 4px;
    font-size: 14px;
    line-height: 16px;
    color: #455A64;
  }
  .dashboard-skills__experience-text {
    display: block;
    font-size: 12px;
    line-height: 16px;
    color: #90A4AE;
  }
</style>
