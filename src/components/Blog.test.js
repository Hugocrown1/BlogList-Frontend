import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Pedro Pascal',
  likes: 0,
  user: { name: 'Jon', username: 'daedalus' },
  url: 'www.mando.com'
}

const user = {
  name: 'Jon', username: 'daedalus'
}

describe('Blog render tests', () => {
  let component

  beforeEach(() => {


    const updateBlog = jest.fn()

    component = render(
      <Blog blog={blog} user={user} updateBlog={updateBlog} />
    )
  })

  // excercise 5.13
  test('renders content', () => {

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  // excercise 5.14
  test('renders content when clicking the view button', () => {


    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')


    expect(div).toHaveTextContent('likes 0')
    expect(div).toHaveTextContent('www.mando.com')
  })


})

// excercise 5.15
test('Pressing the like button twice triggers the event controller on two occasions', () => {
  const updateBlog = jest.fn()

  const component = render(
    <Blog updateBlog={updateBlog} blog={blog} user={user}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)


  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(updateBlog.mock.calls).toHaveLength(2)



})

// excercise 5.16
test('blog form calls the event controller', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'All of the lights' }
  })

  fireEvent.change(authorInput, {
    target: { value: 'Lebron James' }
  })

  fireEvent.change(urlInput, {
    target: { value: 'www.miamiheat.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('All of the lights' )



})



