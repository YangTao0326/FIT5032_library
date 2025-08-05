<template>
  <div>
    <h2>Welcome, Student!</h2>
    <p>Your email: {{ userEmail }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"

const auth = getAuth()
const router = useRouter()
const userEmail = ref("")

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    userEmail.value = user.email
  } else {
    router.push("/FireLogin") // 未登录时重定向
  }
})

const logout = async () => {
  await signOut(auth)
  console.log("User after sign out:", auth.currentUser)
  router.push("/FireLogin")
}
</script>
