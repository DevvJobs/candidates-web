<template>
  <div class="sign">
    <SignHeader class="sign-header sign-header--logo"></SignHeader>
    <form class="sign__form" @submit.prevent="onSubmit">
      <div class="sign__box">
        <h1 class="sign__title">Get your dream job</h1>
        <h2 class="sign__description">Let our algorithms find the project that fits you!</h2>

        <div class="sign-name-wrapper">
          <InputWrapper
            label="FULL NAME"
            class="sign__input"
            v-bind:message="formErrorAdd(['name'])"
            v-bind:class="{ 'input--error': formErrorAdd(['name']) }">
            <input
              type="text"
              name="name"
              class="input__field input__field--label"
              v-model="name"
              v-on:focus="formErrorClear('name')"/>
          </InputWrapper>
        </div>
        <div class="sign-email-wrapper">
          <InputWrapper
            label="EMAIL"
            class="sign__input"
            v-bind:message="formErrorAdd(['email'])"
            v-bind:class="{ 'input--error': formErrorAdd(['email']) }">
            <input
              type="email"
              name="email"
              class="input__field input__field--label"
              v-model="email"
              v-on:focus="formErrorClear('email')"/>
          </InputWrapper>
        </div>
      </div>
      <button type="submit" class="sign__btn" :disabled="isFormEmpty">
        <svg class="sign__btn-icon">
          <use xlink:href="#arrow"></use>
        </svg>
      </button>
    </form>
    <div class="sign__navigation">
      <span class="sign__navigation-text">By signing up you agree to our</span>
      <router-link :to="{path: '/terms-of-service'}" target="_blank" class="sign__navigation-link">terms </router-link>
      <span class="sign__navigation-text">and</span>
      <router-link :to="{path: '/privacy-policy'}" target="_blank" class="sign__navigation-link">privacy policy.</router-link>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import { formError } from '@/core/mixins/formErrorHanding';
import SignHeader from '@/candidates/sign/shared/SignHeader.vue';

export default {
  mixins: [
    formError
  ],
  components: {
    InputWrapper,
    Button,
    SignHeader
  },
  computed: {
    isFormEmpty () {
      return this.name.length < 1 || this.email.length < 1;
    }
  },
  data: () => {
    return {
      name: '',
      email: ''
    };
  },
  methods: {
    ...mapActions({
      signUp: 'sign/signUp'
    }),
    onSubmit () {
      this.signUp({
        name: this.name,
        email: this.email
      })
        .then(() => {
          this.$router.push({ path: '/sign/success-registration' });
        }).catch((error) => {
          if (error.response) {
            this.errors = error.response.data.details;
          } else {
            this.errors = {email: [{message: 'Unexpected error'}]};
          }
        });
    }
  }
};
</script>

<style lang="postcss" scoped src="@/candidates/sign/shared/SignUpLayoutStyles.css"></style>
