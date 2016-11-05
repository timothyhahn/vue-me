<template>
  <div class="vue-header">
    <a class="vue-header-link" v-bind:href="store.link">{{ store.name }}</a>
  </div>
</template>

<script>
export default {
  name: 'vue-header',
  props: ['store'],
};
</script>

<!-- Add "scoped" attribute to limit SASS to this component only -->
<style scoped lang="sass?outputStyle=expanded">
.vue-header {
  background-color: #fefefe;
  position: fixed;
  top: 0;
  height: 50px;
  opacity: .9;
  $padding: 10px;
  margin-left: -$padding;
  width: calc(100% + #{$padding});

  .vue-header-link {
    position: absolute;
    left: 140px;
    top: 12px;
  }
}
</style>
