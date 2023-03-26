export const fetchCountries = async (name) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
    ).then(response => {
        if (!response.ok) {
            throw new Error('Country not found');
          }
          return response.json();
        })

    const countries = await response;
    return countries;
  };