import axios from 'axios';
import {TextareaAutosize,Grid} from '@material-ui/core';
import {React,useState,useEffect,memo} from 'react';
import {useDispatch, useSelector} from "react-redux"
import Button from '@material-ui/core/Button'
import { UseFileUpload1 } from '../../hooks/useFileUpload/UseFileUpload1';
import { UseFileUpload2 } from '../../hooks/useFileUpload/UseFileUpload2';
import { UseFileUpload3 } from '../../hooks/useFileUpload/UseFileUpload3';
import { useNavigate } from 'react-router-dom';

import { selectYmd,setSentence,sentence,setResult,file1,file2,file3,setReset,setEditFlag} from '../../store/dateSlice.ts';
import { BasicDatePicker } from '../BasicDatePicker';
import styles from './Edit.module.scss';
import image from '../../noimage.jpg';



export const Edit = memo(() =>{
  const [value, setValue] = useState(new Date());
  const [day,setDay]=useState("");
  const [year,setYear]=useState("");
  const [month,setMonth]=useState("");
  const [img1, setImg1] = useState("noimage.jpg");
  const [img2, setImg2] = useState("noimage.jpg");
  const [img3, setImg3] = useState("noimage.jpg");
  const [ymd,setYmd]=useState("");
  const [preview1, setPreview1] = useState(image);
  const [preview2, setPreview2] = useState(image);
  const [preview3, setPreview3] = useState(image);
  const [searchFlag,setSearchFlag]=useState(false);
  const [emptyFlag,setEmptyFlag] = useState(false);

  const date = useSelector(selectYmd);
  const sentences = useSelector(sentence);
  // const results =useSelector(result);
  const files1 = useSelector(file1);
  const files2 = useSelector(file2);
  const files3 = useSelector(file3);
  // const editFlags = useSelector(editFlag)
  const dispatch=useDispatch();
  const navigate=useNavigate();


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
    setYmd(display)
},[day])

  console.log(date);
// 検索
  const funPost = () => {
    const params = new URLSearchParams();
    params.append("date",ymd);
    axios.post('/api', params)
        .then(function (res) {
            dispatch(setResult(
            res.data.message));
            console.log(ymd);
            setSearchFlag(true);
            dispatch(setSentence(
              res.data.message[0].sentence
            ))
            setImg1(res.data.message[0].image1);
            setImg2(res.data.message[0].image2);
            setImg3(res.data.message[0].image3);
            setEmptyFlag(false);
          })
          .catch(
            console.log(null),
            setEmptyFlag(true),
            console.log("データがありません"),
            setSearchFlag(false),
          );
    }
    // 〆検索
        
  // 画像アップロード
  const funPut1 = (e) =>{
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
      console.log(res.data.message);
        params.append("myimage1",res.data.message);
        params.append('date',ymd)
                axios.put('/update/image1',params)
                .then(()=>{
                  
                })
                .catch(function (error) {
                 console.log("error", error);
                      });
                })
        .catch(()=>{});
    };
  const funPut2 = (e) =>{
    e.preventDefault();
    const params = new URLSearchParams();
    const formData2 = new FormData();
    formData2.append('myImage2',files2);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
        }}
    axios.post("/upload/image2",formData2,config)
    .then((res) => {
      console.log(res.data.message);
        params.append("myimage2",res.data.message);
        params.append('date',ymd)
                axios.put('/update/image2',params)
                .then(()=>{
                  
                })
                .catch(function (error) {
                 console.log("error", error);
                      });
                })
        .catch(()=>{});
    };
  const funPut3 = (e) =>{
    e.preventDefault();
    const params = new URLSearchParams();
    const formData3 = new FormData();
    formData3.append('myImage3',files3);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
        }}
    axios.post("/upload/image3",formData3,config)
    .then((res) => {
      console.log(res.data.message);
        params.append("myimage3",res.data.message);
        params.append('date',ymd)
                axios.put('/update/image3',params)
                .then(()=>{
                  
                })
                .catch(function (error) {
                 console.log("error", error);
                      });
                })
        .catch(()=>{});
    };


  // 〆画像アップロード

    const funPutSentence = () =>{
      const params = new URLSearchParams();
      params.append("sentence",sentences);
      params.append('date',ymd);
      axios.put('/update/sentence',params)
              .then((res)=>{
                console.log(res.data.message[0].sentence)
              })
              .catch(function (error) {
               console.log("error", error);
                    });
    }


return(
<div className={styles.root}>
      <Grid item  className={styles.dateGrid}>
        <BasicDatePicker className={styles.date} />
        <Button  color="inherit" 
           onClick={funPost}
           className={styles.button}>
        検索
        </Button>
        <Button color="inherit" onClick={
          ()=>{
            navigate(-1)
            dispatch(setReset());
            setPreview1(image);
            setPreview2(image);
            setPreview3(image);
            setSearchFlag(false);
            setEditFlag(false);
          }
        } >戻る
        </Button>
        {emptyFlag ?
        <p>データがありません</p>
        :
        null
        }
        {searchFlag ?
        <>
          <Button  color="inherit" 
         className={styles.button}
         onClick={()=>{
          dispatch(setReset());
          setPreview1(image);
          setPreview2(image);
          setPreview3(image);
          setSearchFlag(false);
        }}
        >
        キャンセル
        </Button>
        </>
        :null
        }
      </Grid>
      {searchFlag ?
      <>
      <Grid container spacing={24} className={styles.container}>
        <Grid item xs={4} className={styles.grid}>
        <TextareaAutosize
        onChange={(e)=>{dispatch(setSentence(e.target.value))}}
        className={styles.textField}
        value={sentences}
        maxLength="255"
        />
        <Button  color="inherit" 
           onClick={funPutSentence}
           className={styles.button}>
        テキストを更新する
        </Button>
        </Grid>
      </Grid>
      <Grid container spacing={24} className={styles.grids}>
        <UseFileUpload1 
        preview1={preview1} 
        setPreview1={setPreview1}
        img1={img1}
        searchFlag={searchFlag}
        setSearchFlag={setSearchFlag}
        funPut1={funPut1}/>
       <UseFileUpload2 
        preview2={preview2} 
        setPreview2={setPreview2}
        img2={img2}
        searchFlag={searchFlag}
        setSearchFlag={setSearchFlag}
        funPut2={funPut2}/>
        <UseFileUpload3 
        preview3={preview3} 
        setPreview3={setPreview3}
        img3={img3}
        searchFlag={searchFlag}
        setSearchFlag={setSearchFlag}
        funPut3={funPut3}/>
      </Grid>
      <Grid container className={styles.containerGrids}>
      <Grid item  className={styles.grid}>
          
      </Grid>
      </Grid>
      </>
      : null
      }
</div>
  )
});