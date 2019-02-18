<template>
  <div class="tests-item">
    <div class="tests-item__progress">
      <svg class="tests-item__progress-ico" xmlns="http://www.w3.org/2000/svg"
           viewBox="-1 -1 34 34">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#009EB6"></stop>
            <stop offset="100%" stop-color="#80DDE9"></stop>
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15.9155" class="tests-item__progress-background"></circle>
        <circle stroke="url(#gradient)" v-bind:style="{strokeDashoffset: calculateTestAccuracyProgressBar}" cx="16" cy="16" r="15.9155" class="tests-item__progress-value"></circle>
      </svg>
      {{this.test.result}}%
    </div>
    <div class="tests-item__box">
      <div class="tests-item__title" :title="test.name">{{test.name}}</div>
      <div class="tests-item__list">
        <div class="tests-item-tag">
          <div class="tests-item-tag__name" :title="test.skill.name">{{test.skill.name}}</div>
        </div>
        <div class="tests-item-tag">
          <div class="tests-item-tag__name" :title="test.proficiencyLevel.name">{{test.proficiencyLevel.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    test: null
  },
  computed: {
    calculateTestAccuracyProgressBar () {
      return 100 - this.test.result;
    }
  }
};
</script>

<style lang="postcss" scoped>
  :root {
    --progress-bar-stroke-width: 1.8;
    --progress-bar-size: 300px;
  }
  .tests-item {
    position: relative;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    min-width: 0;
    padding-left: 100px;
    height: 78px;
  }
  .tests-item__progress {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 78px;
    height: 78px;
    justify-content: center;
    align-items: center;
    font-size: 12.5px;
    color: #455A64;
    line-height: 1.2;
  }
  .tests-item__progress-ico {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .tests-item__progress-background {
    fill: none;
    stroke: #ECEFF1;
    stroke-width: var(--progress-bar-stroke-width);
  }
  .tests-item__progress-value {
    fill: none;
    stroke-dasharray: 100 100;
    stroke-dashoffset: 100;
    stroke-linecap: round;
    stroke-width:var(--progress-bar-stroke-width);
    transition: stroke-dashoffset 1s ease-in-out;
  }
  .tests-item__box {
    width: 100%;
  }
  .tests-item__title {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    font-size: 16px;
    color: #455A64;
    line-height: 1.2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tests-item__list {
    display: flex;
    width: 100%;
    margin: 0 -4px;
    overflow: hidden;
  }
  .tests-item-tag {
    display: inline-block;
    max-width: 50%;
    padding: 0 4px;
    box-sizing: border-box;
  }
  .tests-item-tag__name {
    padding: 0 6px;
    height: 23px;
    background: #FFFFFF;
    font-size: 11px;
    color: #455A64;
    line-height: 1.91;
    border: 1px solid #CFD8DC;
    box-sizing: border-box;
    vertical-align: top;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 20px;
  }
</style>
