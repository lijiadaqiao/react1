
import actionType from '../actions/actionTypes'
const isLogin=Boolean(window.localStorage.getItem('authToken'))||Boolean(window.sessionStorage.getItem('authToken'))
const userInfo=JSON.parse(window.localStorage.getItem('userInfo'))||JSON.parse(window.sessionStorage.getItem('userInfo'))


const initState={
  ...userInfo,
  isLogin:isLogin,
  isLoading:false
}


export default (state=initState,action)=>{
  
  switch (action.type) {
    case actionType.STATE_LOGIN:
      return {
        ...state,
        isLoading:true
      }
      case actionType.LOGIN_SUCCESS:
          return {
            ...state,
            ...action.payload.userInfo,
            isLoading:false,
            isLogin:true
          }
      case actionType.LOGIN_FAILED:
          return {
            id:'',
            pisplayName:'',
            avatar:'',
            isLogin:false,
            isLoading:false,
            role:''
          }
      
      case actionType.CHANG_AVATAR:
              return {
                ...state,
                avatar:action.payload.avatarUrl
              }
    default:
      return state;
  }
}