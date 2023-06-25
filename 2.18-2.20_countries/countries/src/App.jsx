import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryCard from './components/CountryCard'

function App() {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState(null)
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState(null)
  const [languages, setLanguages] = useState({})
  const [flag, setFlag] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [clickedCountry, setClickedCountry] = useState(null)
  const [capitalTemperature, setCapitalTemperature] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState('')
  const [descript, setDescript] = useState('')
  const [wind, setWind] = useState('')

  useEffect(() => {

    if (clickedCountry || allCountries.length === 1) {
      axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=2&appid=${import.meta.env.VITE_API_KEY}`)
        .then(response => {
          const latitude = response.data[0].lat
          const longitude = response.data[0].lon
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
            .then(response => {
              setWeatherIcon(response.data.weather[0].icon)
              setCapitalTemperature(response.data.main.temp)
              setDescript(response.data.weather[0].description)
              setWind(response.data.wind.speed)

            })
            .catch(error => console.log('location or weather not found', error));
        })

    }

  }, [clickedCountry, allCountries])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const filteredCountries = response.data.filter(country => {
          const commonName = country.name.common.toLowerCase();
          const inputValue = value.toLowerCase();
          return commonName.includes(inputValue)
        })
        setAllCountries(filteredCountries)
      })
  }, [value])

  const handleClick = (event, clickedCountry) => {
    event.preventDefault()
    setCountry(clickedCountry.name.common)
    setArea(clickedCountry.area)
    setCapital(clickedCountry.capital)
    setLanguages(clickedCountry.languages)
    setClickedCountry(clickedCountry)
    setAllCountries([])
  }

  const countryNames = allCountries.map(country => <li key={country.name.common}>{country.name.common} <button onClick={(event) => handleClick(event, country)}>show</button></li>)
  const countryLimit = allCountries.length > 10 ? <p>too many matches, specify another filter</p> : countryNames

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const matchedCountry = allCountries.find(country => {
      const commonName = country.name.common.toLowerCase();
      return commonName.includes(inputValue.toLowerCase());
    });
    if (matchedCountry) {
      setCountry(matchedCountry.name.common);
      setCapital(matchedCountry.capital)
      setArea(matchedCountry.area)
      setLanguages(matchedCountry.languages)
      setFlag(matchedCountry.flags.png)
      setWeatherIcon('');
      setDescript('');
      setWind('');
    } else {
      setCountry(null);
      setClickedCountry(null)
      setWeatherIcon('');
      setDescript('');
      setWind('');
    }
  }

  return (
    <div>
      <form>
        find countries <input type="text" value={value} onChange={handleChange} />
      </form>
      {allCountries.length === 1 && !clickedCountry && (
        <div className="countryInfo">
          <CountryCard countryData={allCountries[0]} />
        </div>
      )}
      {clickedCountry && (
        <div className="countryInfo">
          <CountryCard countryData={clickedCountry} />
        </div>
      )}
      {weatherIcon && (
        <div>
          <h2>Weather in {capital}</h2>
          <p>temperature {capitalTemperature} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={descript} />
          <p>wind {wind} m/s</p>
        </div>
      )}
      {allCountries.length > 1 && <div>{countryLimit} </div>}
    </div>
  );


}

export default App
