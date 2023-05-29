import React from 'react'
import styleUtils from "../styles/utils.module.css";

const Notification = ({ showNotification }:any) => {
  return (
    <div className={`${styleUtils.notificationContainer} ${showNotification ? 'show' : ''}`}>
      <p>You have already entered this letter</p>
    </div>
  )
}

export default Notification