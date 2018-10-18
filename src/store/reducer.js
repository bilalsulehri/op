import * as actionTypes from './actions';
import axios from '../axios';


const initialState={
    opSessionID:null,
    username:null,
    error: null,
    isAuthenticated:false,
    orderListCached:null
}


export const authStart=()=>{
    return {
       type:actionTypes.AUTH_START
    };
};

export const authSuccess=(OPSessionID, username)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        OPSessionID:OPSessionID,
        username:username
    };
};

export const authFail=()=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:'Authentication failed'
    };
};

export const auth=(un,pwd)=>{
    return dispatch =>{
        dispatch(authStart());
        axios.post( '/login',{
            'username': un,
            'password': pwd
      } ).then( response => {
            console.log(response);
             dispatch(authSuccess(response.data.OPSessionID, response.data.username));
            //   //alert('response');
            //     const loginStatus = response.data;
            //     console.log(response);
            //     if(loginStatus){
            //       console.log("login status false?? " +loginStatus);
            //       this.setState({showLogin:false});
    
    
            //     }else{
            //       console.log("login status passed?? " +loginStatus);
            //       this.setState({message: 'Invalid user name Or Password'})
            //     }
                // console.log( response );
            } )
            .catch(error => {
                dispatch(authFail());
                // console.log(error);
                //this.setState({error: true});
            });
    
    };
};



const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
               ...state
            };
        case actionTypes.AUTH_SUCCESS:
            return{
            
                    OPSessionID:action.OPSessionID,
                    username:action.username,
                    error:null,
                    isAuthenticated:true
               
            };
        case actionTypes.AUTH_FAIL:
            return{
                
                    opSessionID:null,
                    username:null,
                    error:'Authentication Failed',
                    isAuthenticated:false
              
            };
        case actionTypes.ORDER_LIST_CACHE:
            console.log('caching order list in reducer');
            return{
                ...state, cachedState:action.cachedState
            };
        default:
            return state;

    }
};

export default reducer;