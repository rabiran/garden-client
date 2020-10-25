import React from 'react';
import './styles.css';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
// import Grid from '@material-ui/core/Grid';
// import DoneIcon from '@material-ui/icons/Done';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default ({ users }) => {
    const createdUsers = users?.map(user => 
                            <div><DoneIcon /> יוזר {user} נוצר </div>
                        // </Grid>);

    const nothing = 'אין!';
    console.log(createdUsers);
    return (
        <Paper elevation={3} className='userPaper'>
            <span>יוזרים:</span>
            {createdUsers || nothing}
        </Paper>
    );
}