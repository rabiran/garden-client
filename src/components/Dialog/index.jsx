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
import { getUsernamesPerNameKart,addImmigrantsApiPromise} from "../../api/api"
import { Chip } from "@material-ui/core";
import {Paper} from "@material-ui/core"
import MaterialTable from 'material-table'
import hebrewLocalization from 'config/tableHebrew';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import AddIcon from '@material-ui/icons/Add'
import tableIcons from 'config/tableIcons';
import Fab from '@material-ui/core/Fab'


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
  const [domainsColor, setDomainsColor] = React.useState([])
  const [userValidation,setUserValidation] = React.useState(false)
  const [uniqueIdValidation,setUniqueIdValidation] = React.useState(false)
  const [lastUserSelectedUniqueId,setLastUserSelectedUniqueId] = React.useState("")
  const [lastUserSelected, setLastUserSelected] = React.useState(null)
  const errorMessageFieldEmpty ='שדה ריק נא בחר משתמש!';
  const errorMessageUserExists = 'משתמש כבר קיים בטבלה!';
  const [errorMessageField,setErrorMessageField] = React.useState(errorMessageFieldEmpty)

  const colors = ["Khaki","Aquamarine","Coral","grey","LightBlue","Violet"]





  const typingTimeout = 500;
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
    }
    setUserName(e.target.value);
  }
  const handleAddUser = (e)=>{
    if(lastUserSelectedUniqueId == ""){
      setUniqueIdValidation(true)
    }
    if(lastUserSelected == null | lastUserSelected == undefined){
      setUserValidation(true)
    }
    if(lastUserSelectedUniqueId != ""){     
      //usersSelected.push(lastUserSelected);
      console.log(usersSelected)
      async function fetchData(){
        let foundUser =await usersSelected.find(user => user.id === lastUserSelected.id)
        if(foundUser ==undefined || foundUser == -1){
          setUsersSelected(usersSelected.concat(lastUserSelected))
        }else{
          setErrorMessageField(errorMessageUserExists);
          setUserValidation(true);
        }
      };
      fetchData();
      
      setLastUserSelected(null);
      setLastUserSelectedUniqueId("");
  
      
    }

  }
  
  const handleSelectedUser = (e,value) =>{   
      if(userValidation){
        setUserValidation(false)
      }
      setLastUserSelected(value)
      
      setUsers([])
      setPostStatuses([])
  }

  React.useEffect(()=>{
    clearTimeout(timeoutVar);

    
    if (userName != undefined && userName.length > 2) {
      
      renderTimeout = setTimeout(async () => {
          setLoadingInput(true)
          let newUsers = await getUsernamesPerNameKart(userName)
          let us =   newUsers.filter(usnow =>  (usnow.name).includes(userName))
          setUsers(us)
          setLoadingInput(false)
            
        }
        
      , typingTimeout);
    }
     setTimeoutVar(renderTimeout)
    


  }, [userName])
  
  const regexHandleRequestClick = () =>{
    let ans = usersSelected.length !=0; //&& lastUserSelected !="";
    if (ans){
      return true;
    }


    return false;
  }

  const handleRequestClick = async() =>{
    let statusResults;
    if(usersSelected.length==0){
      setErrorMessageField(errorMessageFieldEmpty);
      setUserValidation(true)
      
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
      statusResults = await addImmigrantsApiPromise(lastUserSelectedUniqueId,usersSelected); //NEED TO CHANGE !!!!
      
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
  console.log(usersSelected);
  console.log("===================");

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
          {/* <div style={{textAlign:"left",height: "100px", display: "flex",flexWrap: "nowrap",justifyContent:"flex-end",direction:"row",overflow: "auto"}}>
            <Paper style={{position: "fixed"}}> {(domains) ? domains.map((el,index)=> <div style={{backgroundColor: colors[index]}} key={index}>{el}</div>) : null} </Paper>
          </div> */}
        </DialogTitle>
        <DialogContent dividers>
          <div className="dialogContentContainer"
          >
            <DialogContentText>
              נא למלא את הטופס בשביל יצירת משתמש ב.
            </DialogContentText>
            <div className="fillingFieldsContainer "> 
              
            <div >

                {/* <div style={{maxHeight: '100px',gap:'5px',overflowY: 'auto', display: "flex", flexWrap: "nowrap" , flexDirection: "column", justifyContent: "flex-start"}}>
                 {(usersSelected != undefined && usersSelected.length>0) ? (usersSelected?.map((el,index)=> <Chip style={{ backgroundColor: colors[domains.indexOf((el?.domainUsers[0]?.dataSource))], minHeight:"30px" }} key={index} label={(el.name)}/>)) : null}                   
              </div> */}

              <AutoComplete
                
                tag={{color: "blue"}}
                style = {{width:340,}}
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
              value={lastUserSelectedUniqueId}
              onChange={handleChangedDomain}
              variant="outlined"
              error = {(uniqueIdValidation)}
                    
              
            >
              {console.log("whatsapp lastuser")}
              {console.log(lastUserSelected)}
              <option label="בחירת יוניק מרכזי" value=""></option>
              {(lastUserSelected != null) ? lastUserSelected.domainUsers.map((el,index)=> <option  key={index} value={el.uniqueId}>{el.uniqueId}</option>) : null}
              {console.log(lastUserSelected)}
              {console.log("hey")}
            </Select>
            <Fab color="primary" variant="extended" onClick={handleAddUser} style={{marginRight: "30px"}}>
                <AddIcon/>
                הוסף
            </Fab>
            
            </div>
            </div>
          </div>
          
          <div>
              <MaterialTable
                 
                 style={{marginTop: "50px"}}
                 title="משתמשים שנוספו"
                 localization={hebrewLocalization}
                 columns={[
                    {title: "שם", field: 'name'},
                    {title: "מספר אישי", field: 'id'},
                    {title: "היררכיה", field: 'hierarchy'},
                     {title: "יוניק ראשי",field: 'domainUsers', render: rowData => <p> {JSON.stringify(rowData.domainUsers)}</p>},
                    // {title: "דומיין ראשי", field: 'primaryDomain'}
                 ]}
                 options={{
                   selection: true,
                   debounceInterval: 200,

                 }}
                 
                 actions={[
                   {
                     icon: () => <DeleteOutlined/>,
                     tooltip: 'מחק משתמש',
                     onClick: (event, rowData)=>{

                     }
                   }

                 ]}
                 icons={tableIcons}
                 data={(usersSelected != undefined && usersSelected.length >0) ? JSON.parse(JSON.stringify(usersSelected)): [] }
              
              
              
              
              />



              

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

