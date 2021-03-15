import React, {useState} from "react";

import {useHistory} from 'react-router-dom';
import {
  Col,
  Container,
  Button,
  Row,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import axios from 'axios';
import image from "../../Components/assests/trademark.jpg";
import login_icon from "../../Components/assests/login_page_icon.png";
import {Error, Success} from '../utility/Error'
import {LoginDispatch} from '../utility/react-redux/action/Action_Auth';
import {useDispatch} from 'react-redux'
import './SignUp.css'
import {isSimilar,EmailValidator,Empty,checkLength} from '../utility/Validator/Validator'

const currentState = {
    username: "",
    emailAddress : "",
    password: "",
    repeatPassword: "",
    isFail : "",
    isSuccess: "",
}
function SignUp() {
    const [agent, setAgent] = useState(currentState)
    const dispatch = useDispatch()
    const history = useHistory()
    const {username,emailAddress,password,repeatPassword,isFail,isSuccess} = agent;
    
    const changeHandle = (payload) =>{
        const {name, value} = payload.target
        setAgent({...agent, [name]:value, isFail:'', isSuccess:''})
    }
    const submit = async payload =>{
        payload.preventDefault()
        if(Empty(username) || Empty(password)){
            return setAgent({...agent, isFail:"Please fill all Input fields", isSuccess:''})
        }
        if(!EmailValidator(emailAddress)){
            return setAgent({...agent, isFail:"Email is not valid", isSuccess:''})
        }
        if(!checkLength(password)){
            return setAgent({...agent, isFail:"Please Enter Password of 8 characters", isSuccess:''})
        }
        if(!isSimilar(password,repeatPassword)){
            return setAgent({...agent, isFail:"Password and RepeatPassword is Different!", isSuccess:''})
        }
        try {
            const respond = await axios.post('/agent/signup', {
                username,emailAddress,password
            })
            
            setAgent({...agent, isFail:'', isSuccess:respond.data.msg})
        } catch (error) {
            
            error.response.data.msg
           && setAgent({...agent, isFail:error.response.data.msg, isSuccess:''})
        }
    }    
  return (
    <div>
      <Container fluid={true}>
        <Row noGutters={true} className="d-flex flex-row-reverse">
          <Col className="" xs={12} md={8}>
            <img src={image} className="img-fluid sideImage" />
          </Col>

          <Col className="mainBodyContainer align-items-center" xs={12} md={4}>
            <div className="align-items-center py-5 d-flex">
              <Container>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <img src={login_icon} className="login_icon" />
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col lg={10} xl={7} className="mx-auto">
                    <h2>Register</h2>
                    
                    <Form onSubmit={submit}>
                    <FormGroup className="mb-3">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          value={username}
                          onChange ={changeHandle}
                          placeholder="Username"
                        />
                      </FormGroup> 
                      <FormGroup className="mb-3">
                        <Input
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          value={emailAddress}
                          onChange ={changeHandle}
                          placeholder="Email Address"
                        />
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange ={changeHandle}
                          placeholder="Password"
                        />
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <Input
                          type="password"
                          name="repeatPassword"
                          id="repeatPassword"
                          value={repeatPassword}
                          onChange ={changeHandle}
                          placeholder="Repeat Password"
                        />
                      </FormGroup> 
                      <Col className="d-flex justify-content-end">
                        <p> Forgot Password?</p>
                      </Col>

                      <Button
                        type={"submit"}
                        color={"blue"}
                        className="btn-primary mb-2 shadow-sm"
                      >
                        SIGN UP
                      </Button>
                      {isFail && Error(isFail)}
                    {isSuccess && Success(isSuccess)}
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
