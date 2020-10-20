import  React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
import Table from './Table';
// const useStyles = makeStyles(styles);

export default () => {
    // const classes = useStyles();
    return (
        <>
            <div className='content'>
                <Table />
            </div>
        </>
    )
}