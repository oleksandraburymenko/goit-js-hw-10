export const fetchCountries = async (name) => {
    const response = await fetch(
      `https://restcountries.com/v2/name/${encodeURIComponent(name)}?fields=name.official,capital,population,flags.svg,languages`
    );
    const countries = await response.json();
    return countries;
  };