import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom' 
import {getAllAgents,getAllAgentsDispatch} from '../utility/react-redux/action/ActionAgents'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
const iState = {
    username: "",
    password: "",
    repeatPassword: "",
    isFail: "",
    isSuccess: "",
  };
 
function AdminPanel() {
    

const authAgent = useSelector((state) => state.auth);
const tokenGenerator = useSelector((state) => state.tokenGenerator);
const agents = useSelector((state) =>state.agents );
const [pending, setPending] = useState(false);
const { agent, is_Admin } = authAgent;
const [currentData, setCurrentData] = useState(iState);
const [displayImage, setDisplayImage] = useState(false);
const [cb, setCb] = useState(false);

const { username, password, repeatPassword, isFail, isSuccess } = currentData;
  
const dispatch = useDispatch()
useEffect(() =>{
    if(is_Admin){
      return getAllAgents(tokenGenerator).then(respond =>{
          dispatch(getAllAgentsDispatch(respond))
      })
    }
  },[tokenGenerator, is_Admin, dispatch, cb])

  const removeAgent = async (agent_id) => {
    try {
        if(agent._id !== agent_id){
            if(window.confirm(`you sure you want remove?` )){
                setPending(true)
                await axios.delete(`/agent/removeAgent/${agent_id}`, {
                    headers: {Authorization: tokenGenerator}
                })
                setPending(false)
                setCb(!cb)
            }
        }
        
    } catch (error) {
        setCurrentData({...currentData, isFail: error.response.data.msg , isSuccess: ''})
    }
}
    return (
        <div>
            <div>
                <h2>Users</h2>

                <div style={{overflowX: "auto"}}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Admin</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agents.map(agent => (
                                    <tr key={agent._id}>
                                        <td>{agent._id}</td>
                                        <td>{agent.username}</td>
                                        <td>{agent.emailAddress}</td>
                                        <td>
                                            {
                                                agent.isAdmin === true
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_agent/${agent._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => removeAgent(agent._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        
    )
}

export default AdminPanel
