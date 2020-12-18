import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    const filter = event.target.value
    props.filterChange(filter)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange}/>
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

const ConnectedAnecdotes = connect(
  null,
  mapDispatchToProps,
  )(Filter)

export default ConnectedAnecdotes
