import  React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';

export default ({valueKey, value}) => {
    console.log(valueKey);
    console.log(value);
    return (
        <div>
             <Grid container direction="row" alignItems="center">
                 {/* <DoneIcon /> */}
                 <span className='key'>{valueKey}:</span>
                 <span className='value'>{value}</span>
             </Grid>
             
        </div>
    );
}