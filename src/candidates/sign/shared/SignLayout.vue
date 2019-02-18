<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import intercomService from '@/core/services/intercom.service';
export default {
  mounted () {
    intercomService.boot();
  }
};
</script>
