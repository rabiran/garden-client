import  React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BuildIcon from '@material-ui/icons/Build';
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
        default:
            break;
    }
    return (
            <>{status} </>
    );
}