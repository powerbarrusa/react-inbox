import React from 'react';
import SingleMessage from './singlemessage';

const MessageList = (props) => {

  return (
    <div>
      {props.inbox.map((message, idx) => {
        return (
          <SingleMessage
            message={message}
            key={idx}
            messageReadClick={props.messageReadClick}
            messageSelected={props.messageSelected}
            messageStarred={props.messageStarred}
            emailBody={props.emailBody}
          />
          )
        })
      }
    </div>
  )
}

export default MessageList