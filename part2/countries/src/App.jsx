import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/Countrylist'
import SingleCountry from './components/SingleCountry'


const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [singleToShow, setSingleToShow] = useState(null)

  useEffect(() => {
    if (value) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data.filter(d => d.name.common.toLowerCase().includes(value)))
        })
    }
    else {
      setCountries(null)
    }
  },[value])

  const onSearch = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    setValue(event.target.value)
    setSingleToShow(null)
  }

  const handleClick = (name) => {
    const countryToShow = countries.find(country =>
      country.name.common === name
    )
    setSingleToShow(countryToShow)
  }
  
  return (
      <div>
        <form onSubmit={onSearch}>
          find countries: <input value={value} onChange={handleChange} />
        </form>
        {countries &&
          <CountryList 
          countries={countries}
          handleClick={handleClick}
        />}
        {singleToShow && <SingleCountry country={singleToShow}/>}
      </div>
  )
}

export default App
