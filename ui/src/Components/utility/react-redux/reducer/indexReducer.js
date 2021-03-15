import {combineReducers} from 'redux';
import auth from '../reducer/authenticate';
import tokenGenerator from '../reducer/tokenGenerator'
import agents from '../reducer/agentsReducers'

export default combineReducers({
    auth,
    tokenGenerator,
    agents
})