<template>
  <div class="vue-me" v-infinite-scroll="debouncedLoad"  infinite-scroll-distance="distance">
    <vue-item v-for="item in items" :key="item.itemId" :item="item" v-on:open-modal="openModal"></vue-item>
    <modal v-if="previewItem" @close="previewItem = null">
      <div slot="header">
         <div class="modal-default-button" v-on:click="previewItem = null">X</div>
      </div>
      <div slot="body" class="preview-container">
        <div class="photo-container">
          <div class="photo" v-bind:style="{ backgroundImage: 'url(' + previewItem.largePhotoUrl + ')'}"></div>
        </div>
        <div class="products-container">
          <div class="product" 
               v-for="product in previewItem.products"
               v-on:click="openProduct(product)"
               v-bind:style="{ backgroundImage: 'url(' + (product.croppedThumbnailImageUrl || product.imageUrl) + ')'}">
          </div>
        </div>
      </div>
      <div slot="footer">
      </div>
    </modal>
  </div>
</template>

<script>
import _ from 'lodash';
import VueItem from './VueItem';
import Modal from './Modal';

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
      previewItem: null,
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
    openModal(item) {
      this.previewItem = item;
    },
    openProduct(product) {
      /* eslint-disable no-undef */
      window.location.href = product.destinationUrl;
      /* eslint-enable no-undef */
    },
  },
  components: {
    VueItem,
    Modal,
  },
};
</script>

<style lang="sass?outputStyle=expanded">
.vue-me {
  margin-left: auto;
  margin-right: auto;
  width: 80%;

  .modal-container {
    width: 700px;
    height: 420px;

    .modal-header {
      position: relative;
      .modal-default-button {
        padding: 6px;
        position: absolute;
        right: 0;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .modal-body {
      height: 100%;
      .preview-container {
        height: 100%;
        .photo-container {
          float: left;
          height: 100%;
          width: 60%;
          .photo {
            height: 100%;
            width: 100%;
            background-size: contain;
          }
        }
        .products-container {
          float: left;

          $container-padding: 26px;
          height: calc(100% - #{$container-padding});
          width: 40%;
          overflow-y: scroll;
          padding-top: $container-padding;
          .product {
            $padding: 6px;
            float: left;
            height: 140px;
            width: calc(100% / 2 - #{$padding});
            background-size: contain;
            background-repeat: no-repeat;
            padding-right: $padding;
            padding-bottom: $padding;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
