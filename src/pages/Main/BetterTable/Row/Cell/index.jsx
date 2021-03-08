import React from 'react';
import './styles.css';
import Field from 'components/displayField';
import Steps from 'components/displaySteps';
import DomainIcon from '@material-ui/icons/Domain';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import useStore from 'utils/StoreProvider/useStore';
import Button from '@material-ui/core/Button';
import PauseIcon from '@material-ui/icons/Pause';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

export default ({ rowData }) => {
    const store = useStore();

    return (
        <>
            <div className='cell'>
                <div className="rowFields">
                    <div className="fieldArea">
                        <div className="field">
                            <DomainIcon />
                            <Field valueKey={'יוזר ראשי'} value={rowData?.primaryUniqueId} />
                        </div>
                        <div className="field">
                            <HomeIcon />
                            <Field valueKey={'היררכיה'} value={rowData?.hierarchy} />
                        </div>
                        <div className="field">
                            <PhoneIcon />
                            <Field valueKey={'טלפון'} value={rowData?.phone} />
                        </div>
                        <div className="field">
                            <PhoneIcon />
                            <Field valueKey={'סלולרי'} value={rowData?.mobilePhone} />
                        </div>
                    </div>
                    <div className="fieldArea">
                        {/* <div className="buttonsArea">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<PauseIcon />}
                            > עצור </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AccessibleForwardIcon />}
                            > מה זה </Button>
                        </div> */}
                    </div>
                        </div>
                        <div className="rowUsers">
                            {/* <Users users={rowData?.shadowUsers} domains={store.getDomains()} step={rowData?.status?.step} substep={rowData?.status?.subStep} /> */}
                            <Steps stepsData={rowData?.status?.steps}/>
                        </div>
                    </div>
        </>
    )
}