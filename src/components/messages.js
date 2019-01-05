import React from 'react';
import SingleMessage from './singlemessage';

const MessageList = (props) => {
  return (
    <div>
      {props.inbox.map((message, idx) => {
        return <SingleMessage
          message={message}
          key={idx}
          messageRead={props.messageRead}
          messageSelected={props.messageSelected}
        />
        })
      }
    </div>
  )
}

export default MessageList