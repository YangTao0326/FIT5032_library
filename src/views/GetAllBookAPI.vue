<!-- src/views/GetAllBookAPI.vue -->
<template>
  <div class="container mt-4">
    <h2>📚 All Books API (JSON)</h2>
    <div v-if="books">
      <pre>{{ JSON.stringify(books, null, 2) }}</pre>
    </div>
    <div v-else>
      <p>Loading book data...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const books = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/src/assets/json/books.json')
    if (!response.ok) throw new Error('Failed to load books data')
    books.value = await response.json()
  } catch (err) {
    books.value = { error: err.message }
  }
})
</script>

<style scoped>
pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
