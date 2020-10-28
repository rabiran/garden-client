import React from 'react';
import './styles.css';
import Field from 'components/displayField';
import Users from 'components/displayUsers';

import AssignmentIcon from '@material-ui/icons/Assignment';
import DomainIcon from '@material-ui/icons/Domain';
import HomeIcon from '@material-ui/icons/Home';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import Grid from '@material-ui/core/Grid';

export default ({ rowData }) => {

    return (
        <>
            <div className='cell'>
                <div className="rowFields">
                    {/* <div>
                        <Grid container alignItems="center" wrap='nowrap'>
                            
                        </Grid>
                    </div>
                    <div>
                        <Grid container alignItems="center" wrap='nowrap'>
                            <LibraryAddCheckIcon />
                            <Field valueKey={'משימה'} value={rowData.status.subStep} />
                        </Grid>
                    </div>
                    <div>
                        <Grid container alignItems="center" wrap='nowrap'>
                            <DomainIcon />
                            <Field valueKey={'דומיין ראשי'} value={rowData.primaryDomainUser} />
                        </Grid>
                    </div>
                    <div>
                        <Grid container alignItems="center" wrap='nowrap'>
                            <HomeIcon />
                            <Field valueKey={'היררכיה'} value={rowData.hierarchy} />
                        </Grid>
                    </div> */}
                    <div className="fieldArea">
                        <div className="field">
                            <AssignmentIcon />
                            <Field valueKey={'שלב'} value={rowData.status.step} />
                        </div>
                        <div className="field">
                            <LibraryAddCheckIcon />
                            <Field valueKey={'משימה'} value={rowData.status.subStep} />
                        </div>
                    </div>
                    <div className="fieldArea">
                        <div className="field">
                            <DomainIcon />
                            <Field valueKey={'דומיין ראשי'} value={rowData.primaryDomainUser} />
                        </div>
                        {/* <Grid container alignItems="center" wrap="nowrap"> */}
                        <div className="field">
                            <HomeIcon />
                            <Field valueKey={'היררכיה'} value={rowData.hierarchy} />
                        </div>
                        {/* </Grid> */}
                    </div>

                </div>
                <div className="rowUsers">
                    <Users users={rowData.shadowUsers} />
                </div>
            </div>
        </>
    )
}