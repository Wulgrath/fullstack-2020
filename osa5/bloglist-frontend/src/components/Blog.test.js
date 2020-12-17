import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  title: 'title test',
  author: 'author test',
  url: 'url test',
  likes: 200
}


test('renders title and author', () => {

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent('title test')
  expect(component.container).toHaveTextContent('author test')
})

test('renders all information when toggled to show', () => {

  const component = render(
    <Blog
      blog={blog}
    />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()

  expect(component.container).toHaveTextContent('title test')
  expect(component.container).toHaveTextContent('author test')
  expect(component.container).toHaveTextContent('url test')
  expect(component.container).toHaveTextContent('200')
})

test('clicking button twice calls event handler twice', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog}
      addLike={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('BlogForm test', async () => {
  const createBlog = jest.fn()
  
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'test title' } 
  })
  fireEvent.change(author, {
    target: { value: 'test author' } 
  })
  fireEvent.change(url, {
    target: { value: 'test url' } 
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')

})