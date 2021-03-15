import React, { useState } from "react";
import { useParams } from "react-router";
import { checkLength, isSimilar } from "../utility/Validator/Validator";
import { Error, Success } from "../utility/Error";
import axios from "axios";
import { MDBCard, MDBCardText } from "mdbreact";
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
import "./ForgotPassword.css";
const iState = {
  password: "",
  repeatPassword: "",
  isFail: "",
  isSuccess: "",
};

function PasswordReset() {
  const { ac_token } = useParams();
  const [currentData, setCurrentData] = useState(iState);

  const { password, repeatPassword, isFail, isSuccess } = currentData;
  const handleChange = (err) => {
    const { name, value } = err.target;
    setCurrentData({
      ...currentData,
      [name]: value,
      isFail: "",
      isSuccess: "",
    });
  };
  const changePassword = async () =>{
    if(!checkLength(password)){
        return setCurrentData({...currentData, isFail:"Please Enter Password of 8 characters", isSuccess:''})
    }
    if(!isSimilar(password, repeatPassword)){
        return setCurrentData({...currentData, isFail:"Password and RepeatPassword is Different!", isSuccess:''})
    }
    try {
        const respond = await axios.post('/agent/reset_password', {password},{
            headers : {Authorization: ac_token}
        })
        return setCurrentData({...currentData, isFail:'', isSuccess:respond.data.msg})
    } catch (error) {
        error.response.data.msg && setCurrentData({...currentData, isFail: error.response.data.msg, isSimilar:''})
    }
  }
  return (
    <div className="maindiv ">
      <Container>
        <Row>
          <Col lg={6} xl={6} className="mx-auto">
            <MDBCard className="shadow-4">
              <h3>
                <i class="fa fa-lock fa-2x"></i>
              </h3>
              <h2 class="text-center">Reset Your Password?</h2>
              <p>Enter New Password to Reset it!</p>
              <MDBCardText>
                <Form>
                  <FormGroup>
                    <Row className="justify-content-center">
                      <Col xs={10} lg={8}>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange={handleChange}
                          placeholder="New Password"
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col xs={10} lg={8}>
                        <Input
                          type="password"
                          name="repeatPassword"
                          id="repeatPassword"
                          value={repeatPassword}
                          onChange={handleChange}
                          placeholder="Password Password"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row>
                    <Col className="btn-col">
                      <Button
                        onClick={changePassword}
                        className="btn-primary mb-2 shadow-lg"
                      >
                        Reset Password
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

export default PasswordReset;
