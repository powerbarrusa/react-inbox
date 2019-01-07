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
            messageRead={props.messageRead}
            messageUnread={props.messageUnread}
            messageSelected={props.messageSelected}
            messageStarred={props.messageStarred}
          />
          )
        })
      }
    </div>
  )
}

export default MessageList