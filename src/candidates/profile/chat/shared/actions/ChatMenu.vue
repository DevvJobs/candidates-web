<template>
  <div class="chat__top-menu-box">
    <div class="chat__top-menu-dots">
      <span class="chat__top-menu-dot"></span>
      <span class="chat__top-menu-dot"></span>
      <span class="chat__top-menu-dot"></span>
    </div>
    <ul class="chat__top-menu">
      <li class="chat__top-menu-item" @click="setCompanyInfoVisibility(!isShowCompanyInfo)">
        <span class="chat__top-menu-value">Company info</span>
      </li>
      <li class="chat__top-menu-item chat__top-menu-item--icon" @click="onArchiveClick" v-if="notArchived">
        <svg class="chat__top-menu-icon">
          <use xlink:href="#archive"></use>
        </svg>
        <span class="chat__top-menu-value">Archive thread</span>
      </li>
      <li class="chat__top-menu-item chat__top-menu-item--icon" v-if="isAcceptedDialog" @click="onBlockContact">
        <svg class="chat__top-menu-icon">
          <use xlink:href="#block"></use>
        </svg>
        <span class="chat__top-menu-value">Block company</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex';
import {ACCEPTED} from '@/core/modules/chat/contactStatuses';

export default {
  computed: {
    ...mapGetters({
      isShowCompanyInfo: 'chat/isShowCompanyInfo',
      selectedContact: 'chat/selectedContact',
      activeTab: 'chat/activeTab'
    }),
    isAcceptedDialog () {
      return this.selectedContact.status === ACCEPTED;
    },
    notArchived () {
      return (this.activeTab !== 'archived');
    }
  },
  methods: {
    ...mapMutations({
      setShowArchivePopup: 'chat/setShowArchivePopup',
      setBlockPopupVisibility: 'chat/setBlockPopupVisibility',
      setCompanyInfoVisibility: 'chat/setCompanyInfoVisibility'
    }),
    ...mapActions({
      blockContact: 'chat/blockContact'
    }),
    onBlockContact () {
      this.setBlockPopupVisibility(true);
    },
    onArchiveClick () {
      this.setShowArchivePopup(true);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .chat__top-menu-box {
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 30px;
    display: flex;
    align-items: center;
    height: 100%;
    transform: translateY(-50%);
    cursor: pointer;
    &:hover {
      .chat__top-menu-dot {
        background-color: #90A4AE;
      }
      .chat__top-menu {
        opacity: 1;
        visibility: visible;
      }
    }
    @media (--tablet-viewport) {
      right: 0;
      width: 64px;
      height: 64px;
      justify-content: center;
    }
  }
  .chat__top-menu-dots {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 23px;
    height: 100%;
    @media (--tablet-viewport) {
      height: 5px;
      transform: rotate(90deg);
    }
  }
  .chat__top-menu-dot {
    width: 5px;
    height: 5px;
    background-color: #CFD8DC;
    border-radius: 50%;
    transition: background-color .3s ease;
  }

  .chat__top-menu {
    position: absolute;
    top: 100%;
    right: 0;
    display: block;
    width: 135px;
    margin-top: -15px;
    padding: 10px 0;
    text-align: left;
    border-radius: 17px;
    background-color: #fff;
    box-shadow: 0 0 15px 2px rgba(207, 216, 220, .6);
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s ease, visibility .3s ease;
    @media (--tablet-viewport) {
      right: 10px;
      margin-top: -5px;
    }
  }
  .chat__top-menu-item {
    position: relative;
    display: block;
    padding: 15px;
    cursor: pointer;
    &:hover {
      .chat__top-menu-value {
        color: #455A64;
      }
      .chat__top-menu-icon {
        fill: #455A64;
      }
    }
  }
  .chat__top-menu-item--icon {
    padding-left: 33px;
  }
  .chat__top-menu-value {
    display: block;
    color: #90A4AE;
    font-size: 12px;
    line-height: 14px;
    transition: color .3s ease;
    &:hover {
      color: #455A64;
    }
  }
  .chat__top-menu-icon {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 12px;
    height: 12px;
    fill: #90a4ae;
    transition: fill .3s ease;
  }
</style>
