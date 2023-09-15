import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import BlogPage from './components/BlogPage'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { Routes, Route, useMatch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import usersService from './services/users'
import { SingleBlogPage } from './components/SingleBlogPage'

import { Alert, Container, Typography } from '@mui/material'





const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll()
      .then( res => setUsers(res) )


  }, [])


  //Exercise 7.13
  const user = useSelector(state => state.user)


  //Exercise 7.10
  const notification = useSelector( state => {

    return state.notification} )
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if(isTokenValid(user)){
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else {
      window.localStorage.removeItem('loggedBlogAppUser')
    }
  }, [])

  const isTokenValid = (user) => {

    if (!user || !user.expirationTime) {

      return false
    }

    const currentTime = new Date().getTime()
    return currentTime < user.expirationTime
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })


      const expirationTime = new Date().getTime() + 3600 * 1000 // 1 hour
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify({ ...user, expirationTime })
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))

      blogService.getAll().then(blogs =>
        dispatch(setBlogs(blogs))

      )

      setUsername('')
      setPassword('')

      dispatch(setNotification(`Welcome, ${user.name}!`, 'success', 5))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }

  }

  const showNotification = () => {
    const {  type, message } = notification

    return type === 'success' ?
      <Alert sx={{ my: 2 }} severity='success'>{message}</Alert>
      :
      <Alert sx={{ my: 2 }} severity='error'>{message}</Alert>
  }

  const logOut = () => {
    if(window.confirm('Are you sure you want to logout?')){
      window.localStorage.removeItem('loggedBlogAppUser')
      window.location.reload()
    }
  }

  const blogs = useSelector( state => state.blogs )

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')


  const selectedUser = userMatch ? users.find( user => user.id === userMatch.params.id ) : null
  const selectedBlog = blogMatch ? blogs.find( blog => blog.id === blogMatch.params.id ) : null



  return (

    <Container>
      {user && <Menu username={user.name} logOut={logOut}/>}
      {notification.message && showNotification()}
      <Typography variant='h3' sx={{ my: 3 }}>Blogs</Typography>

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

          <Routes>
            <Route path='/' element={<BlogPage/>}/>
            <Route path='/users' element={<Users users={users}/>}/>
            <Route path='/users/:id' element={<User user={selectedUser}/>}/>
            <Route path='/blogs/:id' element={<SingleBlogPage blog={selectedBlog}/>}></Route>
          </Routes>
        </div>
      }
    </Container>

  )
}

export default App