<template>
  <div id="app">
    <router-view/>
    <div v-if="developmentMode" id="development">Development version</div>
  </div>
</template>

<script>
export default {
  computed: {
    developmentMode () {
      return (process.env.DEVELOPMENT_MODE === true);
    }
  }
};
</script>

<style lang="postcss" src="@/core/styles/_import.css"></style>
<style lang="postcss" scoped>
  #development {
    background: #4dd0e1;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 5px;
    height: 20px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 1000;
  }
</style>
