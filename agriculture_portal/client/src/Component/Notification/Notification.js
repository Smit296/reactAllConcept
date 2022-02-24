import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { connect } from "react-redux";

toast.configure()

class Notification extends React.Component {

  // componentDidMount() {
  //   const { type, msg } = this.props;
  //   this.notify({ type }, { msg })
  // }

  notify = (action, msg) => {
    switch (action) {

      case 'success':
        toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
        break;

      case 'warn':
        toast.warn(msg, { position: toast.POSITION.TOP_RIGHT });
        break;

      case 'error':
        toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
        break;

      case 'info':
        toast.info(msg, { position: toast.POSITION.TOP_RIGHT });
        break;

      default:
        toast(msg, { position: toast.POSITION.TOP_RIGHT })
    }
  }
  render() {
    const { type, msg, reset } = this.props;
    return (
      <>
        {(reset) ? this.notify(type, msg) : ''}
      </>
    )
  }
}

const take = (state) => {
  let { type, msg, reset } = state.notify;
  return {
    type, msg, reset
  };
}

export default connect(take)(Notification);