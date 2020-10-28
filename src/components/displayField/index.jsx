import  React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';

export default ({valueKey, value}) => {
    return (
        <div>
             <Grid container direction="row" alignItems="center" wrap='nowrap'>
                 <span className='key'>{valueKey}:</span>
                 <span className='value'>{value}</span>
             </Grid>
        </div>
    );
}