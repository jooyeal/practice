import React from "react";
import styled from "styled-components";
import SearchList from "../../components/SearchList";

const Wrap = styled.div`
  color: white;
`;

const Input = styled.input`
  width: 150px;
  height: 30px;
`;

const ResultPresenter = ({
  onSearchChange,
  filterList,
  contentClick,
  state,
}) => {
  return (
    <Wrap>
      <Input
        placeholder={"検索"}
        onChange={onSearchChange}
        value={state?.searchSubWay?.inputData}
      />
      <SearchList
        filterList={filterList}
        contentClick={contentClick}
        state={state}
      />
    </Wrap>
  );
};

export default ResultPresenter;
