import React from 'react'
import ReactDOM from 'react-dom'

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
      border: '1px solid green',
      display: 'inline-block',
      backgroundColor: 'green'
    }

    return (
      <div>
        <p style={coolStyles}>coolio</p>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <h1>Hello React</h1>
    <CoolBeans />
  </div>,
  document.getElementById('index')
)
