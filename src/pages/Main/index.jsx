import React from 'react';
import './styles.css';
import Table from './Table';
import Dialog from './Dialog'
import Grid from '@material-ui/core/Grid'
import { getImmigrantsApi } from 'api/api';
import { useSnackbar } from 'notistack';
import useLoading from 'utils/LoadingProvider/useLoading';

export default () => {
    const loadingProvider = useLoading();
    const { enqueueSnackbar } = useSnackbar();
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

    const deleteFromTable = (data) => {
        const ids = data.map(obj => obj.id);
        const newTableData = tableData.filter((item) => !ids.includes(item.id));
        setTableData(newTableData);
        enqueueSnackbar('נמחק', {variant: 'success', autoHideDuration: 2000})
    }

    return (
        <>
            <div className='GridContainer' >
                <div className='tableContainer'>
                    <Table data={tableData} deleteFromTable={deleteFromTable}/>
                </div>
                <div className='dialogContainer'>
                    <Dialog />
                </div>
            </div>

        </>
    )
}