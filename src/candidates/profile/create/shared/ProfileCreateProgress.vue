<template>
  <div class="profile-create-progress">
    <div class="profile-create-progress__bar" :style="'width:' + this.progress + '%'"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    progress: ''
  }
};
</script>

<style lang="postcss" scoped>
  .profile-create-progress {
    position: relative;
    width: 100%;
    height: 9px;
    margin-bottom: 117px;
    border-radius: 4px;
    background-color: #E6F1F4;
  }
  .profile-create-progress__bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 9px;
    border-radius: 4px;
    background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
  }
</style>
