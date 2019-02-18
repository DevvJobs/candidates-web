<template>
  <div class="profile-tests">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
};
</script>

<style lang="postcss" scoped>
  .profile-tests {
    @media (--tablet-viewport) {
      padding-top: 50px;
    }
  }
</style>
