import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteForm = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, notification) => {
    console.log('vote', id)
    console.log('notification', notification)
    dispatch(setVote(id))
    dispatch(setNotification(`You voted  '${notification}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  const sortedAnecdotes = anecdotes.sort(({ votes: prevVotes }, {votes: curVotes}) => curVotes - prevVotes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm