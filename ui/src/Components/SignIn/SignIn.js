import React, {useState} from "react";

import {useHistory, Link} from 'react-router-dom';
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
import {loginDispatch} from '../utility/react-redux/action/Action_Auth';
import {useDispatch} from 'react-redux'
import ForgotPassword from "../Profile/ForgotPassword";
const currentState = {
    emailAddress : "",
    password: "",
    isFail : "",
    isSuccess: "",
}
function SignIn() {
    const [agent, setAgent] = useState(currentState)
    const dispatch = useDispatch()
    const history = useHistory()
    const {emailAddress,password,isFail,isSuccess} = agent;
    
    const changeHandle = (payload) =>{
        const {name, value} = payload.target
        setAgent({...agent, [name]:value, isFail:'', isSuccess:''})
    }
    const submit = async payload =>{
        payload.preventDefault()
        try {
            const respond = await axios.post('/agent/signin', {emailAddress,password})
            setAgent({...agent, isFail:'', isSuccess:respond.data.msg})

            localStorage.setItem('first_agent_login',true)
            dispatch(loginDispatch())
            
            history.push('/dashboard')
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
                    <h2>Login</h2>
                    
                    <Form onSubmit={submit}> 
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
                      <Col className="d-flex justify-content-end">
                        <Link to="/forgotPassword"><p> Forgot Password?</p></Link>
                      </Col>

                      <Button
                        type={"submit"}
                        color={"blue"}
                        className="btn-primary mb-2 shadow-sm"
                      >
                        SIGN IN
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

export default SignIn;
