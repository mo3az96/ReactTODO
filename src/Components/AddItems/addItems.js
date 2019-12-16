import React, { Component } from 'react';

import {
    ThemeProvider,
    CSSReset,
    Box,
    Input,
    Flex,
    Button
} from "@chakra-ui/core";


export class AddItems extends Component {
    state = {
        task: "",
        date: "",
        time: "",
        tags: [],
        done: false,
        assignTo: "",
        comments: ""
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    handelSave = (e) => {
        e.preventDefault();
        //console.log(unique);
        if (this.state.task === "" || this.state.date === "") {
            alert("Fill The Data ")
        } else {
            this.props.addItem(this.state)
            this.setState({
                task: "",
                date: "",
                time: "",
                tags: [],
                done: false,
                assignTo: ""
            })
        }

    }

    render() {
        return (
            <ThemeProvider>
                <CSSReset />
                <Box mt="25px" mx="auto" textAlign="center">
                    <Flex as="form" onSubmit={this.handelSave} flexDirection="column">
                        <Input mb="15px" type="text" placeholder="Enter Task ...." id="task" onChange={this.handelChange} value={this.state.task} />
                        <Input mb="15px" type="date" placeholder="Enter Date ...." id="date" onChange={this.handelChange} value={this.state.date} />
                        <Input mb="15px" type="time" placeholder="Enter time ...." id="time" onChange={this.handelChange} value={this.state.time} />
                        <Input mb="15px" as="input" type="text" placeholder="Enter tags ...." id="tags" onChange={this.handelChange} value={this.state.tags} />
                        <Input mb="15px" as="input" type="text" placeholder="Enter user Name ...." id="assignTo" onChange={this.handelChange} />
                        <Button w="150px" variantColor="blue" type="submit" mx="auto">Add</Button>
                    </Flex>
                </Box>
            </ThemeProvider>
        );
    }
}

export default AddItems;
