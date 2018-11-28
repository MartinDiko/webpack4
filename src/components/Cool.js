import React from 'react'

class CoolBeans extends React.Component {
  constructor () {
    super()
  }
  render () {
    const coolStyles = {
      color: '#fff',
      fontSize: '40px',
      margin: '0',
      padding: '1rem',
      display: 'inline-block',
      backgroundColor: 'red'
    }

    return (
      <div>
        <p style={coolStyles}>coolio</p>
      </div>
    )
  }
}

export {
  CoolBeans
}
