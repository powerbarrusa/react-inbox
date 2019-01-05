import React from 'react';

const SingleMessage = (props) => {
  console.log("selected?", props.message.selected)
  return (
    <div className="container">
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onClick={props.messageSelected ? "selected" : "not selected"} type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className={props.message.read ? "row message read" : "row message unread"} onClick={() => props.messageRead(props.message.id)}>
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