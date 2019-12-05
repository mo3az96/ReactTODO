import React, { Component } from 'react';
import _ from 'lodash';
import TodoItems from '../TodoItems/todoItems';
import AddItems from '../AddItems/addItems';
import FilterElements from '../FilterElements/FilterElements';
import firebase from '../Firebase'
import { ThemeProvider, CSSReset, Box, Heading } from "@chakra-ui/core";


class Loggedin extends Component {

    ref = firebase.firestore().collection('tasks');
    tags = firebase.firestore().collection('tags');
    tasks_tags = firebase.firestore().collection('tasks_tags');
    auth = firebase.auth()
    unsubscribe = null;
    tags_unsubscribe = null;
    state = {
        items: [],
        currentitems: [],
        allTags: []
    }
    ///////////
    onCollectionUpdate = (querySnapshot) => {
        let items = [];

        querySnapshot.forEach((doc) => {

            this.auth.onAuthStateChanged((user) => {
                let tag_id_arr = [];
                let tags_arr = [];
                const { task, date, time, done, assignTo } = doc.data();
                if (assignTo === user.uid) {
                    //join table
                    this.tasks_tags.where('task_id', '==', doc.id).get().then((snapshot) => {
                        snapshot.forEach(doc => {
                            tag_id_arr.push(doc.data().tag_id);
                        });
                        this.tags.get().then((snapshot) => {

                            snapshot.forEach(doc => {

                                if (tag_id_arr.includes(doc.id)) {

                                    tags_arr.push(doc.data().tag);
                                }
                            });
                        }).then(() => {
                            //join table
                            items.push({
                                key: doc.id,
                                doc, // DocumentSnapshot
                                task,
                                date,
                                time,
                                tags: tags_arr,
                                done,
                            });
                            this.setState({ items })
                        });
                    })
                }
            })
        });

    }
    ///////////
    onCollectionUpdateTags = (querySnapshot) => {
        let allTags = [];
        let tagsid = [];
        this.tasks_tags.get().then((snapshot) => {
            snapshot.forEach(doc => {
                tagsid.push(doc.data().tag_id);
            });
        }).then(() => {
            querySnapshot.forEach((doc) => {
                const { tag } = doc.data();
                if (tagsid.includes(doc.id)) {
                    allTags.push({
                        key: doc.id,
                        doc, // DocumentSnapshot
                        tag,
                    });
                }

            });
            this.setState({
                allTags
            });
        });




    }
    ///////////
    ///////////
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.tags_unsubscribe = this.tags.onSnapshot(this.onCollectionUpdateTags);
        this.test()
    }
    ///////////
    test = () => {
        let items = this.state.items;
        let currentitems = this.state.currentitems;
        items.map(item => {
            currentitems.push(item);
            return 1;
        });
        this.setState({ currentitems })
    }
    ///////////
    previousState = () => {
        this.tags_unsubscribe = this.tags.onSnapshot(this.onCollectionUpdateTags);
        let items = this.ref.onSnapshot(this.onCollectionUpdate);
        this.setState({ items })
    }
    ///////////
    deleteItem = (id) => {
        this.ref.doc(id).delete();
        this.tasks_tags.get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.data().task_id === id) {
                    this.tasks_tags.doc(doc.id).delete()
                    this.tags.doc(doc.data().tag_id).delete()
                }
            });
        });
        console.log(id);
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
        let getTags = item.tags.split(', '); // split string on comma space



        getTags.forEach(tag => {
            this.tags.add({ tag: tag })

        });

        this.auth.onAuthStateChanged((user) => {
            this.ref.add({
                task: item.task,
                date: item.date,
                time: item.time,
                done: item.done,
                assignTo: user.uid
            });
        })



        ////////////////////////tasks_tags////////////////
        let task_tag = []
        this.ref.where('task', '==', item.task).get().then((snapshot) => {
            snapshot.forEach(doc => {
                task_tag.push(doc.id);
            });
        }).then(() => {
            this.tags.where('tag', 'in', getTags).get().then((snapshot) => {
                snapshot.forEach(doc => {
                    task_tag.push(doc.id);
                });
            }).then(() => {
                for (let i = 1; i < task_tag.length; i++) {
                    this.tasks_tags.add({
                        tag_id: task_tag[i],
                        task_id: task_tag[0],
                    });
                    // console.log("task_id" + task_tag[0] + " , " + "tag_id" + task_tag[i]);
                }
            }).then(() => {
                this.previousState();
            });
        });

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
        let x = []
        this.tags.where('tag', '==', tag_name).get().then((snapshot) => {
            snapshot.forEach(doc => {
                x.push(doc.id);
            });
            console.log(x)
            this.searchTags(x)
        });
    }
    ///////////
    filterSearch = (e) => {
        if (e != null) {

            let x = _.map(e, 'value');
            this.searchTags(x)
            // console.log(x);
        } else {
            this.previousState();
        }
    }
    ///////////
    searchTags = (val) => {
        let arr = [];
        let items = this.state.items;
        let items2 = [];
        this.tasks_tags.where('tag_id', 'in', val).get().then((snapshot) => {
            snapshot.forEach(doc => {
                arr.push(doc.data().task_id);
            });
            items.forEach(kk => {
                if (arr.includes(kk.key)) {
                    console.log(kk);
                    console.log(kk.key);
                    items2.push(kk);
                }
            });
            this.setState({ items: items2 })
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    }
    ///////////////////////////////////////////////////////
    render() {
        return (
            <ThemeProvider>
                <CSSReset />
                <Box w="90%" mx="auto" >
                    <Heading mt="25px" className="text-center" textAlign="center">Add Item</Heading>
                    <Box className="content">
                        <AddItems addItem={this.addItem} />
                    </Box>

                    <Box className="content">
                        <Heading mt="25px" className="text-center" textAlign="center">Todo List</Heading>
                        <FilterElements filter={this.filter} filterSearch={this.filterSearch} allTags={this.state.allTags} />
                        <TodoItems items={this.state.items} handlefilter={this.handlefilter} deleteItem={this.deleteItem} itemDone={this.itemDone} handelDateSort={this.handelDateSort} handelNameSort={this.handelNameSort} />
                    </Box>
                </Box>
            </ThemeProvider>
        );

    }
}


export default Loggedin;

