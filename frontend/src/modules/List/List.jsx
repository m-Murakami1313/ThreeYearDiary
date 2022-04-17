import React, { useEffect,memo } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { SomeComponent } from '../SomeComponent';
import {useSelector,useDispatch} from "react-redux"

import { result,displayFlag,setDisplayFlag } from '../../store/dateSlice.ts';
import styles from './List.module.scss';

export const List = memo(()=> {
    const displayFlags = useSelector(displayFlag);
    const results =useSelector(result);
    const dispatch=useDispatch();
 
    useEffect(()=>{
        dispatch(setDisplayFlag(false))
    },[])
            
    
    
    const tableBody = displayFlags ? (
        <TableBody >
            {results.map((result)=>{
                return(
            <TableRow key={result.date}>
                <TableCell align="left" component="th" scope="row"
                className={styles.table} >
                 {result.date}
                </TableCell>
                <TableCell align="left" className={styles.sentence} >{result.sentence}</TableCell>
                <TableCell align="center" className={styles.image} >
                    <SomeComponent image={result.image1} / >
                </TableCell>
                <TableCell align="center"
                className={styles.image} >
                    < SomeComponent image={result.image2} / >
                </TableCell>
                <TableCell align="center"
                className={styles.image} >
                    <SomeComponent  image={result.image3}/>
                </TableCell>
                 </TableRow>
                )
            })}
        </TableBody>
    ) : null;
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" className={styles.container} >
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.table} >日付</TableCell>
                        <TableCell align="left" className={styles.sentence}
                        >日記</TableCell>
                        <TableCell align="center"
                        className={styles.image}>ベストショット！</TableCell>
                        <TableCell align="center"
                        className={styles.image}>記念日</TableCell>
                        <TableCell align="center"
                        className={styles.image}>何食べたの？</TableCell>
                    </TableRow>
                </TableHead>
          {tableBody}
            </Table>
        </TableContainer>
    );
})