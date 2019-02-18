<template>
  <ul class="social-links">
    <li class="social-links__item">
      <a class="social-links__link" href="https://www.facebook.com/devvjobs/" target="_blank">
        <svg class="social-links__ico social-links__ico--facebook"><use xlink:href="#social-facebook"></use></svg>
      </a>
    </li>
    <li class="social-links__item">
      <a class="social-links__link" href="https://www.instagram.com/devv.jobs/" target="_blank">
        <svg class="social-links__ico social-links__ico--instagram"><use xlink:href="#social-instagram"></use></svg>
      </a>
    </li>
    <li class="social-links__item">
      <a class="social-links__link" href="https://twitter.com/DevvJobs" target="_blank">
        <svg class="social-links__ico social-links__ico--twitter"><use xlink:href="#social-twitter"></use></svg>
      </a>
    </li>
    <li class="social-links__item">
      <a class="social-links__link" href="https://www.linkedin.com/company/devv-jobs/" target="_blank">
        <svg class="social-links__ico social-links__ico--linkedin"><use xlink:href="#social-linkedin"></use></svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
};
</script>

<style lang="postcss" scoped>
  .social-links {
    display: block;
    padding-top: 5px;
    padding-bottom: 20px;
    text-align: center;
  }
  .social-links__item {
    display: inline-block;
    vertical-align: top;
    padding: 0 25px;
    @media (--phoneLarge-viewport) {
      padding: 0 15px;
    }
  }
  .social-links__link {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .social-links__ico {
    position: absolute;
    top: 50%;
    left: 50%;
    fill: #455A64;
    transform: translateY(-50%) translateX(-50%);
  }
  .social-links__ico--facebook {
    width: 12px;
    height: 24px;
  }
  .social-links__ico--instagram {
    width: 24px;
    height: 24px;
  }
  .social-links__ico--twitter {
    width: 24px;
    height: 20px;
  }
  .social-links__ico--linkedin {
    width: 21px;
    height: 20px;
  }
  .sign-marketing-footer__social-links {
    .social-links__ico {
      fill: #fff
    }
  }
</style>
