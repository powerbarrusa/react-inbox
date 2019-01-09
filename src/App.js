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
      messages.selected = false
      return messages
    })
    this.setState({
        email: messages
      })
    }

  updates = async (id, command, prop, value) => {
    let message = {
      messageIds: [id],
      command: command,
      [prop]: value
    }
      await fetch("http://localhost:8082/api/messages", {
        method: "PATCH",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
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
    this.updates(id, "read", "read", true)
  }

  messageUnreadClick = (id) => {
    const updateMessage = this.state.email.map(message => {
      if (message.id === id){
        message.read = false
      }
      return message
    })
    this.setState({
      email: updateMessage
    })
    this.updates(id, "read", "read", false)
  }

  messageReadToolbar = () => {
    const selectedMessages = this.state.email.filter(message => message.selected === true)
    selectedMessages.forEach(messages => this.messageReadClick(messages.id))
  }

  messageUnreadToolbar = () => {
    const selectedMessages = this.state.email.filter(message => message.selected === true)
    selectedMessages.forEach(messages => this.messageUnreadClick(messages.id))
  }

  messageSelected = (id) => {
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

  allMessagesSelected = () => {
    const selectedAll = this.state.email.filter(message => {
      if (message.selected === false){
        message.selected = !message.selected
      }
      else if (message.selected === true){
        message.selected = !message.selected
      }
      return message
    })
    console.log(selectedAll)
    this.setState({
      email: selectedAll
    })
  }

  messageStarred = (id) => {
    const starred = this.state.email.map(message => {
      if (message.id === id) {
        message.starred = !message.starred
      }
      return message
    })
    this.setState({
      email: starred
    })
    this.updates(id, "star", "star", true)
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          messageReadToolbar={this.messageReadToolbar}
          messageUnreadToolbar={this.messageUnreadToolbar}
          allMessagesSelected={this.allMessagesSelected}
        />
        <Messages
          inbox={this.state.email}
          messageReadClick={this.messageReadClick}
          messageSelected={this.messageSelected}
          messageStarred={this.messageStarred}
        />
      </div>
    )
  }
}

export default App;