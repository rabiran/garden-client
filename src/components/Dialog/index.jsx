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
import Grid from '@material-ui/core/Grid'
import { ContactSupportOutlined } from "@material-ui/icons";
import logo from 'images/migraine.svg';
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
  const errorMessageFieldEmpty ='שדה ריק נא בחר משתמש!';
  const errorMessageUserExists = 'משתמש כבר קיים בטבלה!';
  const errorMessageUserHasOne= 'משתמש כבר קיים בוואן!';
  const [errorMessageField,setErrorMessageField] = React.useState(errorMessageFieldEmpty)






  const typingTimeout = 700;
  let renderTimeout;

  const handleChangedDomain = (event) => {
    setLastUserSelectedUniqueId(event.target.value)
    setUniqueIdValidation(false)


  };
  const handleRowChangedDomain = (oldData,event) => {

    setLastUserSelectedUniqueId(event.target.value)
    setUsersSelected(usersSelected.map(user =>{
      if(user.id == oldData.id){
        user.primaryUniqueIdIndex = event.target.value;
      }
      return user;
    }))



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
      
      async function fetchData(){
        if(lastUserSelected!=null){
          let foundOne = await lastUserSelected.domainUsers.find((ds)=> ds.dataSource == "One")
          if(foundOne != undefined){
            setErrorMessageField(errorMessageUserHasOne);
            setUserValidation(true);
            setUniqueIdValidation(true);
            setLastUserSelected(null);
            setLastUserSelectedUniqueId(-1);
            return;

          }

          let foundUser =await usersSelected.find(user => user.id === lastUserSelected.id)
        
          if(foundUser == undefined){
            let obj = await Object.assign(lastUserSelected , {primaryUniqueIdIndex: lastUserSelectedUniqueIdIndex})
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
  const findFirstDataSIndex = async(domainUsersArr) =>{

      const result = await domainUsersArr.find((element) => element.dataSource == "1" || element.dataSource == "2")
      return result;

  }
  
  
  const handleSelectedUser = async(e,value) =>{   

      if(value == null || value ==""){
        setLastUserSelected(null)
        
        setErrorMessageField(errorMessageFieldEmpty)
        
        return;
      }
      setLastUserSelected(value)
      async function fetchData(){
        const index =  await value.domainUsers.findIndex((element) =>{

          if(value.mail == undefined){
            return false;
          }
          if(element.uniqueId == undefined){
            return false;
          }

          if( element.uniqueId.toLowerCase() == value.mail.toLowerCase()){
            if(element.dataSource == "1" || element.dataSource == "2"){
              return true;
            }
            return false;
          }
          return false;
        } )
        if(index == -1){
          //const res= await findFirstDataSIndex(value.domainUsers)
          //setLastUserSelectedUniqueId(res)
          setLastUserSelectedUniqueId(0)
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
          let newUsers = await getUsernamesPerNameKart(userName)
          let us =   newUsers.filter(usnow =>  (usnow.name).includes(userName))
          setUsers(us)
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
      await statusResults.forEach(res =>{
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
        setOpenWindow(false);
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
              נא למלא את הטופס בשביל יצירת משתמש ב.
            </DialogContentText>
            
            <div className="fillingFieldsContainer"> 
              
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
              style={{width:"200px",}}
              value={lastUserSelectedUniqueIdIndex}
              onChange={handleChangedDomain}
              
              error = {(uniqueIdValidation)}      
            >

              
              {(lastUserSelected != null) ? lastUserSelected.domainUsers.map((el,index)=> <option  
              data-imsg-src={logo}
              key={index} value={index}>{el.uniqueId}
              
              </option>
              
              ) : null}

            </Select>
            </div>
            <div >
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
                    {title: "שינוי יוז'ר ראשי", render: rowData =>  
                    
                    <Select
                    native
                    value={rowData.primaryUniqueIdIndex}
                    onChange={(e) => handleRowChangedDomain(rowData,e)}
                   
                       
                  >                                   
                    {(rowData != null) ? rowData.domainUsers.map((el,index)=> <option  key={index} value={index}>{el.uniqueId}</option>) : null}
                  </Select>},
                 
                    {title: "דומיין", render: rowData => <p> {JSON.parse(JSON.stringify(rowData.domainUsers[rowData.primaryUniqueIdIndex]["dataSource"]))}</p>},
                    
                 ]}
                 options={{
                   selection: true,
                   debounceInterval: 200,

                 }}
                 
                 actions={[
                   {
                     icon: () => <DeleteOutlined/>,
                     tooltip: 'מחק משתמשים',
                     onClick: (event, rowData)=>{
                      let newArr=usersSelected;
                      async function DeleteUsers(){
                        await rowData.forEach(userToDel => {
                          newArr = newArr.filter((element)=> {return element.id != userToDel.id})
                           
                        });
                        setUsersSelected(newArr)
                      }
                      DeleteUsers();

                       
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

//startIcon={<CloudUploadIcon/>} create button

