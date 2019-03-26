<template>
  <div class="profile-nav__github">
    <a href="https://github.com/DevvJobs/candidates-web/" target="_blank" class="profile-nav__github-link">
      <svg class="profile-nav__github-icon">
        <use xlink:href="#code-solid"></use>
      </svg>
      <span class="profile-nav__github-text">Contribute @ Github</span>
    </a>
  </div>
</template>

<script>
</script>

<style lang="postcss" scoped>
  .profile-nav__github {
    display: block;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .profile-nav__github-link {
    display: block;
    position: relative;
    width: 100%;
    padding: 15px 6px 15px 45px;
    text-align: left;
    box-sizing: border-box;
    &:hover {
      .profile-nav__github-icon {
        fill: #455A64;
      }
      .profile-nav__github-text {
        color: #455A64;
      }
    }
  }
  .profile-nav__github-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    width: 16px;
    height: 18px;
    color: #90A4AE !important;
    fill: #90A4AE !important;
    transition: fill .3s ease;
  }
  .profile-nav__github-text {
    display: block;
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
    transition: color .3s ease;
  }
</style>
