import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import './styles.css'
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableGrid from "@material-ui/core/TableRow";

export default ({key,rowData, setRowData,personKeys}) =>{

    const handleClick = (event, row) =>{
        console.log(row);


    }
    return <>
    
        <TableRow key={key} hover onClick={(event) => handleClick(event,rowData)}>
            {/* {personKey?.map((el)=> (<TableCell>{Array.isArray(rowData[el]) ? <p>d</p> : rowData[el] }</TableCell>))} */}
          
            <TableCell align="center">{rowData?.identityCard}</TableCell>
            <TableCell align="center">{rowData?.personalNumber}</TableCell>
            <TableCell align="center">{rowData?.firstName}</TableCell>
            <TableCell align="center">{rowData?.lastName}</TableCell>
            <TableCell align="center"><div >{rowData?.phone.map((el)=> <div  >{el}</div>)}</div></TableCell>
        </TableRow>
    
     </>
}