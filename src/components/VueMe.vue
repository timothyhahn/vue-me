<template>
  <div class="vue-me">

    <button v-on:click="loadItems" style="position: fixed">Hello</button> 
    <div v-for="item in items" :key="item.itemId" class="vue-item" v-bind:style="{ backgroundImage: 'url(' + item.mediumPhotoUrl + ')' }">
    </div>
  </div>
</template>

<script>
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
      bookmarkStoreOrder: null,
      bookmarkTimestamp: null,
      outstandingAsyncAction: null,
    };
  },
  methods: {
    loadItems() {
      this.outstandingAsyncAction = 'loadItems';

      this.$http.jsonp(
        formatUrl(this.bookmarkStoreOrder, this.bookmarkTimestamp)
      ).then((response) => {
        const body = response.body;

        this.items = this.items.concat(body.items);
        this.bookmarkStoreOrder = body.bookmarkStoreOrder;
        this.bookmarkTimestamp = body.bookmarkTimestamp;
      }, () => {
      }).finally(() => {
        this.outstandingAsyncAction = null;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vue-item {
    float: left;
    width: calc(100% / 4);
    height: 347px;
    background-size: contain;
    background-repeat: no-repeat;

  }
  </style>
