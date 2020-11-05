import React from 'react';
import './styles.css';
import Field from 'components/displayField';
import Users from 'components/displayUsers';
import DomainIcon from '@material-ui/icons/Domain';
import HomeIcon from '@material-ui/icons/Home';
import useStore from 'utils/StoreProvider/useStore';

export default ({ rowData }) => {
    const store = useStore();

    return (
        <>
            <div className='cell'>
                <div className="rowFields">
                    <div className="fieldArea">
                        <div className="field">
                            <DomainIcon />
                            <Field valueKey={'דומיין ראשי'} value={rowData.primaryDomainUser} />
                        </div>
                        <div className="field">
                            <HomeIcon />
                            <Field valueKey={'היררכיה'} value={rowData.hierarchy} />
                        </div>
                    </div>

                </div>
                <div className="rowUsers">
                    <Users users={rowData.shadowUsers} domains={store.getDomains()} step={rowData.status.step} substep={rowData.status.subStep} />
                </div>
            </div>
        </>
    )
}