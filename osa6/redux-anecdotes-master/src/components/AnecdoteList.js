import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'



const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()
  //const anecdotes = useSelector(state => state.anecdotes)

  const vote = (id, content, votes) => {
    console.log('vote', id)
    console.log('notification', content)
    props.setVote(id, content, votes)
    props.setNotification(`You voted  '${content}'`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  const sortedAnecdotes = () => {
    return props.anecdotes.sort(({ votes: prevVotes }, {votes: curVotes}) => curVotes - prevVotes)
  } 

  return (
    <div>
      {sortedAnecdotes().map(anecdote =>
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
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  setVote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(AnecdoteForm)

export default ConnectedAnecdotes