import React, { useState } from "react";
import toast from "react-hot-toast";
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
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  // -----------------------
  // 🔥 FIXED: Handle Change
  // -----------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numeric = value.replace(/\D/g, "");
      setFormData({ ...formdata, [name]: numeric });
    } else {
      setFormData({ ...formdata, [name]: value });
    }
  };

  // -----------------------
  // 🔥 FIXED: Submit Handler
  // -----------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formdata.name, // 🔥 Backend ke according
          password: formdata.password,
        email:formdata.email}),
      });

      const data = await res.json();

      if (data.status === 201) {
        toast.success("Successfully Registered");
        navigate("/Login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server Error");
    }
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
            name="name"
            value={formdata.name}
            onChange={handleChange}
            required
          />

          <MDBInput
            className="mb-3 reg-field"
            type="email"
            label="Email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            required
          />

          <MDBInput
            className="mb-3 reg-field"
            type="password"
            label="Password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
          />

          <MDBInput
            className="mb-3 reg-field"
            type="number"
            label="Phone Number"
            name="phone"
            value={formdata.phone}
            onChange={handleChange}
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
