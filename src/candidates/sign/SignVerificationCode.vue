<template>

  <div class="sign">
    <SignHeader class="sign-header sign-header--logo"></SignHeader>

    <form class="sign__form" v-on:submit.prevent="onSubmit">
      <div class="sign__box">
        <h1 class="sign__title">Check your email!</h1>
        <InputWrapper
          label="Enter your login code"
          class="input--label input--mb30 sign__input"
          v-bind:message="formErrorAdd(['code'])"
          v-bind:class="{ 'input--error': formErrorAdd(['code']) }">
          <input
            type="text"
            v-model="code"
            v-on:focus="formErrorClear('code')"
            class="input__field input__field--label"/>
        </InputWrapper>
      </div>
      <button type="submit" class="sign__btn" :disabled="isCodeEmty">
        <svg class="sign__btn-icon">
          <use xlink:href="#arrow"></use>
        </svg>
      </button>
    </form>
    <div class="sign__navigation">
      <span class="sign__navigation-text">SESSION ID: {{sessionId()}}</span>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';

import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import { formError } from '@/core/mixins/formErrorHanding';
import authService from '@/candidates/core/services/auth.service';
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
  data () {
    return {
      code: ''
    };
  },
  computed: {
    ...mapGetters({
      'login_attempt_token': 'sign/login_attempt_token',
      'session_id': 'sign/session_id',
      'email': 'sign/email'
    }),
    isCodeEmty () {
      return this.code.length < 1;
    }
  },
  methods: {
    ...mapActions({
      signIn: 'sign/submitLoginCode'
    }),
    sessionId () {
      return authService.session_id;
    },
    onSubmit () {
      this.signIn(this.code)
        .then(() => {
          this.$router.push({path: '/profile/create'});
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
