import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button
} from "@chakra-ui/core";

function Delete(props) {
    const { id, deleteItem } = props;
    const [isOpen, setIsOpen] = React.useState();
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();


    return (
        <>
            <IconButton w="45px" h="45px" p="0" icon="close" size="lg" fontSize="20px" variantColor="red" onClick={() => setIsOpen(true)} />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Customer
            </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
              </Button>
                        <Button variantColor="red" onClick={() => deleteItem(id)} ml={3}>
                            Delete
              </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default Delete;





