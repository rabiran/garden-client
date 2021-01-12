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
import CircularProgress from "@material-ui/core/CircularProgress"
import AutoComplete from "@material-ui/lab/Autocomplete"
import './style.css'
import { getUsernamesPerNameKart,addImmigrantsApiPromise, getGroupsPerNameKart} from "../../api/api"
import { Chip } from "@material-ui/core";
import {Paper} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { ContactSupportOutlined } from "@material-ui/icons";
import logo from 'images/migraine.svg';
import DialogsTable from '../DialogsTable/index.jsx'
import domainsMap from '../../api/domainsMap'
import { Checkbox, FormControl, InputLabel, Radio, RadioGroup , FormControlLabel, FormLabel ,CheckBoxGroup } from '@material-ui/core';
import { red } from "@material-ui/core/colors";
import { color } from "highcharts";

export default ({openWindow,setOpenWindow}) => {
 

  
  const [loading, setLoading] = React.useState(false);
  const [loadingInput, setLoadingInput] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);
  const [userName, setUserName]= React.useState("")
  const [success, setSuccess] = React.useState(false);
  const [users , setUsers] = React.useState([]);
  const [timeoutVar,setTimeoutVar] = React.useState(null);
  const [usersSelected,setUsersSelected] = React.useState([])
  const [postStatuses,setPostStatuses] = React.useState([])

  const [userValidation,setUserValidation] = React.useState(false)
  const [uniqueIdValidation,setUniqueIdValidation] = React.useState(false)
  const [lastUserSelectedUniqueIdIndex,setLastUserSelectedUniqueId] = React.useState(-1)
  
  const [lastUserSelected, setLastUserSelected] = React.useState(null)
  const errorMessageFieldEmptyP ='שדה ריק נא בחר משתמש!';
  const errorMessageUserExistsP = 'משתמש כבר קיים בטבלה!';
  const errorMessageUserHasOneP= 'משתמש כבר קיים בוואן!'; 
  const errorMessageFieldEmptyG = 'שדה ריק נא בחר קבוצה!'
  const errorMessageGroupExists = 'קבוצה כבר קיימת בטבלה!'
  const errorMessageGroupHasOne = 'קבוצה כבר קיימת בוואן!'
  const  [errorMessageFieldEmpty, setErrorMessageFieldEmpty] = React.useState(errorMessageFieldEmptyP);
  const  [errorMessageUserExists, setErrorMessageUserExists] = React.useState(errorMessageUserExistsP);
  const  [errorMessageUserHasOne, setErrorMessageUserHasOne]= React.useState(errorMessageUserHasOneP);
  const [errorMessageField,setErrorMessageField] = React.useState(errorMessageFieldEmpty)

  const [isPersonSearch ,setIsPersonSearch] = React.useState(true);
  const [checkedUser,setCheckedUser] = React.useState(false);


React.useEffect(()=>{
  setUserValidation(false);
  setUniqueIdValidation(false);
  setLastUserSelected(null);
  setUsers([])
  if(isPersonSearch){
    setErrorMessageFieldEmpty(errorMessageFieldEmptyP);
    setErrorMessageUserExists(errorMessageUserExistsP);
    setErrorMessageUserHasOne(errorMessageUserHasOneP);
  }else{
    setErrorMessageFieldEmpty(errorMessageFieldEmptyG);
    setErrorMessageUserExists(errorMessageGroupExists);
    setErrorMessageUserHasOne(errorMessageGroupHasOne);

  }

}, [isPersonSearch])
const handlePersonSearch= (event) =>{
  
  setIsPersonSearch(String(event.target.value) == "true");
}

  const typingTimeout = 700;
  let renderTimeout;

  const handleChangedDomain = (event) => {
    setLastUserSelectedUniqueId(event.target.value)
    setUniqueIdValidation(false)

  };

  const handleClose = () => { 
    setOpenWindow(false)
  };
  const handleTextFieldChange = (e) => {
    
    if(userValidation){
      setUserValidation(false)
      setUniqueIdValidation(false)
    }
    setUserName(e.target.value);
  }

  const handleAddUser = (e)=>{
    
    if(lastUserSelected == null){
      setUserValidation(true)
      setUniqueIdValidation(true)
      setErrorMessageField(errorMessageFieldEmpty)
    }
    if(lastUserSelectedUniqueIdIndex == -1){
      setUniqueIdValidation(true)
    }

    if(lastUserSelectedUniqueIdIndex != -1){     
      
      function fetchData(){
        if(lastUserSelected!=null){
          let foundOne =  lastUserSelected.domainUsers.find((ds)=> ds.dataSource == "One")
          if(foundOne != undefined){
            
            setErrorMessageField(errorMessageUserHasOne);
            setUserValidation(true);
            setUniqueIdValidation(true);
            setLastUserSelected(null);
            setLastUserSelectedUniqueId(-1);
            return;

          }

          let foundUser = usersSelected.find(user => user.id === lastUserSelected.id)
        
          if(foundUser == undefined){
            let obj = Object.assign(lastUserSelected , {primaryUniqueIdIndex: lastUserSelectedUniqueIdIndex , newUser: checkedUser})
            setUsersSelected(usersSelected.concat(obj))
          }else{
            setErrorMessageField(errorMessageUserExists);
            setUserValidation(true);
            setUniqueIdValidation(true);
          }
        }
      };
      fetchData();
      
      setLastUserSelected(null);
      setLastUserSelectedUniqueId(-1);
  
      
    }

  }

  const handleChangedCheckedUser =(e) =>{
    setCheckedUser(!checkedUser)
  }
  
  
  
  const handleSelectedUser = (e,value) =>{   

      if(value == null || value ==""){
        setLastUserSelected(null)
        
        setErrorMessageField(errorMessageFieldEmpty)
        
        return;
      }
      setLastUserSelected(value)
      function fetchData(){
        const index = value.domainUsers.findIndex((element) =>{

          if(value.mail == undefined){
            return false;
          }
          if(element.uniqueId == undefined){
            return false;
          }

          if( element.uniqueId.toLowerCase() == value.mail.toLowerCase()){

            if(element.dataSource == "1" || element.dataSource == "2"){

              console.log("heythere")
              return true;
            }
            return false;
          }
          return false;
        } )
        if(index == -1){
          //const res= findFirstDataSIndex(value.domainUsers)
          //setLastUserSelectedUniqueId(res)
          const indexNotOneAman = value.domainUsers.findIndex((element) =>{
            return element.dataSource =="1" || element.dataSource =="2"
          })
          setLastUserSelectedUniqueId(indexNotOneAman)
          return;
        }
        setLastUserSelectedUniqueId(index)
      };
      fetchData();
      
      
      setUsers([])
      setPostStatuses([])
  }

  React.useEffect(()=>{
    clearTimeout(timeoutVar);

    
    if (userName != undefined && userName.length > 2) {
      
      renderTimeout = setTimeout(async () => {
          setLoadingInput(true)
          if(isPersonSearch){
            let newUsers = await getUsernamesPerNameKart(userName)
            let us =   newUsers.filter(usnow =>  (usnow.name).includes(userName) &&  //Remove includes
                        usnow.domainUsers.find((ds) => ds.dataSource == "One") == undefined &&
                        (usnow.domainUsers.find((ds) => ds.dataSource == "1") != undefined ||
                        usnow.domainUsers.find((ds) => ds.dataSource =="2") != undefined)) 
  
            setUsers(us)

          }else{
            let us = await getGroupsPerNameKart(userName);
            let newGroups = us.filter(usnow => usnow.name.includes(userName)) //Remove includes 
            setUsers(newGroups)
          }

          setLoadingInput(false)
            
        }
        
      , typingTimeout);
    }
     setTimeoutVar(renderTimeout)
    


  }, [userName])
  

  const handleRequestClick = async() =>{
    let statusResults;
    setPostStatuses([])
    try{
      if (!loading){
        setSuccess(false);
        setLoading(true);
      }
      if(usersSelected.length ==0){
        setSuccess(false);
        setLoading(false);
        setErrorMessageField(errorMessageFieldEmpty);
        setUniqueIdValidation(true)
        setUserValidation(true)
        return;
      }
      
      statusResults = await addImmigrantsApiPromise(usersSelected); //NEED TO CHANGE !!!! method api too\!!
  
     
      
      setSuccess(true);
      setLoading(false);
      
      
      let arrStatuses =[];
      let foundReject = false;
      statusResults.forEach(res =>{
        let status = (res.status == "rejected" ? "נכשל" : "הצליח")
        
        if(res.status =="rejected"){
          foundReject = true;
          arrStatuses.push(status+": "+ res.reason.id+" "+ res.reason.name)
        }
      })
      setPostStatuses(arrStatuses)
      if(foundReject){ // one or more of them failed
        setOpenWindow(true);
      }else{
        handleClose();
      }
      
      
      
    }catch(e){
      //SHOW BAD ALERT 

    }

  }
  

  return (
    <div >
      <Dialog
        PaperProps={{
          style: {
            maxWidth: '70vw',
            minWidth: '70vw',
            maxHeight: '80vh',
            minHeight: '80vh',
            
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
        </DialogTitle>
        <DialogContent dividers>
          
            
          
          <div className="dialogContentContainer"
          >
            <DialogContentText>
              
            <span> נא למלא את הטופס בשביל יצירת משתמש ב.</span>


            </DialogContentText>
            
            <div className="searchingContainer">
              <div>
              <FormControl component="fieldset">
      <FormLabel component="legend"><div style={{color: "#00796b"}}>בחר סוג חיפוש</div></FormLabel>
      <RadioGroup
      
        value={isPersonSearch.toString()}
        onChange={handlePersonSearch}
      >
        <FormControlLabel value="true" control={<Radio />} label="בן אדם" />
        <FormControlLabel value="false" control={<Radio />} label="קבוצה" />
      </RadioGroup>
    </FormControl>
              </div>
            <div className="fillingFieldsContainer"> 
            <div className="detailsContainer"> 
            <div >

              <AutoComplete
                               
                style = {{width:340}}
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
                getOptionLabel={(isPersonSearch) ?(option)=> option.name + option.hierarchy.join("/") : (option)=> option.name}
                renderInput={(params) => (
                  

                  <TextField
                    {...params}                  
                    variant="standard"
                    label={(isPersonSearch) ?"חפש משתמש" : "חפש קבוצה"}
                    placeholder={(isPersonSearch)? "משתמש" :"קבוצה"}
                   
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
                    
                    error = {(userValidation)}
                    helperText={(userValidation) ? errorMessageField: ""}
                  />
                )}
                
                
                onInputChange={handleTextFieldChange}

              >

              </AutoComplete>   
       
            </div>
            <div> 
              <FormControl>
                <InputLabel >בחר דומיין</InputLabel>
                <Select
                  native
                  style={{width:"200px",}}
                  value={lastUserSelectedUniqueIdIndex}
                  onChange={handleChangedDomain}
                  
                  error = {(uniqueIdValidation)}      
                >

                  
                  {(lastUserSelected != null) ? lastUserSelected.domainUsers.map((el,index)=> <option  
                
                  key={index} value={index} hidden={!(el.dataSource == "1" || el.dataSource =="2")}>{el.uniqueId} 
              
                  </option>
                  
                  ) : null}

                </Select>
            </FormControl>
            </div>
            <div >
            <Checkbox checked={checkedUser} onChange={handleChangedCheckedUser}/> 
              <span>משתמש חדש</span>
            
            </div>
            </div>
            <div>
            <Fab color="primary" variant="extended" size='medium' onClick={handleAddUser} >
                <AddIcon/>
                הוסף
            </Fab>
             
            </div>

            </div>
            </div>
          </div>

          
          <DialogsTable usersSelected={usersSelected} setUsersSelected={setUsersSelected} setLastUserSelectedUniqueId={setLastUserSelectedUniqueId}/>
          

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
          יצירה
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

