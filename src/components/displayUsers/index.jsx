import React from 'react';
import './styles.css';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';

export default ({ users }) => {
    const createdUsers = users?.map(user => <Grid key={user} container direction="row" alignItems="center"><DoneIcon /> יוזר {user} נוצר </Grid>)          
    const nothing = <div>אין!</div>;
    const output = createdUsers?.length === 0 ? nothing : createdUsers;
    return (
        <Paper elevation={3} className='userPaper'>
            <span>יוזרים שנוצרו:</span>
            {output}
        </Paper>
    );
}