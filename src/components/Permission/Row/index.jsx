import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import './styles.css'
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TableGrid} from '@material-ui/core'

export default ({key,rowData, setRowData,personKeys}) =>{

    const handleClick = (event, row) =>{
        console.log(row);


    }
    return <>
    
        <TableRow key={key} hover onClick={(event) => handleClick(event,rowData)}>
            {/* {personKey?.map((el)=> (<TableCell>{Array.isArray(rowData[el]) ? <p>d</p> : rowData[el] }</TableCell>))} */}
            <TableCell align="center">{rowData?.firstName}</TableCell>
            <TableCell align="center">{rowData?.lastName}</TableCell>
            <TableCell align="center">{rowData?.identityCard}</TableCell>
            <TableCell align="center">{rowData?.mail}</TableCell>
            <TableCell align="center"><div >{rowData?.phone.map((el)=> <div  >{el}</div>)}</div></TableCell>
        </TableRow>
    
     </>
}