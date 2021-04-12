import React from "react";
import PermissionTable from "components/Permission";
import kartUsers from "../../api/kartUsers";
import "./styles.css";
import AddIcon from "@material-ui/icons/Add";
import {
  Typography,
  Button,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,

  FormControlLabel,
  Checkbox,
  FormGroup,
  DialogActions,
  CircularProgress,
  Radio,
  RadioGroup,
  
} from "@material-ui/core";
import AutoSearch from "../../components/AutoSearch";
import {getAllowedUsersApi, addAllowedUserApi, deleteAllowedUserApi, updateAllowedUserApi} from '../../api/api';
import { useSnackbar } from "notistack";
// import styles from './styles';

export default () => {
  const [permissionUsers, setPermissionUsers] = React.useState([]);
  const [isDiaOpen, setIsDiaOpen] = React.useState(false);

  const [isAdmin, setIsAdmin] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [lastUserSelected, setLastUserSelected] = React.useState(null);
  const [loading,setLoading] = React.useState(false);
  const errorEmptyField="שדה ריק נא בחר משתמש!";
  const [errorMessageField,setErrorMessageField] = React.useState(errorEmptyField);
  const [userValidation,setUserValidation] = React.useState(false)
  const [uniqueIdValidation,setUniqueIdValidation] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setIsDiaOpen(true);
  };
  const handleClose = () => {
    setUsers([]);
    setIsAdmin(false);
    setIsDiaOpen(false);
    
  };

  const handleRequestClick = async () =>{
   
      if(lastUserSelected === null){
        setUserValidation(true);
        return;
      }
      try{
        setLoading(true);
        const res = await addAllowedUserApi(lastUserSelected.id,isAdmin);
        setLoading(false);
        enqueueSnackbar("הוספת הרשאה למשתמש הוצלחה!" ,{
          variant: "success",
          autoHideDuration: 2000,
        });
        setLastUserSelected(null);
        let permissionedUsers= await getAllowedUsersApi();
        setPermissionUsers(permissionedUsers);

      }catch(error){
        console.log(error);
        enqueueSnackbar("תקלה בהוספת משתמש חדש", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setLoading(false);
      }



      

  }

  React.useEffect( () => {
    //setLoadingPageData(true);
    async function fetchData(){
        try{
            let permissionedUsers= await getAllowedUsersApi();
            setPermissionUsers(permissionedUsers);

        }catch (error){
            console.log(error)
            enqueueSnackbar("תקלה בקבלת משתמשים מורשים", {
              variant: "error",
              autoHideDuration: 2000,
            });
            
        }

    }
    fetchData();
    //setLoadingPageData(false);
    
  }, []);
  return (
    <>
    

      <div class="tblPermission">
        <PermissionTable data={permissionUsers} setData={setPermissionUsers} />
      </div>

      <div className="buttonContainer">
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>
      <Dialog
     
        open={isDiaOpen}
        dir="rtl"
        PaperProps={{
          style: {
            maxWidth: "20vw",
            minWidth: "20vw",
            maxHeight: "40vh",
            minHeight: "40vh",
          },
        }}
      >
        <DialogTitle id="form-dialog-title">הוספת הרשאות למערכת</DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl component="fieldset"  >
              <FormLabel component="legend" >
                <div style={{ color: "#00796b" }}>בחר סוג הרשאה</div>
              </FormLabel>
              <RadioGroup value={String(isAdmin)} onChange={(event) =>{ setIsAdmin((event.target.value))}}>
                <FormControlLabel
                  value={String(false)}
                  control={
                    <Radio                              
                    />
                  }
                  
                  label="מורשה לצפייה ועריכה במערכת"
                />
                <FormControlLabel
                  value={String(true)}
                  
                  control={
                    <Radio
                    />
                  }
                  
                  label="מורשה לצפייה ועריכה במערכת והוספת הרשאות למשתמשים"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <AutoSearch
            isPersonSearch={true}
            users={users}
            setUserValidation={true}
            errorMessageField={errorMessageField}
            setErrorMessageField={setErrorMessageField}
            userValidation={userValidation}      
            setUserValidation={setUserValidation}
            setUsers={setUsers}
            uniqueIdValidation={uniqueIdValidation}
            setUniqueIdValidation={setUniqueIdValidation}
            lastUserSelected={lastUserSelected}
            setLastUserSelected={setLastUserSelected}
            isNormalSearch={true}
          />
        </DialogContent>
        <DialogActions >
            <div className="requestButtons">
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleRequestClick}
            
          >
            יצירה
          </Button>

          <Button onClick={handleClose} color="primary" disabled={loading}>
            ביטול
          </Button>
          </div>

          {loading && (
                <CircularProgress
                  thickness={8}
                  size={70}
                  className="buttonProgress"
                />
              )}
        </DialogActions>
      </Dialog>
    </>
  );
};
