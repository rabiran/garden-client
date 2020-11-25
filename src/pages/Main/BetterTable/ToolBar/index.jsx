import React from 'react';
import PropTypes from 'prop-types';
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
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 50%',
    },
    filterArea: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        // background: 'green',
        minWidth: 300,
        width: '35%',
        margin: 10
    },
    checkBox: {
        marginLeft: 200,
        paddingRight: 20,
    },
    searchField: {
        minWidth: 100
    }
}));


export default (props) => {
    const classes = useToolbarStyles();
    const { numSelected, data, setRows, filters, setFilters, handleOpenDelete, handlePause } = props;

    const handleChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked });
    };

    const searchHandler = (e) => {
        let msg = e.target.value;
        // const newSelecteds = rows.map((n) => n.id);

        // setSelected([rows[0].id])
        let matchedRows = [];
        if (msg) {
            // for(let dataRow of data) {
            //     let values = Object.values(dataRow);
            //     for(let valueStr of values) {
            //         if(String(valueStr).includes(msg)) {
            //             matchedRows.push(dataRow);
            //             break;
            //         }
            //     }
            // }
            matchedRows = data.filter((dataRow) => {
                let values = Object.values(dataRow);
                let found = false;
                for (let value of values) {
                    let term = String(value);
                    term = term.toLowerCase();
                    let filterValue = msg.toLowerCase();
                    if (term.includes(filterValue)) found = true;
                }
                return found;
            })
        }
        else {
            matchedRows = data;
        }
        // console.log(matchedRows);
        setRows(matchedRows);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 && <>
                <Tooltip title="מחק">
                    <IconButton aria-label="delete" onClick={handleOpenDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
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

            <div className={classes.filterArea}>
                <Typography variant="h6" id="tableTitle" component="div">
                    מיין:
                </Typography>
                <div className={classes.checkbox}>
                    <Checkbox
                        checked={filters.completed}
                        onChange={handleChange}
                        color="primary"
                        name="completed"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    הסתיים
                </div>
                <div className={classes.checkbox}>
                    <Checkbox
                        checked={filters.inprogress}
                        onChange={handleChange}
                        color="primary"
                        name="inprogress"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    בתהליך
                </div>
                <div className={classes.checkbox}>

                    <Checkbox
                        checked={filters.failed}
                        onChange={handleChange}
                        color="primary"
                        name="failed"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    נכשל
                </div>
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
    );
};