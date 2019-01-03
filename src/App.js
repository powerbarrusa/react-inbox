import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import Messages from './components/messages.js';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: ["Email 1", "Email 2", "Email 3"]
    }
  }
   
    getEmail = () => {
      return fetch('http://localhost:8082/api/messages')
      .then(res => res.json())
      .then(email => {
        this.setState({email: email.results})
        console.log(email)
        return email
        })
      }


    componentDidMount(){
      this.getEmail()
      .catch(err => console.error(err))
    }

  render() {
    return (
      <div className="App">
        <Toolbar />
        <Messages messages={this.state.messages}/>
      </div>
    )
  }
}

export default App;