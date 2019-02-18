<template>
  <div class="chat__dialog-avatar"
       v-bind:class="{'chat__dialog-avatar--large': type}"
       v-if="name">
    {{getInitials(name)}}
  </div>
</template>

<script>
export default {
  name: 'ChatDialogAvatar',
  props: {
    name: null,
    type: null
  },
  methods: {
    getInitials (name) {
      let parsedName = name.match(/^(.+?)(?: from (.+))?$/);
      let parts = parsedName[1].split(' ');
      let firstPart = parts.shift();
      let lastPart = parts.pop();
      let initialsParts = [firstPart, lastPart];
      return initialsParts.filter(str => str !== undefined).map(str => str[0]).join('');
    }
  }
};
</script>

<style lang="postcss" scoped>
  .chat__dialog-avatar {
    flex-shrink: 0;
    align-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    text-transform: uppercase;
    border-radius: 50%;
    font-weight: 100;
    background-color: #ECEFF1;
    color: #90A4AE;
  }
  .chat__dialog-avatar--large {
    width: 100%;
    font-size: 30px;
    height: 100%;
  }
</style>
