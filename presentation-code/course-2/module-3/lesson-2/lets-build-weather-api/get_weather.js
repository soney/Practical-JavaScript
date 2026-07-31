async function getWeatherData(location) {
    const GOOGLE_MAPS_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?";
    const WEATHER_GOV_URL = "https://api.weather.gov/points/";

    // Step 1: Geocode the address to get coordinates
    const geocodeParams = new URLSearchParams({
        address: location,
        key: API_KEY
    });
    const geocodeResponse = await fetch(GOOGLE_MAPS_GEOCODE_URL + geocodeParams.toString());
    const geocodeData = await geocodeResponse.json();

    // Extract the first matching location's coordinates
    const match = geocodeData.results[0];
    const {lat, lng} = match.geometry.location;

    // Step 2: Get the weather station grid point for the coordinates
    const weatherStationResp = await fetch(WEATHER_GOV_URL + lat + "," + lng);
    const weatherStationData = await weatherStationResp.json();

    // Step 3: Fetch the forecast using the grid point URL
    const forecastResp = await fetch(weatherStationData.properties.forecast);
    const forecast = await forecastResp.json();
    
    // Return the forecast periods
    return forecast.properties.periods;
}