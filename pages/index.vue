<template>
  <div class="container" :class="{'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme}">
    <div class="header-container">
      <Header />
    </div>

    <div class="content-container">
        <Weather />
        <Details />
    </div>

    <div>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Weather from '~/components/Weather.vue';
import Details from '~/components/Details';
import Footer from '~/components/Footer';

export default {
  components: {
    Header,
    Weather,
    Details,
    Footer
  },

  computed: {
    isDarkTheme() {
      return this.$store.state.isDarkTheme;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/theme.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header-container {
  margin-bottom: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 100%;
  background-color: $background-color;
  padding: 10px 10px 0 10px;

  .dark-theme {
    background-color: $dark-background-color;
    color: $dark-text-color;
  }

  .light-theme {
    background-color: $light-background-color;
    color: $light-text-color;
  }
}

.content-container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  max-width: 100%;
}

@media (max-width: $breakpoint-lg) {
  .content-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    max-width: 100%;
  }
}


@media (max-width: $breakpoint-md) {
  .content-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: $breakpoint-sm) {
  .content-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
