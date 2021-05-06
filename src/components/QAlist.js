import React from "react";
import SelectBox from "./SelectBox";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background-color: black;
  width: 90%;
  height: 90%;
  overflow-y: auto;
`;

const Row = styled.div`
  border: 1px solid white;
  display: flex;
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
`;
const QustionRow = styled.div`
  color: white;
  width: 30%;
`;

const AnswerRow = styled.div`
  color: white;
  width: 70%;
  border-left: 1px solid white;
`;
const QAlist = ({ list, state, onChange }) => {
  return (
    <Wrap style={{ display: "flex" }}>
      {!state?.ijoujoutai.disabled ? (
        <Box>
          {list?.map((item, index) => (
            <Row key={index}>
              <Item>
                <QustionRow style={{ margin: "1rem" }}>
                  {item.code_name}
                </QustionRow>
                <AnswerRow>
                  {true ? (
                    <SelectBox
                      labelText={item.ans_group.code_name}
                      list={item.ans_group.child}
                      name={item.code_name}
                      onChange={onChange}
                    />
                  ) : (
                    // labelText={} name={} onChange={} list={}
                    <span></span>
                  )}
                </AnswerRow>
              </Item>
            </Row>
          ))}
        </Box>
      ) : (
        <div></div>
      )}
    </Wrap>
  );
};

export default QAlist;
