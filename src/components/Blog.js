/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  //exercise 5.7


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div className='blogComponent'  style={blogStyle}>
      <div className='blog' >
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
    </div>
  )
}

export default Blog