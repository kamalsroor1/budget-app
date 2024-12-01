<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">إضافة معاملة جديدة</h1>
    
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Transaction Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            نوع المعاملة
          </label>
          <select
            v-model="type"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">دخل</option>
            <option value="expense">مصروف</option>
          </select>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            المبلغ (ج.م)
          </label>
          <input
            type="number"
            v-model="amount"
            step="0.01"
            min="0"
            required
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Category (for expenses only) -->
        <div v-if="type === 'expense'">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            الفئة
          </label>
          <select
            v-model="category"
            required
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="Food">طعام</option>
            <option value="Transportation">مواصلات</option>
            <option value="Housing">سكن</option>
            <option value="Utilities">مرافق</option>
            <option value="Entertainment">ترفيه</option>
            <option value="Healthcare">رعاية صحية</option>
            <option value="Shopping">تسوق</option>
            <option value="Debt">ديون</option>
            <option value="Other">أخرى</option>
          </select>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            ملاحظات
          </label>
          <textarea
            v-model="note"
            rows="3"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="أضف ملاحظاتك هنا..."
          ></textarea>
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            إضافة المعاملة
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'AddTransaction',
  setup() {
    const store = useStore()
    const router = useRouter()

    const type = ref('income')
    const amount = ref('')
    const note = ref('')
    const category = ref('Food')

    const handleSubmit = () => {
      const transaction = {
        type: type.value,
        note: note.value,
        amount: parseFloat(amount.value),
        category: type.value === 'expense' ? category.value : null,
        date: new Date().toISOString()
      }

      store.commit('ADD_TRANSACTION', transaction)
      router.push('/')
    }

    return {
      type,
      amount,
      note,
      category,
      handleSubmit
    }
  }
}
</script>
