import  React from 'react';
import './styles.css';
// import Grid from '@material-ui/core/Grid';
// import DoneIcon from '@material-ui/icons/Done';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default ({valueKey, value}) => {
    console.log(valueKey);
    console.log(value);
    return (
        <div>
            <span className='key'>{valueKey}:</span><span className='value'> {value}</span>
        </div>
    );
}