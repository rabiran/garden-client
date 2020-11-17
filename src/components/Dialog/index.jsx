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
import Hotkeys from 'react-hot-keys';
import CircularProgress from "@material-ui/core/CircularProgress"
import AutoComplete from "@material-ui/lab/Autocomplete"
import './style.css'
import {addImmigrantsApi, getUsernamesPerNameKart,addImmigrantsApiPromise,domainsApi} from "../../api/api"
import { blue, red } from "@material-ui/core/colors";
import { Chip } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import {Paper} from "@material-ui/core"
import useStore from 'utils/StoreProvider/useStore';


export default ({openWindow,setOpenWindow,selectedDomain,setSelectedDomain}) => {
 


  const [loading, setLoading] = React.useState(false);
  const [loadingInput, setLoadingInput] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);
  const [userName, setUserName]= React.useState("")
  const [success, setSuccess] = React.useState(false);
  const [users , setUsers] = React.useState([]);
  const [timeoutVar,setTimeoutVar] = React.useState(null);
  const [usersSelected,setUsersSelected] = React.useState([])
  const [postStatuses,setPostStatuses] = React.useState([])
  const [domainsColor, setDomainsColor] = React.useState([])
  const [userValidation,setUserValidation] = React.useState(false)
  const [domainValidation,setDomainValidation] = React.useState(false)

  const colors = ["Khaki","Aquamarine","Coral","grey","LightBlue","Violet"]
  const store = useStore();
  const domains = store.getDomains();

  const errorMessageField ='שדה ריק נא בחר משתמש!';
  
  const styles = {
    dialogPaper: {
      minHeight: '80vh',
      maxHeight: '80vh'
    },
  };


  const typingTimeout = 500;
  let renderTimeout;

  const handleChangedDomain = (event) => {
    setSelectedDomain(event.target.value)
    setDomainValidation(false)

  };
  const handleClose = () => { 
    setOpenWindow(false)
  };
  const handleTextFieldChange = (e) => {
    
    if(userValidation){
      setUserValidation(false)
    }
    setUserName(e.target.value);
  }
  
  const handleSelectedUser = (e,values) =>{   
      if(userValidation){
        setUserValidation(false)
      }
      setUsersSelected(values)
      setUsers([])
  }

  React.useEffect(()=>{
    clearTimeout(timeoutVar);

    
    if (userName != "") {
      
      renderTimeout = setTimeout(async () => {
          setLoadingInput(true)
          let newUsers = await getUsernamesPerNameKart(userName)
          let us =  newUsers.filter(usnow =>  (usnow.name).includes(userName))
          setUsers(us)
          setLoadingInput(false)
            
        }
        
      , typingTimeout);
    }
     setTimeoutVar(renderTimeout)
    


  }, [userName])
  
  const regexHandleRequestClick = () =>{
    let ans = usersSelected.length !=0 && selectedDomain !="";
    console.log("ans:"+ans)
    if (ans){
      return true;
    }


    return false;
  }

  const handleRequestClick = async() =>{
    let statusResults;
    if(usersSelected.length==0){
      setUserValidation(true)
    }
    if(selectedDomain == ""){
      setDomainValidation(true)
    }
    try{
      if (!loading){
        setSuccess(false);
        setLoading(true);
      }
      if(!regexHandleRequestClick()){
        setSuccess(false);
        setLoading(false);
        return;
      }    
      statusResults = await addImmigrantsApiPromise(selectedDomain,usersSelected);
      
      setSuccess(true);
      setLoading(false);
      
      
      let arrStatuses =[];
      let foundReject = false;
      console.log(statusResults)
      await statusResults.forEach(res =>{
        arrStatuses.push(res.status)
        if(res.status =="rejected"){
          foundReject = true;
        }
      })
      setPostStatuses(arrStatuses)
      if(foundReject){ 
        setOpenWindow(true);
      }else{
        setOpenWindow(true);
      }
      
      
      
    }catch(e){
      //SHOW BAD ALERT 

    }

  }
  
  console.log("===================");
  console.log(domains);
  console.log("===================");

  return (
    <div >
      <Dialog
        PaperProps={{
          style: {
            maxWidth: '50vw',
            minWidth: '50vw',
            maxHeight: '60vh',
            minHeight: '60vh',
            
          },
        }}
        disableBackdropClick
        open={openWindow}
        
        keepMounted={false}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        dir="rtl"
      >
        <DialogTitle id="form-dialog-title">יצירת משתמש
          <div style={{textAlign:"left",height: "100px", display: "flex",flexWrap: "nowrap",justifyContent:"flex-end",direction:"row",overflow: "auto"}}>
            <Paper style={{position: "fixed"}}> {(domains) ? domains.map((el,index)=> <div style={{backgroundColor: colors[index]}} key={index}>{el}</div>) : null} </Paper>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="dialogContentContainer"
          >
            <DialogContentText>
              נא למלא את הטופס בשביל יצירת משתמש ב.
            </DialogContentText>
            <div className="fillingFieldsContainer "> 
              
            <div >

                                        <div style={{maxHeight: '100px',gap:'5px',overflowY: 'auto', display: "flex", flexWrap: "nowrap" , flexDirection: "column", justifyContent: "flex-start"}}>
                             {(usersSelected != undefined && usersSelected.length>0) ? (usersSelected?.map((el,index)=> <Chip style={{ backgroundColor: colors[domains.indexOf((el?.domainUsers[0]?.dataSource))], minHeight:"30px" }} key={index} label={(el.name)}/>)) : null}            

                            
                      </div>
              <AutoComplete
                
                tag={{color: "blue"}}
                style = {{width:340,}}
                multiple
                noOptionsText={"לא נמצאו תוצאות"}
                open={openInput}
                onOpen={() => {
                  setOpenInput(true);
                }}
                autoSelect={true}
                onClose={() => {
                  setOpenInput(false);
                }}
                limitTags={2}
                id="multiple-limit-tags"
                options={users}
                
                onChange={handleSelectedUser}
                getOptionLabel={(option)=> option.name + option.hierarchy}
                renderInput={(params) => (
                  

                  <TextField
                    {...params}
                    // display: "flex", flexWrap: "nowrap" , flexDirection: "column"

                    
                    variant="standard"
                    label="חפש משתמש"
                    placeholder="משתמש"
                    
                    InputProps={{
                      
                      ...params.InputProps,
                      startAdornment: (
                      // <div style={{maxHeight: '70px',gap:'4px',overflowY: 'auto', display: "flex", flexWrap: "nowrap" , flexDirection: "column"}}>
                      //        {(usersSelected != undefined && usersSelected?.length>0) ? (usersSelected?.map((el,index)=> <Chip style={{ backgroundColor: domains[parseInt(el?.domainUsers[0]?.dataSource)-1].color, }} key={index} label={(el.name)}/>)) : null}            
                      //       {console.log(usersSelected)/* {params.InputProps.startAdornment} */}
                      //       {console.log(domains)}
                      //       {console.log(parseInt(usersSelected[0]?.domainUsers[0].dataSource))}
                            

                      // </div>
                    <div></div>
                      ),
                      endAdornment: (
                        <React.Fragment>
                          {loadingInput ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          
                          {params.InputProps.endAdornment}
                          
                        </React.Fragment>
                      )
                      

                    }}
                    
                    error = {(userValidation)}
                    helperText={(userValidation) ? errorMessageField: ""}
                  />
                )}
                
                
                onInputChange={handleTextFieldChange}

              >

              </AutoComplete>

            
              
            
       
            </div>
            
              <div>
            <Select
              native
              value={selectedDomain}
              onChange={handleChangedDomain}
              variant="outlined"
              error = {(domainValidation)}
                    
              
            >
              <option label="בחירת דומיין מרכזי" value=""></option>
              {domains.map((el,index)=> <option  key={index} value={el}>{el}</option>)}
              
            </Select>
            </div>
            </div>
          </div>
          <div >
            {postStatuses.map((el,index)=> <p className="regex" key={index}>{el}</p>)}
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

