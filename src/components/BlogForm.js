import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'title') {
      setNewTitle(value)
    } else if (name === 'author') {
      setNewAuthor(value)
    } else if (name === 'url'){
      setNewUrl(value)
    }
  }



  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }






  return (
    <div className={'formDiv'}>
      <Typography variant='h5' sx={{ mb: 2 }}>create a new blog</Typography>
      <form onSubmit={addBlog}>
        <div style={{ marginTop: 5, marginBottom: 5 }}>
          <TextField
            size='small'
            label='Title'
            id='title'
            type="text"
            value={newTitle}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: 5, marginBottom: 5 }}>
          <TextField
            size='small'
            label='Author'
            id='author'
            type="text"
            value={newAuthor}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: 5, marginBottom: 5 }}>
          <TextField
            size='small'
            label='Url'
            id='url'
            type="text"
            value={newUrl}
            name="url"
            onChange={handleChange}
          />
        </div>
        <Button sx={{ my: 1 }} variant='contained' id='create-blog-button' type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm