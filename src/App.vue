<template>
  <div class="min-h-screen bg-gray-100" dir="rtl">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <router-link to="/" class="text-xl font-bold text-blue-600">
            إدارة الميزانية
          </router-link>
          <div class="space-x-4">
            <router-link 
              to="/add" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4"
              active-class="bg-blue-700"
            >
              إضافة معاملة
            </router-link>
            <router-link 
              to="/" 
              class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
              active-class="text-blue-600"
            >
              الرئيسية
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto py-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Fix RTL spacing issues */
.space-x-4 > * + * {
  margin-right: 1rem;
  margin-left: 0;
}
</style>
