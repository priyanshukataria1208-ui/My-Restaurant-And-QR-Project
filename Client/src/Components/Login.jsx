import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

import {
  Theme,
  Card,
  Text,
  TextField,
  Button,
  Flex,
  Link
} from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formdata, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error("Invalid credentials");
        return;
      }

      login(data.token, data.user.role, data.user.id);
      toast.success("Login Successful");

      navigate(data.user.role === "admin" ? "/admindash" : "/");
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <Theme
      appearance="dark"
      accentColor="sky"   // 🔥 change karo → art ka color change hoga
      grayColor="sand"
      radius="large"
      panelBackground="translucent"
    >
      <div className="login-bg">
        <Card size="4" className="login-card">
          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="4">
              <Text size="6" weight="bold" align="center">
                Sign in
              </Text>

              <TextField.Root
                placeholder="Username"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                required
              />

              <TextField.Root
                type="password"
                placeholder="Password"
                name="password"
                value={formdata.password}
                onChange={handleChange}////////////////////////-
                required
              />

              <Link size="2" href="/forget">
                Forgot password?
              </Link>

              <Button size="3" type="submit">
                Sign In
              </Button>

              <Text size="2" align="center" color="gray">
                Don’t have an account? <Link href="/Reg">Create one</Link>
              </Text>
            </Flex>
          </form>
        </Card>
      </div>
    </Theme>
  );
};

export default Login;
