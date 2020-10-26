import  React from 'react';
import './styles.css';
import Table from './Table';

import Dialog from './Dialog'
import Grid from '@material-ui/core/Grid'
// const useStyles = makeStyles(styles);


export default () => {
    return (
        <> 
        <div className='GridContainer' >
            <div className='tableContainer'>
                <Table />
            </div>
            <div className='dialogContainer'>
                <Dialog />
            </div>

            
        </div>
        </>
    )
}