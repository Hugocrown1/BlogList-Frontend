import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const createBlog = async (blogObject) => {
    

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    
  }

  const notificationMessage = () => (
   
    <div className='notification'>{notification}</div>
  )

  const errorMessageNotification = () => (
   
    <div className='error'>{errorMessage}</div>
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
      {notification && notificationMessage()}
      {errorMessage && errorMessageNotification()}

      {user === null ?
      <Togglable buttonLabel='login'>
      <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
    </Togglable>:
      <div>
        <p>{user.name} logged in </p><button onClick={() => logOut()}>logout</button>
        
        {

          <Togglable buttonLabel='create a new blog'>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
        }
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