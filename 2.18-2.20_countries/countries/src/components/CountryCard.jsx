function CountryCard({ countryData }) {
  const { name, capital, area, languages, flags } = countryData;

  return (
    <div>
      <h1 style={{ textTransform: 'capitalize' }}>{name.common}</h1>
      <div>
        <p>capital {capital[0]}</p>
        <p>area {area}</p>
      </div>
      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt="" />
    </div>
  );
}

export default CountryCard