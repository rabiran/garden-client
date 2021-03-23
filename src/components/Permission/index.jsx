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


export default (data,setData) => {
  const [personKey, setPersonKey] = React.useState([]);
  const [dataLoaded , setDataLoaded] = React.useState(false);


  React.useEffect(() => {
    console.log("keys")
    console.log(data)
    console.log(Object.keys(data))
    setPersonKey(Object.keys(data));
    setDataLoaded(true);
  }, [data]);
  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useRowStyles();
  return <> {dataLoaded && <TableContainer component={Paper}>
          <Table>
            {}




          </Table>
    
    
    </TableContainer>}</>;
};
