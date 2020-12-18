import React from 'react'
import { setVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'



const AnecdoteForm = (props) => {

  const vote = (id, content, votes) => {
    props.setVote(id, content, votes)
    props.setNotification(`You voted '${content}'`, 5)
  }

  const sortedAnecdotes = () => {
    return props.anecdotes.sort(({ votes: prevVotes }, {votes: curVotes}) => curVotes - prevVotes)
  } 

  const filteredAnecdotes = () => {
    return sortedAnecdotes().filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
  } 


  return (
    <div>
      {filteredAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setVote, setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(AnecdoteForm)

export default ConnectedAnecdotes