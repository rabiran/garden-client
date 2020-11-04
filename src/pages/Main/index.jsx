import  React from 'react';
import './styles.css';
import Table from './Table';

import Dialog from './Dialog'
import Grid from '@material-ui/core/Grid'
// const useStyles = makeStyles(styles);
import useAuth from 'utils/AuthProvider/useAuth';

export default () => {
    const authProvider = useAuth();

    return (
        <> 
        {authProvider.getAuth() && <div className='GridContainer' >
            <div className='tableContainer'>
                <Table />
            </div>
            <div className='dialogContainer'>
                <Dialog />
            </div>

            
        </div>}
        </>
    )
}