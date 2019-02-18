<template>
  <form v-on:submit.prevent="onSubmit" class="profile-edit-about">
    <div class="profile-edit-about__box profile-edit-about__box--img">
      <div class="profile-edit-about__img">
        <Avatar :type="'large'" :name="candidate.name"></Avatar>
      </div>
      <div class="profile-edit-about-field">
        <span class="profile-edit-about-field__title">Email</span>
        <span class="profile-edit-about-field__value">{{candidate.email}}</span>
      </div>
    </div>
    <div class="profile-edit-about__box">
      <div class="profile-edit-about__list">
        <div class="profile-edit-about__item">
          <InputWrapper v-bind:message="formErrorAdd(['name'])" label="Full Name" class="input--label">
            <input
              type="text"
              name="name"
              v-on:focus="formErrorClear(['name'])"
              v-on:change="setMessage('MESSAGE_ERROR')"
              class="input__field input__field--label"
              v-model="name"/>
          </InputWrapper>
        </div>
        <div class="profile-edit-about__item">
          <InputWrapper v-bind:message="error" label="Country">
            <div id="profile-edit-about__input-wrapper">
              <v-autocomplete
                v-model="chosenLocation"
                v-bind:class="{ 'v-autocomplete--error': error }"
                @update-items="updateItems"
                :items="items"
                :input-attrs="{
                  name: 'country',
                  autocomplete: 'off',
                  id: 'country-input'
                  }"
                v-on:input="setMessage('MESSAGE_ERROR')"
                :get-label="getLabel"
                :component-item='template'
                :min-len="0"
                :placeholder="'SELECT COUNTRY'"
                @focus="clearError('')"
                :auto-select-one-item="false"
                :wait="300">
              </v-autocomplete>
            </div>
          </InputWrapper>
        </div>
        <div class="profile-edit-about__item profile-edit-about__item--checkbox">
          <InputCheckbox value="I’m open to work remotely">
            <input
              v-on:change="setMessage('MESSAGE_ERROR')"
              class="input-checkbox__input"
              type="checkbox"
              v-model="openToRemote">
          </InputCheckbox>
        </div>
        <div class="profile-edit-about__item profile-edit-about__item--checkbox">
          <InputCheckbox value="I’m open to relocation">
            <input
              class="input-checkbox__input"
              v-on:change="setMessage('MESSAGE_ERROR')"
              type="checkbox"
              v-model="openToRelocation">
          </InputCheckbox>
        </div>
        <div class="profile-edit-about__item profile-edit-about__item--full">
          <Button v-bind:type="'submit'" text="Save" class="profile-edit-about__btn btn--h40"></Button>
          <span class="profile-edit-about__msg profile-edit-about__msg--error" v-if="showMessageError">You have unsaved changes</span>
          <span class="profile-edit-about__msg profile-edit-about__msg--success" v-if="showMessageSuccess">Changes saved successfully!</span>
          <span class="profile-edit-about__msg profile-edit-about__msg--loading" v-if="showMessageLoading">
          <svg class="profile-edit-about__icon">
            <use xlink:href="#loader"></use>
          </svg>
          Saving changes...
        </span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formError } from '@/core/mixins/formErrorHanding';
import { autocomplete } from '@/core/mixins/autocomplete';

import InputWrapper from '@/core/components/form/InputWrapper';
import InputCheckbox from '@/core/components/form/InputCheckbox';
import Button from '@/core/components/form/Button';
import Avatar from '@/core/components/Avatar';

export default {
  mixins: [
    autocomplete,
    formError
  ],
  components: {
    InputWrapper,
    InputCheckbox,
    Button,
    Avatar
  },
  computed: {
    ...mapGetters({
      candidate: 'profile/candidate'
    }),
    showMessageError () {
      return this.btnMessage === 'MESSAGE_ERROR';
    },
    showMessageSuccess () {
      return this.btnMessage === 'MESSAGE_SUCCESS';
    },
    showMessageLoading () {
      return this.btnMessage === 'MESSAGE_LOADING';
    }
  },
  data () {
    return {
      name: null,
      btnMessage: null,
      openToRelocation: null,
      openToRemote: null
    };
  },
  created () {
    this.name = this.candidate.name;
    this.chosenLocation = this.candidate.country;
    this.openToRelocation = this.candidate.openToRelocation;
    this.openToRemote = this.candidate.openToRemote;
  },
  mounted () {
    const inputSkill = document.getElementById('country-input');
    this.btnMessage = null;

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
    setMessage (text) {
      this.btnMessage = text;
    },
    updateItems (searchText) {
      this.fetchLocations(searchText)
        .then((items) => {
          this.items = items;
        })
        .catch(() => { /* error */ });
    },
    onSubmit () {
      this.setMessage('MESSAGE_LOADING');
      const data = {
        name: this.name,
        openToRelocation: this.openToRelocation,
        openToRemote: this.openToRemote,
        countryId: this.chosenLocation ? this.chosenLocation.id : 0
      };
      this.updateCandidate(data)
        .then(() => {
          this.setMessage('MESSAGE_SUCCESS');
          setTimeout(() => {
            this.setMessage(null);
          }, 5000);
        })
        .catch((errors) => {
          this.setMessage('MESSAGE_ERROR');
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

<style lang="postcss" scoped>
  .profile-edit-about {
    max-width: 984px;
    width: 100%;
    padding-top: 30px;
    box-sizing: border-box;
    @media (--desktopLarge-viewport) {
      padding-top: 40px;
    }
  }
  .profile-edit-about__box {
    position: relative;
    padding-left: 180px;
    @media (--desktopLarge-viewport) {
      padding-left: 0;
    }
  }
  .profile-edit-about__box--img {
    height: 120px;
    margin-bottom: 10px;
    padding-left: 180px;
    @media (--desktopLarge-viewport) {
      margin-bottom: 40px;
    }
    @media (--phoneLarge-viewport) {
      height: 100px;
      padding-left: 130px;
    }
    @media (--phone-viewport) {
      height: 80px;
      padding-left: 100px;
    }
  }
  .profile-edit-about__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #ECEFF1;
    overflow: hidden;
    transform: translateZ(0);
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
    @media (--phoneLarge-viewport) {
      width: 100px;
      height: 100px;
    }
    @media (--phone-viewport) {
      width: 80px;
      height: 80px;
    }
  }
  .profile-edit-about__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -40px;
    @media (--desktop-viewport) {
      margin: 0 -20px;
    }
    @media (--desktopSmall-viewport) {
      margin: 0 -10px;
    }
    @media (--phoneLarge-viewport) {
      margin: 0;
    }
  }
  .profile-edit-about__item {
    width: calc(50% - 40px);
    padding: 0 40px 60px;
    box-sizing: border-box;
    &:last-child {
      padding-bottom: 0;
    }
    @media (--desktop-viewport) {
      width: calc(50% - 20px);
      padding: 0 20px 70px;
    }
    @media (--desktopSmall-viewport) {
      width: calc(50% - 10px);
      padding: 0 10px 40px;
    }
    @media (--phoneLarge-viewport) {
      width: 100%;
      padding: 0 0 40px;
    }
  }
  .profile-edit-about__item--checkbox {
    @media (--desktopSmall-viewport) {
      width: 100%;
    }
  }
  .profile-edit-about__item--full {
    width: 100%;
  }
  .profile-edit-about-field {
    padding-top: 20px;
    @media (--phone-viewport) {
      padding-top: 0;
    }
  }
  .profile-edit-about-field__title {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    color: #90A4AE;
    font-weight: 600;
    text-transform: uppercase;
  }
  .profile-edit-about-field__value {
    display: block;
    color: #455A64;
    word-break: break-all;
  }
  .profile-edit-about__btn {
    display: inline-block;
    width: 110px;
    margin-right: 24px;
  }
  .profile-edit-about__msg {
    position: relative;
    display: inline-block;
    font-size: 12px;
    line-height: 24px;
  }
  .profile-edit-about__msg--error {
    color: #4DD0E1;
  }
  .profile-edit-about__msg--success {
    color: #36D7B7;
  }
  .profile-edit-about__msg--loading {
    padding-left: 34px;
    color: #CFD8DC;
  }
  .profile-edit-about__icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    animation: spin .6s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
