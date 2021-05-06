import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HomePresenter from "./HomePresenter";
import axios from "axios";
import {
  replaceDevice,
  replaceController,
  replaceKatashiki,
  replaceCustomer,
  replaceVoltageInput,
  replaceIjoujoutai,
  replaceVoltageClass,
  replaceJoutai,
  replaceQA,
  addAnswer,
  removeAnswer,
  replaceGasInput,
} from "../../store/index";

const HomeContainer = ({
  onReplaceCustomer,
  onReplaceVoltageInputBox,
  onReplaceDevice,
  onReplaceController,
  onReplaceVoltageClass,
  onReplaceModel,
  onReplaceState,
  onReplaceAs,
  onReplaceQA,
  onResultListAppend,
  onReplaceGasInput,
  removeResultList,
  result,
}) => {
  const [dataList, setDataList] = useState();
  const [dynamicList, setDynamicList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let json = await axios.get("http://localhost:5000/");
    let customerData = json.data.customer;
    let deviceData = json.data.device;
    let controllerData = json.data.controller;
    let voltageClassData = json.data.voltage;
    let modelData = json.data.model;
    let stateData = json.data.state;
    let getAsAndQaData = json.data.get_qa_data;
    let getNameData = json.data.get_qa_name;
    let asData = json.data.as;
    let getQAListData = json.data.get_qa_list_data;
    let getAnsGroupData = json.data.get_ans_list_value;
    setDataList({
      customerData,
      deviceData,
      controllerData,
      voltageClassData,
      modelData,
      stateData,
      getAsAndQaData,
      getNameData,
      asData,
      getQAListData,
      getAnsGroupData,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setDynamicList({
      ...dynamicList,
      //형식 동적리스트 구현
      modelDynamicList: dataList?.modelData
        .filter(
          (item) =>
            result.deviceType.code === item.device_type_code.trim() &&
            result.controllerType.code === item.op_mechanism_code.trim() &&
            result.voltageClass.code === item.voltage_class_code.trim()
        )
        .map((item, index) => ({
          code: `code${index}`,
          code_name: item.model_no,
          gasPressureLock: item.gas_pressure_lock_value,
        })),

      //이상상태 동적리스트구현
      asDynamicList: dataList?.getAsAndQaData
        .filter(
          (item) =>
            result.deviceType.code === item.device_type_code.trim() &&
            result.controllerType.code === item.op_mechanism_code.trim()
        )
        .map((item, index) => ({
          code_name: getName(item.abnormal_status_code.trim(), "as"),
          code: item.abnormal_status_code.trim(),
        })),

      //질문 동적리스트 구현
      qaDynamicList: dataList?.getQAListData
        .filter(
          (item) =>
            result.deviceType.code === item.device_type_code.trim() &&
            result.currentQA === item.diag_qa_pattern_code
        )
        .map((item) => ({
          code: item.diag_question_code.trim(),
          code_name: getName(item.diag_question_code.trim(), "qa"),
          ans_group: {
            code: item.diag_ans_list_group_code,
            code_name: getName(item.diag_ans_list_group_code, "ag"),
            child: getAnsGroup(item.diag_ans_list_group_code),
          },
        })),
    });
    console.log(result);
  }, [result]);

  useEffect(() => {
    //이상상태가 바뀔 때마다 질문값 상태를 변경해줌
    let currentQA = getCurrentQA();
    if (currentQA !== "" && currentQA !== undefined) {
      if (currentQA !== null) {
        console.log(currentQA[0]);
        onReplaceQA(currentQA[0]);
      }
    }
  }, [result.ijoujoutai]);

  useEffect(() => {
    console.log(result);
    console.log(dynamicList?.qaDynamicList);
  }, [dynamicList]);

  const onCustomerChange = (e) => {
    if (e.target.value === "0") {
      onReplaceCustomer({ code: "0", name: "" });
    } else {
      let customerCode = e.target.value;
      let customerName = dataList?.customerData.filter(
        (item) => item.code.trim() === customerCode.trim()
      )[0].code_name;
      onReplaceCustomer({ code: customerCode.trim(), name: customerName });
    }
  };

  const onDeviceChange = (e) => {
    console.log(e.target.value);
    onReplaceState({ code: "0", name: "" });
    onReplaceModel({ code: "0", name: "", gasPressureLock: "" });
    onReplaceQA("");
    onReplaceAs({ code: "0", name: "", disabled: true });
    removeResultList();
    if (e.target.value === "0") {
      onReplaceDevice({ code: "0", name: "" });
      onReplaceController({ code: "0", name: "", disabled: true });
      onReplaceGasInput({ inputData: "", disabled: true });
    } else {
      let deviceCode = e.target.value.trim();

      if (deviceCode === "DC002") {
        onReplaceController({ disabled: false });
        onReplaceGasInput({ disabled: false });
      } else {
        onReplaceController({ code: "0", name: "", disabled: true });
        onReplaceGasInput({ inputData: "", disabled: true });
      }

      let deviceName = dataList.deviceData.filter(
        (item) => item.code.trim() === deviceCode
      )[0].code_name;

      onReplaceDevice({ code: deviceCode.trim(), name: deviceName });
    }
  };

  const onControllerChange = (e) => {
    console.log(e.target.value);
    onReplaceAs({ code: "", name: "" });
    removeResultList();
    if (e.target.value === "0") {
      onReplaceController({ code: "0", name: "" });
      onReplaceModel({ code: "0", name: "", gasPressureLock: "" });
    } else {
      let controllerCode = e.target.value;
      let controllerName = dataList.controllerData.filter(
        (item) => item.code.trim() === controllerCode
      )[0].code_name;
      onReplaceController({
        code: controllerCode.trim(),
        name: controllerName,
      });
      onReplaceModel({ code: "0", name: "", gasPressureLock: "" });
    }
  };

  const onVoltageClassChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "0") {
      onReplaceVoltageClass({ code: "0", name: "" });
      onReplaceModel({ code: "0", name: "", gasPressureLock: "" });
    } else {
      let voltageClassCode = e.target.value;
      let voltageClassName = dataList.voltageClassData.filter(
        (item) => item.code.trim() === voltageClassCode
      )[0].code_name;
      onReplaceVoltageClass({
        code: voltageClassCode.trim(),
        name: voltageClassName,
      });
      onReplaceModel({ code: "0", name: "", gasPressureLock: "" });
    }
  };

  const onModelChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "0") {
      onReplaceModel({ code: "0", name: "", gasPressureLock: "" });
    } else {
      let modelCode = e.target.value;
      let modelName = dynamicList.modelDynamicList.filter(
        (item) => item.code.trim() === modelCode
      )[0].code_name;
      let gasValue = dynamicList.modelDynamicList.filter(
        (item) => item.code.trim() === modelCode
      )[0].gasPressureLock;
      onReplaceModel({
        code: modelCode.trim(),
        name: modelName,
        gasPressureLock: gasValue,
      });
    }
  };

  const onStateChange = (e) => {
    if (e.target.value === "0") {
      onReplaceState({ code: "0", name: "" });
    } else {
      let stateCode = e.target.value;
      let stateName = dataList.stateData.filter(
        (item) => item.code.trim() === stateCode.trim()
      )[0].code_name;
      onReplaceState({ code: stateCode.trim(), name: stateName });
    }
  };

  const onAsChange = (e) => {
    removeResultList();
    if (e.target.value === "0") {
      onReplaceAs({ code: "0", name: "", disabled: true });
      onReplaceQA("");
    } else {
      let asCode = e.target.value;
      let asName = dynamicList.asDynamicList.filter(
        (item) => item.code === asCode
      )[0].code_name;
      onReplaceAs({ code: asCode, name: asName, disabled: false });
    }
  };

  const voltageInputBoxChange = (e) => {
    let voltage = e.target.value;
    onReplaceVoltageInputBox(voltage);
  };

  const gasInputBoxChange = (e) => {
    let gas = e.target.value;
    onReplaceGasInput({ inputData: gas });
  };

  const onAnswerChange = (e) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;
    if (targetValue === "0") return;
    else {
      let answerStoreList = result.answer;
      let resultList = dynamicList.qaDynamicList.filter(
        (item) => targetName === item.code_name
      );
      let resultObject = {
        questionCode: resultList[0].code,
        questionTitle: resultList[0].code_name,
        answerTitle: resultList[0].ans_group.code_name,
        answerCode: targetValue,
        answerCodeName: getName(targetValue),
      };

      // if (answerStoreList.length === 0) {
      //   onResultListAppend(resultObject);
      // } else {
      //   answerStoreList.forEach((item) => {
      //     if (
      //       item.questionCode !== resultObject.questionCode &&
      //       item.answerCode !== resultObject.answerCode
      //     ) {
      //       onResultListAppend(resultObject);
      //     }
      //   });
      // }
      onResultListAppend(resultObject);
    }
  };

  const voltageClassSetDisabled = () => {
    let inputBoxVoltage = result.voltageInput;
    let voltageClassList = dataList?.voltageClassData;
    if (
      inputBoxVoltage === "0" ||
      inputBoxVoltage === undefined ||
      inputBoxVoltage === ""
    ) {
      onReplaceVoltageClass({ code: "0", name: "", disabled: false });
    } else {
      inputBoxVoltage = parseInt(inputBoxVoltage);
      if (inputBoxVoltage >= 10 && inputBoxVoltage <= 36) {
        let code = voltageClassList[0].code.trim();
        let name = voltageClassList[0].code_name.trim();
        onReplaceVoltageClass({ code: code, name: name, disabled: true });
      } else if (inputBoxVoltage >= 72 && inputBoxVoltage <= 84) {
        let code = voltageClassList[1].code.trim();
        let name = voltageClassList[1].code_name.trim();
        onReplaceVoltageClass({ code: code, name: name, disabled: true });
      } else if (inputBoxVoltage >= 120 && inputBoxVoltage <= 168) {
        let code = voltageClassList[2].code.trim();
        let name = voltageClassList[2].code_name.trim();
        onReplaceVoltageClass({ code: code, name: name, disabled: true });
      } else if (inputBoxVoltage >= 204 && inputBoxVoltage <= 300) {
        let code = voltageClassList[3].code.trim();
        let name = voltageClassList[3].code_name.trim();
        onReplaceVoltageClass({ code: code, name: name, disabled: true });
      } else if (inputBoxVoltage >= 550) {
        let code = voltageClassList[4].code.trim();
        let name = voltageClassList[4].code_name.trim();
        onReplaceVoltageClass({ code: code, name: name, disabled: true });
      } else {
        onReplaceVoltageClass({ code: "0", name: "", disabled: true });
        alert("入力の定格電圧は、電圧クラスの許容範囲外です。");
      }
    }
  };

  const getName = (code, type) => {
    let returnNameList;
    let result;
    if (type === "as" && code !== undefined && code !== null) {
      returnNameList = dataList?.asData.filter(
        (item) => item.code.trim() === code.trim()
      );
      result = returnNameList[0].code_name.trim();
    } else if (code !== undefined && code !== null) {
      returnNameList = dataList?.getNameData.filter(
        (item) => item.code.trim() === code.trim()
      );
      if (
        returnNameList[0].code_name !== undefined &&
        returnNameList[0].code_name !== null &&
        returnNameList[0].code_name !== ""
      ) {
        result = returnNameList[0].code_name.trim();
      } else {
        result = "";
      }
    } else {
      result = "";
    }
    return result;
  };

  const getCurrentQA = () => {
    let currentQADynamicCode = dataList?.getAsAndQaData
      ?.filter(
        (item) =>
          result.deviceType.code === item.device_type_code.trim() &&
          result.controllerType.code === item.op_mechanism_code.trim() &&
          result.ijoujoutai.code === item.abnormal_status_code.trim()
      )
      .map((item) => item.diag_qa_pattern_code);

    if (currentQADynamicCode !== undefined) return currentQADynamicCode;
  };

  const getAnsGroup = (code) => {
    let ansList = dataList?.getAnsGroupData
      ?.filter((item) => item.diag_ans_list_group_code === code)
      .map((item) => ({
        code: item.diag_ans_list_val_code,
        code_name: getName(item.diag_ans_list_val_code, "ans"),
      }));
    return ansList;
  };

  const gasSubmit = (e) => {
    let modelGasLock = result.katashikiType.gasPressureLock;
    let inputGasLock = result.gasInput.inputData;
    if (parseFloat(modelGasLock) > parseFloat(inputGasLock)) {
      alert("good");
    }
    console.log(modelGasLock, inputGasLock);
  };

  return (
    <HomePresenter
      customerData={dataList?.customerData}
      deviceData={dataList?.deviceData}
      controllerData={dataList?.controllerData}
      voltageClassData={dataList?.voltageClassData}
      modelData={dataList?.modelData}
      stateData={dataList?.stateData}
      asDynamicList={dynamicList?.asDynamicList}
      modelDynamicList={dynamicList?.modelDynamicList}
      qaDynamicList={dynamicList?.qaDynamicList}
      onCustomerChange={onCustomerChange}
      voltageInputBoxChange={voltageInputBoxChange}
      onDeviceChange={onDeviceChange}
      onControllerChange={onControllerChange}
      onVoltageClassChange={onVoltageClassChange}
      onModelChange={onModelChange}
      onStateChange={onStateChange}
      onAsChange={onAsChange}
      onAnswerChange={onAnswerChange}
      voltageClassSetDisabled={voltageClassSetDisabled}
      gasInputBoxChange={gasInputBoxChange}
      state={result}
      loading={loading}
      gasSubmit={gasSubmit}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    result: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReplaceCustomer: (customer) => {
      dispatch(replaceCustomer(customer));
    },
    onReplaceVoltageInputBox: (voltage) => {
      dispatch(replaceVoltageInput(voltage));
    },
    onReplaceDevice: (device) => {
      dispatch(replaceDevice(device));
    },
    onReplaceController: (controller) => {
      dispatch(replaceController(controller));
    },
    onReplaceVoltageClass: (voltageClass) => {
      dispatch(replaceVoltageClass(voltageClass));
    },
    onReplaceModel: (model) => {
      dispatch(replaceKatashiki(model));
    },
    onReplaceState: (state) => {
      dispatch(replaceJoutai(state));
    },
    onReplaceAs: (state) => {
      dispatch(replaceIjoujoutai(state));
    },
    onReplaceQA: (state) => {
      dispatch(replaceQA(state));
    },
    onResultListAppend: (state) => {
      dispatch(addAnswer(state));
    },
    removeResultList: () => {
      dispatch(removeAnswer());
    },
    onReplaceGasInput: (state) => {
      dispatch(replaceGasInput(state));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
