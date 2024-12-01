<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">ملخص الميزانية</h1>
    
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-green-100 p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-green-800">إجمالي الدخل</h2>
        <p class="text-2xl font-bold text-green-600">{{ totalIncome.toFixed(2) }} ج.م</p>
      </div>
      
      <div class="bg-red-100 p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-red-800">إجمالي المصروفات</h2>
        <p class="text-2xl font-bold text-red-600">{{ totalExpenses.toFixed(2) }} ج.م</p>
      </div>
      
      <div class="bg-blue-100 p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-blue-800">الرصيد</h2>
        <p class="text-2xl font-bold" :class="{ 'text-green-600': balance >= 0, 'text-red-600': balance < 0 }">
          {{ balance.toFixed(2) }} ج.م
        </p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">المصروفات حسب الفئة</h2>
        <canvas ref="pieChart"></canvas>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">المعاملات الأخيرة</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="text-right">النوع</th>
                <th class="text-right">المبلغ</th>
                <th class="text-right">الفئة</th>
                <th class="text-right">الملاحظات</th>
                <th class="text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in transactions.slice().reverse()" :key="index">
                <td>{{ transaction.type === 'income' ? 'دخل' : 'مصروف' }}</td>
                <td>{{ transaction.amount }} ج.م</td>
                <td>{{ getArabicCategory(transaction.category) || '-' }}</td>
                <td>{{ transaction.note || '-' }}</td>
                <td>
                  <button @click="deleteTransaction(transactions.length - 1 - index)" class="text-red-600 hover:text-red-800">
                    حذف
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Chart from 'chart.js/auto'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const pieChart = ref(null)
    let chart = null

    const totalIncome = computed(() => store.getters.totalIncome)
    const totalExpenses = computed(() => store.getters.totalExpenses)
    const balance = computed(() => store.getters.balance)
    const expensesByCategory = computed(() => store.getters.expensesByCategory)
    const transactions = computed(() => store.state.transactions)

    const categoryTranslations = {
      'Food': 'طعام',
      'Transportation': 'مواصلات',
      'Housing': 'سكن',
      'Utilities': 'مرافق',
      'Entertainment': 'ترفيه',
      'Healthcare': 'رعاية صحية',
      'Shopping': 'تسوق',
      'Debt': 'ديون',
      'Other': 'أخرى'
    }

    const getArabicCategory = (category) => {
      return category ? categoryTranslations[category] : '-'
    }

    const deleteTransaction = (index) => {
      store.commit('DELETE_TRANSACTION', index)
      updateChart()
    }

    const updateChart = () => {
      if (chart) {
        chart.destroy()
      }

      const categories = Object.keys(expensesByCategory.value)
      const amounts = Object.values(expensesByCategory.value)
      const arabicCategories = categories.map(cat => categoryTranslations[cat])

      chart = new Chart(pieChart.value, {
        type: 'pie',
        data: {
          labels: arabicCategories,
          datasets: [{
            data: amounts,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#FF6384',
              '#C9CBCF'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              rtl: true
            }
          }
        }
      })
    }

    onMounted(() => {
      updateChart()
    })

    return {
      totalIncome,
      totalExpenses,
      balance,
      transactions,
      deleteTransaction,
      pieChart,
      getArabicCategory
    }
  }
}
</script>
