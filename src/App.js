import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ),
    
    ) 
    
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const loginForm = () => (

    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const handleNewBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    
  }


  const blogForm = () => (
    
    <form onSubmit={handleNewBlog}>
      <h2>create new</h2>
        <div>
          Title: 
            <input
            type="text"
            value={newTitle}
            name="Username"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author: 
            <input
            type="text"
            value={newAuthor}
            name="newAuthor"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          Url: 
            <input
            type="text"
            value={newUrl}
            name="newUrl"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
  )

  const notificationMessage = () => (
    <div className='notification'>{notification}</div>
  )

  

  return (
    <div>
      <h2>blogs</h2>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {blogForm()}
        <br/>
        {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
        
      </div>
    }
      
      
    </div>
  )
}

export default App