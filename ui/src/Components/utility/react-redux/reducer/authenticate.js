import ACTION from "../action/indexAction";

const iState = {
  agent: [],
  is_Admin: false,
  is_LoggedIn: false,
};

const AgentAuth = (state = iState, action) => {
  switch (action.type) {
    case ACTION.SIGN_IN:
      return {
        ...state,
        is_LoggedIn: true,
      };
    case ACTION.AGENT:
      return {
        ...state,
        agent: action.payload.agent,
        is_Admin: action.payload.is_Admin,
      };
    default:
      return state;
  }
};

export default AgentAuth;
