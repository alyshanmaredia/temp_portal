import axios from "axios";
import { useParams } from "react-router-dom";
import { Error, Success } from "../utility/Error";
import React, { useEffect, useState } from "react";

function MailActivation() {
    
    const {tokenActive} = useParams()
    const [pass, setSucess] =useState('')
    const [fail, setError] = useState('')
    
    useEffect(()=>{
        if(tokenActive){
            const LinkActivation = async () => {
                try {
                    const respond = await axios.post('/agent/account_activation', {tokenActive})
                    setSucess(respond.data.msg)
                } catch (error) {
                    error.response.data.msg && setError(error.response.data.msg )
                }
            }
            LinkActivation()
        }
    },[tokenActive])
  return (
    <div>
      {fail && Error(fail)}
      {pass && Success(pass)}
    </div>
  );
}

export default MailActivation;
