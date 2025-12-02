import React from 'react'
import { Navigate } from 'react-router-dom';

const Openroutes = ({children}) => {
    const accessToken=localStorage.getItem("accessToken");
    if(accessToken){
        return <Navigate to="/welcome" replace />
    }
  return (
    <div>{children}</div>
  )
}

export default Openroutes