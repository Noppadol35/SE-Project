"use client";
import cx from "clsx";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Burger,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLogin } from "@tabler/icons-react";
import classes from "@/app/styles/HeaderTabs.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HeaderTabs() {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { data: session } = useSession();

    console.log(session?.user?.name);

    return (
        
        <div className={classes.header}>
            <Container className={classes.mainSection} size="md">
                <Group justify="space-between">
                    <Image
                        src="/Buffet.png"
                        alt="Buffet Logo"
                        width={60}
                        height={60}
                    />
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="xs"
                        size="sm"
                    />
                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: "pop-top-right" }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, {
                                    [classes.userActive]: userMenuOpened,
                                })}
                            >
                                <Group gap={7}>
                                    <Avatar color="red" />
                                    <Text
                                        fw={500}
                                        size="sm"
                                        lh={1}
                                        mr={3}
                                    ></Text>
                                    <IconChevronDown
                                        style={{
                                            width: rem(12),
                                            height: rem(12),
                                        }}
                                        stroke={1.5}
                                    />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Link href="/login">
                                <Menu.Item
                                    leftSection={
                                        <IconLogin
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Login
                                </Menu.Item>
                            </Link>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
        </div>
    );
}
