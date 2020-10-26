import  React from 'react';
import './styles.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default () => {
    return (
        <div className='header-root'>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className='header-title'>
                מיגרנה
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
}