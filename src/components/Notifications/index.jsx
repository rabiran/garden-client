import React from 'react';
import './styles.css';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import MinifiedMigration from './MinifiedMigration';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import IconButton from '@material-ui/core/IconButton';

import useStore from 'utils/StoreProvider/useStore';
import { setViewedApi } from 'api/api';

export default ({ anchor, setAnchor, data, something }) => {

    const store = useStore();

    const handleClose = () => {
        setAnchor(null);
    };

    const clearAll = async () => {
        const ids = data.map(obj => obj.id);
        const promises = data.map(obj => async () => await setViewed(obj.id));
        console.log(promises);
        const haha = await Promise.all(promises);
    }

    // const tableData = something;
    // const notViewedData = tableData.filter(obj => !obj.viewed);

    const setViewed = async (id) => {
        console.log('hi');
        try {
            await setViewedApi(id);
            let tableData = store.getTableData();
            let updateIndex = tableData.findIndex((item) => item.id === id);
            tableData[updateIndex].viewed = true;
            const updated = [ ...tableData ]
            store.updateTableData(updated);
        }
        catch(err) {
            console.log(err);
            return;
        }
    }

    const minifiedMigrations = data.map(migr => <MinifiedMigration key={migr.id} migration={migr} setViewed={setViewed} />)
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
                <div className="NotificationsContent">
                    {minifiedMigrations}
                </div>
            </div>
        </Popover>
    );

}