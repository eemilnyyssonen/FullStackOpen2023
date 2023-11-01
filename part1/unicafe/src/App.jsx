import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}


const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = ((props.good - props.bad) / all).toFixed(1)
  const positive = (100 * props.good / all).toFixed(1)

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={props.good} /></tr>
        <tr><StatisticLine text="neutral" value={props.neutral} /></tr>
        <tr><StatisticLine text="bad" value={props.bad} /></tr>
        <tr><StatisticLine text="all" value={all} /></tr>
        <tr><StatisticLine text="average" value={isNaN(average) ? 0 : average} /></tr>
        <tr><StatisticLine text="positive" value={isNaN(positive) ? 0 + " %" : positive + " %"} /></tr>
      </tbody>
    </table>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
