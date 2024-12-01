import { createStore } from 'vuex'

// Load data from localStorage if available
const savedTransactions = localStorage.getItem('transactions')
const initialTransactions = savedTransactions ? JSON.parse(savedTransactions) : []

export default createStore({
  state: {
    transactions: initialTransactions
  },
  mutations: {
    ADD_TRANSACTION(state, transaction) {
      state.transactions.push(transaction)
      // Save to localStorage
      localStorage.setItem('transactions', JSON.stringify(state.transactions))
    },
    DELETE_TRANSACTION(state, index) {
      state.transactions.splice(index, 1)
      localStorage.setItem('transactions', JSON.stringify(state.transactions))
    }
  },
  getters: {
    totalIncome: (state) => {
      return state.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
    },
    totalExpenses: (state) => {
      return state.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
    },
    balance: (state, getters) => {
      return getters.totalIncome - getters.totalExpenses
    },
    expensesByCategory: (state) => {
      return state.transactions
        .filter(t => t.type === 'expense')
        .reduce((categories, t) => {
          if (!categories[t.category]) {
            categories[t.category] = 0
          }
          categories[t.category] += parseFloat(t.amount)
          return categories
        }, {})
    }
  }
})
