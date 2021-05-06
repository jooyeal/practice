import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 200px;
  height: 100%;
  margin: 1rem;
`;
const Select = styled.select`
  width: 100%;
  border: 2px solid black;
`;

const SelectBox = ({ list, labelText, disabled, selected, onChange, name }) => {
  return (
    <Wrap style={{ display: "flex", flexDirection: "column" }}>
      <label>{labelText}</label>
      <Select
        name={name}
        disabled={disabled}
        value={selected}
        onChange={onChange}
      >
        <option value={0}>選択してください</option>
        {list?.map((item, index) => (
          <option value={item.code?.trim()} key={index}>
            {item.code_name}
          </option>
        ))}
      </Select>
    </Wrap>
  );
};

export default SelectBox;
