import axios from 'axios';
import ACTION from './indexAction';

export const loginDispatch = () =>{
    return{
        type: ACTION.SIGN_IN
    }
}

export const getAgent = async (access_token) =>{
    const respond = await axios.get('/agent/agentInfo', {
        headers : {Authorization: access_token}
    })
    
    return respond

}

export const getAgentDispatch =  (respond) =>{
    
    return {
        type: ACTION.AGENT,
        payload: {
            agent: respond.data,
            is_Admin: respond.data.isAdmin,
        },
    }

}