import React, { Component } from 'react';
import { ThemeProvider, CSSReset, Flex, Input, Button } from "@chakra-ui/core";
import firebase from '../Firebase'
import 'font-awesome/css/font-awesome.min.css';



export class Sign extends Component {

    auth = firebase.auth()
    provider = new firebase.auth.FacebookAuthProvider();
    hsndelSignin = () => {
        this.auth.signInWithPopup(this.provider).then(function (result) {
            var user = result.user;
            console.log(user)
        })
    }

    state = {
        email: "",
        password: ""
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    handelSave = (e) => {
        e.preventDefault();
        if (this.state.email === "" || this.state.password === "") {
            alert("Fill The Data ")
        } else {
            this.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((cred) => {
                this.setState({
                    email: "",
                    password: ""
                })
            });
        }

    }


    render() {

        return (
            <ThemeProvider>
                <CSSReset />

                <Flex w="350px" mx="auto" mt="150px" as="form" onSubmit={this.handelSave} flexDirection="column">
                    <Input mb="15px" type="text" placeholder="Enter Email ...." id="email" onChange={this.handelChange} value={this.state.email} />
                    <Input mb="15px" type="password" placeholder="Enter Password ...." id="password" onChange={this.handelChange} value={this.state.password} />
                    <Button w="150px" variantColor="blue" type="submit" mx="auto">Login</Button>
                </Flex>

                <Flex as="button"
                    onClick={this.hsndelSignin}
                    backgroundColor="#3b5998"
                    size="lg" color="#fff"
                    borderRadius="60px"
                    width="250px"
                    alignItems="center"
                    px="35px"
                    justifyContent="space-between"
                    fontSize="25px"
                    fontWeight="bold"
                    height="50px"
                    m="auto"
                    mt="50px"
                >
                    Signin With <i className="fa fa-facebook-square" fontSize="25px"></i>
                </Flex>
            </ThemeProvider>
        );
    }
}

export default Sign;
