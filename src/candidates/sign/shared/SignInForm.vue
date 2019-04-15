<template>
  <form class="sign-in-form" v-on:submit.prevent="onSubmit">
    <div class="sign-in-form__box sign-in-form__box--input">
      <InputWrapper
        class="input--search"
        v-bind:message="formErrorAdd(['email'])"
        v-bind:class="{ 'input--error': formErrorAdd(['email']) }"
        label="Email">
        <input
          name="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"/>
      </InputWrapper>
    </div>
    <div class="sign-in-form__box">
      <Button text="LOG IN" class="btn--transparent btn--w80" :disabled="isFormEmpty"/>
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
            this.errors = { email: [{ message: 'Unexpected error' }] };
          }
        });
    }
  }
};
</script>

<style scoped>
  .sign-in-form {
    display: flex;
    align-items: flex-end;
    margin: 0 -10px;
    @media (--tablet-viewport) {
      justify-content: center;
    }
  }
  .sign-in-form__box {
    padding: 0 10px;
  }
  .sign-in-form__box--input {
    width: 260px;
  }
</style>
