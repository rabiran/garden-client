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
                    {/* <div> */}
                    <Grid container alignItems="center">
                        <AssignmentIcon />          
                        <Field valueKey={'שלב'} value={rowData.status.step} />
                    </Grid>
                    {/* </div> */}
                    {/* <div> */}
                    <Grid container alignItems="center">
                        <LibraryAddCheckIcon />
                        <Field valueKey={'משימה'} value={rowData.status.subStep} />
                    </Grid>
                    {/* </div> */}
                    <Grid container alignItems="center">
                        <DomainIcon />
                        <Field valueKey={'דומיין ראשי'} value={rowData.primaryDomainUser} />
                    </Grid>
                    <Grid container alignItems="center">
                        <HomeIcon />
                        <Field valueKey={'היררכיה'} value={rowData.hierarchy} />
                    </Grid>

                </div>
                <div className="rowUsers">
                    <Users users={rowData.shadowUsers} />
                </div>
            </div>
        </>
    )
}