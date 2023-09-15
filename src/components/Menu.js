import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


export const Menu = ({ username, logOut }) => {


  //Exercise 7.17


  return (

    <AppBar position='static'  >
      <Toolbar sx={{ alignContent: 'center' }} >
        <Box sx={{ flexGrow: 1 }}>
          <Button color='inherit' style={{ fontWeight: 'bold' }} component={Link} to='/'>
                Blogs
          </Button>
          <Button  color='inherit' style={{ fontWeight: 'bold' }} component={Link} to='/users'>
                Users
          </Button>
        </Box>
        <Typography variant='h6' sx={{ mr: 2 }}>{username} logged in </Typography><Button variant='contained' sx={{ backgroundColor: '#d90429' }} className='logOutButton' onClick={() => logOut()}><b>logout</b></Button>
      </Toolbar>
    </AppBar>

  )
}
export default Menu
