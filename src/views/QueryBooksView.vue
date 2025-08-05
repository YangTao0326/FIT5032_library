<template>
  <div class="container mt-4">
    <h2>📘 Firestore Query Books View</h2>

    <!-- 输入查询条件 -->
    <div class="row mb-3">
      <div class="col">
        <input type="number" v-model.number="minIsbn" placeholder="最小 ISBN" class="form-control" />
      </div>
      <div class="col">
        <select v-model="orderField" class="form-control">
          <option value="isbn">按 ISBN 排序</option>
          <option value="name">按名称排序</option>
        </select>
      </div>
      <div class="col">
        <input type="number" v-model.number="limitCount" placeholder="限制条数" class="form-control" />
      </div>
      <div class="col">
        <button @click="queryBooks" class="btn btn-primary">查询</button>
      </div>
    </div>

    <!-- 查询结果表格 -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.isbn }}</td>
          <td>{{ book.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../Firebase/init.js'

const minIsbn = ref(0)
const orderField = ref('isbn')
const limitCount = ref(5)
const books = ref([])

const queryBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>=', minIsbn.value),
      orderBy(orderField.value),
      limit(limitCount.value)
    )

    const snapshot = await getDocs(q)
    books.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log('✅ 查询结果:', books.value)
  } catch (err) {
    console.error('❌ 查询失败:', err.message)
  }
}
</script>
