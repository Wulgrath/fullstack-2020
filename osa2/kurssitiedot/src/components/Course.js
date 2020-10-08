import React from 'react'


const Header = (props) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    
    console.log(props.courses)
  return (
    <div>
      <h2>{props.courses[0].name}</h2>
      <Part1 part1={props.courses[0].parts.map(courses =>
          <p key={courses.id}>
            {courses.name + ' ' + courses.exercises}
          </p>
          )} />
      <Total1 total1={'Total of ' + props.courses[0].parts.reduce((acc, parts) => acc + parts.exercises, 0) + ' exercises'} />
      <h2>{props.courses[1].name}</h2>
      <Part2 part2={props.courses[1].parts.map(courses =>
          <p key={courses.id}>
            {courses.name + ' ' + courses.exercises}
          </p>
          )} /> 
      <Total2 total2={'Total of ' + props.courses[1].parts.reduce((acc, parts) => acc + parts.exercises, 0) + ' exercises'} />
    </div>
  )  
  }
  
  const Course = (props) => {
    console.log(props.courses)
    return(
      <div>
        <Header courses={props.courses}></Header>
        <Content courses={props.courses}></Content> 
      </div>
    )
  }
  
  
  const Part1 = (props) => {
    return (
      <div>
        {props.part1}
      </div>
    )
  }
  const Total1 = (props) => {
    return (
      <div>
        {props.total1}
      </div>
    )
  }
  const Part2 = (props) => {
    return (
      <div>
        {props.part2}
      </div>
    )
  }
  const Total2 = (props) => {
    return (
      <div>
        {props.total2}
      </div>
    )
  }

export default Course