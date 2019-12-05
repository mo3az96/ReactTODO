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
        done: false
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
                done: false
            })
        }

    }

    render() {
        return (
            <ThemeProvider>
                <CSSReset />
                <Box mt="25px" mx="auto" textAlign="center">
                    <Flex as="form" onSubmit={this.handelSave}>
                        <Input type="text" placeholder="Enter Task ...." id="task" onChange={this.handelChange} value={this.state.task} />
                        <Input ml="15px" type="date" placeholder="Enter Date ...." id="date" onChange={this.handelChange} value={this.state.date} />
                        <Input ml="15px" type="time" placeholder="Enter time ...." id="time" onChange={this.handelChange} value={this.state.time} />
                        <Input ml="15px" as="input" type="text" placeholder="Enter tags ...." id="tags" onChange={this.handelChange} value={this.state.tags} />
                        <Button w="150px" ml="15px" variantColor="blue" type="submit">Add</Button>
                    </Flex>
                </Box>
            </ThemeProvider>
        );
    }
}

export default AddItems;
