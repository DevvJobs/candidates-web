<template>
  <div class="sign-message">
    <div class="sign-message__content">
      <svg class="sign-message__icon">
        <use xlink:href="#check-stroke"></use>
      </svg>
      <h2 class="sign-message__title">Your account has been successfully created. </h2>
      <p class="sign-message__text">
        An email has been sent to you with instructions on how to log in.
      </p>
      <InputWrapper
         class="sign__input"
         v-bind:message="formErrorAdd(['email'])"
         v-bind:class="{ 'input--error': formErrorAdd(['email']) }">
        <button @click="logIn" class="sign-message__btn">Log in now</button>
      </InputWrapper>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InputWrapper from '@/core/components/form/InputWrapper';
import { formError } from '@/core/mixins/formErrorHanding';

export default {
  mixins: [
    formError
  ],
  components: {
    InputWrapper
  },
  computed: {
    ...mapGetters({
      'email': 'sign/email'
    })
  },
  methods: {
    ...mapActions({
      signIn: 'sign/requestLoginCode'
    }),
    logIn () {
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
            this.errors = { email: [{ message: 'Unexpected error' }] };
          }
        });
    }
  }
};
</script>

<style lang="postcss" scoped>
  .sign-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  .sign-message__content {
    text-align: center;
  }
  .sign-message__icon {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-bottom: 35px;
    fill: #4dd0e1;
  }
  .sign-message__title {
    display: block;
    margin-bottom: 10px;
    font-size: 32px;
    line-height: 38px;
    font-weight: 200;
    color: #455A64;
    @media (--phoneLarge-viewport) {
      font-size: 28px;
      line-height: 34px;
    }
  }
  .sign-message__text {
    display: block;
    margin-bottom: 60px;
    font-size: 18px;
    line-height: 24px;
    color: #455A64;
    @media (--phoneLarge-viewport) {
      font-size: 18px;
      line-height: 22px;
    }
  }
  .sign-message__btn {
    position: relative;
    z-index: 1;
    display: block;
    width: 160px;
    height: 50px;
    margin: 0 auto;
    padding: 18px 15px;
    font-size: 14px;
    font-family: var(--ff-font);
    color: #fff;
    text-transform: uppercase;
    border: 0;
    border-radius: 40px;
    background-color: #009EB7;
    outline: 0;
    box-sizing: border-box;
    cursor: pointer;
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 40px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
    }
    &:hover,
    &:focus {
      &::after {
        opacity: 0;
      }
    }
  }
</style>
