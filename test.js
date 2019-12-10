<Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
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
            <FormControl mt={4} as="form" >
                <Textarea ref={initialRef} placeholder="Add Comment...." onChange={handelChange} id="comment" value={comment} />
                <Button mt={1} variantColor="green" type="button" onClick={() => handelSave(comments, itemKey)}>ADD</Button>
            </FormControl>
        </ModalBody>

        <ModalFooter>
        </ModalFooter>
    </ModalContent>
</Modal>