import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'


const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })





  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button variant='contained' style={{ backgroundColor: '#d90429' }} onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

// exercise 5.11
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable