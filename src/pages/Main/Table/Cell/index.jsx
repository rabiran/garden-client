import  React from 'react';
import './styles.css';
import Field from 'components/displayField';
import Users from 'components/displayUsers';

export default ({rowData}) => {
    
    return (
        <>
            <div className='cell'>
                <div className="rowFields">
                    <Field valueKey={'שלב'} value={rowData.status.step}/>
                    <Field valueKey={'משימה'} value={rowData.status.subStep}/>
                    <Field valueKey={'דומיין ראשי'} value={rowData.primaryDomainUser}/>
                    <Field valueKey={'היררכיה'} value={rowData.hierarchy}/>
                </div>
                <div className="rowUsers">
                    <Users users={rowData.shadowUsers}/>
                </div>
            </div>
        </>
    )
}