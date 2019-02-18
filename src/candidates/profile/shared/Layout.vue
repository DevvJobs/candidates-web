<template>
  <div class="layout">
    <Nav>
      <Logout></Logout>
    </Nav>
    <NavMobile>
      <Logout></Logout>
    </NavMobile>
    <div class="layout__content">
      <Header v-if="showHeader"></Header>
      <div class="layout__data">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Nav from '@/candidates/profile/shared/Nav.vue';
import NavMobile from '@/candidates/profile/shared/NavMobile.vue';
import Logout from '@/candidates/profile/shared/Logout.vue';
import Header from '@/candidates/profile/shared/Header.vue';
export default {
  components: {
    Nav,
    NavMobile,
    Header,
    Logout
  },
  computed: {
    ...mapGetters({
      showHeader: 'showHeader'
    })
  }
};
</script>

<style lang="postcss">
  .layout {
    display: block;
    height: 100%;
    padding-left: 252px; /*nav width*/
    min-height: 100vh;
    @media (--tablet-viewport) {
      padding-left: 0;
    }
  }
  .layout__content {
    flex: 1;
    width: 100%;
    min-width: 0;
    height: 100vh;
    min-height: 100vh;
    height: auto !important;
  }
</style>
