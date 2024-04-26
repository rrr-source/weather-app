<template>
  <div class="footer-container">
    <div class="card-wrapper">
      <Card
        v-for="day in daysOfWeek"
        :key="day"
        v-if="weather"
        :weather="weather"
        :day="day"
      />
    </div>
  </div>
</template>

<script>
import Card from './sub/Card.vue';
import {getCurrentWeather} from '@/services/weatherService';

export default {
  components: {
    Card
  },

  data() {
    return {
      weather: null,
      daysOfWeek: []
    };
  },


  computed: {
    isDarkTheme() {
      return this.$store.state.isDarkTheme;
    }
  },

  created() {
    this.fetchWeather();
    this.setupDaysOfWeek();
  },

  methods: {
    async fetchWeather() {
      try {
        const response = await getCurrentWeather('Tashkent');
        if (response && response.main && response.main.temp) {
          this.weather = {
            temp: this.formatTemperature(this.convertKelvinToCelsius(response.main.temp)), // Convert and format temperature
            icon: response.weather[0].icon
          };
        }
      } catch (error) {
        console.error('Error fetching current weather:', error);
        this.weather = null; // Set weather to null on error to handle conditional rendering
      }
    },

    setupDaysOfWeek() {
      const today = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        this.daysOfWeek.push(days[nextDay.getDay()]);
      }
    },

    convertKelvinToCelsius(kelvinTemp) {
      return kelvinTemp - 273.15;
    },

    // Function to format and round temperature
    formatTemperature(temperature) {
      const roundedTemp = Math.round(temperature);
      return roundedTemp.toFixed(0);
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/theme.scss';

.footer-container {
  display: flex;

}

.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);
  gap: 5px; /* Provides space between cards */
  border-radius: $border-radius-20;

  .dark-theme {
    background-color: $dark-background-color;
    color: $dark-text-color;
  }

  .light-theme {
    background-color: $light-background-color;
    color: $light-text-color;
  }
}

@media (max-width: $breakpoint-lg) {

}

@media (max-width: $breakpoint-md) {

}

@media (max-width: $breakpoint-sm) {
  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;

    .dark-theme {
      background-color: $dark-background-color;
      color: $dark-text-color;
    }

    .light-theme {
      background-color: $light-background-color;
      color: $light-text-color;
    }
  }
}
</style>
