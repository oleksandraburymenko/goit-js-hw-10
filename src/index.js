import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countriesList = document.querySelector(".country-list");
const countryContainer = document.querySelector(".country-info");

const renderCountries = (countries) => {
  const html = countries
    .map(
      (country) =>
        `<div>
          <h2>${country.name.official}</h2>
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Population:</strong> ${country.population}</p>
          <img src="${country.flags.svg}" alt="${country.name.official} flag" width="200" height="120" />
          <p><strong>Languages:</strong> ${country.languages
            .map((language) => language.name)
            .join(", ")}</p>
        </div>`
    )
    .join("");
  countriesList.innerHTML = html;
};

const searchCountries = debounce(async (searchValue) => {
  if (!searchValue.trim()) {
    countriesList.innerHTML = "";
    return;
  }

  try {
    const countries = await fetchCountries(searchValue);
    renderCountries(countries);
  } catch (error) {
    console.error(error);
  }
}, DEBOUNCE_DELAY);

searchBox.addEventListener("input", (event) => {
  const searchValue = event.target.value.trim();
  searchCountries(searchValue);
});

