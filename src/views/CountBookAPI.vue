<!-- src/views/CountBookAPI.vue -->
<template>
  <div class="container mt-4">
    <h1>📚 Count Book API</h1>
    <div v-if="loading" class="text-muted">Loading data...</div>
    <div v-else-if="error" class="text-danger">❌ {{ error }}</div>
    <div v-else-if="apiResponse" class="api-response">
      <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const authorsCount = ref(0)
const totalBooks = ref(0)

const calculateStats = () => {
  authorsCount.value = authors.value.length
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + (author.famousWorks?.length || 0)
  }, 0)
}

const getApiData = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(import.meta.env.BASE_URL + 'json/authors.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    authors.value = data
    calculateStats()

    apiResponse.value = {
      success: true,
      data: {
        authorsCount: authorsCount.value,
        totalBooks: totalBooks.value,
        authors: authors.value.map(author => ({
          name: author.name,
          bookCount: author.famousWorks?.length || 0
        }))
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow: auto;
}
</style>
