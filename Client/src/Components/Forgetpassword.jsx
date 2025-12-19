import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  Theme,
  Card,
  Text,
  TextField,
  Button,
  Flex
} from "@radix-ui/themes";

const Forgetpassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "User not found");
        return;
      }

      toast.success("Sending Reset Link");
      setEmail("");
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <Theme appearance="dark" accentColor="sky">
      <div className="login-bg">
        <Card size="4" className="login-card">
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Text size="6" weight="bold" align="center">
                Forgot Password
              </Text>

              <TextField.Root
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button size="3" type="submit">
                Send Reset Link
              </Button>
            </Flex>
          </form>
        </Card>
      </div>
    </Theme>
  );
};

export default Forgetpassword;
