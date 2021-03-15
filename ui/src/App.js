import "./App.css";
import React, { useEffect } from "react";
import HomePage from "./Components/HomePage/HomePage";
import SignIn from "./Components/SignIn/SignIn";
import Header from "./Components/Header/Header";
import SignUp from "./Components/SignUp/SignUp";
import MainBody from "./Components/MainBody/MainBody";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MailActivation from "./Components/SignUp/MailActivation";
import Footer from "./Components/Footer/Footer";
import axios from "axios";
import Profile from "./Components/Profile/Profile";
import { Redirect } from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import Dashboard from "./Components/Dashboard/Dashboard";
import Support from "./Components/Support/Support";
import UploadFile from "./Components/UploadFile/UploadFile";

import {
  loginDispatch,
  getAgent,
  getAgentDispatch,
} from "./Components/utility/react-redux/action/Action_Auth";
import SideBar from "./Components/SideBar/SideBar";
import ForgotPassword from "./Components/Profile/ForgotPassword";
import PasswordReset from "./Components/Profile/PasswordReset";
import AdminPanel from "./Components/Admin/AdminPanel";
import EditAgent from "./Components/Profile/EditAgent";
function App() {
  const tk = useSelector((state) => state.tokenGenerator);
  const AgentAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { is_LoggedIn, is_Admin } = AgentAuth;
  useEffect(() => {
    const first_agent_login = localStorage.getItem("first_agent_login");
    if (first_agent_login) {
      const tokens = async () => {
        const respond = await axios.post("/agent/refresh_token", null);
        console.log(respond);
        dispatch({ type: "TOKEN", payload: respond.data.ac_token });
      };
      tokens();
    }
  }, [AgentAuth.is_LoggedIn, dispatch]);

  useEffect(() => {
    if (tk) {
      const fetchAgent = () => {
        dispatch(loginDispatch());
        return getAgent(tk).then((respond) => {
          dispatch(getAgentDispatch(respond));
        });
      };
      fetchAgent();
    }
  }, [tk, dispatch]);
  return (
    <div className="App">
      {is_LoggedIn ? <SideBar /> : <Header />}
      <Switch>
        <Route
          exact={true}
          path="/"
          component={is_LoggedIn ? NotFound : HomePage}
        />
        <Route
          exact={true}
          path="/signin"
          component={is_LoggedIn ? NotFound : SignIn}
        />
        <Route
          exact={true}
          path="/signup"
          component={is_LoggedIn ? NotFound : SignUp}
        />
        <Route
          path="/agent/account_activation/:tokenActive"
          component={MailActivation}
          exact
        />
        <Route exact path={["/","/dashboard"]}>
          {is_LoggedIn ? <Dashboard /> :  NotFound}
        </Route>
        <Route exact path="/profile">
          {is_LoggedIn ? <Profile /> :  NotFound}
        </Route>
        <Route exact path="/upload_file">
          {is_LoggedIn ? <UploadFile /> : NotFound}
        </Route>
        
        <Route exact path="/support">
          {is_LoggedIn ? <Support /> : NotFound}
        </Route>
        <Route exact path="/admin_panel">
          {is_LoggedIn ? <AdminPanel /> : NotFound}
        </Route>
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/agent/reset_password/:ac_token" component={PasswordReset} />
        <Route exact path="/edit_agent/:id" component={is_Admin ? EditAgent: NotFound} />
      </Switch>

      {is_LoggedIn ? <></> : <Footer />}
    </div>
  );
}

export default App;
