<template>
  <div class="main__container">
    <div class="background-image"></div>
    <div class="weather-details__container">
      <div class="svg-list">
        <div class="block block-one" v-if="weather">
          <div class="">
            <img class="" src="@/assets/images/eclipse.svg" alt="Eclipse 1">
<!--            <img class="insidious-icon" src="@/assets/images/temperature.svg" alt="Temperature meter">-->
          </div>
          <div class="text-with-details">
            <span class="subtitle">
              Температура
            </span>
          </div>
          <div>
            <span class="info-text">
              {{ formatTemperature(weather.main.temp) }}° - ощущается как {{ formatTemperature(weather.main.temp - 1) }}°
            </span>
          </div>
        </div>

        <div class="block block-two" v-if="weather">
          <div class="">
            <img class="" src="@/assets/images/eclipse.svg" alt="Eclipse 2">
            <!--            <img class="insidious-icon" src="@/assets/images/pressure.svg" alt="Pressure">-->
          </div>
          <div class="text-with-details">
            <span class="subtitle">
              Давление
            </span>
          </div>
          <div>
            <span class="info-text">
              {{ weather.main.pressure }} мм ртутного столба - нормальное
            </span>
          </div>
        </div>

        <div class="block block-three" v-if="weather">
          <div class="">
            <img class="" src="@/assets/images/eclipse.svg" alt="Eclipse 3">
            <!--            <img class="insidious-icon" src="@/assets/images/precipitation.svg" alt="Precipitation">-->
          </div>
          <div class="text-with-details">
            <span class="subtitle">Осадки</span>
          </div>
          <div>
            <span class="info-text">без осадков</span>
          </div>
        </div>

        <div class="block block-four" v-if="weather">
          <div class="">
            <img class="" src="@/assets/images/eclipse.svg" alt="Eclipse 4">
            <!--            <img class="insidious-icon" src="@/assets/images/wind.svg" alt="Wind">-->
          </div>
          <div class="text-with-details">
            <span class="subtitle">Ветер</span>
          </div>
          <div>
            <span class="info-text">{{ weather.wind.speed }} м/с юго-запад - лёгкий ветер</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentWeather } from '@/services/weatherService';

export default {
  data() {
    return {
      weather: null,
    };
  },

  computed: {

  },

  mounted() {
    this.fetchWeather();
  },

  methods: {
    fetchWeather() {
      try {
        //TODO: создать принимающую значение функцию (от пользователя, с выбранным городом)

        // Вызываю функцию getCurrentWeather с захардкоженым городом, ловим ошибку, если данные не получены
        const city = 'Tashkent';
        getCurrentWeather('Tashkent').then(response => {
          console.log("Response: ", response);
          response.main.temp = this.convertKelvinToCelsius(response.main.temp);
          this.weather = response;
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
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

.main__container {
  width: 670px;
  height: 300px;
  border-radius: 20px;
  max-width: 750px;
  box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);

  position: relative;
  z-index: 0;

  .dark-theme {
    background-color: $dark-background-color;
    color: $dark-text-color;
  }

  .light-theme {
    background-color: $light-background-color;
    color: $light-text-color;
  }
}

.background-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 460px;
  height: 202px;
  background-image: url('@/assets/images/clouds.svg');
  background-size: cover;
  background-position: top right;
  z-index: -1;
  border-radius: 20px;
}

.svg-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  gap: 10px;

}

.block {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  width: 100%;
}

/*.images-block {
  display: flex;
  flex-direction: column;
  position: relative;
  top: -30px;
}*/

/*.combined-images__container {
  position: relative;
}*/

/*.details-block {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 120px;
  gap: 52px;
}*/

/*
.eclipse-icon {
  width: 40px;
  height: 50px;
  position: relative;
  top: 40px;
  left: 30px;
}*/

/*.insidious-icon {
  position: absolute;
  top: 53px;
  left: 39px;

  width: 22px;
  height: 18px;
}*/


.subtitle {
  font-family: $font-family-montserrat;
  color: $text-color-gray;
  font-size: 14px;

}

.info-text {
  font-family: $font-family-montserrat;
  font-weight: 400;
  font-size: 14px;

  text-align: center;
}

@media (max-width: $breakpoint-xl) {
  .main__container {
    width: 670px;
    max-width: 750px;
    box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);

    position: relative;
    z-index: 0;

    .dark-theme {
      background-color: $dark-background-color;
      color: $dark-text-color;
    }

    .light-theme {
      background-color: $light-background-color;
      color: $light-text-color;
    }
  }

  .images-block {
    display: flex;
    flex-direction: column;
    position: relative;
    top: -30px;
  }
}

@media (max-width: $breakpoint-lg) {
  .main__container {
    height: 290px;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding-right: 30px;
  }

  .background-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 460px;
    height: 202px;
    background-image: url('@/assets/images/clouds.svg');
    background-size: cover;
    background-position: top right;
    z-index: -1;
  }
}

@media (max-width: $breakpoint-md) {
  .main__container {
    height: 290px;
    width: 100%;
    margin: 0 auto;
    padding-right: 30px;
  }

  .background-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 460px;
    height: 202px;
    background-image: url('@/assets/images/clouds.svg');
    background-size: cover;
    background-position: top right;
    z-index: -1;
  }
}

@media (max-width: $breakpoint-sm) {
  .main__container {
    height: 260px;
    width: 100%;
    margin: 0 auto;
    padding-right: 10px;
  }

  .background-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    height: 140px;
    background-image: url('@/assets/images/clouds.svg');
    background-size: cover;
    background-position: top right;
    z-index: -1;
  }

  .eclipse-icon {
    width: 30px;
    height: 30px;
    position: relative;
    top: 50px;
    left: 15px;
  }

  .insidious-icon {
    position: absolute;
    top: 55px;
    left: 19px;

    width: 20px;
    height: 16px;
  }
}
</style>
