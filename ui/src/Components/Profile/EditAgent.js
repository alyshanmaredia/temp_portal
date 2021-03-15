import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Error,Success} from '../utility/Error'
import {useHistory, useParams} from 'react-router-dom';
import {
    Col,
    Container,
    Button,
    Row,
    FormGroup,
    Input,
    Card,
    CardBody,
    Label,
  } from "reactstrap";
function EditAgent() {
    const {id} = useParams()
    const history = useHistory()
    const agents = useSelector(state => state.agents)
    const tokenGenerator = useSelector(state => state.tokenGenerator)

    const [role, setRole] = useState(false)
    const [isFail, setIsFail] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [num, setNum] = useState(0)
    const [editAgent, setEditAgent] = useState([])


    useEffect(()=>{
        if(agents.length !== 0){
            agents.forEach(agent =>{
                if(agent._id === id){
                    setEditAgent(agent)
                    setRole(agent.isAdmin)
                }
            })
        }else{
            history.push('/profile')
        }
    },[agents,id, history])
    const changeRole = () =>{
        setIsSuccess('')
        setIsFail('')
        setRole(!role)
        setNum(num+1)
    }
    const updateData = async () => {
       try {
          if(num % 2 !== 0){
              const respond = await axios.patch(`/agent/changeRole/${editAgent._id}`,{
                  isAdmin : role ? true : false
              },{
                  headers: {Authorization: tokenGenerator}
              })
              setIsSuccess(respond.data.msg)
              setNum(0)
            } 
       } catch (error) {
           error.response.data.msg && setIsFail(error.response.data.msg)
       }
      };
    return (
        <div>
        <Container>
            <Row>
                <Button className="back"onClick={() => history.goBack()}>
                    <i className="fas fa-long-arrow-alt-left"></i>
                    Go Back</Button>

            </Row>
        <Row className="gutters">
          <Col xl={9} lg={9} md={12} sm={12} xs={12}>
            <Card className="card h-100">
              <CardBody>
                <Row noGutters={true}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h6 className="mb-2 text-primary">Edit Agent Details</h6>
                  </Col>
                  <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                    <FormGroup>
                      <label htmlFor="userName">User Name</label>

                      <Input
                        type="text"
                        name="username"
                        
                        className="form-control"
                        defaultValue={editAgent.username}
                        
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                      <label htmlFor="emailAddress">Email Address</label>
                      <Input
                        type="text"
                        name="emailAddress"
                        
                        className="form-control"
                        defaultValue={editAgent.emailAddress}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                    <Input type="checkbox" id="isAdmin" checked={role} onChange={changeRole}/>
                <Label htmlFor="isAdmin">isAdmin</Label>
                </FormGroup>

                <Row noGutters={true}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="text-right">
                      <Button onClick={updateData}>
                        Update
                      </Button>
                    </div>
                    {isFail && Error(isFail)}
                    {isSuccess && Success(isSuccess)}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
        </div>
    )
}

export default EditAgent
