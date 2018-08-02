<template>
  <div>


    <template v-for="(stock, key) in marketStocks">
      <tradePlate :title='stock.title' :price='stock.price' :key="key"></tradePlate>
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
          'marketStocks',
        ]),
      }
  }
</script>

<style scoped>

</style>