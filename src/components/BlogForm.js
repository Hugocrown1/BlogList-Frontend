const BlogForm = ({ handleNewBlog, handleChange, newTitle, newAuthor, newUrl}) => {
    return (
        <div>
            <h2>create a new blog</h2>
            <form onSubmit={handleNewBlog}>
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