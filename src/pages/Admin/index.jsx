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
  
} from "@material-ui/core";
import AutoSearch from "../../components/AutoSearch";
import {getPermissionedUsersApi} from '../../api/api';
import { useSnackbar } from "notistack";
// import styles from './styles';

export default () => {
  const [permissionUsers, setPermissionUsers] = React.useState([]);
  const [isDiaOpen, setIsDiaOpen] = React.useState(false);
  const [isAllowed, setIsAllowed] = React.useState(true);
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
    setIsAllowed(true);
    setIsAdmin(false);
    setIsDiaOpen(false);
    
  };

  const handleRequestClick = () =>{
      if(lastUserSelected === null){
        setUserValidation(true);
        return;
      }

      

  }

  React.useEffect( () => {
    setLoading(true);
    async function fetchData(){
        try{
            let permissionedUsers= await getPermissionedUsersApi();
            setPermissionUsers(permissionedUsers);

        }catch (error){
            console.log(error)
            enqueueSnackbar("תקלה בקבלת משתמשים מורשים", {
              variant: "error",
              autoHideDuration: 2000,
            });
            setPermissionUsers(kartUsers);
        }

    }
    fetchData();
    setLoading(false);
    
  }, []);
  return (
    <>
      <Typography variant="h3"> משתמשים מורשים</Typography>

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
              <FormGroup>
                <FormControlLabel
                  value={isAllowed}
                  control={
                    <Checkbox
                      checked={isAllowed}
                      onChange={() => setIsAllowed(!isAllowed)}
                    />
                  }
                  
                  label="מורשה לצפייה ועריכה במערכת"
                />
                <FormControlLabel
                  value={isAdmin}
                  
                  control={
                    <Checkbox
                      checked={isAdmin}
                      onChange={() => setIsAdmin(!isAdmin)}
                    />
                  }
                  
                  label="מורשה לצפייה ועריכה במערכת והוספת הרשאות למשתמשים"
                />
              </FormGroup>
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

          <Button onClick={handleClose} color="primary">
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
