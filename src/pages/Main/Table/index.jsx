import React from 'react';
import './styles.css';
import { getImmigrantsApi } from 'api/api'
import Status from 'components/status';

import MaterialTable from 'material-table'
import Cell from './Cell';
import hebrewLocalization from 'config/tableHebrew';

import DeleteDialog from 'components/Confirm';

import tableIcons from 'config/tableIcons';

import DeleteIcon from '@material-ui/icons/Delete';

export default () => {

    const [openDelete, setOpenDelete] = React.useState(false);
    const [tableData, setTableData] = React.useState();

    React.useEffect(()=> {
        async function fetchData() {
            const data = await getImmigrantsApi();
            setTableData(data);
        }
        fetchData();
    }, [])

    const handleOpenDelete = (data) => {
        setOpenDelete(data);
    }

    const handleConfirmDelete = () => {
        console.log(openDelete)
        const ids = openDelete.map(obj => obj.id);
        const newTableData = tableData.filter((item) => !ids.includes(item.id));
        setTableData(newTableData);
        setOpenDelete(false);
    }

    return (
        <>
            <MaterialTable
                localization={hebrewLocalization}
                icons={tableIcons}
                options={{
                    selection: true
                }}
                columns={[
                    {
                        title: 'סטטוס', field: 'status', render: rowData =>
                            <Status rowData={rowData} />
                    },
                    { title: 'שם מלא', field: 'fullName' },
                    { title: 'תעודת זהות', field: 'identifier' },
                    { title: 'תאריך יצירה', field: 'startDate' },
                    { title: 'תאריך סיום', field: 'endDate' },
                ]}
                // data={[
                //     { status: 'הסתיים', fullName: 'חציל אפוי', identifier: 1234521, createDate: '12/02/1421', endDate: '02/08/0002' },
                //     { status: 'בתהליך', fullName: 'ביצה קשה', identifier: 1234522, createDate: '12/05/1521', endDate: '02/08/4810' },
                //     { status: 'נכשל', fullName: 'תפוח אדמה', identifier: 1234523, createDate: '12/02/1021', endDate: '02/08/2020' },
                // ]}
                data = {tableData}
                title="מיגרנות"
                detailPanel={rowData => {
                    return (
                        <>
                            <Cell className='animate' />
                        </>
                    )
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                actions={[
                    {
                        tooltip: 'Remove All Selected Users',
                        icon: () => <DeleteIcon />,
                        onClick: (evt, data) => handleOpenDelete(data)
                    }
                ]}
            />
            <DeleteDialog open={openDelete ? true : false} setOpen={setOpenDelete} item={openDelete} onConfirm={handleConfirmDelete}/>
        </>
    )
}