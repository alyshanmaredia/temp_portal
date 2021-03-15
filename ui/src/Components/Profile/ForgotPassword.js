import React, { useState } from "react";
import {
  Col,
  Container,
  Button,
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
} from "reactstrap";
import { Error, Success } from "../utility/Error";
import "./ForgotPassword.css";
import { MDBCard, MDBCardText } from "mdbreact";
import {EmailValidator} from '../utility/Validator/Validator'
import axios from "axios";


const iState = {
  emailAddress: "",
  isFail: "",
  isSuccess: "",
};

function ForgotPassword() {
  const [currentData, setCurrentData] = useState(iState);
  const { emailAddress, isFail, isSuccess } = currentData;

  const passwordForgot = async () => {
    if (!EmailValidator(emailAddress)) {
      return setCurrentData({
        ...currentData,
        isFail: "Email Not Valid!",
        isSuccess: "",
      });
    }
    try {
      const respond = await axios.post("/agent/forgot_password", {
        emailAddress
      });
      return setCurrentData({
        ...currentData,
        isFail: "",
        isSuccess: respond.data.msg
        
      });
    } catch (error) {
      error.response.data.msg &&
        setCurrentData({
          ...currentData,
          isFail: error.response.data.msg,
          isSuccess: "",
        });
    }
  };

  const handleChange = (err) => {
    const { name, value } = err.target;
    setCurrentData({
      ...currentData,
      [name]: value,
      isFail: "",
      isSuccess: "",
    });
  };
  return (
    <div className="maindiv ">
      <Container>
        <Row>
          <Col lg={6} xl={6} className="mx-auto">
            <MDBCard className="shadow-4">
              <h3>
                <i class="fa fa-lock fa-2x"></i>
              </h3>
              <h2 class="text-center">Forgot Password?</h2>
              <p>You can reset your password here.</p>
              <MDBCardText>
                <Form>
                  <FormGroup>
                    <Row className="justify-content-center">
                      <Col xs={10} lg={8}>
                        <Input
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          value={emailAddress}
                          onChange={handleChange}
                          placeholder="Email Address"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row>
                    <Col className="btn-col">
                      <Button
                        
                        onClick={passwordForgot}
                        className="btn-primary mb-2 shadow-lg"
                      >
                        Verify your Email
                      </Button>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs={10} lg={8} style={{ paddingBottom: "20px" }}>
                      {isFail && Error(isFail)}
                      {isSuccess && Success(isSuccess)}
                      
                    </Col>
                  </Row>
                </Form>
              </MDBCardText>
            </MDBCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default ForgotPassword;
