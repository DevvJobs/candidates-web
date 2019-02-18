<template>
  <div class="all-tests-preview">
    <div class="all-tests-preview__content" v-if="!template.added">
      <div class="all-tests-preview__title" :title="template.name">{{ template.name }}</div>
      <div class="all-tests-preview__tag">
        <div class="all-tests-preview__tag-item" :title="template.skill.name">{{ template.skill.name }}</div>
        <div class="all-tests-preview__tag-item">{{ template.proficiencyLevel.name }}</div>
      </div>
      <button type="button" class="all-tests-preview__btn" @click="onClick">
        <svg class="all-tests-preview__icon">
          <use xlink:href="#plus-stroke"></use>
        </svg>
      </button>
    </div>
    <Loader class="loader loader--small" v-if="showLoader" :text="false"></Loader>
    <div class="all-tests-preview-message" v-if="template.added">
      <svg class="all-tests-preview-message__icon">
        <use xlink:href="#check-stroke"></use>
      </svg>
      <div class="all-tests-preview-message__text">{{ template.name }} added!</div>
    </div>
  </div>
</template>

<script>
import Loader from '@/core/components/Loader';
import { mapActions } from 'vuex';

export default {
  components: {
    Loader
  },
  data () {
    return {
      showMessage: false,
      showLoader: false
    };
  },
  props: {
    template: null
  },
  methods: {
    ...mapActions({
      'addTemplateToTests': 'tests/addTemplateToTests'
    }),
    async onClick () {
      this.showLoader = true;
      await this.addTemplateToTests(this.template)
        .then(() => { /* success */ })
        .catch(() => { /* error */ });
      this.showLoader = false;
      this.showMessage = true;
    }
  }
};
</script>

<style lang="postcss" scoped>
  .all-tests-preview {
    position: relative;
    width: 100%;
    height: 150px;
    padding: 20px 8px 44px 8px;
    background-color: #fff;
    border-radius: 22px;
    box-shadow: 0 0 15px 2px rgba(207, 216, 220, .6);
    box-sizing: border-box;

    .loader {
      border-radius: 22px;
      background: rgba(255,255,255,.7);
    }
    @media (--phoneLarge-viewport) {
      border-radius: 30px;
    }
  }
  .all-tests-preview__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 54px;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 24px;
    color: #455A64;
    word-break: break-word;
    text-align: center;
    overflow: hidden;
    @media (--phoneLarge-viewport) {
      height: auto;
      font-size: 22px;
      line-height: 32px;
    }
  }
  .all-tests-preview__tag {
    display: flex;
    justify-content: center;
  }
  .all-tests-preview__tag-item {
    display: block;
    max-width: 50%;
    margin-right: 4px;
    padding: 3px 6px;
    font-size: 11px;
    line-height: 13px;
    color: #455A64;
    border: 1px solid #CFD8DC;
    border-radius: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    @media (--phoneLarge-viewport) {
      font-size: 16px;
      padding: 8px 8px;
      border-radius: 30px;
    }
  }
  .all-tests-preview__btn {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 44px;
    height: 44px;
    @media (--phoneLarge-viewport) {
      width: 64px;
      height: 64px;
    }
  }
  .all-tests-preview__icon {
    display: block;
    width: 44px;
    height: 44px;
    @media (--phoneLarge-viewport) {
      width: 64px;
      height: 64px;
    }
  }
  .all-tests-preview-message {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 30px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .all-tests-preview-message__icon {
    display: block;
    width: 54px;
    height: 54px;
    margin-bottom: 10px;
    fill: #4DD0E1;
    @media (--phoneLarge-viewport) {
      width: 64px;
      height: 64px;
    }
  }
  .all-tests-preview-message__text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 38px;
    font-size: 14px;
    line-height: 18px;
    color: #4DD0E1;
    text-align: center;
    overflow: hidden;
    @media (--phoneLarge-viewport) {
      font-size: 18px;
      line-height: 24px;
      height: auto;
    }
  }
</style>
