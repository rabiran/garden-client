import React from 'react';
import './styles.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from 'images/migraine.svg';
import RefreshIcon from '@material-ui/icons/Refresh';
import HomeIcon from '@material-ui/icons/Home';
import PieChartIcon from '@material-ui/icons/PieChart';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Divider from '@material-ui/core/Divider';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useTheme from 'utils/ThemeProvider/UseTheme';
import useStore from 'utils/StoreProvider/useStore';
import  { useHistory } from 'react-router-dom';

import Notifications from '../Notifications';

export default () => {
  const themeProvider = useTheme();
  const store = useStore();
  const history = useHistory();
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const openNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const adminPageClick = ()=>{
    history.push('/admin')
  }
  const homePageClick = () => {
    history.push('/');
  }

  const chartPageClick = () => {
    history.push('/charts');
  }
  // React.useEffect(() => {
  //   console.log('notification update');
  // }, [store.getTableData()])


  const displayName = store.getAuth().fullName || '';
  const headerName = `שלום ${displayName}`;

  const tableData = store.getTableData();
  const notViewedData = tableData.filter(obj => !obj.viewed);

  return (
    <div className='header-root'>
      <AppBar position="static" className='header-root'>
        <Toolbar>
          <img alt="Remy Sharp" src={logo} className='offset' width="50" height="50" />
          <Typography variant="h5" className='offset '>
            מיגרציה
          </Typography>
          <IconButton className='' color="inherit" aria-label="menu" onClick={() => themeProvider.themeSwitch()}>
            <Brightness2Icon />
          </IconButton>
          <IconButton className='' color="inherit" aria-label="menu" onClick={() => store.fetchTableData()}>
            <RefreshIcon />
          </IconButton>
          <IconButton  color="inherit" aria-label="menu" onClick={openNotifications}>
            <Badge badgeContent={notViewedData.length} color="secondary" >
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton className='' color="inherit" aria-label="menu" onClick={homePageClick}>
            <HomeIcon />
          </IconButton>
          <IconButton className='' color="inherit" aria-label="menu" onClick={chartPageClick}>
            <PieChartIcon />
          </IconButton>
          <IconButton className='' color="inherit" aria-label="menu" disabled={store.getAuth().isAdmin === false} onClick={adminPageClick}>
            <GroupAddIcon />
          </IconButton>
          <div className='header-grow'></div>
          <Typography variant="h6">
            {headerName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Notifications anchor={anchorEl} setAnchor={setAnchorEl} data = {notViewedData} something={store.getTableData()}/>
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