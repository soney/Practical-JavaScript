const inp = document.querySelector("input#location");
const btn = document.querySelector("button#fetch_weather");

btn.addEventListener("click", async () => {
    const weatherData = await getWeatherData(inp.value);
    console.log(weatherData);

    const temps = _.map(weatherData, "temperature");
    const averageTemp = _.mean(temps);
    const highTemp = _.max(temps);
    const lowTemp = _.min(temps);

    console.log(averageTemp, highTemp, lowTemp);
    document.querySelector("#weather").textContent = `Average: ${averageTemp}. Low: ${lowTemp}. High: ${highTemp}`;

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: _.map(weatherData, "name"),
            datasets: [{
                label: 'Temperature',
                data: temps
            }]
        }
    });
});
