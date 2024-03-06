"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Container, Grid, Card } from "@mantine/core";
import { IconUser, IconLock, IconAt, IconPhone } from "@tabler/icons-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });
    if (response.ok) {
      router.push("/login");
    }
  };

  return (
    <Container size="md">
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={12} mb={6}>
              {/* Name Input */}
              <TextInput
                rightSection={<IconUser style={{ width: 20, height: 20 }} />}
                label="name"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid.Col>
  
            <Grid.Col span={12} mb={6}>
              {/* Email Input */}
              <TextInput
                rightSection={<IconAt style={{ width: 20, height: 20 }} />}
                label="email"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid.Col>
  
            <Grid.Col span={12} mb={6}>
              {/* Password Input */}
              <TextInput
                rightSection={<IconLock style={{ width: 20, height: 20 }} />}
                label="Password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid.Col>
  
            <Grid.Col span={12} mb={6}>
              {/* Phone Input */}
              <TextInput
                rightSection={<IconPhone style={{ width: 20, height: 20 }} />}
                label="Phone"
                placeholder="Enter your phone number"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Grid.Col>
  
            {/* Signup Button */}
            <Grid.Col span={12}>
              <Button
                type="submit"
                style={{ marginTop: 20 }}
              >
                Sign Up
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Card>
    </Container>
  );
}
