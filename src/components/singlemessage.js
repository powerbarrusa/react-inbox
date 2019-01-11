import React from 'react';
import Body from './emailbody.js';

const SingleMessage = (props) => {

  const expanded = props.message.expanded ? <Body messageBody={props.message.body} /> : ""

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
      <div onClick={() => props.messageReadClick(props.message.id)}>
        <div className="col-xs-11">
          <a href="/#" onClick={() => props.emailBody(props.message.id)}>
            {props.message.subject}
            {expanded}
          </a>
        </div>
      </div>
    </div>
    )
  }


export default SingleMessage