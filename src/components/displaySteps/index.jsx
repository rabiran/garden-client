import React from 'react';
import './styles.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SubStep from '../SubStep';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    labelContainer: {
    //   paddingTop: 100
    },

  });

export default ({ stepsData = [] }) => {
    const classes = useStyles();
    // const steps = Object.values(domains)?.map(domain => {
    //     let index = users.indexOf(domain);
    //     let iscompleted = index === -1 ? false : true;
    //     // let stepLabel = step === domain ? substep : false;
    //     let stepLabel = <div> <Status progress={'failed'} /> <Status progress={'inprogress'} />  <Status progress={'inprogress'} /> <Status progress={'completed'} /> </div>

    //     return (<Step key={domain} completed={iscompleted}>
    //         <StepLabel optional={stepLabel} classes={{labelContainer: classes.labelContainer}}><div className="stepTitle">{domain}</div></StepLabel>
    //     </Step>)});

    // const arr2 = [...steps, ...steps, ...steps]

    const steps = stepsData.map((stepData, index) => {
        let stepLabel = [<div key={0}></div>];
        stepData.subSteps.forEach((subStepData, index)=> 
            stepLabel.push(<SubStep key={index+1} subStep={subStepData} step={stepData} />)
        );

        console.log(stepLabel);

        return (<Step key={index} active={true} completed={stepData.progress === 'completed'}>
            <StepLabel optional={stepLabel} classes={{labelContainer: classes.labelContainer}}><div className="stepTitle">{stepData.name}</div></StepLabel>
            {/* <StepContent>{stepLabel}</StepContent> */}
        </Step>)
    })
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