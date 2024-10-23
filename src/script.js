
let form = document.querySelector("#search-form");
let cityInput = document.querySelector("#city-input");
let cityDisplay = document.querySelector("#city-name");


function handleSearch(event) {
  event.preventDefault();
  let city = cityInput.value.trim();

  if (city) {
    cityDisplay.textContent = city;
    cityInput.value = "";
  }
}


form.addEventListener("submit", handleSearch);
