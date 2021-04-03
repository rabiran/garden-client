import  React from 'react';
import PermissionTable from 'components/Permission'
import users from '../../api/kartUsers'
import './styles.css'
import AddIcon from "@material-ui/icons/Add";
import { Typography , Button , Fab } from '@material-ui/core';
// import styles from './styles';

export default () => {
    const [permissionUsers, setPermissionUsers] = React.useState([])

    const handleClickOpen = () =>{

    }
    React.useEffect(async()=>{
         setPermissionUsers(users);
    },[])
    return (
        <>
        <Typography variant="h3"> משתמשים מורשים</Typography>

      

        <div class="tblPermission">
            
            <PermissionTable data={permissionUsers} setData={setPermissionUsers}/>
            </div>
      

            <div className='buttonContainer'>
                    <Fab color="primary" aria-label="add" onClick={handleClickOpen} >
                        <AddIcon />
                    </Fab>
                  

                </div>
        </>
    )
}