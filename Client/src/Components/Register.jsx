import React, { useState } from "react";
import toast from"react-hot-toast"
import {
  MDBInput,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCheckbox,  
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleRegister = async(e) => {
  e.preventDefault();

 await fetch("http://localhost:3000/api/v1/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          toast.success(data.message);
          navigate("/Login");
        } else {
          toast.error(data.message);
        }
      });
    
};

  return (
    <div id="reg-wrapper">
      <form id="reg-box" onSubmit={handleRegister}>
        <h2 className="reg-title">✨ Registration Form</h2>

        <section className="reg-inputs">
          <MDBInput
            className="mb-3 reg-field"
            type="text"
            label="Username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <MDBInput
            className="mb-3 reg-field"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <MDBCol className="d-flex justify-content-center">
            <MDBCheckbox label="Remember me" defaultChecked />
          </MDBCol>
          <MDBCol>
            <a href="/forget">Forgot password?</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type="submit" className="reg-btn" block>
          Sign Up
        </MDBBtn>

        <div className="text-center mt-3">
          <p>
            Already registered? <a href="/login">Login</a>
          </p>
          <p>Or sign up with:</p>

          <div className="social-wrap">
            <MDBBtn floating color="secondary" className="mx-1 social-btn">
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>
            <MDBBtn floating color="secondary" className="mx-1 social-btn">
              <MDBIcon fab icon="google" />
            </MDBBtn>
            <MDBBtn floating color="secondary" className="mx-1 social-btn">
              <MDBIcon fab icon="twitter" />
            </MDBBtn>
            <MDBBtn floating color="secondary" className="mx-1 social-btn">
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;


