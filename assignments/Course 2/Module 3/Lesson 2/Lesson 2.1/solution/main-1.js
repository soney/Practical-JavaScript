// Get DOM references
const searchButton = document.querySelector('#searchButton');
const cityInput = document.querySelector('#cityInput');
const cityName = document.querySelector('#cityName');
const temperature = document.querySelector('#temperature');
const conditions = document.querySelector('#conditions');

// When the Search button is clicked, fetch the data and show the weather
searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim().toLowerCase();

  fetch('weather.json')
    .then(response => response.json())
    .then(data => {
      const weather = data[city];

      if (weather) {
        cityName.textContent = weather.city;
        temperature.textContent = weather.temperature + '°F';
        conditions.textContent = weather.conditions;
      } else {
        cityName.textContent = 'City not found';
        temperature.textContent = '';
        conditions.textContent = '';
      }
    });
});
