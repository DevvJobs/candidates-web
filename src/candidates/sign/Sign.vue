<template>
  <div class="sign">
    <SignHeader class="sign-header" :showLink="true">
      <SignInForm class="header__form"></SignInForm>
    </SignHeader>
    <div class="sign__data" id="signUp">
      <SignUpForm></SignUpForm>
    </div>
    <SignSteps></SignSteps>
    <SignMarketing></SignMarketing>
  </div>
</template>

<script>
import SignInForm from '@/candidates/sign/shared/SignInForm';
import SignUpForm from '@/candidates/sign/shared/SignUpForm';
import SignHeader from '@/candidates/sign/shared/SignHeader';
import SignSteps from '@/candidates/sign/shared/SignSteps';
import SignMarketing from '@/candidates/sign/shared/SignMarketing';

export default {
  components: {
    SignInForm,
    SignUpForm,
    SignHeader,
    SignSteps,
    SignMarketing
  }
};
</script>

<style lang="postcss" scoped>
  .sign {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .sign__data {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    height: auto !important;
    padding-top: 80px; /*header height*/
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    box-sizing: border-box;
    z-index: 1;
    &:after {
      position: absolute;
      z-index: -1;
      content: '';
      top: 80px;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(236, 239, 241, 0.52), rgba(236, 239, 241, 0.52)), url("/static/sign-in-bg.jpg") no-repeat top center;
      background-size: cover;
    }
    @media (--tablet-viewport) {
      padding-top: 110px;
      padding-bottom: 50px;
      &:after {
        top: 100px;
      }
    }
  }
</style>
