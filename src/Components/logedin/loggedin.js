import React, { Component } from 'react';
import _ from 'lodash';
import TodoItems from '../TodoItems/todoItems';
import FilterElements from '../FilterElements/FilterElements';
import firebase from '../Firebase'
import { ThemeProvider, CSSReset, Box, Heading, Flex } from "@chakra-ui/core";
import AddModal from '../modal/modal';


class Loggedin extends Component {

    ref = firebase.firestore().collection('tasks');
    auth = firebase.auth()
    unsubscribe = null;
    state = {
        items: [],
        allTags: []
    }
    ///////////
    onCollectionUpdate = (querySnapshot) => {
        let items = [];
        let allTags = [];

        querySnapshot.forEach((doc) => {
            this.auth.onAuthStateChanged((user) => {
                const { task, date, time, done, assignTo, comments, tags } = doc.data();
                //join table
                items.push({
                    key: doc.id,
                    doc, // DocumentSnapshot
                    task,
                    date,
                    time,
                    done,
                    assignTo,
                    comments,
                    tags
                });
                allTags.push(...tags);
                allTags = _.uniq(allTags);
                this.setState({ items })
                this.setState({ allTags })
                // console.log(items)
            })
        });

    }
    ///////////
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    ///////////
    previousState = () => {
        this.ref = firebase.firestore().collection('tasks');
        let items = this.ref.onSnapshot(this.onCollectionUpdate);
        this.setState({ items })
    }
    ///////////
    deleteItem = (id) => {
        this.ref.doc(id).delete();
        this.previousState()
    }
    ///////////
    itemDone = (id) => {
        this.ref.get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.id === id && doc.data().done === true) {
                    this.ref.doc(id).update({ done: false })
                } else if (doc.id === id && doc.data().done === false) {
                    this.ref.doc(id).update({ done: true })
                }
            });
        });
    }
    ///////////
    handelDateSort = () => {
        let items = _.sortBy(this.state.items, ['date']);
        this.setState({ items })
    }
    ///////////
    handelNameSort = () => {
        let items = _.sortBy(this.state.items, ['task']);
        this.setState({ items })
    }
    ///////////
    addItem = (item) => {
        let tags = item.tags.split(', '); // split string on comma space

        this.auth.onAuthStateChanged((user) => {
            this.ref.add({
                task: item.task,
                date: item.date,
                time: item.time,
                done: item.done,
                assignTo: item.assignTo,
                tags: tags
            });
        })
    }
    ///////////
    loop = (key, val) => {
        this.ref = firebase.firestore().collection('tasks').where(key, '==', val);
        let items = this.ref.onSnapshot(this.onCollectionUpdate);
        this.setState({ items })
    }
    ///////////
    filter = (e) => {
        let targetId = e.target.id;
        switch (targetId) {
            case "all":
                this.previousState();
                break;
            case "done":
                this.loop('done', true)
                break;
            case "undone":
                this.loop('done', false)
                break;
            default:
                return 1;
        }
    }
    ///////////
    handlefilter = (e) => {
        let tag_name = e.target.text.substring(1);
        this.ref = firebase.firestore().collection('tasks').where('tags', 'array-contains', tag_name);
        let items = this.ref.onSnapshot(this.onCollectionUpdate);
        this.setState({ items })
    }
    ///////////
    filterSearch = (e) => {
        if (e != null) {
            let x = _.map(e, 'label');

            this.ref = firebase.firestore().collection('tasks').where('tags', 'array-contains-any', x);
            let items = this.ref.onSnapshot(this.onCollectionUpdate);
            this.setState({ items })
        } else {
            this.previousState();
        }
    }
    ///////////////////////////////////////////////////////
    render() {
        return (
            <ThemeProvider>
                <CSSReset />
                <Box w="90%" mx="auto" >
                    {/* <Heading mt="25px" className="text-center" textAlign="center">Add Item</Heading>
                    <Box className="content">
                        <AddItems addItem={this.addItem} />
                    </Box> */}


                    <Box className="content">
                        <Flex alignItems="center" justifyContent="space-between" mb="50px" mt="25px">
                            <Heading className="text-center" textAlign="center">Todo List</Heading>
                            <AddModal addItem={this.addItem} />
                        </Flex>
                        <FilterElements filter={this.filter} filterSearch={this.filterSearch} allTags={this.state.allTags} />
                        <TodoItems items={this.state.items} handlefilter={this.handlefilter} deleteItem={this.deleteItem} itemDone={this.itemDone} handelDateSort={this.handelDateSort} handelNameSort={this.handelNameSort} />
                    </Box>
                </Box>
            </ThemeProvider>
        );

    }
}


export default Loggedin;

