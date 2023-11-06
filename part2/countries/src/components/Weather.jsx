const KELVIN_VALUE = -272.15

const Weather = ({weatherData}) => {
  return (
    <div>
      <h1>Weather in {weatherData.name}</h1>
      <p>Temperature {(weatherData.main.temp + KELVIN_VALUE).toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

export default Weather