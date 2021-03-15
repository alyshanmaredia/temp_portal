import React from 'react'
import './Error.css'

export const Error = (payload) =>{
    return <div className="failedNotify">{payload}</div>
}

export const Success = (payload) =>{
    return <div className="sucessNotify">{payload}</div>
}