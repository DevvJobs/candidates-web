<template>
  <div class="nav-links">
    <router-link v-for="(menuItem,index) of menu"
                 v-bind:key="index"
                 :to="menuItem.route"
                 v-on:click.native="hideMenu()"
                 active-class="nav-links__item--active"
                 class="nav-links__item" v-bind:exact="menuItem.exact">
      <svg class="nav-links-icon nav-links-icon--dashboard">
        <use v-bind:xlink:href="'#' + menuItem.ico"></use>
      </svg>
      <span class="nav-links-text">{{menuItem.text}}</span>
      <span class="nav-links-count" v-if="unreadCounter && menuItem.unreadMessagesCount"> {{ unreadCounter }} </span>
    </router-link>
    <slot></slot>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default {
  data () {
    return {
      menu: [
        { route: { name: 'ProfileDashboard' },
          ico: 'diagram',
          exact: true,
          text: 'Dashboard'
        },
        { route: { name: 'ProfileChat' },
          unreadMessagesCount: true,
          ico: 'message',
          text: 'Messages'
        },
        { route: { name: 'ProfileEdit' },
          ico: 'profile',
          text: 'Profile'
        },
        { route: { name: 'CandidateTests' },
          ico: 'code',
          exact: true,
          text: 'Knowledge tests'
        },
        { route: { name: 'CvUpload' },
          ico: 'document',
          exact: true,
          text: 'Upload CV'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      'candidate': 'profile/candidate',
      'unreadMessagesCount': 'chat/unreadMessagesCount',
      'unreadCounter': 'chat/unreadMessagesCount'
    })
  },
  methods: {
    ...mapMutations({
      'updateShowMenu': 'updateShowMenu'
    }),
    hideMenu () {
      this.updateShowMenu(false);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .nav-links {
    display: block;
  }
  .nav-links__item {
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
      .nav-links-icon {
        fill: #fff;
      }
      .nav-links-text {
        color: #fff;
      }
      .nav-links-count {
        color: #4DD0E1;
        background-color: #fff;
      }
    }
  }
  .nav-links__item--active {
    background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
    cursor: default;
    .nav-links-icon {
      fill: #fff;
    }
    .nav-links-text {
      color: #fff;
    }
    .nav-links-count {
      color: #4DD0E1;
    }
    .nav-links-count {
      color: #4DD0E1;
      background-color: #fff;
    }
  }
  .nav-links-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    fill: #90A4AE;
    transition: fill .3s ease
  }
  .nav-links-icon--dashboard {
    left: 18px;
    width: 14px;
    height: 12px;
  }
  .nav-links-text {
    flex: 1 0 auto;
    display: block;
    font-size: 14px;
    line-height: 16px;
    color: #90A4AE;
    transition: color .3s ease
  }
  .nav-links-count {
    display: block;
    width: 40px;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    border-radius: 12px;
    background-color: #4DD0E1;
    transition: color .3s ease, background-color .3s ease;
  }
</style>
