<template>
  <div class="dashboard-info">
    <div class="dashboard-info__item">
    <svg class="dashboard-info__icon">
      <use xlink:href="#email"></use>
    </svg>
      <span class="dashboard-info__value">{{candidate.email}}</span>
    </div>
    <div class="dashboard-info__item">
      <svg class="dashboard-info__icon">
        <use xlink:href="#remote"></use>
      </svg>
      <span class="dashboard-info__value" v-if="!candidate.openToRemote">No remote work</span>
      <span class="dashboard-info__value" v-if="candidate.openToRemote">I’m open to work remotely</span>
    </div>
    <div class="dashboard-info__item">
      <svg class="dashboard-info__icon">
        <use xlink:href="#relocation"></use>
      </svg>
      <span class="dashboard-info__value" v-if="!candidate.openToRelocation">No relocation</span>
      <span class="dashboard-info__value" v-if="candidate.openToRelocation">I’m open to relocation</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    candidate: null
  }
};
</script>

<style lang="postcss" scoped>
  .dashboard-info__item {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }
  .dashboard-info__icon {
    display: inline-block;
    padding-right: 10px;
    fill: #CFD8DC;
    width: 20px;
    height: 20px;
  }
  .dashboard-info__value {
    display: inline-block;
    font-size: 14px;
    line-height: 16px;
    color: #455A64;
  }
</style>
