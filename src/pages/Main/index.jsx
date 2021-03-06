import React, { lazy, Suspense } from 'react';
import './styles.css';
// import Table from './Table';

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Dialog from '..//../components/Dialog'
import { deleteImmigrantApi, pauseStateApi, setViewedApi } from 'api/api';
import { useSnackbar } from 'notistack';
import settledParser from 'utils/settledParser';
import useStore from 'utils/StoreProvider/useStore';

const BetterTable = lazy(() => import('./BetterTable'));

// import useAuth from 'utils/AuthProvider/useAuth';

const renderLoader = () => <p>Loading</p>;

export default () => {

    const [openWindow, setOpenWindow] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // const [tableData, setTableData] = React.useState();
    const handleClickOpen = () => {
        setOpenWindow(true)
    };
    const store = useStore();

    React.useEffect(() => {
        console.log('hello');
        // async function fetchData() {
        //     loadingProvider.showLoading(true);
        //     try {
        //         const data = await getImmigrantsApi();
        //         enqueueSnackbar('מידע התקבל', { variant: 'success', autoHideDuration: 2000 });
        //         setTableData(data);
        //     }
        //     catch {
        //         enqueueSnackbar('נכשל', { variant: 'error', autoHideDuration: 2000 });
        //     }
        //     loadingProvider.showLoading(false);
            
        // }
        // fetchData();
        // setTableData(store.getTableData())
        // eslint-disable-next-line 
    }, [])

    const deleteFromTable = async (ids) => {
        // const ids = data.map(obj => obj.id);
        let { errors, resolved, succesfulIds } = await settledParser(ids, deleteImmigrantApi);

        for(let error of errors) {
            // const id = error.reason.id;
            enqueueSnackbar(`נכשל`, { variant: 'error', autoHideDuration: 4000 });
        }
        for(let good of resolved) {
            const id = good.value;
            enqueueSnackbar(`נמחק`, { variant: 'success', autoHideDuration: 4000 });
            succesfulIds.push(id);
        }
        const newTableData = store.getTableData().filter((item) => !succesfulIds.includes(item.id));
        store.updateTableData(newTableData);
    }

    const changePauseState = async (pauseState, ids) => {
        // console.log(pauseState);
        const method = async (id) => await pauseStateApi(id , {paused: pauseState});
        let results = await settledParser(ids, method);

        for(let result of results) {
            console.log("shut up");
            console.log(result);
            if(result === 'ok') {
                // const id = good.value;
                enqueueSnackbar(`התעדכן`, { variant: 'success', autoHideDuration: 4000 });
            }
            else {
                enqueueSnackbar(`נכשל`, { variant: 'error', autoHideDuration: 4000 });
            }
        }
        // for(let error of errors) {
        //     const id = error.reason.id;
        //     enqueueSnackbar(`נכשל`, { variant: 'error', autoHideDuration: 4000 });
        // }
        // for(let good of resolved) {
            
        //     succesfulIds.push(id);
        // }
        // const newTableData = tableData.filter((item) => !succesfulIds.includes(item.id));
        // setTableData(newTableData);
    }

    const setViewed = async (id) => {
        try {
            let tableData = store.getTableData();
            let updateIndex = tableData.findIndex((item) => item.id === id);
            if(tableData[updateIndex].clickedFromNotification) {
                delete tableData[updateIndex].clickedFromNotification;
                console.log(tableData[updateIndex]);
                const updated = [ ...tableData ];
                store.updateTableData(updated);
                return;
            };
            if(tableData[updateIndex].viewed) return;
            await setViewedApi(id);
            tableData[updateIndex].viewed = true;
            const updated = [ ...tableData ]
            store.updateTableData(updated);
        }
        catch(err) {
            console.log(err);
            return;
        }
    }
    // GridContainer
    return (
        <> 
            {/* <div className='tableFlex'> */}
                <div className='tableContainer'>
                    {/* <Table data={tableData} deleteFromTable={deleteFromTable} /> */}
                    <Suspense fallback={renderLoader()}>
                        <BetterTable data={store.getTableData() || []} deleteFromTable={deleteFromTable} changePauseState={changePauseState} setViewed={setViewed}/>
                    </Suspense>
                </div>
                <div className='dialogContainer'>
                    <Fab color="primary" aria-label="add" onClick={handleClickOpen} >
                        <AddIcon />
                    </Fab>
                    <Dialog openWindow={openWindow} setOpenWindow={setOpenWindow} />

                </div>
            {/* </div> */}
        </>
    )
}