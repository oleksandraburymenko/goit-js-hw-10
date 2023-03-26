import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js";
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
// import countryCardTemplate from '../templates/country-card.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countriesList = document.querySelector(".country-list");
const countryInfoEl = document.querySelector(".country-info");

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

// const handleSearchCountry = (event) => {
//     event.preventDefault();
//     console.dir(event.target);
// }





// function handleSearchCountry (event) {
// const validInput = event.target.value.trim();

// fetchCountries(validInput)
//     .then(data => {
//         if (data.length > 10) {
//         Notify.info('Too many matches found. Please enter a more specific name.');
//         }
        
//     })
// }

// searchBox.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY));


// const inputRef = document.querySelector('#input');
// const countryListRef = document.querySelector('.country-list');
// const cardContainerRef = document.querySelector('.card-container');

// inputRef.addEventListener('input', _.debounce(onInputChange, 500));

// function onInputChange(event) {
//   event.preventDefault();
//   const inputValue = event.target.value.trim();

//   if (!inputValue) {
//     clearPage();
//     return;
//   }

//   fetch(`https://restcountries.com/v2/name/${inputValue}`)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Country not found');
//     })
//     .then(data => {
//       clearPage();

//       if (data.length > 10) {
//         notiflix.notify('Too many matches found. Please enter a more specific name.');
//       } else if (data.length >= 2 && data.length <= 10) {
//         renderCountryList(data);
//       } else if (data.length === 1) {
//         renderCountryCard(data[0]);
//       }
//     })
//     .catch(error => {
//       notiflix.notify('Oops, there is no country with that name');
//     });
// }

// function clearPage() {
//   countryListRef.innerHTML = '';
//   cardContainerRef.innerHTML = '';
// }

// function renderCountryList(countryList) {
//   const markup = countryList
//     .map(country => {
//       return `
//         <li class="country-list__item">
//           <img src="${country.flag}" alt="${country.name}" class="country-list__flag">
//           <span class="country-list__name">${country.name}</span>
//         </li>
//       `;
//     })
//     .join('');

//   countryListRef.innerHTML = markup;
// }

// function renderCountryCard(country) {
//   const markup = `
//     <div class="card">
//       <img src="${country.flag}" alt="${country.name}" class="card__flag">
//       <div class="card__details">
//         <h2 class="card__name">${country.name}</h2>
//         <p class="card__population">Population: ${country.population.toLocaleString()}</p>
//         <p class="card__region">Region: ${country.region}</p>
//         <p class="card__capital">Capital: ${country.capital}</p>
//         <p class="card__languages">Languages: ${country.languages.map(lang => lang.name).join(', ')}</p>
//       </div>
//     </div>
//   `;

//   cardContainerRef.innerHTML = markup;
// }