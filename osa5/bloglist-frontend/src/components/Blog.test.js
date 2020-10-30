import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'title test',
    author: 'author test',
    url: 'asd'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('title test')
  expect(component.container).toHaveTextContent('author test')
})