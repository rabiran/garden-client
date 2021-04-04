import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";

import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TableGrid} from '@material-ui/core'
import Row from "./Row";

export default ({ data, setData }) => {
  const [personsKey, setPersonsKey] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <div>
    <Paper>
      <TableContainer component={Paper}>
        <Table >
          <TableHead >
            <TableRow>
              {/* {personsKey.map((personkeys) => (<TableCell align="right">{personkeys}</TableCell>))} */}
              <TableCell align="center">שם פרטי</TableCell>
              <TableCell align="center">שם משפחה</TableCell>
              <TableCell align="center">מספר תעודת זהות</TableCell>
              <TableCell align="center">מייל</TableCell>
              <TableCell align="center">מספר/י טלפון</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.id} rowData={row} personKeys={personsKey} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage='שורות בעמוד:'
          nextIconButtonText='עמוד הבא'
          backIconButtonText='עמוד הקודם'
          labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} מתוך ${count}`
          }
        />
        </Paper>
        </div>
    </>
  );
};
