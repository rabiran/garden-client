import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableGrid,
  Checkbox,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import {updateAllowedUserApi, getAllowedUsersApi} from "../../../api/api";
import { useSnackbar } from "notistack";

export default ({
  key,
  rowData,
  setRowData,
  personKeys,
  rowsSelected,
  setRowsSelected,
  setData,
  data
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event, rowData ) => {
    console.log(rowData);

    let foundSameRow = rowsSelected.find((el) => el.id === rowData.id);
    if (foundSameRow != undefined) {
      const index = rowsSelected.indexOf(rowData);
      let newArray = rowsSelected.filter((el, indx) => indx !== index);
      setRowsSelected(newArray);
    } else {
      let newArray = rowsSelected.concat(rowData);
      setRowsSelected(newArray);
    }
  };
  const handleChangePermission = async (event) => {
    try {
      await updateAllowedUserApi(rowData.id , !rowData.isAdmin);
      const permissionedUsers= await getAllowedUsersApi();
      setData(permissionedUsers);
      enqueueSnackbar("הצלחה בעדכון המשתמש!", {
        variant: "success",
        autoHideDuration: 2000,
      });

    } catch (error) {
      console.log(error);
      enqueueSnackbar("תקלה בעידכון הרשאות למשתמש", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <>
      <TableRow
        key={key}
        hover
        
      >
        <TableCell onClick={(event) => handleClick(event, rowData)} >
          {" "}
          <Checkbox
            checked={
              rowsSelected.find((el) => el.id === rowData.id) !== undefined
            }
          ></Checkbox>
        </TableCell>
        {/* {personKey?.map((el)=> (<TableCell>{Array.isArray(rowData[el]) ? <p>d</p> : rowData[el] }</TableCell>))} */}
        <TableCell align="center" onClick={(event) => handleClick(event, rowData)}>{rowData?.firstName}</TableCell>
        <TableCell align="center" onClick={(event) => handleClick(event, rowData)}>{rowData?.lastName}</TableCell>
        <TableCell align="center" onClick={(event) => handleClick(event, rowData)}>{rowData?.identityCard}</TableCell>
        <TableCell align="center" onClick={(event) => handleClick(event, rowData)}>{rowData?.mail}</TableCell>
        <TableCell align="center" onClick={(event) => handleClick(event, rowData)}>
          <div>
            {rowData?.phone.map((el) => (
              <div>{el}</div>
            ))}
          </div>
        </TableCell>
        <TableCell align="center">
          {rowData?.isAdmin ? <span>אדמין</span> : <span>רגיל </span>}
          <Tooltip title="שינוי הרשאה">
          <IconButton aria-label="הורדה/שדרוג" onClick={handleChangePermission}>
            <ImportExportIcon />
          </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};
