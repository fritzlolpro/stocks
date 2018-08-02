<template>
<div class="col-md-6">
 <div class="panel" :class="cardColor">
  <div class="panel-heading">
    <h3 class="panel-title">{{title}} <small>{{stockInfo}}</small></h3>

  </div>
  <div class="panel-body">
    <form class="form-inline">
      <input  type="number" class="form-control" placeholder="Quantity" v-model.number="operationQuantity">
      <button class="btn"
        :class="buttonColor"
        @click.prevent="
          mainButtonAction()
          ; resetQuantity()"
        >{{actionLabel}}</button>
        <template  v-if="!!transactionError">
         <span class='error-text'>  {{transactionError}}</span>
        </template>
    </form>

  </div>
</div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        operationQuantity: null,
      }
    },
    props: {
      isBuy: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 0
      },
    },
    computed: {

      actionLabel() {
        return this.isBuy ? 'BUY' : 'SELL'
      },
      buttonColor() {
        return this.isBuy ? 'btn-primary' : 'btn-warning'
      },
      cardColor() {
        return this.isBuy ? 'panel-warning' : 'panel-info'
      },
      stockInfo() {
        return this.isBuy ? `(Price: ${this.price})` : `(Price: ${this.price} | Quantity: ${this.quantity})`
      },
       ...mapGetters([
          'transactionError',
        ]),
    },
    methods: {
      mainButtonAction() {
        const title = this.title
        const price = this.price
        const operationQuantity = this.operationQuantity
        const quantity = this.quantity
        const payload = {
            title,
            price,
            operationQuantity,
            quantity
        }
        return this.isBuy ?
        this.buyStock(payload)
        : this.sellStock(payload)
      },
      resetQuantity() {
        this.operationQuantity = null
      },
       ...mapActions([
              'buyStock',
              'sellStock'
              ])
    }
  }
</script>

<style scoped>
 .error-text {
   color: red;
   font-weight: 600;
   margin-left: 15px;
 }
</style>