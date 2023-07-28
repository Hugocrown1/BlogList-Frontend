import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
  blogService.getAll().then(blogs => {
    // excercise 5.9
    const sortedBlogs = blogs.slice().sort((blogA, blogB) => blogB.likes - blogA.likes);
    setBlogs(sortedBlogs);
  });
  
}, []);


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

      blogService.getAll().then(blogs =>
        setBlogs( blogs ),
      
      ) 
      
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
    
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    
  }

  // excercise 5.8
  const updateBlog = async (id, blogObject) => {
    try {
      
      const response = await blogService.update(id, blogObject);
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : response)));
      
    } catch (error) {
      
      console.error('Error updating the blog:', error);
    }
  }

  // excercise 5.10
  const deleteBlog = async (blogObject) => {
    if(window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)){
    await blogService.remove(blogObject.id)
    const remainBlogs = blogs.filter(blog => blog.id !== blogObject.id)
    setBlogs(remainBlogs)
    }
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
          // excercise 5.5

          <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
            
            {/* // excercise 5.6 */}
            <BlogForm createBlog={createBlog}/>
          </Togglable>
        }
        <br/>
        {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
    )}
        
      </div>
    }
      
      
    </div>
  )
}

export default App