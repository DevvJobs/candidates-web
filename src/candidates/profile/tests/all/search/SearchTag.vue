<template>
  <li v-if="item" class="search-tag" :class="{'search-tag--applied': ''}">
    {{item.name}}
    <button @click="removeTag" class="search-tag__btn">
      <svg>
        <use xlink:href="#cross"></use>
      </svg>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    item: null
  },
  methods: {
    removeTag ($event) {
      this.$emit('remove-tag', $event.target);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .search-tag {
    position: relative;
    display: inline-block;
    height: 24px;
    margin: 3px 10px 3px 0;
    padding: 0 20px 0 10px;
    font-size: 13px;
    line-height: 22px;
    color: #4DD0E1;
    border: 1px solid #4DD0E1;
    border-radius: 20px;
    box-sizing: border-box;
  }
  .search-tag--applied {
    color: #455A64;
    border-color: #90A4AE;
  }
  .search-tag__btn {
    position: absolute;
    top: 50%;
    right: 7px;
    transform: translateY(-50%);
    &:hover {
      svg {
        fill: #90A4AE;
      }
    }
    svg {
      display: block;
      width: 7px;
      height: 7px;
      fill: #CFD8DC;
      transition: fill .3s ease;
    }
  }
</style>
