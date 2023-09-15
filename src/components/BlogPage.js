import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogReducer'
// import Blog from './Blog'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'

export const BlogPage = () => {


  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogs = useSelector(state =>  state.blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const createBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    dispatch(setBlogs(blogs.concat(response)))
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 5))

  }




  return (
    <>
      <Togglable buttonLabel='create a new blog' ref={blogFormRef}>

        {/* // exercise 5.6 */}
        <BlogForm createBlog={createBlog}/>
      </Togglable>

      <br/>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            { sortedBlogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell  align='left'>

                  <Button color='inherit' style={{ fontWeight: 'bold', alignContent: 'space-between' }} component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Button>
                </TableCell>

                <TableCell  align='left'>

                  {blog.author}
                </TableCell>

              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>

      {/* {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </>
  )
}

export default BlogPage
