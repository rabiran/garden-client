import  React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BuildIcon from '@material-ui/icons/Build';
import PauseIcon from '@material-ui/icons/Pause';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

export default ({subStep}) => {
    
    let status;

    console.log('aaa');
    console.log(subStep);

    switch(subStep.progress) {
        case 'completed': {
            status = <Grid container direction="row" alignItems="center" className="completed" wrap="nowrap">
                        <DoneIcon/> {subStep.name} 
                    </Grid>;
            break;
        }
        case 'inprogress': {
            status = <Grid container direction="row" alignItems="center" className="inprogress" wrap="nowrap">
                        <BuildIcon/> {subStep.name} 
                    </Grid>;
            break;
        }
        case 'failed': {
            status = <Grid container direction="row" alignItems="center" className="failed" wrap="nowrap">
                        <IconButton className='' onClick={() => console.log('yes') }>
                            <ReplayIcon/> 
                        </IconButton> {subStep.name}  
                    </Grid>;
            break;
        }
        case 'paused': {
            status = <Grid container direction="row" alignItems="center" className="paused" wrap="nowrap">
                        <PauseIcon/> {subStep.name}  
                    </Grid>;
            break;
        }
        default:
            status = <Grid container direction="row" alignItems="center" className="unknown" wrap="nowrap">
                        <FeedbackIcon/> {subStep.name}
                    </Grid>;
            break;
    }
    return (
            <>{status}</>
    );
}