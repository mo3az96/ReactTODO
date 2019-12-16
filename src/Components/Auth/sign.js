import React, { Component } from 'react';
import { ThemeProvider, CSSReset, Flex } from "@chakra-ui/core";
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
    render() {

        return (
            <ThemeProvider>
                <CSSReset />
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
                    mt="250px"
                >
                    Signin With <i className="fa fa-facebook-square" fontSize="25px"></i>
                </Flex>
            </ThemeProvider>
        );
    }
}

export default Sign;
