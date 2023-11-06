import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from "./Weather"

const api_key = import.meta.env.VITE_SOME_KEY

const SingleCountry = ({country}) => {
    const [weatherData, setWeatherData] = useState(null)
  
    useEffect(() => {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.name.common}&APPID=${api_key}`)
        .then(response => {
          setWeatherData(response.data)
        })
        .catch(error => {
          console.log('Error fetching weather data:', error.request.response)
        })
    })
  
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
        {weatherData && <Weather weatherData={weatherData}/>}
      </div>
    )
  }

export default SingleCountry