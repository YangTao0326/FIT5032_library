<template>
  <div class="container mt-4">
    <h2>📚 Firestore Book Manager</h2>

    <!-- Add Book Form -->
    <form @submit.prevent="addBook" class="mb-4">
      <input type="text" v-model="isbn" placeholder="ISBN" class="form-control mb-2" />
      <input type="text" v-model="name" placeholder="Book Name" class="form-control mb-2" />
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <!-- Update Filtered Books -->
    <button @click="getFilteredBooks" class="btn btn-secondary mb-3">
      Get Books with ISBN > 1000, ordered by name, limit 3
    </button>

    <!-- Book List -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.isbn }}</td>
          <td>
            <input v-model="book.name" class="form-control" />
          </td>
          <td>
            <button class="btn btn-success btn-sm me-2" @click="updateBook(book)">Update</button>
            <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../Firebase/init.js'

const isbn = ref('')
const name = ref('')
const books = ref([])

const addBook = async () => {
  if (!isbn.value || !name.value) return
  const newBook = {
    isbn: Number(isbn.value),
    name: name.value
  }
  await addDoc(collection(db, 'books'), newBook)
  isbn.value = ''
  name.value = ''
  fetchBooks()
}

const fetchBooks = async () => {
  const snapshot = await getDocs(collection(db, 'books'))
  books.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}

const updateBook = async (book) => {
  const ref = doc(db, 'books', book.id)
  await updateDoc(ref, {
    name: book.name
  })
  alert('Book updated!')
}

const deleteBook = async (id) => {
  await deleteDoc(doc(db, 'books', id))
  fetchBooks()
}

const getFilteredBooks = async () => {
  const q = query(
    collection(db, 'books'),
    where('isbn', '>', 1000),
    orderBy('name'),
    limit(3)
  )
  const snapshot = await getDocs(q)
  books.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  console.log("📘 Filtered books result:", books.value)  // 👈 加这一行用于截图
}

// 初始加载全部书籍
onMounted(fetchBooks)
</script>
