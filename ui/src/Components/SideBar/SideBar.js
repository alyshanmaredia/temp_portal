import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Button } from "reactstrap";
import * as FA from "react-icons/fa";
import * as AI from "react-icons/ai";
import * as IO from "react-icons/io";

import styled from "styled-components";
import "./SideBar.css";
import "./SideBarItem.css";
import { sign } from "jsonwebtoken";
import axios from "axios";

const SideBarNav = styled.nav`
  display: flex;
  justify-content: center;
  top: 0;
  left: ${({ press }) => (press ? "0" : "-100%")};
  transition: 150ms;
  background: #22627e;
  width: 250px;
  height: 95vh;
  position: fixed;
  z-index: 10;
`;

const Wrapper = styled.div`
  width: 100%;
`;
const signout = async () => {
  try {
    await axios.get("/agent/signout");
    localStorage.removeItem("first_agent_login");
    window.location.href = "/";
  } catch (error) {
    window.location.href = "/";
  }
};

function SideBar() {
  const [press, setPress] = useState(false);
  const displaySidebar = () => setPress(!press);
  return (
    <div>
      <Nav className="nav_styling">
        <Button className="navbar-toggler" onClick={displaySidebar}>
          <FA.FaBars />
        </Button>
      </Nav>
      <SideBarNav press={press}>
        <Wrapper>
          <Button className="navbar-toggler" onClick={displaySidebar}>
            <AI.AiOutlineClose />
          </Button>
          <Link className="sidebar_link" to="/dashboard">
            <AI.AiFillDashboard />
            <div className="sidebar_label">Dashboard</div>
          </Link>
          <Link className="sidebar_link" to="/profile">
            <AI.AiFillProfile />
            <div className="sidebar_label">Profile</div>
          </Link>
          <Link className="sidebar_link" to="/upload_file">
            <AI.AiFillFileAdd />
            <div className="sidebar_label">Upload File</div>
          </Link>
          <Link className="sidebar_link" to="/support">
            <IO.IoMdHelpCircle />
            <div className="sidebar_label">Support</div>
          </Link>
          <Link className="sidebar_link" onClick={signout}>
            <AI.AiFillLayout />
            <div className="sidebar_label">Sign Out</div>
          </Link>
          <Link className="sidebar_link" to="/admin_panel">
            <AI.AiFillLayout />
            <div className="sidebar_label">Admin Panel</div>
          </Link>
        </Wrapper>
      </SideBarNav>
    </div>
  );
}

export default SideBar;
