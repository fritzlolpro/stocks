<template>
  <div>
    <!-- <tradePlate title="BMW" :price='100' :isBuy="false" :quantity='12'></tradePlate> -->
    <template v-if="ownedStocks.length > 0">
      <template v-for="(stock, key) in ownedStocks">
        <tradePlate
          :title='stock.title'
          :price='stock.price'
          :isBuy="false"
          :quantity='stock.quantity'
          :key="key"></tradePlate>
      </template>
    </template>
    <template v-else>
      <h3>You own nothing, go to Stocks and buy some</h3>
    </template>
  </div>
</template>

<script>
 import tradePlate from '../secondary/tradePlate.vue'
  import {mapGetters} from 'vuex'
  export default {
    components: {
      tradePlate
    },
    computed: {
        ...mapGetters([
          'ownedStocks',
        ]),
      }
  }
</script>

<style scoped>

</style>