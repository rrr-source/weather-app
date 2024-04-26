import axios from 'axios';

const API_KEY = '1f5c2170ea4a669ceb6f6c3b356c03d1';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
    console.log("Api URL:", (`${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}`))
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};
