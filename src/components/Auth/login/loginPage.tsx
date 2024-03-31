"use client";
import { useState, useEffect, FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import * as yup from "yup"; // import yup
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
    Box,
} from "@mantine/core";
import { useForm } from "@mantine/form"; // import useForm
import { redirectBasedOnRole } from "@/lib/utils";

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [visible, { toggle }] = useDisclosure(false);
    const { data, update } = useSession();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) =>
                value.length !== 10 ? null : "Password is required",
        },
    });

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    schema
        .validate({ email: "invalid", password: "invalid" })
        .catch((error) => {
            console.log(error.errors);
        });

    useEffect(() => {
        const session = data as any;
        if (!session) return;
        if (!session?.user?.role) return;

        console.log("redirecting...", session);
        router.push(redirectBasedOnRole(session.user.role));
    }, [data, router]);

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        toggle();
        setLoading(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) alert(result.error);

            await update();
            console.log("UPDATE LOCAL SESSION", result);
        } catch (error) {
            console.log("error", error);
        } finally {
            toggle();
            setLoading(false);
        }
    };

    return (
        <div className="items-center justify-center ">
            <Container size={420} my={40}>
                <Box pos="relative">
                    <LoadingOverlay
                        visible={visible}
                        loaderProps={{ children: "Loading..." }}
                    />
                    <Title className=" text-center">Welcome back!</Title>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                label="Email"
                                placeholder="you@example.com"
                                {...form.getInputProps("email")}
                                required
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                {...form.getInputProps("password")}
                                required
                                mt="md"
                            />
                            <Group mt="md">
                                <Anchor
                                    onClick={() => router.push("/signup")}
                                    size="sm"
                                    fw={500}
                                >
                                    Don't have an account? Sign up
                                </Anchor>
                            </Group>
                            <Button fullWidth mt="xl" type="submit">
                                Login
                            </Button>
                        </form>
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
                </Box>
            </Container>
        </div>
    );
}
