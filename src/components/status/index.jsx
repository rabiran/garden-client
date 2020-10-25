import  React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BuildIcon from '@material-ui/icons/Build';
export default ({rowData}) => {

    let status;

    switch(rowData?.status?.progress) {
        case 'completed': {
            status = <Grid container direction="row" alignItems="center" className="completed">
                        <DoneIcon/> הסתיים 
                    </Grid>;
            break;
        }
        case 'inprogress': {
            status = <Grid container direction="row" alignItems="center" className="inprogress">
                        <BuildIcon/> בתהליך 
                    </Grid>;
            break;
        }
        case 'failed': {
            status = <Grid container direction="row" alignItems="center" className="failed">
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