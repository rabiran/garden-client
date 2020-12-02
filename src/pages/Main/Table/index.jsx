import React from 'react';
import './styles.css';
import Status from 'components/status';
import MaterialTable from 'material-table'
import Cell from '../BetterTable/Row/Cell';
import hebrewLocalization from 'config/tableHebrew';
import DeleteDialog from 'components/Confirm';
import tableIcons from 'config/tableIcons';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Collapse from '@material-ui/core/Collapse';

export default ({data, deleteFromTable}) => {
    const [openDelete, setOpenDelete] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpenDelete = (data) => {
        setOpenDelete(data);
    }

    const handleConfirmDelete = () => {
        deleteFromTable(openDelete);
        setOpenDelete(false);
    }

    return (
        <>
            <MaterialTable
                localization={hebrewLocalization}
                icons={tableIcons}
                options={{
                    // filtering: true,
                    selection: true,
                    selectionProps: rowData => ({
                        disabled: rowData.status.progress !== 'completed'
                    }),
                    // maxBodyHeight: 700,
                    debounceInterval: 200,
                    // exportButton: true
                }}
                style = {{
                }}
                columns={[
                    {
                        title: 'סטטוס', field: 'status', render: rowData =>
                            <Status progress={rowData?.status?.progress} />,
                        customSort: (a, b) => {
                            if(a.status.progress < b.status.progress) return -1;
                            if(a.status.progress > b.status.progress) return 1;
                            return 0;
                        },
                        customFilterAndSearch: (value, rowData) => {
                            if(value === 'נכשל' || value === 'failed') {
                                return rowData.status.progress === 'failed';
                            }
                            else if(value === 'בתהליך' || value === 'inprogress') {
                                return rowData.status.progress === 'inprogress';
                            }
                            else if(value === 'הסתיים' || value === 'completed') {
                                return rowData.status.progress === 'completed';
                            }
                            return false;
                         },
                    },
                    { title: 'שם מלא', field: 'fullName', filtering: false },
                    { title: 'תעודת זהות', field: 'identifier', filtering: false },
                    { title: 'תאריך יצירה', field: 'startDate',filtering: false },
                    { title: 'תאריך סיום', field: 'endDate', filtering: false },
                ]}
                data = {data || []}
                title="מיגרנות"
                detailPanel={ [{
                    icon: () => <ArrowBackIosIcon fontSize="small" />,
                    isFreeAction: true,
                    render: rowData => {
                        return (
                            <Cell className='animate' rowData={rowData}/>
                        )
                    }
                }]}
                onRowClick={(event, rowData, togglePanel) => { setOpen(true); togglePanel()}}
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

// style = {{
//     ComponentHorizontalScrollContainer: {
//     maxHeight: 300,
//     overflowY: 'scroll'
//     }
// }}