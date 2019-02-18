<template>
  <div class="profile-edit">
    <div class="profile-edit__box">
      <div class="profile-edit__title">General info</div>
      <ProfileEditAbout></ProfileEditAbout>
    </div>
    <div class="profile-edit__box" id="skills">
      <div class="profile-edit__title">My skills</div>
      <ProfileEditSkills></ProfileEditSkills>
    </div>
  </div>
</template>

<script>
import ProfileEditAbout from '@/candidates/profile/edit/shared/ProfileEditAbout.vue';
import ProfileEditSkills from '@/candidates/profile/edit/shared/ProfileEditSkills.vue';

export default {
  components: {
    ProfileEditAbout,
    ProfileEditSkills
  },
  mounted () {
    if (this.$route.hash) {
      setTimeout(() => this.scrollFix(this.$route.hash), 1);
    }
  },
  methods: {
    scrollFix (hashbang) {
      location.href = hashbang;
    }
  },
  destroyed () {
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="postcss" scoped>
  .profile-edit {
    padding: 10px 130px;
    @media (--desktopLarge-viewport) {
      padding: 40px 40px;
    }
    @media (--desktop-viewport) {
      padding: 40px 30px;
    }
    @media (--tablet-viewport) {
      padding: 90px 20px 0;
    }
  }
  .profile-edit__box {
    margin-bottom: 20px;
    @media (--desktopLarge-viewport) {
      margin-bottom: 100px;
    }
    @media (--tablet-viewport) {
      margin-bottom: 80px;
    }
  }
  .profile-edit__title {
    padding-top: 30px;
    padding-bottom: 10px;
    font-size: 16px;
    line-height: 20px;
    color: #90A4AE;
    text-transform: uppercase;
    border-bottom: 3px solid #ECEFF1;
    @media (--tablet-viewport) {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
</style>
