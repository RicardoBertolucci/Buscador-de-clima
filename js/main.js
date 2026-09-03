// IMPORT
import { fetchLocationInfo, fetchWeatherInfo } from "./api.js";
import {
  clearInput,
  clearWeatherInformation,
  loadStatusCity,
  showSuccess,
  showError,
} from "./ui.js";

// VARIABLES DOM
const form = document.querySelector(".weather__search-container");
const input = document.querySelector(".weather__input");

// VARIABLES
let arrayRecentSearches = [];
let value;

// FUNCTIONS
const validSearch = (value) => {
  // Armazena o resultado booleano que irá devolver para o main.js
  // const resultSearch = validSearches.has(value);
  const resultSearch = arrayRecentSearches[0] === value;

  if (resultSearch === false) {
    const arrAux = arrayRecentSearches.filter((search) => search !== value);

    arrayRecentSearches = [...arrAux];
    arrayRecentSearches.unshift(value);

    return true;
  }

  if (resultSearch === true) {
    return false;
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  value = input.value;

  clearInput(input);

  const result = validSearch(value);

  if (result) {
    clearWeatherInformation();

    loadStatusCity();

    try {
      const locationInfoResponse = await fetchLocationInfo(value);

      const { name, latitude, longitude } = locationInfoResponse.results[0];

      const weatherInfoResponse = await fetchWeatherInfo({
        latitude,
        longitude,
      });

      showSuccess({ name, data: weatherInfoResponse });
    } catch (error) {
      console.log(error.message);
      showError();
    } finally {
      loadStatusCity();
    }
  }
});
