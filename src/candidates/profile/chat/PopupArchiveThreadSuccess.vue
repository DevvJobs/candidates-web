<template>
  <Popup>
    <div class="popup-archive-thread-success" v-click-outside="hidePopup">
      <div class="popup-archive-thread-success__content">
      <div class="popup-archive-thread-success__close" @click="hidePopup">
        <svg class="popup-archive-thread-success__icon">
          <use xlink:href="#cross"></use>
        </svg>
      </div>
        <svg class="popup-archive-thread-success__icon">
          <use xlink:href="#check-stroke"></use>
        </svg>
        <div class="popup-archive-thread-success__title">Archived threads!</div>
        <div class="popup-archive-thread-success__text">You can find them in the archived tab</div>
      </div>
    </div>
  </Popup>
</template>

<script>
import { mapMutations } from 'vuex';
import Popup from '@/core/components/popup/Popup';

export default {
  components: {
    Popup
  },
  methods: {
    ...mapMutations({
      'setShowArchivePopupSuccess': 'chat/setShowArchivePopupSuccess'
    }),
    hidePopup () {
      this.setShowArchivePopupSuccess(false);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .popup-archive-thread-success {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px;
    padding: 20px 20px 20px;
    border-radius: 30px;
    background-color: #FFFFFF;
    box-shadow: 0 0 30px 7px rgba(207, 216, 220, .6);
    box-sizing: border-box;
    &:hover {
    transition: background-color 2s ease-out;
    }
  }
  .popup-archive-thread-success__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &:hover {
      svg {
        fill: #90A4AE;
      }
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      fill: #cfd8dc;
      transition: fill .3s ease;
    }
  }
  .popup-archive-thread-success__content {

  }
  .popup-archive-thread-success__icon {
    display: block;
    width: 64px;
    height: 64px;
    margin: 0 auto 15px;
    fill: #36D7B7;
  }
  .popup-archive-thread-success__title {
    display: block;
    margin-bottom: 5px;
    font-size: 24px;
    line-height: 30px;
    color: #455A64;
    font-weight: 300;
    text-align: center;
  }
  .popup-archive-thread-success__text {
    display: block;
    font-size: 14px;
    line-height: 20px;
    color: #90A4AE;
    text-align: center;
  }
</style>
