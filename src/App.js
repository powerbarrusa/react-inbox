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

  render() {
    return (
      <div className="container">
        <Toolbar />
        <Messages inbox={this.state.email}/>
      </div>
    )
  }
}

export default App;