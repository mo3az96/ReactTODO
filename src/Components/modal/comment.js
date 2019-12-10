import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Textarea,
    FormLabel,
    useDisclosure,
    Flex,
    IconButton,
    Editable, EditableInput, EditablePreview,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/core";
function Comment(props) {
    const { name, comments, handelChange, DeleteComment, itemKey, handelSave, comment } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <>

            <Button onClick={onOpen}
                ref={btnRef}
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

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        {
                            [...new Set(comments)].map(comment => {
                                return (
                                    <Flex key={Math.random()} borderBottom="1px solid #eee" mb="7px" pb="5px" justifyContent="space-between">
                                        {comment}
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
                    </DrawerBody>

                    <DrawerFooter>
                        <FormControl mt={4} as="form" >
                            <Textarea ref={initialRef} placeholder="Add Comment...." onChange={handelChange} id="comment" value={comment} />
                            <Button mt={1} variantColor="green" type="button" onClick={() => handelSave(comments, itemKey)}>ADD</Button>
                        </FormControl>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>



        </>
    );
}

export default Comment;