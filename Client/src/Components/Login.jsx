import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        
          setLoginName(data.apiData);

          if (data.apiData === "Priyanshu") navigate("/userproduct");
          else navigate("/");

          toast.success("Login Successfully");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div id="reg-wrapper">
      <form id="reg-box" onSubmit={handleLogin}>
        <h2 className="reg-title">🔑 Login Form</h2>

        <section className="reg-inputs">
          <MDBInput
            className="mb-3 reg-field"
            type="text"
            label="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <MDBInput
            className="mb-3 reg-field"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Don’t have an account? <a href="/reg">Register</a>
          </p>
          <p>Or sign in with:</p>

          <div className="social-wrap">
            <MDBBtn
              floating
              color="secondary"
              className="mx-1 social-btn"
              onClick={() => window.open("https://www.facebook.com")}
            >
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>
            <MDBBtn
              floating
              color="secondary"
              className="mx-1 social-btn"
              onClick={() => window.open("https://www.google.com")}
            >
              <MDBIcon fab icon="google" />
            </MDBBtn>
            <MDBBtn
              floating
              color="secondary"
              className="mx-1 social-btn"
              onClick={() => window.open("https://twitter.com")}
            >
              <MDBIcon fab icon="twitter" />
            </MDBBtn>
            <MDBBtn
              floating
              color="secondary"
              className="mx-1 social-btn"
              onClick={() => window.open("https://github.com")}
            >
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
