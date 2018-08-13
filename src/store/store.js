import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const startingState = {
  funds: 10000,
  currentDay: 1,
  daysRemaining: 3,
  ownedStocks: [],
  transactionError: null,
  marketStocks: [
    {
      title: 'BMW',
      price: 130
    }, {
      title: 'Twitter',
      price: 69
    }, {
      title: 'Gazprom',
      price: 45
    }, {
      title: 'VAG',
      price: 332
    }
  ]
}

// let savedState = {}

export const store = new Vuex.Store({
  state: startingState,
  getters: {
    currentDay: state => state.currentDay,
    daysRemaining: state => state.daysRemaining,
    funds: state => state.funds,
    currentDay: state => state.currentDay,
    ownedStocks: state => state.ownedStocks,
    marketStocks: state => state.marketStocks,
    transactionError: state => state.transactionError
  },
  mutations: {
    resetGame: state => state = startingState,
    decrementRemainingDays: state => state.daysRemaining--,
    incrementDay: state => state.currentDay++,
    updateFunds: (state, payload) => state.funds = payload,
    incrementFunds: (state, payload) => {
      state.funds += payload
    },
    decrementFunds: (state, payload) => {
      state.funds -= payload
    },
    addStock: (state, payload) => {
      const existingStock = state
        .ownedStocks
        .find(x => x.title === payload.title)
      if (existingStock) {
        const existingStockIndex = state
          .ownedStocks
          .indexOf(existingStock)
        state.ownedStocks = state
          .ownedStocks
          .map((stock, index) => {
            if (index === existingStockIndex) {
              stock.quantity = existingStock.quantity + payload.quantity
            }
            return stock
          })

      } else {
        state.ownedStocks = [
          ...state.ownedStocks,
          payload
        ]
      }

    },
    removeStock: (state, payload) => {
      console.log(payload)

      const stockToRemove = state
        .ownedStocks
        .find(x => x.title === payload.title)
      const stockToRemoveIndex = state
        .ownedStocks
        .indexOf(stockToRemove)
      const {operationQuantity} = payload
      const remainingQuantity = state.ownedStocks[stockToRemoveIndex].quantity

      console.log(stockToRemove)
      if (operationQuantity >= remainingQuantity) {
        state
          .ownedStocks
          .splice(stockToRemoveIndex, 1)
      } else {
        state.ownedStocks = state
          .ownedStocks
          .map((stock, index) => {
            if (index === stockToRemoveIndex) {
              stock.quantity = stockToRemove.quantity - payload.operationQuantity
            }
            return stock
          })
      }
      console.log(state.ownedStocks)
    },
    spitError: (state, payload) => {
      state.transactionError = payload
    },
    rollPrices: (state) => {
      state
        .marketStocks
        .forEach((marketStock, marketStockIndex) => {
          const newPrice = randomize(marketStock.price)
          marketStock.price = newPrice
          state
            .ownedStocks
            .forEach((owndStock, owndStockIndex) => {
              if (owndStock.title === marketStock.title) {
                owndStock.price = newPrice
              }
            })
        })
    }
  },
  actions: {
    saveGame: (context) => {
      localStorage.setItem('savedGame', JSON.stringify(context.state))
    },
    loadGame: (context) => {

    },
    startNewGame: ({commit}) => {
      commit('resetGame')
    },
    buyStock: (context, payload) => {

      const {title, price, operationQuantity} = payload
      const resultPrice = price * operationQuantity

      if (resultPrice > context.state.funds) {
        context.commit('spitError', 'Not enough Funds!')
        setTimeout(() => {
          context.commit('spitError', '')
        }, 2000)
        return false
      }
      context.commit('decrementFunds', resultPrice)
      const newStock = {
        title,
        price,
        quantity: operationQuantity
      }
      context.commit('addStock', (newStock))
    },
    sellStock: (context, payload) => {

      const {price, operationQuantity, quantity} = payload
      const resultProfit = price * operationQuantity

      if (operationQuantity > quantity) {
        context.commit('spitError', 'Not enough Stocks!')
        setTimeout(() => {
          context.commit('spitError', '')
        }, 2000)
        return false
      }

      context.commit('incrementFunds', resultProfit)
      context.commit('removeStock', payload)
    },
    startNextDay: ({
      commit
    }, payload) => {
      commit('incrementDay')
      commit('rollPrices')
      commit('decrementRemainingDays')
    }
  }
})

function randomize(number) {
  const newNumber = number + Math.round(number * (Math.random() - 0.5))
  return newNumber
}
