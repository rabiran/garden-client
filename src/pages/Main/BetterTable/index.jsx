import React from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CustomTableRow from './Row';
import CustomToolBar from './ToolBar';
import CustomTableHead from './Head';
import { getComparator, stableSort } from 'utils/tableUtils';

import TablePagination from '@material-ui/core/TablePagination';

import DeleteDialog from 'components/Confirm';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable({data = [], deleteFromTable, changePauseState}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(data);
    const [filters, setFilters] = React.useState({
        completed: true,
        inprogress: true, 
        failed: true,
    });
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleOpenDelete = () => {
        setOpenDelete(selected);
    }

    const handleConfirmDelete = () => {
        deleteFromTable(openDelete);
        setOpenDelete(false);
        setSelected([]);
    }

    const handlePause = (pause) => {
        changePauseState(pause, selected);
    }

    React.useEffect(()=> {
        setRows(data);
    },[data]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <CustomToolBar 
                    numSelected={selected.length} 
                    setRows={setRows}
                    data={data} 
                    filters={filters} 
                    setFilters={setFilters}
                    handleOpenDelete={handleOpenDelete}
                    handlePause = {handlePause} />
                <TableContainer  style={{maxHeight: 600}}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        // size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                        stickyHeader
                    >
                        <CustomTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />

                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .filter(obj =>  filters[obj.status.progress])
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <CustomTableRow key={row.id} row={row} isItemSelected={isItemSelected} labelId={labelId} handleClick={handleClick} />
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={(rows.filter(obj =>  filters[obj.status.progress])).length}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage='שורות בעמוד:'
                    nextIconButtonText='עמוד הבא'
                    backIconButtonText='עמוד הקודם'
                    labelDisplayedRows={({from, to, count}) => 
                        `${from}-${to} מתוך ${count}`
                    }
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <DeleteDialog open={openDelete ? true : false} setOpen={setOpenDelete} item={openDelete} onConfirm={handleConfirmDelete}/>
        </div>
    );
}


