import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Button,
  Row,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
} from "reactstrap";
import { checkLength, isSimilar } from "../utility/Validator/Validator";
import { Error, Success } from "../utility/Error";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";

const iState = {
  username: "",
  password: "",
  repeatPassword: "",
  isFail: "",
  isSuccess: "",
};
function Profile() {
  const authAgent = useSelector((state) => state.auth);
  const tokenGenerator = useSelector((state) => state.tokenGenerator);
  
  const [pending, setPending] = useState(false);
  const { agent, is_Admin } = authAgent;
  const [currentData, setCurrentData] = useState(iState);
  const [displayImage, setDisplayImage] = useState(false);
  const [cb, setCb] = useState(false);
  const dispatch = useDispatch()
  const { username, password, repeatPassword, isFail, isSuccess } = currentData;

  const handleChange = (err) => {
    const { name, value } = err.target;
    setCurrentData({
      ...currentData,
      [name]: value,
      isFail: "",
      isSuccess: "",
    });
  };
  const updateData = () => {
    if (displayImage || username) {
      editData();
    }
    if (password) {
      changePassword();
    }
  };
  const editData = () => {
    try {
      axios.patch(
        "/agent/editInfo",
        {
          displayImage: displayImage ? displayImage : agent.displayImage,
          username: username ? username : agent.username,
        },
        { headers: { Authorization: tokenGenerator } }
      );
      setCurrentData({
        ...currentData,
        isFail: "",
        isSuccess: "Data Updated!",
      });
    } catch (error) {
      setCurrentData({
        ...currentData,
        isFail: error.response.data.msg,
        isSuccess: "",
      });
    }
  };

  const changePassword = () => {
    if (!checkLength(password)) {
      return setCurrentData({
        ...currentData,
        isFail: "Please Enter Password of 8 characters",
        isSuccess: "",
      });
    }
    if (!isSimilar(password, repeatPassword)) {
      return setCurrentData({
        ...currentData,
        isFail: "Password and RepeatPassword is Different!",
        isSuccess: "",
      });
    }
    try {
      axios.post(
        "/agent/reset_password",
        {
          password,
        },
        { headers: { Authorization: tokenGenerator } }
      );
      setCurrentData({
        ...currentData,
        isFail: "",
        isSuccess: "Data Updated!",
      });
    } catch (error) {
      setCurrentData({
        ...currentData,
        isFail: error.response.data.msg,
        isSuccess: "",
      });
    }
  };

  const changeDP = async (err) => {
    err.preventDefault();
    try {
      const file = err.target.files[0];
      if (!file) {
        return setCurrentData({
          ...currentData,
          isFail: "There is no file uploaded!!",
          isSuccess: "",
        });
      }
      if (isType(file)) {
        return setCurrentData({
          ...currentData,
          isFail:
            "This File Format is not Supported! upload only .jpeg .png files",
          isSuccess: "",
        });
      }

      if (isLarger(file)) {
        return setCurrentData({
          ...currentData,
          isFail: "Cannot Upload file larger than 2mb",
          isSuccess: "",
        });
      }

      let formData = new FormData();
      formData.append("file", file);

      setPending(true);
      const respond = await axios.post("/img/uploadImage", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: tokenGenerator,
        },
      });
      setPending(false);
      console.log(respond.data);
      setDisplayImage(respond.data.cloud_url);
    } catch (error) {
      setCurrentData({
        ...currentData,
        isFail: error.response.data.msg,
        isSuccess: "",
      });
    }
  };

  return (
    <div>
      {isFail && Error(isFail)}
      {isSuccess && Success(isSuccess)}
      {pending && <h4>Uploading File.....</h4>}
      <Container>
        <Row className="gutters">
          <Col xl={3} lg={3} md={12} sm={12} xs={12}>
            <Card className="card h-100">
              <CardBody>
                <div className="account">
                  <h2>{is_Admin ? "Admin" : "User"}</h2>
                  <div className="profile">
                    <div className="dp">
                      <img
                        src={displayImage ? displayImage : agent.displayImage}
                        alt=""
                      />
                      <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <Input
                          onChange={changeDP}
                          type="file"
                          name="file"
                          id="file"
                        />
                      </span>
                    </div>
                    <h5 class="username">{agent.username}</h5>
                    <h6 class="emailAddress">{agent.emailAddress}</h6>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl={9} lg={9} md={12} sm={12} xs={12}>
            <Card className="card h-100">
              <CardBody>
                <Row noGutters={true}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                    <FormGroup>
                      <label for="userName">User Name</label>

                      <Input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        defaultValue={agent.username}
                        placeholder="Your Username"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                      <label for="emailAddress">Email Address</label>
                      <Input
                        type="text"
                        name="emailAddress"
                        id="emailAddress"
                        className="form-control"
                        defaultValue={agent.emailAddress}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row noGutters={true}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h6 className="mb-2 text-primary">Credentials</h6>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                    <FormGroup>
                      <label for="password">New Password</label>

                      <Input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="New Password"
                        value={password}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                      <label for="repeatPassword">Repeat Password</label>
                      <Input
                        type="password"
                        name="repeatPassword"
                        id="repeatPassword"
                        className="form-control"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row noGutters={true}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="text-right">
                      <Button disabled={pending} onClick={updateData}>
                        Update
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function isLarger(imageFile) {
  return imageFile.size > 2097152;
}

function isType(imageFile) {
  return (
    imageFile.type !== "image/jpeg" &&
    imageFile.type !== "image/png" &&
    imageFile.type !== "image/jpg"
  );
}

export default Profile;
