import React from 'react';

const Body = (props) => {
  return (
  <div className="row message-body">
    <div className="col-xs-11 col-xs-offset-1">
      {props.messageBody}
    </div>
  </div>
  )}


export default Body