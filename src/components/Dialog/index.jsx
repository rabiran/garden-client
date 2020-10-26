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
// import CheckIcon from "@material-ui/icons/Check"
// import SaveIcon from "@material-ui/icons/Save"
// import CircularProgress from "@material-ui/core/CircularProgress"

export default () => {
 
  // const timer = React.useRef();
  // React.useEffect(()=>{
  //   return () => {
  //     clearTimeout(timer.current)
  //   }
  // })
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [state, setState] = React.useState({
    openWindow: false,
    selectedDomain: ""
  });
  const handleClickOpen = () => {
    setState({
      ...state,
      ["openWindow"]: true
    });
  };
  const handleChange = (event) => {
    setState({
      ...state,
      ["selectedDomain"]: event.target.value
    });
  };
  const handleClose = () => {
    //clearTimeout(timer.current)
    setState({
      ...state,
      ["openWindow"]: false
    });
  };
  // const handleRequestClick = () =>{
  //   timer.current = window.setTimeout(() => {
  //     if (!loading){
  //       setSuccess(false);
  //       setLoading(true);
  //     }
  //     timer.current = window.setTimeout(() => {
  //       setSuccess(true);
  //       setLoading(false)
  //     }, 2000)
  //   })

  // }

  return (
    <div>
      <Fab  color="primary" aria-label="add" onClick={handleClickOpen} >
        <AddIcon />
      </Fab>
      <Dialog
        open={state.openWindow}
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
            <TextField margin="dense" id="name" label="שם משתמש" type="email" />

            <Select
              native
              value={state.selectedDomain}
              onChange={handleChange}
              variant="outlined"
            >
              <option label="בחירת דומיין" value=""></option>
              <option value={10}>8200</option>
              <option value={20}>Services</option>
              <option value={30}>Thirty</option>
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
            style={{ "font-weight": "bold" }}
            variant="contained"
          >
            יצירה
          </Button>

        </DialogActions>
  
      </Dialog>
      
    </div>
  );
}

//startIcon={<CloudUploadIcon/>} create button
{/* <div >
<Fab
  aria-label="save"
  color="primary"
  onClick={handleRequestClick}
>
  {success ? <CheckIcon /> : <SaveIcon />}
</Fab>
{loading && <CircularProgress size={40}/>}
</div>  */}
