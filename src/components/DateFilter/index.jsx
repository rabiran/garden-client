
import React from 'react';
import './style.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ open, setOpen, setDateFilter, currentDateFilters }) => {
    const [selectedDateFilters, setSelectedDateFilters] = React.useState({
        startDate: {from: currentDateFilters.startDate.from, to: currentDateFilters.startDate.to,},
        endDate: {from: currentDateFilters.endDate.from, to: currentDateFilters.endDate.to,},
    });

    const submitDateFilters = () => {
        setDateFilter(selectedDateFilters);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const clearFilters = () => {
        setSelectedDateFilters({startDate: {from: null, to: null}, endDate: {from: null, to: null}});
        setDateFilter({startDate: {from: null, to: null}, endDate: {from: null, to: null}});
    }
    const handleStartFrom = (date) => {
        setSelectedDateFilters({...selectedDateFilters, startDate: {...selectedDateFilters.startDate, from: date}});
    }
    const handleStartTo = (date) => {
        setSelectedDateFilters({...selectedDateFilters, startDate: {...selectedDateFilters.startDate, to: date}});
    }
    const handleEndFrom = (date) => {
        setSelectedDateFilters({...selectedDateFilters, endDate: {...selectedDateFilters.endDate, from: date}});
    }
    const handleEndTo = (date) => {
        setSelectedDateFilters({...selectedDateFilters, endDate: {...selectedDateFilters.endDate, to: date}});
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            // fullWidth={true}
            maxWidth = {'md'}
            // maxWidth="false"
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"מיין לפי תאריך"}</DialogTitle>
            <DialogContent>
                {/* <DialogContentText id="alert-dialog-slide-description"> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div>
                            מיין לפי תאריך התחלה
                        </div>
                        <div className="dateFiltersArea">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="מתאריך"
                                value={selectedDateFilters.startDate.from}
                                onChange={handleStartFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="עד תאריך"
                                value={selectedDateFilters.startDate.to}
                                onChange={handleStartTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div>
                            מיין לפי תאריך סיום
                        </div>
                        <div className="dateFiltersArea">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="מתאריך"
                                value={selectedDateFilters.endDate.from}
                                onChange={handleEndFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="endDate-to"
                                label="עד תאריך"
                                value={selectedDateFilters.endDate.to}
                                onChange={handleEndTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>

                    </MuiPickersUtilsProvider>
                {/* </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    סגור
                </Button>
                <Button onClick={clearFilters} color="primary" variant="contained">
                    מחק מיון תאריכים
                </Button>
                <Button onClick={submitDateFilters} color="primary" variant="contained">
                    מיין
                </Button>
            </DialogActions>
        </Dialog>
    );
}