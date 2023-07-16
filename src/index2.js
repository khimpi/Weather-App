// Display current date and time

function formatDateTime() {

  let now = new Date();

  let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  day = day[now.getDay()];

  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  month = month[now.getMonth()];

  let cHour = now.getHours();
  let cMinute = now.getMinutes();
  let currentTime = `${cHour}:${cMinute}`;


  if (cMinute > 9) { currentTime = `${cHour}:${cMinute}`; }
  else { currentTime = `${cHour}:0${cMinute}`; }


  function dateOrdinalNumber() {
    if (date === 1 || date === 21 || date === 31) { return (date + "st"); }
    else if (date === 2 || date === 22) {
      return (date + "nd");
    }
    else if (date === 3) { return (date + "rd"); }
    else if (3 < date < 21) { return (date + "th"); }
  }

  let date = now.getDate();
  let currentDate = dateOrdinalNumber();

  document.querySelector(".date").innerHTML = `${day} ${currentDate} ${month} | ${currentTime}`;
  document.querySelector(".update").innerHTML = `${day} ${currentTime}`;

}

function getForecast(coordinates) {
  console.log(coordinates);
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
   
  let apiKey = `b400ae3b711a616262d18b0ca2cbe78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
 
  axios.get(apiUrl).then(displayForecast);

}

function showCurrentCityTemp(response) {
 
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  cTemp = Math.round(response.data.main.temp);
  
  document.querySelector(".current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".city").innerHTML = `${response.data.name}, `;
  document.querySelector(".country").innerHTML = response.data.sys.country;
  document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  document.querySelector(".max").innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  document.querySelector(".min").innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  
  formatDateTime(response.data.dt * 1000);
  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  apiKey = `b400ae3b711a616262d18b0ca2cbe78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  
  axios.get(apiUrl).then(showCurrentCityTemp);
}

function showCurrentLocation(event) {
    event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(city) {
  let unit = "metric";
  let apiKey = `b400ae3b711a616262d18b0ca2cbe78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentCityTemp);
}

function displayCity(event) {
  event.preventDefault();
  let cityName = document.querySelector(".form-control");
  document.querySelector(".city").innerHTML = cityName.value;

  search(cityName.value);
}

function showTempC(event) {
  event.preventDefault();
  degreeC.classList.add("degreeSelected");
  degreeF.classList.remove("degreeSelected");
  document.querySelector(".current-temp").innerHTML = cTemp;
}

function showTempF(event) {
  event.preventDefault();
  degreeC.classList.remove("degreeSelected");
  degreeF.classList.add("degreeSelected");
  document.querySelector(".current-temp").innerHTML = Math.round(cTemp * 9/7 + 32);
}

function formatDay(timestamp) {

  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row detail">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + `<div class="col outline forecast detail">
         <div class="day">${formatDay(forecastDay.dt)} </div>
              <span class="icon"><img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="40px"></img></span>
               <div class="temp">${Math.round(forecastDay.temp.max)}°C | <span class="low-temp">${Math.round(forecastDay.temp.min)}°C</span>
               </div> 
      </div>`;}
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let currentLocation = document.querySelector("#gpsLocation");
currentLocation.addEventListener("click", showCurrentLocation);

let degreeF = document.querySelector(".fahrenheit-link");
degreeF.addEventListener("click", showTempF);

let degreeC = document.querySelector(".celcius-link");
degreeC.addEventListener("click", showTempC);


let cityFormSubmit = document.querySelector("#city-form");
cityFormSubmit.addEventListener("submit", displayCity);

let cTemp = 36;

search("Assam");