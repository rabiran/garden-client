import React from 'react';
import './styles.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Status from '../status';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    labelContainer: {
      paddingTop: 100
    },

  });

export default ({ users, domains, step, substep }) => {
    const classes = useStyles();
    const steps = Object.values(domains)?.map(domain => {
        let index = users.indexOf(domain);
        let iscompleted = index === -1 ? false : true;
        // let stepLabel = step === domain ? substep : false;
        let stepLabel = <div> <Status progress={'failed'} /> <Status progress={'inprogress'} />  <Status progress={'inprogress'} /> <Status progress={'completed'} /> </div>

        return (<Step key={domain} completed={iscompleted}>
            <StepLabel optional={stepLabel} classes={{labelContainer: classes.labelContainer}}><div className="stepTitle">{domain}</div></StepLabel>
        </Step>)});

    // const arr2 = [...steps, ...steps, ...steps]

    return (
        <Stepper style={{width: '100%'}}>{steps}</Stepper>
        // <div className="stepper">
        //     <div className="step">חחח</div>
        //     <div className="divider"><Divider /></div>
        //     <div className="step">מהזה</div>
        //     <div className="divider"><Divider /></div>
        //     <div className="step">הסתיים</div>
        // </div>
    );
}