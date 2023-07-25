import React, { useState } from "react"

const BlogForm = ({ createBlog}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleChange = (e) => {
        const { name, value} = e.target;
    
        if (name === 'title') {
          setNewTitle(value);
        } else if (name === 'author') {
          setNewAuthor(value);
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
        <div>
            <h2>create a new blog</h2>
            <form onSubmit={addBlog}>
            <div>
              Title:
                <input
                type="text"
                value={newTitle}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div>
              Author:
                <input
                type="text"
                value={newAuthor}
                name="author"
                onChange={handleChange}
              />
            </div>
            <div>
              Url:
                <input
                type="text"
                value={newUrl}
                name="url"
                onChange={handleChange}
              />
            </div>
            <button type="submit">create</button>
                  </form>
        </div>
    )
  }

  export default BlogForm