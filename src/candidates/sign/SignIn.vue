<template>
  <div class="sign">
    <SignHeader class="sign-header sign-header--logo"></SignHeader>
    <form class="sign__form" @submit.prevent="onSubmit">
      <div class="sign__box">
        <h1 class="sign__title">Good to see you again!</h1>
        <InputWrapper
          label="EMAIL"
          class="sign__input"
          v-bind:message="formErrorAdd(['email'])"
          v-bind:class="{ 'input--error': formErrorAdd(['email']) }">
          <input name="email" v-model="email" type="email"/>
        </InputWrapper>
      </div>
      <button type="submit" class="sign__btn" :disabled="isFormEmpty">
        <svg class="sign__btn-icon">
          <use xlink:href="#arrow"></use>
        </svg>
      </button>
    </form>
    <div class="sign__navigation">
      <span class="sign__navigation-text">First time here?</span>
      <button
        type="button" v-on:click="signInRedirect()"
        class="sign__navigation-link"
      >Create Account</button>
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
      return this.email.length < 1;
    }
  },
  data: () => {
    return {
      email: ''
    };
  },
  methods: {
    ...mapActions({
      signIn: 'sign/requestLoginCode'
    }),
    signInRedirect () {
      localStorage.removeItem('lastStepComplete');
      this.$router.push({path: '/sign/up'});
    },
    onSubmit () {
      this.signIn(this.email)
        .then((response) => {
          if (response.success) {
            this.$router.push({ path: '/sign/verification-code' });
          } else {
            this.errors = response.errors;
          };
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

<style lang="postcss" scoped src="@/candidates/sign/shared/SignLayoutStyles.css"></style>
