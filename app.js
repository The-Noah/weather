var weatherElement = document.querySelector(".weather");
var latitude = 0;
var longitude = 0;

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    updateWeather();
  });
}

function updateWeather(){
  fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`).then(function(res){return res.json()}).then(function(res){
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${res[0].woeid}`).then(function(res){return res.json()}).then(function(res){
      const temp = Math.round(res.consolidated_weather[0].the_temp / 5 * 9 + 32);
      const icon = res.consolidated_weather[0].weather_state_abbr;
      weatherElement.innerHTML = `${icon !== "" && `<img src="https://www.metaweather.com/static/img/weather/${icon}.svg" alt="">`} ${temp}°F`;
    }).catch(console.error);
  }).catch(console.error);

  setTimeout(updateWeather, 300000); // update every 5 minutes
};
