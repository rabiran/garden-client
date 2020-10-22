import  React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default ({rowData}) => {

    let status;

    switch(rowData.status) {
        case 'completed': {
            status = <Grid container direction="row" alignItems="center" className="completed">
                        <DoneIcon/> הסתיים 
                    </Grid>;
            break;
        }
        case 'inprogress': {
            status = <Grid container direction="row" alignItems="center" className="inprogress">
                        <ErrorOutlineIcon/> בתהליך 
                    </Grid>;
            break;
        }
        case 'failed': {
            status = <Grid container direction="row" alignItems="center" className="failed">
                        <ErrorOutlineIcon/> נכשל 
                    </Grid>;
            break;
        }
    }
    return (
            <>{status} </>
    );
}