import { createSlice, configureStore } from "@reduxjs/toolkit";

const selector = createSlice({
  name: "pulldownSelector",
  initialState: {
    deviceType: { name: "", code: "" },
    controllerType: { name: "", code: "", disabled: true },
    katashikiType: { name: "", code: "", gasPressureLock: "" },
    customer: { name: "", code: "" },
    ijoujoutai: { name: "", code: "", disabled: true },
    voltageClass: { name: "", code: "", disabled: true },
    voltageInput: "",
    joutai: { name: "", code: "" },
    currentQA: "",
    gasInput: { inputData: "", disabled: true },
    answer: [],
    searchSubWay: { inputData: "", searchSubwayList: [], visibility: true },
  },
  reducers: {
    replaceDevice: (state, action) => {
      state.deviceType.name = action.payload.name;
      state.deviceType.code = action.payload.code;
    },
    replaceController: (state, action) => {
      state.controllerType.name = action.payload.name;
      state.controllerType.code = action.payload.code;
      state.controllerType.disabled = action.payload.disabled;
    },
    replaceKatashiki: (state, action) => {
      state.katashikiType.name = action.payload.name;
      state.katashikiType.code = action.payload.code;
      state.katashikiType.gasPressureLock = action.payload.gasPressureLock;
    },
    replaceCustomer: (state, action) => {
      state.customer.name = action.payload.name;
      state.customer.code = action.payload.code;
    },
    replaceIjoujoutai: (state, action) => {
      state.ijoujoutai.name = action.payload.name;
      state.ijoujoutai.code = action.payload.code;
      state.ijoujoutai.disabled = action.payload.disabled;
    },
    replaceVoltageClass: (state, action) => {
      state.voltageClass.name = action.payload.name;
      state.voltageClass.code = action.payload.code;
      state.voltageClass.disabled = action.payload.disabled;
    },
    replaceVoltageInput: (state, action) => {
      state.voltageInput = action.payload;
    },
    replaceJoutai: (state, action) => {
      state.joutai.name = action.payload.name;
      state.joutai.code = action.payload.code;
    },
    addAnswer: (state, action) => {
      state.answer.push(action.payload);
    },
    removeAnswer: (state, action) => {
      state.answer = [];
    },
    replaceQA: (state, action) => {
      state.currentQA = action.payload;
    },
    replaceGasInput: (state, action) => {
      state.gasInput.disabled = action.payload.disabled;
      state.gasInput.inputData = action.payload.inputData;
    },
    searchSubWay: (state, action) => {
      state.searchSubWay.inputData = action.payload.inputData;
      state.searchSubWay.searchSubwayList = action.payload.searchSubwayList;
      state.searchSubWay.visibility = action.payload.visibility;
    },
  },
});

export const {
  replaceDevice,
  replaceController,
  replaceKatashiki,
  replaceCustomer,
  replaceIjoujoutai,
  replaceVoltageClass,
  replaceVoltageInput,
  replaceJoutai,
  addAnswer,
  removeAnswer,
  replaceQA,
  replaceGasInput,
  searchSubWay,
} = selector.actions;
const store = configureStore({ reducer: selector.reducer });

export default store;
