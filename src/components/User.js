import { List, ListItem, Typography } from '@mui/material'
import React from 'react'

export const User = ({ user }) => {

  //Exercise 7.15

  if(!user){
    return null
  }




  return (
    <div>
      <Typography variant='h4'> {user.name} </Typography>
      <Typography variant='h5' sx={{ my: 2 }}>Added blogs</Typography>
      <List>
        { user.blogs.map( (blog, index) => <ListItem key={index}><Typography>{blog.title}</Typography></ListItem> ) }
      </List>
    </div>
  )
}

export default User
