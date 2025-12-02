import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const Login = () => {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/v1/login", {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formdata.name,
        password: formdata.password,
      }),
    });

    const data = await res.json();

    if (data.success) {

      // 🔥 MOST IMPORTANT LINE
      localStorage.setItem("accessToken", data.token);

      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error(data.message || "Invalid Credentials");
    }
  } catch (err) {
    toast.error("Server Error");
    console.log(err);
  }
};



  return (
    <div id="reg-wrapper">
      <form id="reg-box" onSubmit={handleLogin}>
        <h2 className="reg-title">🔑 Login Form</h2>

        <section className="reg-inputs">
          {/* Username */}
          <MDBInput
            className="mb-3 reg-field"
            type="text"
            label="Username"
            name="name"              // 🔥 REQUIRED
            value={formdata.name}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <MDBInput
            className="mb-3 reg-field"
            type="password"
            label="Password"
            name="password"         // 🔥 REQUIRED
            value={formdata.password}
            onChange={handleChange}
            required
          />
        </section>

        <MDBRow className="mb-3">
          <MDBCol className="d-flex justify-content-start">
            <MDBCheckbox label="Remember me" defaultChecked />
          </MDBCol>
          <MDBCol className="text-end">
            <a href="/forget">Forgot password?</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type="submit" className="reg-btn" block>
          Login
        </MDBBtn>

        <div className="text-center mt-3">
          <p>
            Don’t have an account? <a href="/Reg">Register</a>
          </p>
          <p>Or sign in with:</p>

          <div className="social-wrap">
            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>
            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="google" />
            </MDBBtn>
            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="twitter" />
            </MDBBtn>
            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
