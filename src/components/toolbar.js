import React from 'react';

const Toolbar = (props) => {

  return (
    <div className="container">
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <a href="/#" className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button onClick={() => props.allMessagesSelected()} className="btn btn-default">
            <i className="fa fa-square-o"></i>
          </button>

          <button onClick={props.messageReadToolbar} className="btn btn-default" disabled="">
            Mark As Read
          </button>

          <button onClick={props.messageUnreadToolbar} className="btn btn-default" disabled="">
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled="">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled="">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled="">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
    )
  }



export default Toolbar