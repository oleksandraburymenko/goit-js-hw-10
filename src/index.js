import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListElem = document.querySelector('.country-list');
const countryInfoElem = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handlerCountrySearch, DEBOUNCE_DELAY, { trailing: true }));

  function handlerCountrySearch(event) {

    event.preventDefault();
    const searchedCountry = event.target.value.trim();
    countryListElem.innerHTML = '';
    countryInfoElem.innerHTML = '';
    
    if (!searchedCountry) {
      countryListElem.innerHTML = '';
      countryInfoElem.innerHTML = '';
      return
    }

    fetchCountries(searchedCountry)
      .then(result => {
      if (result.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name');
        return;
      }
      foundCountries(result);
    })
      .catch(error => {
        countryListElem.innerHTML = '';
        countryInfoElem.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      })
  };

function foundCountries(result) {
  let inputData = result.length;

  
  if (inputData >= 2 && inputData <= 10) {
    const mark = result
    .map(res => {
      return `<li>
      <img src="${res.flags.svg}" alt="Flag of ${res.name.official}" width="30" hight="20">
        <p><b>${res.name.official}</b></p>
      </li>`;
    })
    .join('');
    countryListElem.innerHTML = mark;


        } else if (inputData === 1) {

    const mark = result
    .map(res => {
      return `<li>
      <img src="${res.flags.svg}" alt="Flag of ${res.name.official}" width="30" hight="20">
        <p><b>${res.name.official}</b></p>
        <p><b>Capital</b>: ${res.capital}</p>
        <p><b>Population</b>: ${res.population}</p>
        <p><b>Languages</b>: ${Object.values(res.languages)} </p>
      </li>`;
    })
    .join('');
    countryListElem.innerHTML = mark;
        }

};

 