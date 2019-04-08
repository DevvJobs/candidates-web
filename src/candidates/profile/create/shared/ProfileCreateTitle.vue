<template>
  <h2 class="profile-create-title">
    <span class="profile-create-title__description" v-if="candidateName">Greetings {{ candidateName }}!</span>
    <span class="profile-create-title__description" v-if="description">{{ description }}</span>
    <span class="profile-create-title__title">{{ title }}</span>
  </h2>
</template>

<script>
export default {
  name: 'Profileprofile-createTitle',
  props: {
    candidateName: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="postcss">
  .profile-create-title {
    position: relative;
    min-height: 60px;
    margin-bottom: 70px;
    @media (--phoneLarge-viewport) {
      margin-bottom: 40px;
    }
  }
  .profile-create-title__description {
    display: block;
    font-size: 24px;
    line-height: 30px;
    color : #90A4AE;
    font-family: var(--ff-font);
    @media (--phoneLarge-viewport) {
      font-size: 22px;
      line-height: 28px;
    }
  }
  .profile-create-title__title {
    font-size : 24px;
    line-height: 30px;
    color : #455A64;
    font-family: var(--ff-font);
    @media (--phoneLarge-viewport) {
      font-size: 22px;
      line-height: 28px;
    }
  }
</style>
