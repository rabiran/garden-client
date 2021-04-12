import  React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BuildIcon from '@material-ui/icons/Build';
import PauseIcon from '@material-ui/icons/Pause';
import FeedbackIcon from '@material-ui/icons/Feedback';

export default ({progress}) => {
    
    let status;

    switch(progress) {
        case 'completed': {
            status = <Grid container direction="row" alignItems="center" className="completed" wrap="nowrap">
                        <DoneIcon/> הסתיים 
                    </Grid>;
            break;
        }
        case 'inprogress': {
            status = <Grid container direction="row" alignItems="center" className="inprogress" wrap="nowrap">
                        <BuildIcon/> בתהליך 
                    </Grid>;
            break;
        }
        case 'failed': {
            status = <Grid container direction="row" alignItems="center" className="failed" wrap="nowrap">
                        <ErrorOutlineIcon/> נכשל 
                    </Grid>;
            break;
        }
        case 'paused': {
            status = <Grid container direction="row" alignItems="center" className="paused" wrap="nowrap">
                        <PauseIcon/> בהשעיה 
                    </Grid>;
            break;
        }
        case 'waiting': {
            status = <Grid container direction="row" alignItems="center"  wrap="nowrap">
                        <FeedbackIcon/> התחלה 
                    </Grid>;
            break;
        }
        default:
            status = <Grid container direction="row" alignItems="center" className="unknown" wrap="nowrap">
                        <FeedbackIcon/> {progress} 
                    </Grid>;
            break;
    }
    return (
            <>{status}</>
    );
}