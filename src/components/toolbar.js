import React from 'react';

const Toolbar = (props) => {

  const selectedMessages = props.state.email.filter(message => message.selected === true).length
  let disabled = false
  let amt = "fa-minus-square-o"
  if (selectedMessages === 0) {
    disabled = true
    amt = "fa-square-o"
  } else if (selectedMessages === props.state.email.length && selectedMessages !== 0){
    amt = "fa-check-square-o"
  }

  return (
    <div className="container">
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{props.unreadCount()}</span>
            unread messages
          </p>

          <a href="/#" className="btn btn-danger" onClick={props.composeForm}>
            <i className="fa fa-plus"></i>
          </a>

          <button onClick={props.allMessagesSelected} className="btn btn-default">
            <i className={`fa ${amt}`}></i>
          </button>

          <button onClick={props.messageReadToolbar} className="btn btn-default" disabled={disabled}>
            Mark As Read
          </button>

          <button onClick={props.messageUnreadToolbar} className="btn btn-default" disabled={disabled}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={props.labelMessages} disabled={disabled}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={props.removeLabel} disabled={disabled}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={props.deleteMessages} disabled={disabled}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
    )
  }



export default Toolbar