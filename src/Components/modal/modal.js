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
    Input,
    FormLabel,
    useDisclosure,
    Heading
} from "@chakra-ui/core";
import AddItems from '../AddItems/addItems';

function AddModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { addItem } = props;
    const initialRef = React.useRef();
    const finalRef = React.useRef();

    return (
        <>
            <Button onClick={onOpen} w="150px" variantColor="blue" h="40px" fontSize="18px">Add Task</Button>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><Heading mt="25px" className="text-center" textAlign="center">Add Item</Heading></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <AddItems addItem={addItem} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default AddModal;