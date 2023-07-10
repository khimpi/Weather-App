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

let currentLocation = document.querySelector("#gpsLocation");
currentLocation.addEventListener("click", showCurrentLocation);

function displayCity(event) {
  event.preventDefault();
  let cityName = document.querySelector(".form-control");
  document.querySelector(".city").innerHTML = cityName.value;

  let unit = "metric";
  let apiKey = `b400ae3b711a616262d18b0ca2cbe78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentCityTemp);
}

let cityFormSubmit = document.querySelector("#city-form");
cityFormSubmit.addEventListener("submit", displayCity);

let cTemp = 36;

function showTempC(event) {
  event.preventDefault();
  degreeC.classList.add("degreeSelected");
  degreeF.classList.remove("degreeSelected");
  document.querySelector(".current-temp").innerHTML = cTemp;
  
}

let degreeC = document.querySelector(".celcius-link");
degreeC.addEventListener("click", showTempC);

function showTempF(event) {
  event.preventDefault();
  degreeC.classList.remove("degreeSelected");
  degreeF.classList.add("degreeSelected");
  document.querySelector(".current-temp").innerHTML = Math.round(cTemp * 9/7 + 32);
}

let degreeF = document.querySelector(".fahrenheit-link");
degreeF.addEventListener("click", showTempF);

//color: #015738