import React from 'react';
import './styles.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import MinifiedMigration from './MinifiedMigration';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import useStore from 'utils/StoreProvider/useStore';
import  { useHistory } from 'react-router-dom';

import { setViewedApi } from 'api/api';

export default ({ anchor, setAnchor, data, something }) => {

    const store = useStore();
    const history = useHistory();

    const handleClose = () => {
        setAnchor(null);
    };

    const clearAll = async () => {
        for(const obj of data) {
            setViewed(obj.id);
        }
    }

    const setViewed = async (id) => {
        try {
            await setViewedApi(id);
            let tableData = store.getTableData();
            let updateIndex = tableData.findIndex((item) => item.id === id);
            tableData[updateIndex].viewed = true;
            // tableData[updateIndex].clickedFromNotification = true;
            const updated = [ ...tableData ]
            store.updateTableData(updated);
            // handleClose();
        }
        catch(err) {
            console.log(err);
            return;
        }
    }

    const openNotification = async (id) => {
        try {
            await setViewedApi(id);
            let tableData = store.getTableData();
            tableData.forEach(o=> delete o.clickedFromNotification)
            let updateIndex = tableData.findIndex((item) => item.id === id);
            tableData[updateIndex].viewed = true;
            tableData[updateIndex].clickedFromNotification = true;
            const updated = [ ...tableData ]
            store.updateTableData(updated);
            if(history.location.pathname !== '/') history.push('/');
            handleClose();
        }
        catch(err) {
            console.log(err);
            return;
        }
    }
    // onClick={()=> { console.log('aa'); openNotification(migr.id) }}
    const minifiedMigrations = data.map(migr =>
         <CSSTransition key={migr.id} timeout={500} classNames="notificationItem">
            <MinifiedMigration migration={migr} setViewed={setViewed} openNotification={openNotification} />
        </CSSTransition>)
    return (
        <Popover
            id={'haha'}
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <div className="NotificationsContainer">
                <div className="NotificationsClearAll">
                    <IconButton className='' color="inherit" aria-label="menu" onClick={() => clearAll()}>
                        <ClearAllIcon />
                    </IconButton>
                </div>
                <div className="NotificationsTitle">
                    <Typography >מה חדש?</Typography>
                </div>
                <Divider />
                <div className="NotificationsContent">
                    <TransitionGroup>
                        {minifiedMigrations}
                    </TransitionGroup>
                </div>
            </div>
        </Popover>
    );

}