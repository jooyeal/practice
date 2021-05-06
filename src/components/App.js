import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router from "./Router";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: black;
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`;
function App() {
  const [size, setSize] = useState({ width: "", height: "" });
  useEffect(() => {
    setSize({
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    });
  }, []);
  return (
    <Body size={size}>
      <Router />
    </Body>
  );
}

export default App;
