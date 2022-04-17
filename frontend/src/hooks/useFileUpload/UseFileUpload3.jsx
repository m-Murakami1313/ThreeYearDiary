import {React,memo} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import {Grid} from '@material-ui/core';

import styles from './UseFileUpload.module.scss'
import {setFile3,editFlag,setCreateFlag,createFlag} from '../../store/dateSlice.ts';
import { SomeComponent } from '../../modules/SomeComponent';


export const UseFileUpload3 = memo((props) => {

  const dispatch=useDispatch();
  const editFlags = useSelector(editFlag);
  const createFlags = useSelector(createFlag);

  const onChange= (e)=> {
      dispatch(setFile3(e.target.files[0]));
      props.setPreview3(window.URL.createObjectURL(e.target.files[0]));
      dispatch(setCreateFlag(true));
  
  }

  return (
    <>
      {editFlags ?
      // 編集ページか否か
      <>
      {props.searchFlag?
      // 検索ボタンを押したか否か
      <>
      <Grid item className={styles.grid}>
        <div className={styles.preview}>
        <SomeComponent image={props.img3} className={styles.previewImg} />
        <img src={props.preview3} className={styles.previewImg}/>
        <form>
        <Button className={styles.fileButton} 
        onClick={()=>{
          props.setFlag(true);
        }}
        >
        <Input type="file" name="myImage" onChange= {onChange}
        className={styles.inputFileBtnHide}
        />
        ファイルを選択
        </Button>
        <Button  color="inherit" onClick={props.funPut3}
        className={styles.fileButton} >
        画像を変更する
        </Button>
        </form>
        </div>
      </Grid>
      </>
      // null
        :null
      }
      </>
      :
      // 新規作成ページの場合
      <>
      <Grid item className={styles.grid}>
        <div className={styles.preview}>
        {/* 新規ページの画像を入れた場合 */}
        {createFlags?
        <img src={props.preview3} className={styles.previewImg}/>
        :
        // 画像がない場合
        <SomeComponent image={props.preview} className={styles.previewImg} />
          }
        </div>
        <form>
        <Button className={styles.fileButton}>
        <Input type="file" name="myImage" onChange= {onChange}
        className={styles.inputFileBtnHide}
        />
        ファイルを選択
        </Button>
        </form>
      </Grid>
      </>
      }
  </>
  )
})
