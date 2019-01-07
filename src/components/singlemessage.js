import React from 'react';

const SingleMessage = (props) => {
  return (
    <div className={props.message.read ? "row message read" : "row message unread"}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input checked={(typeof props.message.selected !== "undefined") && props.message.selected === true ? "checked" : ""} onClick={() => props.messageSelected(props.message.id)} type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
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