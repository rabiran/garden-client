import React from 'react';
import './styles.css';
import Table from './Table';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Dialog from '..//../components/Dialog'
import { getImmigrantsApi } from 'api/api';
import { useSnackbar } from 'notistack';
import useLoading from 'utils/LoadingProvider/useLoading';
import useAuth from 'utils/AuthProvider/useAuth';

export default () => {

    const authProvider = useAuth();
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
            const data = await getImmigrantsApi();
            enqueueSnackbar('מידע התקבל', { variant: 'success', autoHideDuration: 2000 });
            loadingProvider.showLoading(false);
            setTableData(data);
        }
        if(authProvider.getAuth())
            fetchData();
        // eslint-disable-next-line 
    }, [authProvider.getAuth()])

    const deleteFromTable = (data) => {
        const ids = data.map(obj => obj.id);
        const newTableData = tableData.filter((item) => !ids.includes(item.id));
        setTableData(newTableData);
        enqueueSnackbar('נמחק', { variant: 'success', autoHideDuration: 2000 })
    }

    return (
        <>
            {authProvider.getAuth() && <div className='GridContainer'>
                <div className='tableContainer'>
                    <Table data={tableData} deleteFromTable={deleteFromTable} />
                </div>
                <div className='dialogContainer'>
                    <Fab color="primary" aria-label="add" onClick={handleClickOpen} >
                        <AddIcon />
                    </Fab>
                    <Dialog openWindow={openWindow} setOpenWindow={setOpenWindow} selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain} />
                </div>
            </div>}
        </>
    )
}