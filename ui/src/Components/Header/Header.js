import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavItem,
  Container,
  Button,
  Collapse,
} from "reactstrap";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import logo from "../../Components/assests/tjar.png";
import "./Header.css";
import HomePage from "../HomePage/HomePage";
import SignIn from "../SignIn/SignIn";
import { Link } from "react-router-dom";
function Header() {
  const authAgent = useSelector((state) => state.auth);

  const [isClick, setClick] = useState(false);
  const toggle = () => setClick(!isClick);

  const { agent, is_Admin, is_LoggedIn } = authAgent;
  const agentData = () => {
    return (
      <li>
        <Link to="#">
          <img src={agent.displayImage} alt="" />
          {agent.username}
        </Link>
      </li>
    );
  };
  return (
    <div>
      <Navbar dark className="navbar-pm" expand="sm">
        <Container>
          <NavbarBrand className="navbar-brand" href="/">
            <img src={logo} className="Logo" />
          </NavbarBrand>
          <Button className="navbar-toggler" onClick={toggle}>
            <span className="navbar-toggler-icon"></span>
          </Button>
          <Collapse isOpen={isClick} navbar>
            <Nav className="ml-auto " navbar>
              <NavItem>
                <NavLink className="nav-link" href="/" active>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/signup" active>
                  Register
                </Link>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" href="/contactus" active>
                  Contact Us
                </NavLink>
              </NavItem>
              {is_LoggedIn ? (
                agentData()
              ) : (
                <Link className="nav-link" to="/signin" active>
                  Login
                </Link>
              )}

              <NavItem></NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
