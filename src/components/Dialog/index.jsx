import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check"
import SaveIcon from "@material-ui/icons/Save"
import Hotkeys from 'react-hot-keys';
import CircularProgress from "@material-ui/core/CircularProgress"
import './style.css'
import {addImmigrantsApi, getUsernamesPerNameKart} from "../../api/api"

export default ({openWindow,setOpenWindow,selectedDomain,setSelectedDomain}) => {
 
  const [loading, setLoading] = React.useState(false);
  const [userName, setUserName]= React.useState("")
  const [success, setSuccess] = React.useState(false);

  const handleChange = (event) => {
    setSelectedDomain(event.target.value)
  };
  const handleClose = () => { 
    setOpenWindow(false)
  };
  const handleTextFieldChange = (e) => {
    setUserName(e.target.value)
  }
  const onKeyDown = (keyName, e, handle) =>{
    console.log("test:onKeyUp",e,handle)

  }
  const handleRequestClick = async() =>{
    let res="";
    try{
      if (!loading){
        setSuccess(false);
        setLoading(true);
      }
      res = await addImmigrantsApi(selectedDomain,userName);
      
    }catch(e){
      //SHOW BAD ALERT 

    }
    finally{
      setSuccess(true);
      setLoading(false)
      setOpenWindow(false)
      if(res.message =="Success"){
        //SHOW GOOD ALERT!!!
      }
    }

  }

  return (
    <div>
      <Dialog
        open={openWindow}
        keepMounted={false}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        dir="rtl"
      >
        <DialogTitle id="form-dialog-title">יצירת משתמש</DialogTitle>
        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              flexDirection: 'col',
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            <DialogContentText>
              נא למלא את הטופס בשביל יצירת משתמש בOneAman.
            </DialogContentText>
            
            <Hotkeys
              keyName="ctrl+k"
              onKeyDown={this.onkeydown.bind(this)}
            >
              <TextField value={userName} type="email" onChange={handleTextFieldChange}></TextField>
            
            </Hotkeys>

            

            <Select
              native
              value={selectedDomain}
              onChange={handleChange}
              variant="outlined"
            >
              <option label="בחירת דומיין" value=""></option>
              <option value={"8200"}>8200</option>
              <option value={"Services"}>Services</option>
              
            </Select>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ביטול
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            style={{fontWeight:"bold"}}
            variant="contained"
          >
            יצירה
          </Button>
          <div >

        
      </div>
      <div className="root">
      <div className="wrapper" >
        <Button
          variant="contained"
          color="primary"
          
          disabled={loading}
          onClick={handleRequestClick}
        >
          Accept terms
        </Button>
        {loading && (
          <CircularProgress size={24}  className="buttonProgress" />
        )}
        
      </div>
      </div>

        </DialogActions>
  
      </Dialog>
      
    </div>
  );
}

//startIcon={<CloudUploadIcon/>} create button

