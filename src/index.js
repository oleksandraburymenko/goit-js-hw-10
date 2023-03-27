import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js";
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const countryListRef = document.querySelector(".country-list");
const cardContainerRef = document.querySelector(".country-info");

function handleSearchCountry (event) {
  event.preventDefault();
  const validInput = event.target.value.trim();
  fetchCountries(validInput).then(console.log);

  fetchCountries(validInput)
    .then(data => {
        if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (data.length >= 2 && data.length <= 10) {
        renderCountryList(data);
        } else if (data.length === 1) {
          renderCountryCard(data[0]);
        }
    })
    .catch(error => {
      Notify.info('Oops, there is no country with that name');
    })    
    
}

inputEl.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY));

function renderCountryList(countryList) {
  const markup = countryList
    .map(country => {
      return `
        <li class="country-list__item">
          <img src="${country.flag}" alt="${country.name}" class="country-list__flag">
          <span class="country-list__name">${country.name}</span>
        </li>
      `;
    })
    .join('');

  countryListRef.innerHTML = markup;
}

function renderCountryCard(country) {
  const markup = `
    <div class="card">
      <img src="${country.flag}" alt="${country.name}" class="card__flag">
      <div class="card__details">
        <h2 class="card__name">${country.name}</h2>
        <p class="card__population">Population: ${country.population.toLocaleString()}</p>
        <p class="card__region">Region: ${country.region}</p>
        <p class="card__capital">Capital: ${country.capital}</p>
        <p class="card__languages">Languages: ${country.languages.map(lang => lang.name).join(', ')}</p>
      </div>
    </div>
  `;

  cardContainerRef.innerHTML = markup;
}