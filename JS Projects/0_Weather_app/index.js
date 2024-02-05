// Let say we have a API
const apiKey = "eerregregr";
const apiURL = "dsdvdsvsdv";
// To get input field data
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
// To get whether icon
const weatherIcon = document.querySelector(".weatherIcon");

async function chechWhether(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  // if user enter wrong city, it should show error message so
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // if city name is okay, show everything as it is
    var data = await response.json();

    console.log(data);
    // populating data inside div for city name
    document.querySelector(".city").innerHTML = data.name;
    // for temp
    // Math.round to make it integer
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed;

    // Change icon based on data
    if (data.weather[0].main == "clouds") {
      // images/clouds is our folder inside which there is image
      weatherIcon.src = "images/clouds";
    } else if (data.weather[0].main == "clear") {
      // images/clear is our folder inside which there is image
      weatherIcon.src = "images/clear";
    } else if (data.weather[0].main == "rain") {
      // images/rain is our folder inside which there is image
      weatherIcon.src = "images/rain";
    }

    // display infor only when we have enetered anything in the input tag
    document.querySelector(".weather").style.display = "block";
  }
}

searchBox.addEventListener("click", () => {
  chechWhether(searchBox.value);
});
