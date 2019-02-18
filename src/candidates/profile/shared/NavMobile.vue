<template>
  <div class="nav-mobile" >
    <button type="button" class="nav-mobile__btn" v-on:click="isShowMenu()">
      <svg class="nav-mobile__icon">
        <use xlink:href="#menu"></use>
      </svg>
    </button>
    <div class="nav-mobile__data" v-if="showMenu" v-click-outside="hideMenu">
      <div class="nav-mobile__box">
        <router-link v-on:click.native="hideMenuOnRouteChange()" :to="'/profile'" class="nav-mobile__link">
          <img class="nav-mobile__logo" src="/static/logo.svg" alt="logo">
        </router-link>
      </div>
      <div class="nav-mobile__box nav-mobile__box--links">
        <NavUser></NavUser>
        <NavLinks>
          <router-link v-on:click.native="hideMenu()" :to="{path: '/privacy-policy'}" active-class="nav__menu-link--active" class="nav__menu-link" target="_blank">
            <svg class="nav__menu-icon nav__menu-icon--document">
              <use xlink:href="#document"></use>
            </svg>
            <span class="nav__menu-text">Privacy Policy</span>
          </router-link>
          <router-link v-on:click.native="hideMenu()" :to="{path: '/terms-of-service'}" active-class="nav__menu-link--active" class="nav__menu-link" target="_blank">
            <svg class="nav__menu-icon nav__menu-icon--document">
              <use xlink:href="#document"></use>
            </svg>
            <span class="nav__menu-text">Terms of Service</span>
          </router-link>
        </NavLinks>
      </div>
      <div class="nav-mobile__box">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { clickOutside } from '@/core/directives/clickOutside';
import Avatar from '@/core/components/Avatar';
import NavLinks from '@/candidates/profile/shared/NavLinks.vue';
import NavUser from '@/candidates/profile/shared/NavUser.vue';

export default {
  components: {
    Avatar,
    NavLinks,
    NavUser
  },
  directives: {
    clickOutside
  },
  computed: {
    ...mapGetters({
      showMenu: 'showMenu'
    })
  },
  methods: {
    ...mapMutations({
      updateShowMenu: 'updateShowMenu'
    }),
    hideMenu () {
      this.updateShowMenu(false);
    },
    isShowMenu () {
      this.updateShowMenu(!this.showMenu);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .nav-mobile__data {
    position: fixed;
    z-index: 991;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 252px;
    padding: 25px 9px;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(207, 216, 220, .8);
    box-sizing: border-box;
  }
  .nav-mobile__box {
  }
  .nav-mobile__box--links {
    padding-top: 50px;
    flex: 1;
    overflow-y: auto;
  }
  .nav-mobile__link {
    display: block;
    margin-bottom: 20px;
    text-align: center;
  }
  .nav-mobile__logo {
    display: inline-block;
    width: 90px;
    height: 13px;
  }
  .nav__menu-link {
    position: relative;
    display: flex;
    align-items: center;
    height: 45px;
    margin-bottom: 5px;
    padding: 14px 6px 15px 45px;
    border-radius: 25px;
    box-sizing: border-box;
    &:hover {
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      .nav__menu-icon {
        fill: #fff;
      }
      .nav__menu-text {
        color: #fff;
      }
      .nav__menu-count {
        color: #4DD0E1;
        background-color: #fff;
      }
    }
  }
  .nav__menu-link--disabled {
    opacity: .4;
    cursor: default;
    &:hover {
      background: none;
      .nav__menu-icon {
        fill: #90A4AE;
      }
      .nav__menu-text {
        color: #90A4AE;
      }
      .nav__menu-count {
        color: #4DD0E1;
        background-color: #fff;
      }
    }
  }
  .nav__menu-link--active {
    background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
    cursor: default;
    .nav__menu-icon {
      fill: #fff;
    }
    .nav__menu-text {
      color: #fff;
    }
  }
  .nav__menu-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    fill: #90A4AE;
    transition: fill .3s ease
  }
  .nav__menu-icon--document {
    left: 18px;
    width: 12px;
    height: 16px;
  }
  .nav__menu-text {
    flex: 1 0 auto;
    display: block;
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
    transition: color .3s ease
  }
  .nav-mobile__btn {
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    z-index: 999;
    width: 50px;
    height: 50px;
    cursor: pointer;
    user-select: none;
    @media (--tablet-viewport) {
      display: block;
    }
  }
  .nav-mobile__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 23px;
    height: 5px;
    fill: #cfd8dc;
  }
</style>
