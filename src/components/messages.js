import React from 'react';
import SingleMessage from './singlemessage';

const MessageList = (props) => {
  return (
    <div>
      {props.inbox.map((message, idx) => {
        return <SingleMessage
          message={message}
          key={idx}
        />
        })
      }
    </div>
  )
}

export default MessageList