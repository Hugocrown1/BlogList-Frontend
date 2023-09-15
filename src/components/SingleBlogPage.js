import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { useEffect, useState } from 'react'
import { Button, List, ListItem, TextField, Typography } from '@mui/material'

export const SingleBlogPage = ({ blog }) => {

  if (!blog) {
    return null
  }

  const [inputValue, setInputValue] = useState('')
  const [blogComments, setBlogComments] = useState([])



  //Exercise 7.16, 7.18, 7.19
  const dispatch = useDispatch()

  const voteBlog = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    await blogService.update(blog.id, updatedBlog)

    dispatch(setBlogs(await blogService.getAll()))

  }


  const { title, author, url, likes, user,  id, comments } = blog

  useEffect(() => {
    setBlogComments(comments)

  }, [])



  const addComment = async (e) => {
    e.preventDefault()
    await blogService.addComment(id, { comment: inputValue })
    setBlogComments(blogComments.concat(inputValue))

    setInputValue('')
  }




  return (
    <div>
      <Typography variant='h4'>{title} {author}</Typography>
      <Typography><a href={url}>{url}</a></Typography>

      <br/>
      <div>
        <Typography>{likes} likes </Typography>
        <Button size='small' variant='contained' onClick={voteBlog}>like</Button>
      </div>
      <br/>
      <Typography>Added by {user.name}</Typography>
      <Typography variant='h5'>Comments</Typography>

      <form onSubmit={addComment}>
        <TextField sx={{ mr: 1 }} size='small' placeholder='Write a comment...' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></TextField>
        <Button variant='contained' type='submit' >Add comment</Button>
      </form>

      <br/>
      { blogComments.length === 0 ?
        <Typography><em>No comments yet</em></Typography>
        :
        <List>
          { blogComments.map( (comment, index) => <ListItem key={index}>{comment}</ListItem> )}
        </List>
      }
    </div>
  )
}
