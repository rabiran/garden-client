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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useSnackbar } from 'notistack';
import useLoading from 'utils/LoadingProvider/useLoading';


export default () => {
    const loadingProvider = useLoading();
    const { enqueueSnackbar } = useSnackbar();
    const [openDelete, setOpenDelete] = React.useState(false);
    const [tableData, setTableData] = React.useState();

    React.useEffect(()=> {
        async function fetchData() {
            loadingProvider.showLoading(true);
            const data = await getImmigrantsApi();
            enqueueSnackbar('מידע התקבל', {variant: 'success', autoHideDuration: 2000});
            loadingProvider.showLoading(false);
            setTableData(data);
        }
        fetchData();
    // eslint-disable-next-line 
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
        enqueueSnackbar('נמחק', {variant: 'success', autoHideDuration: 2000})
    }

    return (
        <>
            <MaterialTable
                localization={hebrewLocalization}
                icons={tableIcons}
                options={{
                    selection: true,
                }}
                style = {{
                    ComponentHorizontalScrollContainer12: {
                    maxHeight: 300,
                    overflowY: 'scroll'
                    }
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
                         }
                    },
                    { title: 'שם מלא', field: 'fullName' },
                    { title: 'תעודת זהות', field: 'identifier' },
                    { title: 'תאריך יצירה', field: 'startDate' },
                    { title: 'תאריך סיום', field: 'endDate' },
                ]}
                data = {tableData}
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