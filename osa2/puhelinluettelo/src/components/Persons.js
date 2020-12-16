import React from 'react'


const Persons = (props) => {
  
    return(
      <div>
        {props.dataToShow.map(persons =>
          <p key={persons.id}>
            {persons.name} {persons.number} <button onClick={() => props.deletePerson(persons.id, persons.name)}>delete</button>
          </p>
          )}
      </div>
    )
  }


  export default Persons