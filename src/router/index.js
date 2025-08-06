import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import StudentDashboard from '../views/StudentDashboard.vue'
import AddBookView from '../views/AddBookView.vue'
import BookManager from '../views/BookManagerView.vue'
import QueryBooksView from '../views/QueryBooksView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/studentDashboard',
    name: 'StudentDashboard',
    component: StudentDashboard
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/books',
    name: 'BookManager',
    component: BookManager
  },
  {
    path: '/queryBooks',
    name: 'QueryBooks',
    component: QueryBooksView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
