import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {


  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [averageCounter, setAverage] = useState(0)

  const handleGoodClick = () => {
    setAll (allClicks.concat('G'))
    setGood(good + 1)
    setAverage(averageCounter + 1)
  }
  const handleNeutralClick = () => {
    setAll (allClicks.concat('N'))
    setNeutral(neutral + 1)
    setAverage(averageCounter + 0)
  }
  const handleBadClick = () => {
    setAll (allClicks.concat('B'))
    setBad(bad + 1)
    setAverage(averageCounter - 1)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => handleGoodClick()}>good</button>
      <button onClick={() => handleNeutralClick()}>neutral</button>
      <button onClick={() => handleBadClick()}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allClicks.length}</p>
      <p>average {averageCounter/allClicks.length }</p>
      <p>positive {good/allClicks.length} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)