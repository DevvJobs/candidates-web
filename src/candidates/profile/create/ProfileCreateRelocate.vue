<template>
  <div class="profile-create__content">
    <ProfileCreateProgress progress="75"></ProfileCreateProgress>
    <div class="profile-create__data">
      <ProfileCreateTitle title="Are you open to relocate?"></ProfileCreateTitle>
      <form class="profile-create-form profile-create-form--switcher" @submit.prevent="onSubmit">
        <InputSwitcher :modelName="'profile/setCandidateOpenToRelocation'"></InputSwitcher>
        <button class="profile-create__btn" type="submit">
          <svg class="profile-create__btn-icon">
            <use xlink:href="#arrow"></use>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InputSwitcher from '@/core/components/form/InputSwitcher';
import Button from '@/core/components/form/Button';
import ProfileCreateTitle from '@/candidates/profile/create/shared/ProfileCreateTitle';
import ProfileCreateProgress from '@/candidates/profile/create/shared/ProfileCreateProgress';

export default {
  components: {
    Button,
    ProfileCreateTitle,
    ProfileCreateProgress,
    InputSwitcher
  },
  computed: {
    ...mapGetters({
      'candidate': 'profile/candidate'
    })
  },
  methods: {
    ...mapActions({
      updateCandidate: 'profile/updateCandidate'
    }),
    onSubmit () {
      const data = {
        name: this.candidate.name,
        openToRelocation: this.candidate.openToRelocation,
        openToRemote: this.candidate.openToRemote,
        countryId: this.candidate.country.id
      };
      this.updateCandidate(data)
        .then(() => {
          this.$router.push({name: 'ProfileCreateRemote'});
        })
        .catch((errors) => {
          console.log(errors);
          if (typeof errors === 'object' && errors._expected === true) {
            if (errors.countryId) {
              this.error = 'Select country';
            } else {
              this.errors = errors;
            };
          } else {
            this.error = 'Unexpected error';
          };
        });
    }
  }
};
</script>

<style lang="postcss" src="./ProfileCreate.css"></style>
