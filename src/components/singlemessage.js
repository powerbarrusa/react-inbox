import React from 'react';

const SingleMessage = (props) => {
  return (
    <div className={`row message ${props.message.read ? "read" : "unread"} ${props.message.selected ? "selected" : ""}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input checked={props.message.selected ? "checked" : ""} onChange={() => props.messageSelected(props.message.id)} type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={props.message.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={() => props.messageStarred(props.message.id)}></i>
          </div>
        </div>
      </div>
      <div onClick={() => props.messageRead(props.message.id)}>
        <div className="col-xs-11">
          <a href="#">
            {props.message.subject}
          </a>
        </div>
      </div>
    </div>
    )
  }


export default SingleMessage