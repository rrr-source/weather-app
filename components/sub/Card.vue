<template>
  <div class="card">
    <div class="subtitle">
      {{ day }}
    </div>
    <div class="date-title">
      {{ showDate }}
    </div>
    <img class="sun-icon" src="@/assets/images/sun.svg" alt="Full Sun">
    <div class="temperature">
      +{{ weather.temp }}°
    </div>
    <div class="temperature-night">
      +{{ weather.temp - 5 }}°
    </div>
    <div class="detail-text">
      Ясно
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: {
      type: Object,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  },

  computed: {
    showDate() {
      const today = new Date();
      return today.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/theme.scss';

.card {
  width: 148px;
  height: 200px;
  border-radius: $border-radius-10;
  padding: 10px;
  background-color: $secondary-color;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  box-shadow: 0 3px 20px 0 rgba(147, 144, 144, 0.28);
}

.sun-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}

.subtitle {
  font-family: $font-family-montserrat;
  font-weight: $font-weight-600;
  font-size: 18px;
  margin-bottom: 5px;
}

.date-title {
  font-family: $font-family-montserrat;
  font-weight: $font-weight-500;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.temperature {
  font-family: $font-family-montserrat;
  font-weight: $font-weight-600;
  font-size: 18px;
}

.temperature-night {
  font-family: $font-family-montserrat;
  font-weight: $font-weight-400;
  font-size: 13px;
  margin-bottom: 10px;
}

.detail-text {
  font-family: $font-family-montserrat;
  font-weight: $font-weight-400;
  font-size: 13px;
  margin-bottom: 10px;
  color: $text-color-gray;
}
</style>
