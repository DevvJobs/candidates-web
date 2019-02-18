<template>

  <div class="input-switcher__list">
    <span class="input-switcher__item" v-on:click="toggleValue(false)">
      <span class="input-switcher__value" v-bind:class="{'input-switcher__value--checked': !value}">No</span>
    </span>
    <span class="input-switcher__item" v-on:click="toggleValue(true)">
      <span class="input-switcher__value" v-bind:class="{'input-switcher__value--checked': value}">Yes</span>
    </span>
  </div>
</template>

<script>

/* eslint-disable */
import Arrow from '@/assets/arrow.svg';
/* eslint-disable */

export default {
  props: {
    modelName: ''
  },
  data () {
    return {
      value: true,
    };
  },
  created() {
    this.$store.commit(
      this.modelName,
      true
    );
  },
  methods: {
    toggleValue (item) {
      this.$store.commit(
        this.modelName,
        item
      );
      this.value = item;
    },
  }
};
</script>

<style lang="postcss">

  .input-switcher__list {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
  }
  .input-switcher__item {
    font-size: 0;
    box-sizing: border-box;
  }
  .input-switcher__value {
    display: block;
    font-size: 18px;
    line-height: 20px;
    color: #90A4AE;
    font-family: var(--ff-font);
    text-transform: uppercase;
    user-select: none;
    cursor: pointer;
    transition: color .3s ease;
  }
  .input-switcher__value--checked {
    color: #4DD0E1;
  }
</style>
