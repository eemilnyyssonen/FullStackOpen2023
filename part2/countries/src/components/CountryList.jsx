import SingleCountry from "./SingleCountry"

const CountryList = ({countries, handleClick}) => {
    if(countries.length == 1) {
      return <SingleCountry country={countries[0]}/>
    }
    if(countries.length > 10) {
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
    return (
      <ul>
        {countries.map(country => 
          <li key={country.name.common}>
            {country.name.common} <button onClick={() => handleClick(country.name.common)}>show</button>
          </li>
        )}
      </ul>
    )
  }

  export default CountryList