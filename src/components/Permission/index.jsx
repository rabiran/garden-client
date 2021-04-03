import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableGrid from "@material-ui/core/TableRow";
import Row from './Row';
import { Typography } from "@material-ui/core";

export default ({ data, setData }) => {
  const [personsKey, setPersonsKey] = React.useState([]);

  React.useEffect(() => {
    if (data[0] != null || data[0] != undefined) {
      console.log(Object?.keys(data[0]));
      setPersonsKey(Object?.keys(data[0]));
    }
  }, [data]);
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 1000,
    },
  });
  const classes = useRowStyles();
  return (
    <>
   
      {
        
        <TableContainer component={Paper}>
         
          <Table>
            <TableHead>
              <TableRow>
            
                {/* {personsKey.map((personkeys) => (<TableCell align="right">{personkeys}</TableCell>))} */}
                <TableCell align="center" >תעודת זהות</TableCell>
                <TableCell align="center">מספר אישי</TableCell>
                <TableCell align="center">שם פרטי</TableCell>
                <TableCell align="center">שם משפחה</TableCell>
                <TableCell align="center">מספר/י טלפון</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <Row key={row.id} rowData={row} personKeys={personsKey} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
};
