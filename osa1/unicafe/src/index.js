import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  console.log(props)
  if (props.allClicks[0]) {
  return (

  
    <div>
      <StatisticsLine text="good" value={props.good}></StatisticsLine>
      <StatisticsLine text="neutral" value={props.neutral}></StatisticsLine>
      <StatisticsLine text="bad" value={props.bad}></StatisticsLine>
      <StatisticsLine text="all" value={props.allClicks.length}></StatisticsLine>
      <StatisticsLine text="average" value={props.averageCounter/props.allClicks.length }></StatisticsLine>
      <StatisticsLine text="positive" value={props.good/props.allClicks.length * 100 + ' %'}></StatisticsLine>
    </div>
  )
  }
    else {
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    }
  }
  
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)



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
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>Statistics</h1>
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      allClicks={allClicks}
      averageCounter={averageCounter} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)