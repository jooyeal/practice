import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 200px;
  height: 100%;
  margin: 1rem;
`;
const Input = styled.input`
  border: 2px solid black;
`;
const InputBox = ({ type, labelText, disabled, value, onChange, onBlur }) => {
  return (
    <Wrap style={{ display: "flex", flexDirection: "column" }}>
      <label>{labelText}</label>
      <Input
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Wrap>
  );
};
export default InputBox;
