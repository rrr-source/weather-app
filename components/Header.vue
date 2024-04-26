<template>
  <div class="main__container" :class="{'theme-dark': isDarkTheme}">
    <div class="left-side__container">
      <img src="@/assets/images/logo.svg" alt="Weather App" class="logo">
      <span class="company-name">vue weather</span>
    </div>

    <div class="right-side__container">
      <v-btn icon @click="toggleTheme">
        <img v-if="isDarkTheme" src="@/assets/images/invert_colors.svg" alt="Invert Colors Icon">
        <img v-else src="@/assets/images/invert_colors.svg" alt="Invert Colors Icon Light">
      </v-btn>

      <input
        class="search-input"
        placeholder="Выбрать город"
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isDarkTheme() {
      return this.$store.state.isDarkTheme;
    }
  },

  watch: {
    isDarkTheme(newVal, oldVal) {
      console.log(`Theme changed from ${oldVal} to ${newVal}`);
    }
  },

  methods: {
    // Функция меняет тему, меняем состояние во Vuex-е, отслеживаю след клик
    toggleTheme() {
      console.log("Toggling theme from:", this.isDarkTheme);
      this.$store.dispatch('toggleTheme');
      console.log("Theme toggled to:", this.isDarkTheme);
      this.$nextTick(() => {
        console.log("Theme toggled to:", this.isDarkTheme);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/theme.scss';

.logo {
  width: 48px;
  height: 48px;
  margin-right: 20px;
}

.company-name {
  font-family: $font-family-montserrat;
  font-size: $font-size-large;
  font-weight: $font-weight-700;

  text-transform: uppercase;
}

.main__container {
  color: $primary-color;
  background-color: $background-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  &.theme-dark {
    background-color: $dark-background-color;
  }
}


.left-side__container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-side__container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.search-input {
  background-color: $secondary-color;
  text-align: center;
  border-radius: $border-radius-10;

  width: 194px;
  height: 37px;

  &.theme-dark {
    color: #FFFFFF;
  }
}

.search-input::placeholder {
  text-align: center;
  line-height: inherit;
}

@media (max-width: $breakpoint-lg) {
  .main__container {
    padding: 0 15px;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }

  .company-name {
    font-size: $font-size-large;
  }

  .right-side__container {
    gap: 20px;
  }
}

@media (max-width: $breakpoint-md) {
  .main__container {
    padding: 0 10px;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .company-name {
    font-size: 18px;
  }

  .right-side__container {
    gap: 16px;
  }

  .search-input {
    background-color: $secondary-color;
    text-align: center;
    border-radius: $border-radius-10;

    width: 150px;
    height: 30px;

    &.theme-dark {
      color: #FFFFFF;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .main__container {
    padding: 0;
  }

  .logo {
    width: 35px;
    height: 35px;
    margin-right: 5px;
  }

  .company-name {
    font-size: 14px;
  }

  .right-side__container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1px;
  }

  .search-input {
    background-color: $secondary-color;
    text-align: center;
    border-radius: $border-radius-10;

    width: 150px;
    height: 30px;

    &.theme-dark {
      color: #FFFFFF;
    }
  }
}
</style>
