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
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
      if(isTokenValid(user)){
      setUser(user)
      blogService.setToken(user.token)
      } else {
        window.localStorage.removeItem('loggedBlogappUser')
        
      }
    
  }, [])
  
  const isTokenValid = (user) => {
    
  if (!user || !user.expirationTime) {
    
    return false;
  }

  const currentTime = new Date().getTime();
  return currentTime < user.expirationTime;
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })


      const expirationTime = new Date().getTime() + 3600 * 1000 // 1 hour
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify({...user, expirationTime})
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

  const logOut = () => {
    if(window.confirm('Are you sure you want to logout?')){
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
    }
  }
    
  

  

  return (
    <div>
      <h2>blogs</h2>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in </p><button onClick={() => logOut()}>logout</button>
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