<template>
  <div>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>

    <hr />

    <h2>Already signed in?</h2>
    <p><button @click="logout">Log out</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log("✅ Firebase Login Successful!")
    console.log("👤 Current user after login:", auth.currentUser)

    const uid = userCredential.user.uid
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const role = docSnap.data().role
      console.log("🔑 User role from Firestore:", role)

      if (role === "admin") {
        router.push("/adminDashboard")
      } else if (role === "student") {
        router.push("/studentDashboard")
      } else {
        console.log("⚠️ Unknown role. Redirecting to homepage.")
        router.push("/")
      }
    } else {
      console.log("⚠️ No user document found in Firestore.")
    }
  } catch (error) {
    console.log("❌ Login error:", error.code)
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    console.log("✅ User signed out.")
    console.log("👤 Current user after sign out:", auth.currentUser) // null
    alert("You are now signed out.")
  } catch (error) {
    console.log("❌ Sign out error:", error.message)
  }
}
</script>
