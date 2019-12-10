import React, { Component } from 'react';
import Delete from '../Delete/Delete';
import Comment from "../modal/comment"
import { Flex, IconButton, Tag } from "@chakra-ui/core";
import firebase from "../Firebase"

class TodoItems extends Component {
    ref = firebase.firestore().collection('tasks');
    DeleteComment = (id, comments, index) => {
        comments.splice(index, 1);
        console.log(comments);
        this.ref.doc(id).update({
            comments: comments
        }).then(() => {
            this.setState({
                comment: ""
            })
        });

    }


    state = {
        comment: ""
    }

    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handelSave = (comments, id) => {
        //console.log(unique);
        if (this.state.comment === "") {
            alert("Add comment")
        } else {
            comments.push(this.state.comment)
            console.log(comments);

            // this.ref.doc(id).update({
            //     comments: comments
            // }).then(() => {
            //     this.setState({
            //         comment: ""
            //     })
            // });
        }

    }



    render() {
        const { items, handelDateSort, handelNameSort, itemDone, handlefilter } = this.props;
        let count = items.length
        let ListItems = count ? (
            items.map(item => {
                return (
                    <Flex fontSize="lg" fontWeight="medium" key={item.key} className={item.done ? "done" : "undone"}>

                        {/* <Flex py="7px" border="1px" borderRight="0" borderTop="0" borderColor="gray.200" w="20%" h="50px" alignItems="center" justifyContent="center" className="task">{item.task}</Flex> */}
                        <Comment name={item.task} comment={this.state.comment} comments={item.comments} itemKey={item.key} handelChange={this.handelChange} DeleteComment={this.DeleteComment} handelSave={this.handelSave} />
                        <Flex py="7px" border="1px" borderRight="0" borderTop="0" borderColor="gray.200" w="10%" h="50px" alignItems="center" justifyContent="center" className="date">{item.date}</Flex>
                        <Flex py="7px" border="1px" borderRight="0" borderTop="0" borderColor="gray.200" w="10%" h="50px" alignItems="center" justifyContent="center" className="time">{item.time}</Flex>
                        <Flex py="7px" border="1px" borderRight="0" borderTop="0" borderColor="gray.200" w="20%" h="50px" alignItems="center" justifyContent="center" className="tags" id="tags">
                            {
                                [...new Set(item.tags)].map(tag => {
                                    return (
                                        <Tag as="a" onClick={handlefilter} href="#!" key={Math.random()} ml="5px">#{tag}</Tag>
                                    )
                                })
                            }
                        </Flex>
                        <Flex py="7px" border="1px" borderRight="0" borderTop="0" borderColor="gray.200" w="30%" h="50px" alignItems="center" justifyContent="center" className="time">{item.assignTo}</Flex>
                        <Flex py="7px" border="1px" borderTop="0" borderColor="gray.200" w="10%" h="50px" alignItems="center" justifyContent="space-around">
                            <IconButton size="lg" fontSize="20px" w="45px" h="45px" variantColor="green" icon="check" onClick={() => itemDone(item.key)} />
                            {/* <span className="action icon" onClick={() => itemDone(item.id)}><i className="fa fa-check"></i></span> */}
                            <Delete id={item.key} items={items} deleteItem={this.props.deleteItem} />
                        </Flex>
                    </Flex>

                )
            })
        ) : (
                <Flex textAlgin="center" alignItems="center" justifyContent="space-around" color="#e53e3e" fontSize="20px" fontWeight="bold"> There is No Tasks To Show </Flex>
            )
        return (

            <div className="ListItems">

                <Flex fontSize="xl" fontWeight="bold">
                    <Flex border="1px" borderRight="0" borderColor="gray.200" w="20%" h="50px" alignItems="center" justifyContent="center" className="task title" onClick={handelNameSort}>Task</Flex>
                    <Flex border="1px" borderRight="0" borderColor="gray.200" w="10%" h="50px" alignItems="center" justifyContent="center" className="date title" onClick={handelDateSort} > Date </Flex>
                    <Flex border="1px" borderRight="0" borderColor="gray.200" w="10%" h="50px" alignItems="center" justifyContent="center" className="time title">Time</Flex>
                    <Flex border="1px" borderRight="0" borderColor="gray.200" w="20%" h="50px" alignItems="center" justifyContent="center" className="tags title" id="tags">Tags</Flex>
                    <Flex border="1px" borderRight="0" borderColor="gray.200" w="30%" h="50px" alignItems="center" justifyContent="center" className="tags title" id="tags">Assign To</Flex>
                    <Flex border="1px" borderColor="gray.200" w="10%" h="50px" alignItems="center" justifyContent="center" className="action title">Action</Flex>
                </Flex>
                {ListItems}
            </div>
        )
    }
}

export default TodoItems;
