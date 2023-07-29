/* eslint-disable no-unused-vars */
import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  //excercise 5.7
  const [detailedView, setDetailedView] = useState(false)

  const hideWhenVisible = { display: detailedView ? 'none' : '' }
  const showWhenVisible = { display: detailedView ? '' : 'none' }

  const toggleDetailedView = () => {

    setDetailedView(!detailedView)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const addLike = () => {
    const { id, ...blogObject } = blog
    blogObject.likes += 1
    updateBlog(blog.id, blogObject)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleDetailedView}>view</button>
      </div>
      <div style={showWhenVisible}>

        <p>{blog.title} by {blog.author}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={addLike}>like</button></p>
        <p>{blog.user.name}</p>

        {blog.user.username === user.username && (
          <button onClick={removeBlog}>remove</button>
        )}

        <button onClick={toggleDetailedView}>hide</button>
      </div>
    </div>
  )
}

export default Blog