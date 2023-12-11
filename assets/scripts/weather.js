"use strict";

const weather = document.querySelector(".weather");

const weatherApiUrl =
  "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light";

getWeatherData();
async function getWeatherData() {
  const response = await fetch(weatherApiUrl);
  let data = await response.json();

  console.log(data[0]);
  currentWeather(data[0].current);
  currentWeatherText(data[0].customDescription.text, 1, 0);
  currentWeatherText(data[0].customDescription.emoji, 1, 1);
  currentWeatherText(Math.floor(data[0].max) + "°", 2, 0);
  currentWeatherText(Math.floor(data[0].min) + "°", 2, 2);
}

function currentWeather(current) {
  weather.firstElementChild.firstElementChild.innerText =
    Math.floor(current) + "°";
}

function currentWeatherText(current, i, j) {
  weather.children[i].children[j].innerText = current;
}
