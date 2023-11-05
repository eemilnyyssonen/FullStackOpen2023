import { useState, useEffect } from 'react'
import axios from 'axios'

const SingleCountry = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, val]) =>
          <li key={key}>{val}</li>   
        )}
      </ul>
      <div>
        <img 
          src={country.flags.svg} 
          alt ={country.flags.alt}
          height={200}
          width={200}
        />
      </div>
    </div>
  )
}

const CountryList = ({countries, handleClick}) => {
  if (countries) {
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
  return <></>
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    if (value) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data.filter(d => d.name.common.toLowerCase().includes(value)))
        })
    }
    else {
      setCountries('')
    }
  },[value])

  const onSearch = (event) => {
    event.preventDefault()
    //setCountry(value)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = ({name}) => {
    console.log("clicked", name)
  }
  
  return (
      <div>
        <form onSubmit={onSearch}>
          find countries: <input value={value} onChange={handleChange} />
        </form>
        <CountryList 
          countries={countries}
          handleClick={handleClick}
        />
      </div>
  )
}

export default App
