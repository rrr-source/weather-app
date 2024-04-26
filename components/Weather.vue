<template>
  <div class="main__container">
    <div class="today-weather__container">
      <div class="celsius__container">
        <span v-if="weather" class="header-text">
          {{ formatTemperature(weather.main.temp) }}°
        </span>
        <span class="subtitle">
          Сегодня
        </span>
      </div>
      <div class="sun-image">
        <img src="@/assets/images/sun.svg" alt="Full Sun">
      </div>
    </div>

    <div class="timezone__container">
      <div class="time-display">Время: {{ currentTime }}</div>
      <div class="city-display">Город: {{ currentCity }}</div>
    </div>
  </div>
</template>

<script>
import { getCurrentWeather } from '@/services/weatherService';

export default {
  data() {
    return {
      weather: null,
      currentTime: new Date().toLocaleTimeString(),
      currentCity: 'Loading...',
    };
  },

  computed: {
    isDarkTheme() {
      return this.$store.state.isDarkTheme;
    }
  },

  mounted() {
    this.updateTime();
    this.fetchWeather();
    const now = new Date();
    const options = { hour12: false, hour: '2-digit', minute: '2-digit' };
    this.currentTime = now.toLocaleTimeString([], options);
  },

  methods: {
    fetchWeather() {
      try {
        //TODO: создать принимающую значение функцию (от пользователя, с выбранным городом)

        // Вызываю функцию getCurrentWeather с захардкоженым городом, ловим ошибку, если данные не получены
        const city = 'Ташкент';
        getCurrentWeather(city).then(response => {
          console.log("Response: ", response);
          this.currentCity = city;
          response.main.temp = this.convertKelvinToCelsius(response.main.temp);
          this.weather = response;
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        this.currentCity = 'Failed to load';
      }
    },

    // Функция переводит значение Кельвина в Цельсий
    convertKelvinToCelsius(kelvinTemp) {
      return kelvinTemp - 273.15;
    },

    // Функция форматирует и округляет температуру
    formatTemperature(temperature) {
      const roundedTemp = Math.round(temperature);
      return roundedTemp.toFixed(0);
    },

    // Функция форматирует время (убрал секунды и сделал 24 часовой формат)
    updateTime() {
      setInterval(() => {
        this.currentTime = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
      }, 1000);
    }
  },

  filters: {
    // Регистрирую фильтр
    temperatureFilter(value) {
      return this.formatTemperature(value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/theme.scss';

// TODO: доделать адаптив и тёмную тему

.main__container {
  width: 400px;
  height: 300px;
  border-radius: 20px;
  max-width: 100%;

  box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);

  .dark-theme {
    background-color: $dark-background-color;
    color: $dark-text-color;
  }

  .light-theme {
    background-color: $light-background-color;
    color: $light-text-color;
  }
}

.today-weather__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
}

.celsius__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.header-text {
  color: $primary-color;
  font-family: $font-family-montserrat;
  font-size: $font-size-extra-large;
  font-weight: $font-weight-500;
  line-height: 100px;
}

.subtitle {
  font-size: 34px;

  .dark-theme {
    color: $dark-text-color;
  }

  .light-theme {
    color: $light-text-color;
  }
}

.sun-image {
  width: 120px;
  height: 120px;
}

.timezone__container {
  text-align: start;
  padding-left: 20px;
  font-size: 24px;
  color: $text-color-gray;
}

.time-display, .city-display {
  margin-bottom: 10px;
  font-family: $font-family-montserrat;
  font-weight: 400;
  font-size: 22px;
}

@media (max-width: $breakpoint-lg) {
  .main__container {
    width: 100%;
    height: 260px;
    border-radius: $border-radius-20;
  }

  .header-text {
    font-size: 78px;
    line-height: 90px;
  }

  .subtitle {
    font-size: 34px;

    .dark-theme {
      color: $dark-text-color;
    }

    .light-theme {
      color: $light-text-color;
    }
  }

  .timezone__container {
    text-align: start;
    padding-left: 20px;
    font-size: 16px;
    color: $text-color-gray;
  }

  .time-display, .city-display {
    margin-bottom: 10px;
    font-family: $font-family-montserrat;
    font-weight: 400;
    font-size: 18px;
  }
}

@media (max-width: $breakpoint-md) {
  .main__container {
    width: 100%;
    height: 260px;
  }

  .header-text {
    font-size: 78px;
    line-height: 90px;
  }

  .subtitle {
    font-size: 34px;

    .dark-theme {
      color: $dark-text-color;
    }

    .light-theme {
      color: $light-text-color;
    }
  }

  .timezone__container {
    text-align: start;
    padding-left: 20px;
    font-size: 16px;
    color: $text-color-gray;
  }

  .time-display, .city-display {
    margin-bottom: 10px;
    font-family: $font-family-montserrat;
    font-weight: 400;
    font-size: 18px;
  }
}

@media (max-width: $breakpoint-sm) {
  .main__container {
    width: 100%;
    height: 260px;
    border-radius: 20px;
  }

  .header-text {
    font-size: 70px;
    line-height: 90px;
  }

  .subtitle {
    font-size: 30px;

    .dark-theme {
      color: $dark-text-color;
    }

    .light-theme {
      color: $light-text-color;
    }
  }

  .sun-image {
    width: 120px;
    height: 120px;
  }

  .timezone__container {
    text-align: start;
    padding-left: 20px;
    font-size: 16px;
    color: $text-color-gray;
  }

  .time-display, .city-display {
    margin-bottom: 10px;
    font-family: $font-family-montserrat;
    font-weight: 400;
    font-size: 18px;
  }
}
</style>
