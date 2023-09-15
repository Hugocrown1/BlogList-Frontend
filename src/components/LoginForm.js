import { Button, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'



const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {


  return (
    <div>
      <Typography variant='h4'>Login</Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <TextField
            size='small'
            label='username'
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            size='small'
            label='password'
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant='contained' sx={{ my: 1 }} id="login-button" type="submit">login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm