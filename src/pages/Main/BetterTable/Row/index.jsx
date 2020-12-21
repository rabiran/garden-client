import React from 'react';
import './styles.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';

import Cell from './Cell';
import Status from 'components/status';

export default (props) => {
    const { row, isItemSelected, labelId, handleClick, setViewed } = props;
    const [open, setOpen] = React.useState(false);

    const openRow = () => {
        setOpen(!open);
        setViewed(row.id);
    }
    return (
        <React.Fragment>
            <TableRow className={!row.viewed ? 'row' : ''} hover
                onClick={(e) => { e.stopPropagation(); openRow() }}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}>

                <TableCell padding="checkbox" >
                    <Checkbox
                        checked={isItemSelected}
                        onClick={(e) => { e.stopPropagation(); handleClick(e, row.id) }}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={(e) => { e.stopPropagation(); openRow() }}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/* component="th" scope="row" */}
                <TableCell>
                    <Status progress={row?.status?.progress} />
                </TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.identifier}</TableCell>
                <TableCell>{(new Date(row.startDate).toLocaleDateString('en-GB')) || '-'}</TableCell>
                <TableCell >{(new Date(row.endDate).toLocaleDateString('en-GB')) || '-'}</TableCell>
                <TableCell >{row?.status?.step}</TableCell>
                <TableCell style={{ position: 'relative' }}>
                    {row?.status?.subStep}
                    {!row.viewed && <div className="rowCorner">
                        <Badge badgeContent={'חדש'} color="primary" anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }} />
                    </div>}
                </TableCell>


            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={100}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Cell rowData={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}