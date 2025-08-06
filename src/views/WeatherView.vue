<template>
  <div class="container mt-4">
    <h1>🌤️ WEATHER APP</h1>
    <div class="mb-3">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name"
        class="form-control"
      />
      <button @click="searchByCity" class="btn btn-primary mt-2">
        Search
      </button>
    </div>

    <main v-if="weatherData">
      <h2>
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "8178b548e36c80a1c42d5ab60f0ce899"; // ✅ 替换为你当前激活的 key

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.round(this.weatherData.main.temp)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  methods: {
    async searchByCity() {
      if (!this.city) return;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;

      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("❌ Failed to get weather data. Check city name or try again.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
img {
  width: 80px;
}
</style>
