import React from "react";
import SelectBox from "../../components/SelectBox";
import InputBox from "../../components/InputBox";
import QAList from "../../components/QAlist";
import styled from "styled-components";

const Wrap = styled.div`
  height: 100%;
  background-color: gray;
  overflow: auto;
`;
const Box = styled.div`
  display: flex;
`;
const HomePresenter = ({
  customerData,
  deviceData,
  controllerData,
  voltageClassData,
  stateData,
  modelDynamicList,
  qaDynamicList,
  onCustomerChange,
  voltageInputBoxChange,
  onDeviceChange,
  onControllerChange,
  onVoltageClassChange,
  asDynamicList,
  onModelChange,
  onStateChange,
  onAsChange,
  onAnswerChange,
  voltageClassSetDisabled,
  gasInputBoxChange,
  gasSubmit,
  state,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <div style={{ color: "white", fontSize: "10rem" }}>loading...</div>
      ) : (
        <Wrap>
          <Box>
            <SelectBox
              labelText={"お客様"}
              list={customerData}
              onChange={onCustomerChange}
            />
            <InputBox type={"text"} labelText={"設置場所"} />
            <InputBox
              type={"text"}
              labelText={"定格電圧"}
              onChange={voltageInputBoxChange}
              onBlur={voltageClassSetDisabled}
            />
            <InputBox type={"text"} labelText={"回線名称"} />
          </Box>
          <Box>
            <InputBox type={"text"} labelText={"試験番号"} />
            <InputBox type={"text"} labelText={"ご担当者"} />
            <InputBox type={"text"} labelText={"連絡先"} />
            <InputBox type={"date"} labelText={"発生日"} />
          </Box>
          <Box>
            <SelectBox
              labelText={"機器種類"}
              list={deviceData}
              onChange={onDeviceChange}
            />
            <SelectBox
              labelText={"操作機構"}
              list={controllerData}
              onChange={onControllerChange}
              disabled={state?.controllerType.disabled}
              selected={state?.controllerType.code}
            />
            <SelectBox
              labelText={"電圧クラス"}
              list={voltageClassData}
              onChange={onVoltageClassChange}
              disabled={state?.voltageClass.disabled}
              selected={state?.voltageClass.code}
            />
            <SelectBox
              labelText={"型式"}
              list={modelDynamicList}
              onChange={onModelChange}
            />
            <InputBox
              labelText={"ガス圧ロック値"}
              disabled={true}
              value={`${state.katashikiType.gasPressureLock}`}
            />
          </Box>
          <Box>
            <SelectBox
              labelText={"状態"}
              list={stateData}
              onChange={onStateChange}
              selected={state?.joutai.code}
            />
            <SelectBox
              labelText={"異常状態"}
              list={asDynamicList}
              selected={state?.ijoujoutai.code}
              onChange={onAsChange}
            />
            <InputBox labelText={"動作回数"} />
            <InputBox
              type={"text"}
              labelText={"ガス圧力値"}
              disabled={state?.gasInput.disabled}
              value={state?.gasInput.inputData}
              onChange={gasInputBoxChange}
              onBlur={gasSubmit}
            />
          </Box>
          <QAList
            list={qaDynamicList}
            state={state}
            onChange={onAnswerChange}
          />
        </Wrap>
      )}
    </>
  );
};

export default HomePresenter;
