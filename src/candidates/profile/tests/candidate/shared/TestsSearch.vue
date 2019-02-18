<template>
  <label class="tests-tabs-search">
    <svg class="tests-tabs-search__icon">
      <use xlink:href="#loupe"></use>
    </svg>
    <input
      :value="value"
      @input="inputVal($event)"
      type="search" class="tests-tabs-search__input" placeholder="Search...">
  </label>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    inputVal ($event) {
      this.$emit('changeInput', $event.target.value);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .tests-tabs-search {
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 215px;
    @media (--desktop-viewport) {
      max-width: 70%;
    }
    @media (--phone-viewport) {
      max-width: 100%;
    }
  }
  .tests-tabs-search__icon {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 16px;
    height: 16px;
    fill: #CFD8DC;
  }
  .tests-tabs-search__input {
    display: block;
    width: 100%;
    padding: 11px 10px 11px 40px;
    font-size: 14px;
    line-height: 20px;
    color: #455A64;
    border: 1px solid #CFD8DC;
    border-radius: 22px;
    box-sizing: border-box;
    transition: border-color .3s ease;
    &::placeholder {
      color: #CFD8DC;
    }
    &:focus {
      border-color: #90A4AE;
    }
  }
</style>
