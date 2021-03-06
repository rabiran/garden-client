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

export default function EnhancedTable({ data = [], deleteFromTable, changePauseState, setViewed }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(data);
    // const [rowsByDate, setRowsByDate] = React.useState(data);
    // const [startDateFilter, setStartDateFilter] 
    const [filters, setFilters] = React.useState({
        completed: true,
        inprogress: true,
        failed: true,
        paused: true,
        others: true,
        startDate: { from: null, to: null },
        endDate: { from: null, to: null },
        searchTerm: {term: ''},
        groupSearchTerm: []
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

    React.useEffect(() => {
        setRows(data);
        const index = data.findIndex(obj => obj.clickedFromNotification);
        if (index === -1) return;
        const page = index / rowsPerPage;
        console.log(page);
        setPage(Math.floor(page));
    }, [data]);

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

    const startFilter = (obj) => {
        const from = filters.startDate.from;
        const to = filters.startDate.to;
        const startDate = new Date(obj.startDate);

        if (!from && !to) return true;
        else if (from && !to) return startDate >= from;
        else if (!from && to) return startDate <= to;
        else return startDate >= from && startDate <= to
    }

    const endFilter = (obj) => {
        const from = filters.endDate.from;
        const to = filters.endDate.to;
        const endDate = new Date(obj.endDate);

        if (!from && !to) return true;
        else if (from && !to) return endDate >= from;
        else if (!from && to) return endDate <= to;
        else return endDate >= from && endDate <= to
    }

    const statusFilters = (obj) => {
        const isExist = filters[obj.status.progress];
        if (isExist) return true;
        else if (filters.others && isExist === undefined) {
            return true;
        }
        return false;
    }

    const searchFilter = (obj) => {
        const a = filters['searchTerm'].term || '';
        let values = Object.values(obj);
        let found = false;
        for (let value of values) {
            let term = String(value);
            term = term.toLowerCase();
            let filterValue = a.toLowerCase();
            if (term.includes(filterValue)) found = true;
        }
        return found;
    }

    const groupSearchFilter = (obj) => {
        const a = filters['groupSearchTerm'] || [];
        const personId = obj.personId;
        if(a.length === 0) return true;
        if(a.includes(personId)) return true;
        return false;
    }

    const paginationFilter = () => (rows.filter(startFilter).filter(endFilter).filter(statusFilters).filter(searchFilter).filter(groupSearchFilter)).length
    const pageCount = paginationFilter();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <CustomToolBar
                    numSelected={selected.length}
                    setRows={setRows}
                    data={data}
                    filters={filters}
                    setFilters={setFilters}
                    setPage={setPage}
                    handleOpenDelete={handleOpenDelete}
                    handlePause={handlePause} />
                <TableContainer style={{ maxHeight: 600 }}>
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
                                // .sort((a,b) => { return (a.viewed === b.viewed) ? 0 : a.viewed? 1: -1 })
                                .filter(startFilter)
                                .filter(endFilter)
                                .filter(statusFilters)
                                .filter(searchFilter)
                                .filter(groupSearchFilter)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    // console.log(row);
                                    return (
                                        <CustomTableRow key={row.id} row={row} isItemSelected={isItemSelected}
                                            labelId={labelId} handleClick={handleClick} setViewed={setViewed} isOpen={row.clickedFromNotification} />
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
                    count={pageCount}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage='שורות בעמוד:'
                    nextIconButtonText='עמוד הבא'
                    backIconButtonText='עמוד הקודם'
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} מתוך ${count}`
                    }
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <DeleteDialog open={openDelete ? true : false} setOpen={setOpenDelete} item={openDelete} onConfirm={handleConfirmDelete} />
        </div>
    );
}


