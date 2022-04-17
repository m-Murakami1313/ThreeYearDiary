import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import {BasicDatePicker} from './BasicDatePicker';
import { selectYmd,setResult,setDisplayFlag,setReset,setEditFlag,editFlag } from '../store/dateSlice.ts';


export default function Form() {
    const [value, setValue] = useState(new Date());
    const [day,setDay]=useState("");
    const [year,setYear]=useState("");
    const [month,setMonth]=useState("");
    const [ymd,setYmd]=useState("");
    const [md,setMd] = useState("");
    const [d,setD] = useState("");
    const [y,setY] = useState("");

    const date = useSelector(selectYmd);
    const dispatch=useDispatch();
    const navigate =useNavigate();
    const editFlags = useSelector(editFlag);
    
   
    useEffect(()=>{
        setValue(date)
    },[date]);
    useEffect(()=>{
        setYear(value.getUTCFullYear());
        setMonth(value.getUTCMonth()+1);
        setDay(value.getUTCDate());
    },[value]);
    useEffect(()=>{
        const display = year +"年" + month + "月" + day + "日";
        const displayMd = month + "月" + day + "日";
        const displayY = year +"年";
        const displayD = day+"日";

        setYmd(display);
        setMd(displayMd);
        setY(displayY)
        setD(displayD);
    },[day])
    
    const onClickEditPage = () =>{
        navigate({
            pathname: "/editpage"
            });
        dispatch(setEditFlag(true));
        console.log(editFlags);
    }

    const funPostYear = () => {
        const params = new URLSearchParams();
        params.append("date",md);
        axios.post('/api/year', params)
            .then(function (res) {
                dispatch(setResult(
                res.data.message));
                dispatch(setDisplayFlag(true));
                console.log(res.data.message);
            })
            .catch({
            });
        }

    const funPostMonth = () => {
        const params = new URLSearchParams();
        params.append("dateY",y);
        params.append("dateD",d);
        axios.post('/api/month', params)
            .then(function (res) {
                dispatch(setResult(
                res.data.message));
                dispatch(setDisplayFlag(true));
                console.log(res.data.message);
            })
            .catch({
            });
        }


    const funDelete = () =>{
        const params = new URLSearchParams();
        params.append("date",ymd);
        axios.delete("/delete",{data:params})
        .then(()=>{
            console.log(date);
            })
            .catch(function (error) {
                console.log("error", error);
            });
        };

    const styles = {
         grid:{
           marginTop:"30px",
           marginBottom:"30px"
         }
      };
    
   
    return (
        <>
        <Grid container spacing={3} style={styles.grid}> 
            <Grid item>
            <BasicDatePicker 
            />
            </Grid>                  
                    <Grid item>
                        <Button color="inherit" onClick={funPostYear}>年間日記検索</Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" onClick={funPostMonth}>年次日記検索</Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit"
                        onClick={() => {navigate({
                            pathname: "/createpage"
                            });
                            dispatch(setEditFlag(false));
                            }}>新規作成</Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit"
                        onClick={onClickEditPage}>編集
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit"
                        onClick={()=>{
                            dispatch(setReset());
                        }}
                        >キャンセル</Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" onClick={funDelete}>削除</Button>
                    </Grid>
            </Grid>

        </>
    )
}