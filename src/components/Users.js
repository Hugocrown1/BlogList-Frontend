import { Button, TableHead, Typography } from '@mui/material'
import React from 'react'


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,

} from '@mui/material'
import { Link } from 'react-router-dom'

//Exercise 7.14
export const Users = ({ users }) => {


  return (
    <div>
      <Typography variant='h4'>Users</Typography>
      <TableContainer sx={{ maxWidth: 600 }} component={Paper}>
        <Table >
          <TableHead>
            <TableRow sx={{ textAlign: 'right' }} >
              <TableCell><b>Name</b></TableCell>
              <TableCell ><b>Blogs created</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map( (user, index) =>
              <TableRow key={index} style={{ textAlign: 'center' }}>
                <TableCell><Button component={Link} to={`/users/${user.id}`}>{user.name}</Button></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default Users
