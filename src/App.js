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
    const awaitApi = await api.json()
    const messages = awaitApi.map(messages => {
      messages.read = false
      messages.starred = false
      messages.selected = false
      return messages
    })
    this.setState({
        email: messages
      })
    }

  messageReadClick = (id) => {
    const updateMessage = this.state.email.map(message => {
      if (message.id === id){
        message.read = true
      }
      return message
    })
    this.setState({
      email: updateMessage
    })
  }

  messageReadToolbar = () => {
    const selectedMessages = this.state.email.filter(message => message.selected === true)
    selectedMessages.forEach(messages => this.messageReadClick(messages.id))
  }

  messageSelected = async (id) => {
    const selected = this.state.email.map(message => {
      if (message.id === id){
        message.selected = !message.selected
      }
      return message
    })
    this.setState({
      email: selected
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          readButtonToolbar={this.messageReadToolbar}
        />
        <Messages
          inbox={this.state.email}
          messageRead={this.messageReadClick}
          messageSelected={this.messageSelected}
        />
      </div>
    )
  }
}

export default App;