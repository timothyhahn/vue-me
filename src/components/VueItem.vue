<template>
  <div class="vue-item" 
       v-bind:style="{ backgroundImage: 'url(' + item.mediumPhotoUrl + ')', height: height + 'px' }"
       v-on:click="viewItemProducts">
  </div>
</template>

<script>
export default {
  name: 'vue-item',
  props: ['item'],
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.height = this.$el.clientWidth;
    });
  },
  methods: {
    openModal() {
      this.$emit('open-modal', this.item);
    },
    viewItemProducts() {
      if (this.item.products.length === 1) {
        /* eslint-disable no-undef */
        window.location.href = this.item.products[0].destinationUrl;
        /* eslint-enable no-undef */
      } else {
        this.openModal();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit SASS to this component only -->
<style scoped lang="sass?outputStyle=expanded">
  .vue-item {
    $padding: 10px;
    float: left;
    margin-right: $padding;
    margin-bottom: $padding;
    width: calc(100% / 4 - #{$padding});
    height: 347px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;

    &:hover {
      cursor: pointer;
    }
  }
</style>
