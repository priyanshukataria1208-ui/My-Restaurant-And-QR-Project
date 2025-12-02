import axios from "axios";
import React, { useEffect } from "react";

const UserProduct = () => {

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("TOKEN FROM FRONTEND ===>", token);

    axios.get("http://localhost:5000/menu", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("SUCCESS ===>", res.data);
    })
    .catch(err => {
      console.log("ERROR ===>", err);
    });

  }, []);

  return <div>User Product Page</div>;
};

export default UserProduct;
