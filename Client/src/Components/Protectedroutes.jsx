import React from 'react'
import { Navigate } from 'react-router-dom';


const Protectedroutes = ({children}) => {
    const accessToken=localStorage.getItem("accessToken")
    console.log(accessToken);
    if(!accessToken){
        return <Navigate to="/welcome" />
    }
  return (
    <div>{children}</div>
  )
}

export default Protectedroutes