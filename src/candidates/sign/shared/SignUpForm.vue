<template>
  <form class="sign__form" v-on:submit.prevent="onSubmit" autocomplete="off">
    <h1 class="sign__title">Get your dream job</h1>
    <h2 class="sign__description">Let our algorithms find the project that fits you!</h2>

    <InputWrapper
      label="Full Name"
      class="input--label input--mb30 sign__input"
      v-bind:message="formErrorAdd(['name'])"
      v-bind:class="{ 'input--error': formErrorAdd(['name']) }">
      <input
        type="text"
        name="name"
        class="input__field input__field--label"
        v-model="name"
        v-on:focus="formErrorClear('name')"/>
    </InputWrapper>
    <InputWrapper
      label="Email"
      class="input--label input--mb50 sign__input"
      autocomplete="off"
      v-bind:message="formErrorAdd(['email'])"
      v-bind:class="{ 'input--error': formErrorAdd(['email']) }">
      <input
        type="email"
        name="email"
        class="input__field input__field--label"
        v-model="email"
        v-on:focus="formErrorClear('email')"/>
    </InputWrapper>
    <Button text="Create free profile" class="btn--sign"/>
    <div class="sign__navigation">
      <span class="sign__navigation-text">By signing up you agree to our</span>
      <router-link :to="{path: '/terms-of-service'}" target="_blank" class="sign__navigation-link">terms </router-link>
      <span class="sign__navigation-text">and</span>
      <router-link :to="{path: '/privacy-policy'}" target="_blank" class="sign__navigation-link">privacy policy.</router-link>
    </div>
  </form>
</template>

<script>

import { mapActions } from 'vuex';
import InputWrapper from '@/core/components/form/InputWrapper';
import Button from '@/core/components/form/Button';
import { formError } from '@/core/mixins/formErrorHanding';

export default {
  mixins: [
    formError
  ],
  components: {
    InputWrapper,
    Button
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
        .then((response) => {
          if (response.success) {
            this.$router.push({ path: '/sign/success-registration' });
          } else {
            this.errors = response.errors;
          };
        }).catch((error) => {
          if (error) {
            this.errors = error.response.data.errors;
          } else {
            this.errors = { email: [{ message: 'Unexpected error' }] };
          }
        });
    }
  }
};
</script>

<style scoped>
  .sign__form {
    width: 100%;
    background: #fff;
    max-width: 420px;
    margin: 105px 0 140px;
    padding: 40px 30px 20px;
    border-radius: 30px;
    box-sizing: border-box;
    @media (--tablet-viewport) {
      margin: 30px 0 10px;
    }
    @media (--phone-viewport) {
      padding: 30px 20px;
    }
  }
  .sign__title {
    font-size: 36px;
    font-weight: 300;
    text-align: center;
    color: #455A64;
    margin-bottom: 10px;
    @media (--phone-viewport) {
      font-size: 30px;
    }
  }
  .sign__description {
    margin-bottom: 70px;
    font-size: 16px;
    text-align: center;
    color: #455A64;
  }
  .sign__input {
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
  }
  .sign__navigation {
    padding: 20px 0 0;
    font-family: var(--ff-font);
    font-size: 12px;
    text-align: center;
    color: #90A4AE;
  }
  .sign__navigation-link {
    color: rgb(91,212,226);
    text-decoration: none;
    transition: color .3s ease;
    &:hover {
      color: #009EB7;
    }
  }
</style>
