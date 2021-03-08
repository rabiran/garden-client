
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
    { id: 'nothing', numeric: false, disablePadding: false, label: '' },
    { id: 'status', numeric: false, disablePadding: false, label: 'סטטוס' },
    { id: 'fullName', numeric: false, disablePadding: false, label: 'שם מלא' },
    { id: 'identifier', numeric: false, disablePadding: false, label: 'תעודת זהות' },
    { id: 'startDate', numeric: false, disablePadding: false, label: 'תאריך יצירה' },
    { id: 'endDate', numeric: false, disablePadding: false, label: 'תאריך סיום' },
    // { id: 'currentStep', numeric: false, disablePadding: false, label: 'שלב נוכחי' },
    // { id: 'currentSubStep', numeric: false, disablePadding: false, label: 'תת שלב נוכחי' },
];


export default (props) => {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}