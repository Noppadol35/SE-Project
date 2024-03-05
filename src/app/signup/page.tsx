'use client'

import React from 'react';
import { useState } from 'react';
import { TextInput, Button, Container, Grid, Card} from '@mantine/core';
import { IconUser, IconLock, IconAt, IconPhone } from '@tabler/icons-react';

const SignupPage = () => {
  return (
    <Container size="md">
      <Card shadow='md' padding='lg' radius='md' withBorder>
      <Grid>
        <Grid.Col span={12} md={6}>
          {/* Name Input */}
          <TextInput
            icon={<IconUser style={{ width: 20, height: 20 }} />}
            label="Name"
            placeholder="Enter your name"
            required
          />
        </Grid.Col>

        <Grid.Col span={12} md={6}>
          {/* Email Input */}
          <TextInput
            icon={<IconAt style={{ width: 20, height: 20 }} />}
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
          />
        </Grid.Col>

        <Grid.Col span={12} md={6}>
          {/* Password Input */}
          <TextInput
            icon={<IconLock style={{ width: 20, height: 20 }} />}
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
          />
        </Grid.Col>

        <Grid.Col span={12} md={6}>
          {/* Phone Input */}
          <TextInput
            icon={<IconPhone style={{ width: 20, height: 20 }} />}
            label="Phone"
            placeholder="Enter your phone number"
            type="tel"
            required
          />
        </Grid.Col>

        {/* Signup Button */}
        <Grid.Col span={12}>
          <Button style={{ marginTop: 20 }}>Sign Up</Button>
        </Grid.Col>
      </Grid>
      </Card>
    </Container>
  );
}

export default SignupPage;