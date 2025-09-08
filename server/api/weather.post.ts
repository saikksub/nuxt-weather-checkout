export default defineEventHandler(async (event) => {
  const { lat, lon } = await readBody(event);

  if (!lat || !lon) {
    return { error: 'Latitude and Longitude are required' };
  }

  return getWeatherByCoordinates(lat, lon);
})
