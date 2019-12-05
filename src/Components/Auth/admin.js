import React, { Component } from 'react';
import {
    ThemeProvider,
    CSSReset,
    Box,
    Input,
    Flex,
    Button, Heading
} from "@chakra-ui/core";
import firebase from '../Firebase'
import Loggedin from '../logedin/loggedin'


export class admin extends Component {
    auth = firebase.auth()
    state = {
        email: "",
        password: "",
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handelSave = (e) => {
        e.preventDefault();
        this.auth.signInWithEmailAndPassword(this.state.email, this.state.password)

    }

    render() {
        return (
            <ThemeProvider>
                <CSSReset />
                <Box w="25%" mt="100px" mx="auto" textAlign="center">
                    <Heading mb="35px" className="text-center" textAlign="center">Sign As Admin</Heading>
                    <Flex as="form" onSubmit={this.handelSave} flexDirection="column">
                        <Input type="email" placeholder="Enter Email ...." id="email" onChange={this.handelChange} value={this.state.email} />
                        <Input my="20px" type="password" placeholder="Enter Password ...." id="password" onChange={this.handelChange} value={this.state.password} />
                        <Button w="150px" mx="auto" variantColor="blue" type="submit">Login</Button>
                    </Flex>
                </Box>
            </ThemeProvider>
        );
    }
}

export default admin;
