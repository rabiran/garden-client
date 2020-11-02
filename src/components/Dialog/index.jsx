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
import AutoComplete from "@material-ui/lab/Autocomplete"
import './style.css'
import {addImmigrantsApi, getUsernamesPerNameKart} from "../../api/api"

export default ({openWindow,setOpenWindow,selectedDomain,setSelectedDomain}) => {
 
  const [loading, setLoading] = React.useState(false);
  const [loadingInput, setLoadingInput] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);
  const [userName, setUserName]= React.useState("")
  const [success, setSuccess] = React.useState(false);
  const [users , setUsers] = React.useState([]);
  const [typing, setTyping] = React.useState(false);
  const [typingTimeout, setTypingTimeout] = React.useState(500);
  const [timeoutVar,setTimeoutVar] = React.useState(null);

  let renderTimeout;

  const handleChange = (event) => {
    setSelectedDomain(event.target.value)
  };
  const handleClose = () => { 
    setOpenWindow(false)
  };
  const handleTextFieldChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    

  }
  const clearLogger = () => {
    return new Promise((resolve,reject) => {
      setTyping(true);
      
      resolve(clearTimeout(renderTimeout));
      if (userName != "") {
        renderTimeout = setTimeout(async () => {
            console.log("hey")
            let newUsers = await getUsernamesPerNameKart(userName)
            let us = await  newUsers.filter(usnow =>  (usnow.name).includes(userName))
            console.log(us)
            setUsers(us)
            resolve()
              
          }
          
        , typingTimeout);
        }

    });
  };

  React.useEffect(()=>{
    console.log(userName)
    
    // async function fetchData(){
    //   await clearLogger();
    // }
    // fetchData();
    setTyping(true);
    
//     var id = window.setTimeout(function() {}, 0);
//     console.log(id)

// while (id--) {
//     window.clearTimeout(id); // will do nothing if no timeout with id is present
// }
    clearTimeout(timeoutVar);
    
    if (userName != "") {
      renderTimeout = setTimeout(async () => {
          console.log("hey")
          let newUsers = await getUsernamesPerNameKart(userName)
          let us = await  newUsers.filter(usnow =>  (usnow.name).includes(userName))
          console.log(us)
          setUsers(us)
            
        }
        
      , typingTimeout);
      }
     setTimeoutVar(renderTimeout)
    


  }, [userName])
  // const onKeyUp = (keyName, e, handle) =>{
  //   e.preventDefault();
  //   console.log("test:onKeyUp",e,handle);

  // }
  // const onKeyDown = async (keyName, e, handle) =>{
  //   e.preventDefault();
    // let newUsers = await getUsernamesPerNameKart(userName)
    // let us = newUsers.filter(usnow =>  (usnow.name).includes(userName))
    // console.log(userName)
    // console.log(us);
    // setUsers(us);
  //   console.log("test:onKeyDown",e,handle);

  // }

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
          <div className="dialogContentContainer"
          >
            <DialogContentText>
              נא למלא את הטופס בשביל יצירת משתמש בOneAman.
            </DialogContentText>
            <div className="fillingFieldsContainer "> 
              
            <div>
            <Hotkeys
              
              // keyName="enter"
              // filter={(event) => {
              //      return true;
              //     }}
              // onKeyDown= {onKeyDown.bind(this)}
              // onKeyUp = {onKeyUp.bind(this)}
              
              
            >
              <AutoComplete
                
                style = {{width:200}}
                multiple
                open={openInput}
                onOpen={() => {
                  setOpenInput(true);
                }}
                onClose={() => {
                  setOpenInput(false);
                }}
                limitTags={2}
                id="multiple-limit-tags"
                options={users}
                getOptionLabel={(option)=> option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="חפש משתמש"
                    placeholder="משתמש"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingInput ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      )
                    }}
                  />
                )}
                onInputChange={handleTextFieldChange}

              >

              </AutoComplete>

            
              
            
            </Hotkeys>
            </div>
            
              <div>
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
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ביטול
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
          יצירת משתמש
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

