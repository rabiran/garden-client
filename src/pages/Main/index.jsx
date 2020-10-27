import  React from 'react';
import './styles.css';
import Table from './Table';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Dialog from '..//../components/Dialog'
import Grid from '@material-ui/core/Grid'
// const useStyles = makeStyles(styles);


export default () => {

    const [openWindow, setOpenWindow] = React.useState(false)
    const [selectedDomain,setSelectedDomain] = React.useState("")
    
    const handleClickOpen = () => {
        setOpenWindow(true)
    }; 
    return (
        <> 
        <div className='GridContainer' >
            <div className='tableContainer'>
                <Table />
            </div>
            <div className='dialogContainer'>
            <Fab  color="primary" aria-label="add" onClick={handleClickOpen} >
        <AddIcon />
      </Fab>
      <Dialog openWindow={openWindow} setOpenWindow={setOpenWindow} selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain} />
            </div>

            
        </div>
        </>
    )
}