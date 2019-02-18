<template>
  <div :class="showBar">
    <div class="bottom-bar-content">
      <div class="counter-wrapper">
        <span class="select-count">{{ selectedCount }}</span>
        <span class="counter-text">{{ threadsText }}</span>
      </div>
      <div class="button-wrapper">
        <button type="button" class="archive__btn" @click="setShowMassArchivePopup">
          <svg class="archive__icon">
            <use xlink:href="#archive"></use>
          </svg>
          <span class="archive__text">Archive threads</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      selectedThreads: 'chat/selectedThreads'
    }),
    selectedCount: function () {
      return (this.selectedThreads && this.selectedThreads.length) || 0;
    },
    showBar: function () {
      return this.selectedCount > 0 ? 'bottom-bar' : 'bottom-bar-hidden';
    },
    threadsText: function () {
      return this.selectedCount > 1 ? 'Threads selected' : 'Thread selected';
    }
  },
  methods: {
    ...mapMutations({
      'setShowMassArchivePopup': 'chat/setShowMassArchivePopup'
    }),
    showMassPopup () {
      this.setShowMassArchivePopup(true);
    }
  }
};
</script>
<style lang="postcss" scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 990;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .bottom-bar-hidden {
    display: none;
  }
  .bottom-bar-content {
    position: relative;
    background: #FFFFFF;
    width: 100%;
    height: 100px;
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 30px;
    padding-right: 30px;
    flex-direction: row;
    justify-content: center;
    box-shadow: 0 0 20px rgba(207, 216, 220, .8);
    box-sizing: border-box;
    left: 252px;
    margin-right: 252px;
    overflow: hidden;
    -webkit-animation: slide-up 0.3s forwards;
    animation: slide-up 0.3s forwards;
    @media (max-width: 48em) {
      left: 0px;
      margin-right: 0px;
    }
  }
  .select-count {
    display: inline-block;
    width: 40px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    color: #FFFFFF;
    text-align: center;
    border-radius: 12px;
    background-color: #455A64;
  }
  .counter-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    @media (--desktop-viewport) {
      flex: 2;
    }
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
  }
  .counter-text {
    display: inline-block;
    padding-left: 6px;
    font-size: 14px;
    line-height: 24px;
    color: #455A64;
  }
  .archive__btn {
    position: relative;
    height: 40px;
    font-size: 12px;
    border-radius: 20px;
    padding-top: 7px;
    padding-right: 15px;
    padding-bottom: 7px;
    padding-left: 40px;
    border-radius: 30px;
    background-color: #009EB7;
    cursor: pointer;
    outline: 0;
    text-align: left;
    box-sizing: border-box;
    white-space: nowrap;
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 30px;
      background-image: linear-gradient(to right, #009eb7 0%, #80deea 100%);
      opacity: 1;
      transition: opacity .3s ease;
    }
    &:hover,
    &:focus {
      &::after {
        opacity: 0;
      }
    }
    @media (--desktop-viewport) {
      width: 60px;
      height: 60px;
      padding: 0;
      .archive__text {
        display: none;
      }
    }
  }
  .archive__icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    fill: #FFFFFF;
    @media (--desktop-viewport) {
      width: 24px;
      height: 24px;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
  .archive__text {
    display: block;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
  }
  @keyframes slide-up {
    from {
      margin-top: 100%;
      height: 300%;
    }
    to {
      margin-top: 0%;
      height: 100%;
    }
  }
</style>
