import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import Messages from './components/messages.js';
import Compose from './components/compose.js';

class App extends Component {
  constructor(){
    super()
    this.state = {
      email: [],
      id: 0,
      compose: false,
      message: [{body: "", subject: "", labels: []}]
    }
  }
   
  async componentDidMount(){
    try {
      const api = await fetch('http://localhost:8082/api/messages')
      const awaitApi = await api.json()
      const messageIds = awaitApi.map(messages => messages.id)
      const max = Math.max.apply(null, messageIds)
      const messages = awaitApi.map(messages => {
        messages.selected = false
        messages.expanded = false
        return messages
      })
      this.setState({
        email: messages,
        id: max
      })
    } catch (error) {
      console.log(error)
    }
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

  unreadCount = () => {
      const count = this.state.email.filter(message => message.read === false)
      return count.length
    }  

  composeForm = () => {
    this.setState({compose: !this.state.compose})
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

  disabledButtons = () => {
    const selectedMessages = this.state.email.filter(message => message.selected === true).length
    return selectedMessages
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

  composeForm = () => {
    this.setState({compose: !this.state.compose})
  }  

  showComposeForm = () => {
    return this.state.compose ? 
    <Compose
      updateMessageBody={this.updateMessageBody}
      updateMessageSubject={this.updateMessageSubject}
      addNewMessage={this.addNewMessage}
    /> : null
  }

  emailBody = (id) => {
    const emailBody = this.state.email.map(message => {
    if (message.id === id) {
      return message.expanded = !message.expanded
    }
    return message
  })
  this.setState({
      expanded: emailBody
    })
  }

  deleteMessages = () => {
    const selectedMessages = this.state.email.filter(message => message.selected === false)
    this.setState({
      email: selectedMessages
    })
  }

  labelMessages = (e) => {
    let tag = e.target.value
    let messages = this.state.email
    messages.forEach(message => {
      if (message.selected && !message.labels.includes(tag) && tag !== "Apply label"){
        message.labels.push(tag)
      }
    })
    this.setState({
      email: messages
    })
    this.updates(this.findSelected, "addLabel", "label", "dev")
  }

  findSelected = () => {
    return this.state.email.filter(message => message.selected).map(message => message.id)
  }

  removeLabel = (e) => {
    let tag = e.target.value
    let messages = this.state.email
    messages.forEach(message => {
      if (message.selected){
        message.labels = message.labels.filter(label => label !== tag)
      }
    })
    this.setState({
      email: messages
    })
    this.updates(this.findSelected, "removeLabel", "label", "dev")
  }

  updateMessageBody = (e) => {
    this.setState({
      message:{body: e.target.value,
      subject: this.state.message.subject, labels: [], id: this.state.id + 1}
    })
  }

  updateMessageSubject = (e) => {
    this.setState({
      message:{body: this.state.message.body,
      subject: e.target.value, labels: [], id: this.state.id + 1}
    })
  }

  addNewMessage = (e) => {
    e.preventDefault()
    this.setState({
      email: [...this.state.email, this.state.message]
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          composeForm={this.composeForm}
          messageReadToolbar={this.messageReadToolbar}
          messageUnreadToolbar={this.messageUnreadToolbar}
          allMessagesSelected={this.allMessagesSelected}
          unreadCount={this.unreadCount}
          disabledButtons={this.disabledButtons}
          deleteMessages={this.deleteMessages}
          labelMessages={this.labelMessages}
          removeLabel={this.removeLabel}
          state = {this.state}
        />
        {this.showComposeForm()}
        <Messages
          inbox={this.state.email}
          messageReadClick={this.messageReadClick}
          messageSelected={this.messageSelected}
          messageStarred={this.messageStarred}
          emailBody={this.emailBody}
        />
      </div>
    )
  }
}

export default App;