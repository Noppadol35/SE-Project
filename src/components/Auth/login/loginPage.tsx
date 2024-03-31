"use client";
import { useState, useEffect, FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  LoadingOverlay,
  Divider,
} from "@mantine/core";
import { redirectBasedOnRole } from "@/lib/utils";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { data } = useSession();
  useEffect(() => {
    const session = data as any;
    if (!session) return;
    if (!session?.session?.user?.role) return;

    router.push(redirectBasedOnRole(session.session.user.role));
  }, [data, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Please enter your email");
    }

    if (password.trim() === "") {
      setPasswordError("Please enter your password");
    }

    if (email.trim() !== "" && password.trim() !== "") {
      setLoading(true);
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (result?.error) {
          alert(result.error);
          setLoading(false);
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="items-center justify-center ">
      <Container size={420} my={40}>
        <LoadingOverlay visible={false} />
        <Title className=" text-center">Welcome back!</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={emailError}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={passwordError}
            mt="md"
          />
          <Group mt="md">
            <Anchor onClick={() => router.push("/signup")} size="sm" fw={500}>
              Don't have an account? Sign up
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" onClick={handleSubmit}>
            Sign in
          </Button>
          <Divider orientation="horizontal" mt="xl" />
          <Button
            fullWidth
            mt="md"
            color="red"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
