<template>
  <div id="app">
    <vue-header :store="store"></vue-header>
    <vue-me></vue-me>
  </div>
</template>

<script>
import VueHeader from './components/VueHeader';
import VueMe from './components/VueMe';

export default {
  name: 'app',
  data() {
    return {
      store: {
        name: 'nordstrom',
        link: 'https://www.instagram.com/nordstrom/',
      },
    };
  },
  components: {
    VueHeader,
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
body {
  background-color: #f7f7f7;
}
</style>
