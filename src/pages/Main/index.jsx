import React from 'react';
import './styles.css';
import Table from './Table';
import BetterTable from './BetterTable';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Dialog from '..//../components/Dialog'
import { getImmigrantsApi, deleteImmigrantApi, pauseStateApi } from 'api/api';
import { useSnackbar } from 'notistack';
import useLoading from 'utils/LoadingProvider/useLoading';
import settledParser from 'utils/settledParser';

// import useAuth from 'utils/AuthProvider/useAuth';

export default () => {

    // const authProvider = useAuth();
    const [openWindow, setOpenWindow] = React.useState(false);
    const [selectedDomain, setSelectedDomain] = React.useState("");
    const loadingProvider = useLoading();
    const { enqueueSnackbar } = useSnackbar();
    const [tableData, setTableData] = React.useState();
    const handleClickOpen = () => {
        setOpenWindow(true)
    };

    React.useEffect(() => {
        async function fetchData() {
            loadingProvider.showLoading(true);
            try {
                const data = await getImmigrantsApi();
                enqueueSnackbar('מידע התקבל', { variant: 'success', autoHideDuration: 2000 });
                setTableData(data);
            }
            catch {
                enqueueSnackbar('נכשל', { variant: 'error', autoHideDuration: 2000 });
            }
            loadingProvider.showLoading(false);
            
        }
        fetchData();
        // eslint-disable-next-line 
    }, [])

    const deleteFromTable = async (ids) => {
        // const ids = data.map(obj => obj.id);
        let { errors, resolved, succesfulIds } = await settledParser(ids, deleteImmigrantApi);

        for(let error of errors) {
            const id = error.reason.id;
            enqueueSnackbar(`נכשל ${id}`, { variant: 'error', autoHideDuration: 4000 });
        }
        for(let good of resolved) {
            const id = good.value;
            enqueueSnackbar(`נמחק ${id}`, { variant: 'success', autoHideDuration: 4000 });
            succesfulIds.push(id);
        }
        const newTableData = tableData.filter((item) => !succesfulIds.includes(item.id));
        setTableData(newTableData);
    }

    const changePauseState = async (pauseState, ids) => {
        console.log(pauseState);
        const method = async (id) => await pauseStateApi(id , pauseState);
        let { errors, resolved, succesfulIds } = await settledParser(ids, method);

        for(let error of errors) {
            const id = error.reason.id;
            enqueueSnackbar(`נכשל ${id}`, { variant: 'error', autoHideDuration: 4000 });
        }
        for(let good of resolved) {
            const id = good.value;
            enqueueSnackbar(`התעדכן ${id}`, { variant: 'success', autoHideDuration: 4000 });
            succesfulIds.push(id);
        }
        // const newTableData = tableData.filter((item) => !succesfulIds.includes(item.id));
        // setTableData(newTableData);
    }

    return (
        <>
            <div className='GridContainer'>
                <div className='tableContainer'>
                    {/* <Table data={tableData} deleteFromTable={deleteFromTable} /> */}
                    <BetterTable data={tableData || []} deleteFromTable={deleteFromTable} changePauseState={changePauseState}/>
                </div>
                <div className='dialogContainer'>
                    <Fab color="primary" aria-label="add" onClick={handleClickOpen} >
                        <AddIcon />
                    </Fab>
                    <Dialog openWindow={openWindow} setOpenWindow={setOpenWindow} selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain} />
                </div>
            </div>
        </>
    )
}