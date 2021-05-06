import React from "react";
import styled from "styled-components";

const Wrap = styled.div``;
const Content = styled.div`
  padding: 10px;
  width: 150px;
  background-color: gray;
  border: 1px solid rgba(0, 0, 0.5);
  cursor: pointer;
  &:hover {
    background-color: tomato;
  }
  transition: all 0.6s;
  display: ${(props) => props.visibility};
`;

const ListContent = ({ item, onClick, state }) => {
  return (
    <Wrap>
      <Content visibility={state?.searchSubWay.visibility} onClick={onClick}>
        {item}
      </Content>
    </Wrap>
  );
};

export default ListContent;
