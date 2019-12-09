import actionTypes from '../actions/actionTypes'


const initState={
  isLoading:false,
  list:[{
    id:1,
    title:'woshi title1',
    desc:'ajdnkajnka',
    hasRead:false
  },
  {
    id:2,
    title:'woshi title2',
    desc:'ajdnkajnka',
    hasRead:true
  },
  {
    id:3,
    title:'woshi title3',
    desc:'ajdnkajnka',
    hasRead:true
  }]
}

export default (state=initState,action)=>{
  switch (action.type) {
    case actionTypes.RECIVED_NOTIFICATIONS:
      return {
        ...state,
        list:action.payload.list
      }
    case actionTypes.START_MARM_AS_READ:
      return {
        ...state,
        isLoading:true
      }
      case actionTypes.FINISH_MARK_AS_READ:
      return {
        ...state,
        isLoading:false
      }
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newList=state.list.map(item=>{
        if (item.id===action.payload.id) {
          item.hasRead=true
        }
        return item
      })
      return {
        ...state,
        list:newList
      }
      case actionTypes.MARK_AAL_NOTIFICATIONS_AS_READ_BY_ID:
      
      return {
        ...state,
        list:state.list.map(item=>{        
          item.hasRead=true        
        return item
      })
      }
    default:
      return state;
  }
}