<template>
  <div class="profile-create__content">
    <ProfileCreateProgress progress="25"></ProfileCreateProgress>
    <div class="profile-create__data">
      <ProfileCreateTitle :candidateName="candidate.name || ''" description="Pleasure to meet you. Let’s get you started." title="Where do you live?"></ProfileCreateTitle>
      <div class="profile-create-form">
        <div class="profile-create-form__box">
          <InputWrapper v-bind:message="error" label="Country">
            <div id="profile-create-form__input-wrapper">
              <v-autocomplete
                v-model="chosenLocation"
                v-on:input="onAutocompleteSubmit"
                v-bind:class="{ 'v-autocomplete--error': error }"
                @update-items="updateItems"
                :items="items"
                :input-attrs="{
                  name: 'country',
                  autocomplete: 'off',
                  id: 'country-input',
                  }"
                :get-label="getLabel"
                :component-item='template'
                :min-len="0"
                :placeholder="'SELECT COUNTRY'"
                @focus="clearError()"
                :auto-select-one-item="false"
                id="country">
              </v-autocomplete>
            </div>
          </InputWrapper>
          <button v-on:click="onSubmit" class="profile-create__btn" :disabled="!chosenLocation" type="button">
            <svg class="profile-create__btn-icon">
              <use xlink:href="#arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InputWrapper from '@/core/components/form/InputWrapper';
import ProfileCreateTitle from '@/candidates/profile/create/shared/ProfileCreateTitle';
import ProfileCreateProgress from '@/candidates/profile/create/shared/ProfileCreateProgress';
import { autocomplete } from '@/core/mixins/autocomplete';

export default {
  mixins: [
    autocomplete
  ],
  components: {
    InputWrapper,
    ProfileCreateTitle,
    ProfileCreateProgress
  },
  data () {
    return {
      location: null
    };
  },
  computed: {
    ...mapGetters({
      'candidate': 'profile/candidate'
    })
  },
  mounted () {
    const inputSkill = document.getElementById('country-input');

    if (this.$isAndroid) {
      inputSkill.type = 'password';

      this.$nextTick(() => {
        inputSkill.type = 'search';
      });
    }
  },
  methods: {
    ...mapActions({
      updateCandidate: 'profile/updateCandidate',
      fetchLocations: 'profile/fetchLocations'
    }),
    onAutocompleteSubmit () {
      if (this.chosenLocation) {
        this.location = this.chosenLocation;
      }
    },
    updateItems (searchText) {
      this.fetchLocations(searchText)
        .then((items) => {
          this.items = items;
        })
        .catch(() => { /* error */ });
    },
    onSubmit () {
      const data = {
        name: this.candidate.name,
        openToRelocation: this.candidate.openToRelocation,
        openToRemote: this.candidate.openToRemote,
        countryId: this.location ? this.location.id : 0
      };
      this.updateCandidate(data)
        .then(() => {
          this.$router.push({ name: 'ProfileCreateSkills' });
        })
        .catch((errors) => {
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
