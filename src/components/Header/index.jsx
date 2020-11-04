import React from 'react';
import './styles.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import logo from 'images/migraine.svg';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import useTheme from 'utils/ThemeProvider/UseTheme';

export default () => {
  const themeProvider = useTheme();
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div className='header-root'>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className='' color="inherit" aria-label="menu" onClick={() => themeProvider.themeSwitch()}>
            <Brightness2Icon />
          </IconButton>
          <img alt="Remy Sharp" src={logo} className='offset' width="50" height="50" />
          <Typography variant="h5" className='offset header-title'>
            מיגרנה
          </Typography>
          <Typography variant="h6" >
            שלום חציל אפוי
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}
    </div>
  );
}