<template>
  <div class="select-dropdown__item">{{item.name}}</div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
};
</script>

<style lang="postcss">
  .select-dropdown__item {
    display: block;
    margin-bottom: 5px;
    padding: 18px 25px;
    font-size: 18px;
    line-height: 20px;
    font-family: var(--ff-font);
    color: #90A4AE;
    border-radius: 27px;
    background-color: transparent;
    transition: color .3s ease, background-color .3s ease;
    user-select: none;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #4DD0E1;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
