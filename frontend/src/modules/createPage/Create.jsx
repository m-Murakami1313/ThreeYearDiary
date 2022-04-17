import axios from 'axios';
import {TextareaAutosize,Grid} from '@material-ui/core';
import {React,useState,useEffect,memo} from 'react';
import {useDispatch, useSelector} from "react-redux"
import Button from '@material-ui/core/Button'
import { useNavigate } from 'react-router-dom';

import { selectYmd,setSentence,sentence,file1,file2,file3,setReset,setCreateFlag,createFlag } from '../../store/dateSlice.ts';
import { BasicDatePicker } from '../BasicDatePicker';
import styles from './Create.module.scss';
import { UseFileUpload1 } from '../../hooks/useFileUpload/UseFileUpload1';
import { UseFileUpload2 } from '../../hooks/useFileUpload/UseFileUpload2';
import { UseFileUpload3 } from '../../hooks/useFileUpload/UseFileUpload3';
import image from '../../noimage.jpg';


export const Create = memo(() =>{
  const [value, setValue] = useState(new Date());
  const [day,setDay]=useState("");
  const [year,setYear]=useState("");
  const [month,setMonth]=useState("");
  const [ymd,setYmd]=useState("");
  const [preview1, setPreview1] = useState(image);
  const [preview2, setPreview2] = useState(image);
  const [preview3, setPreview3] = useState(image);
  const [preview,setPreview]=useState("noimage.jpg");

  const navigate =useNavigate();
  const date = useSelector(selectYmd);
  const sentences = useSelector(sentence);
  const files1 = useSelector(file1);
  const files2 = useSelector(file2);
  const files3 = useSelector(file3);
  // const createFlags = useSelector(createFlag);
  

  const dispatch=useDispatch();

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
    setYmd(display);
},[day])


// 新規作成
  
  const funCreate = (e) =>{
  e.preventDefault();
  const params = new URLSearchParams();
  const formData1 = new FormData();
  formData1.append('myImage1',files1);
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
      }}
  axios.post("/upload/image1",formData1,config)
  .then((res) => {
      // files2にでーたがある場合
      params.append("myimage1",res.data.message);
      const formData2 = new FormData();
      formData2.append('myImage2',files2);

      axios.post("/upload/image2",formData2,config)
      .then((res) => {
          params.append("myimage2",res.data.message);
          const formData3 = new FormData();
          formData3.append('myImage3',files3);

          axios.post("/upload/image3",formData3,config)
          .then((res) => {
              params.append("myimage3",res.data.message);
              params.append('date',ymd)
              params.append("sentence",sentences);
              axios.post('/insert',params)
              .then(()=>{
                dispatch(setReset());
              })
              .catch(function (error) {
               console.log("error", error);
                    });
          })
          .catch(()=>{});
        })})
  .catch(()=>{});

    }



// 〆新規作成



  return(
<div className={styles.root}>
      <Grid item  className={styles.grid}>
      <BasicDatePicker className={styles.date} />
        <Button color="inherit" onClick={
              ()=>{
                navigate(-1);
                dispatch(setReset());
                dispatch(setCreateFlag(false));
              }
            } >戻る</Button>
        <Button color="inherit"  
          onClick={()=>{
          dispatch(setReset());
          setPreview1(image);
          setPreview2(image);
          setPreview3(image);
          }}>
          キャンセル
        </Button>
        </Grid>
  <Grid container  className={styles.container}>
      <Grid item className={styles.grid}>
        <TextareaAutosize
        onChange={(e)=>{dispatch(setSentence(e.target.value))}}
        className={styles.textField}
        maxlength="255"
        value={sentences}
        />
      </Grid>
      <Grid container  className={styles.grids}>
        <UseFileUpload1
        preview={preview}
        preview1={preview1} 
        setPreview1={setPreview1}/>
        <UseFileUpload2 
        preview={preview}
        preview2={preview2} 
        setPreview2={setPreview2}/>
        <UseFileUpload3 
        preview={preview}
        preview3={preview3} 
        setPreview3={setPreview3}/>
      </Grid>
        <Grid container className={styles.containerGrids}>
        <Grid item  className={styles.grid}>
            <Button color="inherit" onClick={funCreate} >新規データ作成</Button>
        </Grid>
        </Grid>
      </Grid>
</div>
  )
});