import React from "react";
import styled from "styled-components";
import ListContent from "../components/ListContent";

const Wrap = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
`;

const SearchList = ({ filterList, contentClick, state }) => {
  return (
    <Wrap>
      {filterList?.map((item, index) => (
        <ListContent state={state} key={index} item={item.jp} onClick={contentClick} />
      ))}
    </Wrap>
  );
};

export default SearchList;
