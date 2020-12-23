import React from 'react';
import './styles.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Status from '../status';

export default ({ users, domains, step, substep }) => {
    const steps = domains?.map(domain => {
        let index = users.indexOf(domain);
        let iscompleted = index === -1 ? false : true;
        // let stepLabel = step === domain ? substep : false;
        let stepLabel = <> <Status progress={'failed'} /> <Status progress={'inprogress'} />  <Status progress={'inprogress'} /> <Status progress={'completed'} /> </>

        return (<Step key={domain} completed={iscompleted}>
            <StepLabel optional={stepLabel}>{domain}</StepLabel>
        </Step>)});

    return (
        <Stepper style={{width: '100%'}}>{steps}</Stepper>
    );
}