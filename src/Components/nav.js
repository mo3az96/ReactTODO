import React from 'react';
import {
    ThemeProvider,
    CSSReset,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from "@chakra-ui/core";



const Nav = (props) => {
    const { user, handelLagout } = props;



    let users = user ? (
        <Menu>
            <MenuButton as={Button} bg="transparent"
                _hover={{ bg: "transparent" }}
                _expanded={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _focus={{ outline: 0, boxShadow: "0", bg: "transparent" }}>
                <Heading size="lg"> {user.displayName}</Heading>
            </MenuButton>
            <MenuList>
                <MenuItem as="button" onClick={handelLagout}>Logout</MenuItem>
            </MenuList>
        </Menu>
    ) : (
            // <a href="/admin">Sign As Admin</a>
            <Flex></Flex>
        )
    return (
        <ThemeProvider>
            <CSSReset />
            <Flex alignItems="center" justifyContent="space-between" mx="auto" backgroundColor="#f8f9fa" p="5px 50px">
                <Heading size="2xl" className="logo" color="rgba(0,0,0,0.9)">Todo Apps</Heading>

                <ThemeProvider>
                    {users}
                </ThemeProvider>
            </Flex>
        </ThemeProvider>
    )
}

export default Nav;