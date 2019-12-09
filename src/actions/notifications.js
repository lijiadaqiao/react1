import actionTypes from './actionTypes'
import {getNotifications}from '../requests/requests'

const startMarkAsRead=()=>{
  return {
    type:actionTypes.START_MARM_AS_READ
  }
}

const finishMarkAsRead=()=>{
  return {
    type:actionTypes.FINISH_MARK_AS_READ
  }
}

export const markNotificationAsReadById=(id)=>{
  
  return dispatch=>{
    dispatch(startMarkAsRead())
    setTimeout(()=>{
      dispatch({
        type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload:{
          id
        }
      })
      dispatch(finishMarkAsRead())
    },3000)
  }
}


export const markNotificationAsRead=()=>{
  
  return dispatch=>{
    dispatch(startMarkAsRead())
    setTimeout(()=>{
      dispatch({
        type:actionTypes.MARK_AAL_NOTIFICATIONS_AS_READ_BY_ID,
        
      })
      dispatch(finishMarkAsRead())
    },3000)
  }
}

export const getNotificationlist=()=>{
  
  return dispatch=>{
    dispatch(startMarkAsRead())
    getNotifications()
      .then(resp=>{
        console.log(resp)
        dispatch({
          type:actionTypes.RECIVED_NOTIFICATIONS,
          payload:{
            list:resp.list
          }
        })
        dispatch(finishMarkAsRead())
      })
      
   
  }
}

