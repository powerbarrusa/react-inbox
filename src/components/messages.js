import React, { Component } from 'react';
import '../App.css';
import SingleMessage from './singlemessage';

class Messages extends Component{
  render(){
    return(
    <div className="container">
      <SingleMessage />
    </div>
    )
  }
}

export default Messages