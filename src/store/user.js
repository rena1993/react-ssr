import axios from 'axios';

const GET_INFO_LIST="USER/GET_USER_LIST";
function changeUserInfoList(data){return {
    type:GET_INFO_LIST,
    data
}}

export const getUserInfoList=()=>{
    return (dispatch,getState,axiosInstance)=>{
        return axios.get('/api/user').then(res=>{
            const {data}=res.data;
            console.log('userifo1414141',data);
            dispatch(changeUserInfoList(data));
        })
    }
}

const defaultState={
    userInfo:{}
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case GET_INFO_LIST:
            const newState={
                ...state,
                userInfo:action.data
            }
            return newState
        default:return state
    }
}