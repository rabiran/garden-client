import  React from 'react';
import PermissionTable from 'components/Permission'
import users from '../../api/kartUsers'
// import styles from './styles';

export default () => {
    const [permissionUsers, setPermissionUsers] = React.useState([])
    React.useEffect(async()=>{
        await setPermissionUsers(users);
    },[])
    return (
        <>
        hey
            <PermissionTable data={permissionUsers} setData={setPermissionUsers}/>
        </>
    )
}