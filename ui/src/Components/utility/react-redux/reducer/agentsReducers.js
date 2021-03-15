import ACTION from "../action/indexAction";

const agents = []

const AgentReducer = (state = agents, action) => {
  switch (action.type) {
    case ACTION.GET_ALL_AGENTS:
      return action.payload
    default:
      return state;
  }
};

export default AgentReducer
