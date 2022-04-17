import React,{memo} from 'react';
import {useSelector,useDispatch} from "react-redux"

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { selectYmd,setDate} from '../store/dateSlice.ts';


export const BasicDatePicker = memo(()=> {
  const ymd = useSelector(selectYmd);
  const dispatch=useDispatch();

const handleDate=(newValue)=>{
  dispatch(setDate(newValue));
}

  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date"
        value={ymd}
        onChange={handleDate}
        renderInput={(params) => <TextField 
         {...params} />}
      />
    </LocalizationProvider>
  );
})