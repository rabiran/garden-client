import React from 'react';
import './styles.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default ({ users, domains, step, substep }) => {
    const steps = domains?.map(domain => {
    let index = users.indexOf(domain);
    let iscompleted = index === -1 ? false : true;
    let stepLabel = step === domain ? substep : false;

    return (<Step key={domain} completed={iscompleted}>
        <StepLabel optional={stepLabel}>{domain}</StepLabel>
    </Step>)});

    return (
        <Stepper style={{width: '100%'}}>{steps}</Stepper>
    );
}