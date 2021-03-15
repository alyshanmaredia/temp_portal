import ACTION from './indexAction'
import axios from 'axios'


export const getAllAgents = async (access_token) =>{
    const respond = await axios.get('/agent/allAgentInfo', {
        headers : {Authorization: access_token}
    })
    
    return respond
}

export const getAllAgentsDispatch = (respond) =>{
    
    return {
        type: ACTION.GET_ALL_AGENTS,
        payload: respond.data
    }
}

