import React from 'react';
import {
    Button,
    Box,
    FormControl,
    Textarea,
    Flex,
    IconButton,
    Editable, EditableInput, EditablePreview, Text
} from "@chakra-ui/core";


function Comment(props) {
    const { name, comments, handelChange, DeleteComment, itemKey, handelSave, comment, handeledit, load } = props;
    let drawer = false;
    console.log(load);



    const onOpen = () => {
        let side = document.getElementById(itemKey);
        let dr = document.getElementsByClassName("drawer")
        // let overlay = document.getElementById("overlay");

        if (!drawer) {
            // overlay.style.display = "block";
            side.style.display = "block";
            drawer = true
        } else {
            // overlay.style.display = "none";
            for (let i = 0; i < dr.length; i++) {
                dr[i].style.display = "none";
            }
            drawer = false
        }

    }
    const ondefault = (e) => {
        e.stopPropagation()
    }

    return (
        <>

            <Button
                onClick={onOpen}
                bg="transparent"
                py="7px" border="1px"
                borderRight="0"
                borderTop="0"
                borderColor="gray.200"
                w="20%" h="50px"
                alignItems="center"
                justifyContent="center"
                className="task"
                _hover={{ bg: "transparent" }}
            >

                {name}

            </Button>
            <Box pos="fixed" w="100%" zIndex={1} right="0" top="0" h="100%" bg="#0000004d" d="none" id={itemKey} className="drawer" onClick={onOpen}>
                <Box pos="fixed" w="300px" zIndex={2} right="0" top="0" h="100%" bg="#fff" py="25px" overflow="hidden" onClick={ondefault}>
                    <Text mb="50px" mx="auto" textAlign="center" fontSize="2xl"> {name}</Text>

                    {
                        [...new Set(comments)].map(comment => {
                            return (
                                <Flex key={Math.random()} borderBottom="1px solid #eee" mb="7px" pb="5px" justifyContent="space-between" w="250px" mx="auto">
                                    <Editable defaultValue={comment} onSubmit={(e) => handeledit(e, comments, itemKey, comment)}>
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                    <IconButton minWidth="25px" h="25px" variantColor="red"
                                        icon="delete"
                                        color="#fff"
                                        id={itemKey}
                                        type="button"
                                        onClick={() => DeleteComment(itemKey, comments, comments.indexOf(comment))}>
                                    </IconButton>
                                </Flex>
                            )
                        })
                    }
                    <FormControl mt={4} as="form" w="250px" mx="auto" >
                        <Textarea placeholder="Add Comment...." onChange={handelChange} id="comment" value={comment} />
                        <Button mt={1} variantColor="green"
                            type="button"

                            {...(!load && { isLoading: true })}
                            onClick={() => handelSave(comments, itemKey)}>ADD</Button>
                    </FormControl>
                </Box>
            </Box>




        </>
    );
}

export default Comment;