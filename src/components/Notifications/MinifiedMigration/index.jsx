import React from 'react';
import './styles.css';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';

export default ({ migration, setViewed, openNotification }) => {

    const tickViewed = (e) => {
        e.stopPropagation();
        setViewed(migration.id);
    }

    const subStep = migration?.status?.subStep || "לא קיים";
    const message = `${migration.fullName} עם תת שלב: ${subStep}`
    return (
            <div className="notificationItem"  onClick={()=> openNotification(migration.id) }>
                <span>
                    <IconButton className='' color="inherit" aria-label="menu" onClick={(e) => tickViewed(e)}>
                        <CheckIcon />
                    </IconButton>
                </span> {message}
            </div>
    );

}