<template>
  <div class="chat-search">
    <label class="chat-search__label">
      <svg class="chat-search__icon">
        <use xlink:href="#loupe"></use>
      </svg>
      <div class="chat-search__input-wrapper">
        <input
          :value="value"
          @input="inputVal($event)"
          type="search" class="chat-search__input" placeholder="Search...">
      </div>
    </label>
  </div>
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
  .chat-search__icon {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 16px;
    height: 16px;
    fill: #CFD8DC;
  }

  .chat-search__input-wrapper {
    margin: 5px;
  }

  .chat-search__input {
    padding: 11px 10px 11px 40px;
    font-size: 14px;
    line-height: 20px;
    color: #455A64;
    border: 1px solid #CFD8DC;
    border-radius: 22px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: border-color .3s ease;
    transition: border-color .3s ease;
  }

  .chat-search__label {
    position: relative;
    display: inline-block;
    width: 100%;
  }
</style>
