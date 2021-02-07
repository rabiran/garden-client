import React from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FilterListIcon from '@material-ui/icons/FilterList';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DateFilter from 'components/DateFilter';
import GroupSearch from 'utils/GroupSearch';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        overflowX: 'auto'
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.main,
            },
    title: {
        flex: '1 1 25%',
    },
    filterArea: {
        display: 'flex',
        // justifyContent: 'space-around',
        alignItems: 'center',
        // background: 'green',
        minWidth: 200,
        // width: '10%',
        margin: 10,
        paddingRight: 20,
    },
    checkBox: {
        marginLeft: 200,
        paddingRight: 20,
    },
    searchField: {
        minWidth: 100
    },
    groupSearchField: {
        minWidth: 250
    }
}));


export default (props) => {
    const classes = useToolbarStyles();
    const { numSelected, data, setRows, filters, setFilters, handleOpenDelete, handlePause } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDateFilter, setOpenDateFilter] = React.useState(false);
    const handleChange = (event) => {
        const type = event.target.dataset.name || event.target.value;
        if(type === 'all') {
            const checked = Object.values(filters).every(o => o);
            setFilters({...filters, completed: !checked, inprogress: !checked, failed: !checked, paused: !checked, others: !checked })

        }
        else {
            const checked = filters[type];
            setFilters({ ...filters, [type]: !checked });
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDateFilter = () => {
        setOpenDateFilter(true);
    }

    const setDateFilter = (dateFilter) => {
        const { startDate, endDate } = dateFilter;
        setFilters({...filters, startDate: startDate, endDate: endDate});
    }

    const searchHandler = (e) => {
        setFilters({ ...filters, ['searchTerm']: {term: e.target.value} });
    }

    const groupSearchHandler = (members) => {
        setFilters({ ...filters, ['groupSearchTerm']: members });
    }

    return (
        <>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 && <>
                    {/* <Tooltip title="מחק">
                        <IconButton aria-label="delete" onClick={handleOpenDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="השעיה">
                        <IconButton aria-label="delete" onClick={() => handlePause(true)}>
                            <PauseIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="בטל השעיה">
                        <IconButton aria-label="delete" onClick={() => handlePause(false)}>
                            <PlayArrowIcon />
                        </IconButton>
                    </Tooltip>
                </>
                }

                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} נבחרו
                    </Typography>
                ) : (
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            מיגרציות
                        </Typography>
                    )}

                <div className={classes.groupSearchField}>
                    {/* <TextField id="outlined-basic" placeholder="חפש לפי קבוצה" onChange={groupSearchHandler} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} /> */}
                    <GroupSearch onGettingMembers={groupSearchHandler} />
                </div>
                <div className={classes.filterArea} >
                    <IconButton aria-label="filter" onClick={handleOpenDateFilter}>
                        <FilterListIcon />
                    </IconButton>
                מיין לפי תאריך
            </div>
                <div className={classes.filterArea}>
                    <IconButton aria-label="filter" onClick={handleClick}>
                        <FilterListIcon />
                    </IconButton>
                מיין לפי סטטוס

                <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleChange} data-name="all">
                            <>
                                <Checkbox
                                    checked={Object.values(filters).every(o => o)}
                                    value="all"
                                    // onChange={handleChange}
                                    color="primary"
                                    // name="failed"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            הכל
                        </>
                        </MenuItem>
                        <MenuItem onClick={handleChange} data-name="completed">
                            <>
                                <Checkbox
                                    checked={filters.completed}
                                    value="completed"
                                    // onChange={handleChange}
                                    color="primary"
                                    // name="completed"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            הסתיים
                        </>
                        </MenuItem>
                        <MenuItem onClick={handleChange} data-name="inprogress">
                            <>
                                <Checkbox
                                    checked={filters.inprogress}
                                    value="inprogress"
                                    // onClick={() => null}
                                    color="primary"
                                    // name="inprogress"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            בתהליך
                        </>
                        </MenuItem>
                        <MenuItem onClick={handleChange} data-name="failed">
                            <>
                                <Checkbox
                                    checked={filters.failed}
                                    value="failed"
                                    // onChange={handleChange}
                                    color="primary"
                                    // name="failed"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            נכשל
                        </>
                        </MenuItem>
                        <MenuItem onClick={handleChange} data-name="paused">
                            <>
                                <Checkbox
                                    checked={filters.paused}
                                    value="paused"
                                    // onChange={handleChange}
                                    color="primary"
                                    // name="failed"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            בהשעיה
                        </>
                        </MenuItem>
                        <MenuItem onClick={handleChange} data-name="others">
                            <>
                                <Checkbox
                                    checked={filters.others}
                                    value="others"
                                    // onChange={handleChange}
                                    color="primary"
                                    // name="failed"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            אחרים
                        </>
                        </MenuItem>
                    </Menu>
                </div>

                <div className={classes.searchField}>
                    <TextField id="outlined-basic" placeholder="חפש" onChange={searchHandler} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
                </div>
            </Toolbar>
            <DateFilter open={openDateFilter} setOpen={setOpenDateFilter} setDateFilter={setDateFilter} currentDateFilters={filters}/>
        </>
    );
};