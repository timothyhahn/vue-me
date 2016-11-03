<template>
  <div id="app">
  <vue-me></vue-me>
  </div>
</template>

<script>
import VueMe from './components/VueMe';

export default {
  name: 'app',
  components: {
    VueMe,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
