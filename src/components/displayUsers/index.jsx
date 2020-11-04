import React from 'react';
import './styles.css';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default ({ users, domains, step, substep }) => {
    // const createdUsers = users?.map(user => <Grid key={user} container direction="row" alignItems="center"><DoneIcon /> יוזר {user} נוצר </Grid>)          
    // const nothing = <div>אין!</div>;
    // const output = createdUsers?.length === 0 ? nothing : createdUsers;

    const steps = domains?.map(domain => {
    let index = users.indexOf(domain);
    // let user = users[index];
    let iscompleted = index === -1 ? false : true;
    let stepLabel = step === domain ? substep : false;

    return (<Step key={domain} completed={iscompleted}>
        <StepLabel optional={stepLabel}>{domain}</StepLabel>
    </Step>)});

    return (
        // <Paper elevation={3} className='userPaper'>
        //     <span>יוזרים שנוצרו:</span>
        //     {output}
        // </Paper>
        <Stepper style={{width: '100%'}}>{steps}</Stepper>
    );
}