<template>
  <div class="unsubscribe">
    <SignHeader class="sign-header sign-header--logo"></SignHeader>
    <div class="unsubscribe__data simple-text">
      <h1>Hi there!</h1>
      <p>
        We understand your desire to keep your mailbox free of unwanted email.
        We want to help you to find the dream job, not to make you waste time hitting "delete"
        over and over again in your inbox. Recruiters spam is one of the reasons why we've created Devvjobs.
      </p>
      <p>
        If you think you are receiving too many annoying emails, please contact our
        <a href="mailto:support@devv.jobs">support</a>
        and we will do our best to help you.
      </p>
      <p>
        If you still feel like you get an unacceptable amount of email from us and that's
        just a deal breaker, please email our
        <a href="mailto:k@devv.jobs">Ombudsman</a> for privacy questions Kris
        Ledel and ask us to disable your account.
        We will miss you.
      </p>
    </div>
  </div>
</template>

<script>
import SignHeader from '@/candidates/sign/shared/SignHeader';

export default {
  components: {
    SignHeader
  }
};
</script>

<style lang="postcss" src="@/core/styles/unsubscribe.css" scoped></style>
