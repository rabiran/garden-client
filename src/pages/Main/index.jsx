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
            <div style={{ "justify-items": "center","grid-column": "2 / 5","grid-row": "2 / 3"}}>
                <Table />
                
            </div>
            <div style={{"grid-column": "5 / 6","grid-row":"4 / 4"}}>
                <Dialog />
            </div>

            
        </div>
        </>
    )
}