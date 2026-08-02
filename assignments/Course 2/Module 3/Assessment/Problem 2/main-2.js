// Provided for you: a set of cities with their latitude and longitude.
const CITY_COORDINATES = {
  'Ann Arbor': { latitude: 42.28, longitude: -83.74 },
  'New York': { latitude: 40.71, longitude: -74.01 },
  'London': { latitude: 51.51, longitude: -0.13 },
  'Tokyo': { latitude: 35.68, longitude: 139.69 },
  'Sydney': { latitude: -33.87, longitude: 151.21 }
};

// Provided for you: look up the coordinates for a city name.
function getCoordinates(city) {
  return CITY_COORDINATES[city];
}

// ===== YOUR TASK =====
// Define lookupWeather(city): fetch the current weather for the city from the
// Open-Meteo API and show its temperature and wind speed. Full details are in
// the problem description.
//
// TODO: write lookupWeather below -- use getCoordinates(city) to get the
//       latitude and longitude, fetch the weather, read the JSON, and put the
//       temperature in #weather-temperature and the wind speed in
//       #weather-windspeed.
