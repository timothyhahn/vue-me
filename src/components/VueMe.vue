<template>
  <div class="vue-me" v-infinite-scroll="debouncedLoad"  infinite-scroll-distance="distance">
    <div v-for="item in items" :key="item.itemId" class="vue-item" v-bind:style="{ backgroundImage: 'url(' + item.mediumPhotoUrl + ')' }">
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

const endpoint = 'http://api.curalate.com/v1/like2buy/nordstrom/products.jsonp?limit=18&requestId=92705780-3626-46e0-99a0-c2038b4b5da0';

const formatUrl = function formatUrl(order, timestamp) {
  let formattedUrl = endpoint;

  if (order) {
    formattedUrl += `&bookmarkStoreOrder=${order}`;
  }

  if (timestamp) {
    formattedUrl += `&bookmarkTimestamp=${timestamp}`;
  }

  return formattedUrl;
};

export default {
  name: 'vue-me',
  data() {
    return {
      items: [],
      distance: 100,
      bookmarkStoreOrder: null,
      bookmarkTimestamp: null,
      outstandingAsyncAction: false,
      cachedDebouncedLoad: null,
    };
  },
  methods: {
    fetchItems() {
      if (this.outstandingAsyncAction) {
        return;
      }
      this.outstandingAsyncAction = true;

      this.$http.jsonp(
        formatUrl(this.bookmarkStoreOrder, this.bookmarkTimestamp)
      ).then((response) => {
        const body = response.body;

        this.items = this.items.concat(body.items);
        this.bookmarkStoreOrder = body.bookmarkStoreOrder;
        this.bookmarkTimestamp = body.bookmarkTimestamp;
      }).finally(() => {
        this.outstandingAsyncAction = false;
      });
    },
    debouncedLoad() {
      if (!this.cachedDebouncedLoad) {
        this.cachedDebouncedLoad = _.debounce(this.fetchItems, 500);
      }
      this.cachedDebouncedLoad();
    },
  },
  components: {
  },
};
</script>

<!-- Add "scoped" attribute to limit SASS to this component only -->
<style scoped lang="sass?outputStyle=expanded">
  .vue-item {
    float: left;
    width: calc(100% / 4);
    height: 347px;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
