import React from 'react';
import { ThemeProvider, CSSReset, Button, Flex } from "@chakra-ui/core";
import Select from 'react-select'

const FilterElements = (props) => {
    const { filter, filterSearch, allTags } = props;
    let ListTags = allTags.map((label) => {
        let key = label.key;
        let val = label.tag;
        return (
            { label: val, value: key }
        )
    });

    // let handleChange = (e) => {
    //     console.log(e.label);
    // };

    return (
        <ThemeProvider>
            <CSSReset />

            <Flex alignItems="center" mb="25px" justifyContent="space-between" className="filters-cont">
                <Flex as="form">
                    <Select options={ListTags} id="select" className="filterInput" onChange={filterSearch} isMulti placeholder="tags" />
                </Flex>
                <Flex className="filters">
                    <Button as="button" px="20px" mr="15px" h="40px" fontSize="18px" variantColor="green" id="all" onClick={filter} >All</Button>
                    <Button as="button" px="20px" mr="15px" h="40px" fontSize="18px" variantColor="green" id="done" onClick={filter} >done</Button>
                    <Button as="button" px="20px" h="40px" fontSize="18px" variantColor="green" id="undone" onClick={filter} >undone</Button>
                </Flex>
            </Flex>

        </ThemeProvider>
    )
}

export default FilterElements;