import ACTION from '../action/indexAction';

const tk = ""
const tokenGenerator = (state = tk, action) =>{
    switch(action.type){
        case ACTION.TOKEN:
            return action.payload
        default:
            return state
    }
}

export default tokenGenerator;