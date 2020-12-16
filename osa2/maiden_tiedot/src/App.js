import React, { useState, useEffect } from 'react'
import countryService from './services/countries'


const Filter = (props) => {
  return (
    <div>
        find countries: <input
        value={props.newFilter}
        onChange={props.handleFilter}
        />
      </div>
  )
}

const Countries = (props) => {
  console.log(props.countries.name)
  
  return(
    /*<div>
      {props.countries.map(countries =>
        <p key={countries.name}>
          {countries.name}<button>delete</button>
        </p>
        )}
    </div>*/<div><p>{props.countries.name}</p></div>
  )
}

const App = () => {

  const [countries, setCountries ] = useState('')
  const [newFilter, setFilter ] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  //const dataToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Filter newFilter={newFilter}
      handleFilter={handleFilter}/>
      <Countries countries={countries}
      //dataToShow={dataToShow}
      />
    </div>
  );
}

export default App;
