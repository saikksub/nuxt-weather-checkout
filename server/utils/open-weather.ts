export const getWeatherByCoordinates = async (lat: number, lon: number) => {
  const apiKey = process.env.NUXT_OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenWeather API key is not set in environment variables');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenWeather API error:', response.status, errorText);
    throw new Error('Failed to fetch weather data from OpenWeather API');
  }

  const data = await response.json();
  return data;
};
