import { createSlice } from '@reduxjs/toolkit';
import {RootState} from './store'

type dateState = {
date:Date,
sentence:string,
file1:any,
file2:any,
file3:any,
result:[],
displayFlag:boolean,
editFlag:boolean,
createFlag:boolean
};

const initialState:dateState={
  date:new Date(),
  sentence:"",
  file1:"",
  file2:"",
  file3:"",
  result:[],
  displayFlag:false,
  editFlag:false,
  createFlag:false
}

export const dateSlice = createSlice({
name:"date",
initialState,
reducers:{
  setDate:(state,action)=>{
    state.date = action.payload;
  },
  setSentence:(state,action)=>{
    state.sentence = action.payload;
  },
  setFile1:(state,action)=>{
    state.file1=action.payload;
  },
  setFile2:(state,action)=>{
    state.file2=action.payload;
  },
  setFile3:(state,action)=>{
    state.file3=action.payload;
  },
  setResult:(state,action)=>{
    state.result=action.payload;
  },
  setDisplayFlag:(state,action)=>{
    state.displayFlag=action.payload;
  },
  setEditFlag:(state,action)=>{
    state.editFlag=action.payload;
  },
  setCreateFlag:(state,action)=>{
    state.createFlag=action.payload;
  },
  setReset:(state)=>{
    state.date =initialState.date;
    state.sentence=initialState.sentence;
    state.file1=initialState.file1;
    state.file2=initialState.file2;
    state.file3=initialState.file3;
    state.result=initialState.result;
    state.displayFlag=initialState.displayFlag;
  }

}
}); 


export const {setDate,setSentence,setFile1,setFile2,setFile3,setResult,setDisplayFlag,setReset,setEditFlag,setCreateFlag} = dateSlice.actions;

export const selectYmd = (state:RootState) => state.date.date;
export const sentence = (state:RootState) => state.date.sentence;
export const file1 = (state:RootState) => state.date.file1;
export const file2 = (state:RootState) => state.date.file2;
export const file3 = (state:RootState) => state.date.file3;
export const result = (state:RootState) => state.date.result;
export const displayFlag = (state:RootState) => state.date.displayFlag;
export const editFlag = (state:RootState) => state.date.editFlag;
export const createFlag = (state:RootState) => state.date.createFlag;


export default dateSlice.reducer;