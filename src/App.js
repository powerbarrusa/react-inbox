import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import Messages from './components/messages.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: []
    }
  }
   
  async componentDidMount(){
    const api = await fetch('http://localhost:8082/api/messages')
    const messages = await api.json()
    this.setState({
        email: messages
      })
    }

  messageRead = (id) => {
    const updateMessage = this.state.email.map(messages => {
      if (messages.id === id){
        messages.read = !messages.read
      }
      return messages
    })
    this.setState({
      email: updateMessage
    })
  }

  messageSelected = (event) => {
    const selected = this.state.email.map(messages => {
      if (messages.selected){
        messages.selected = !messages.selected
      }
      return messages
    })
    this.setState({
      email: selected
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar />
        <Messages
        inbox={this.state.email}
        messageRead={this.messageRead}
        messageSelected={this.messageSelected}
        />
      </div>
    )
  }
}

export default App;