import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./style.css";
import {
  addImmigrantsApiPromise,
  getMembersOfGroupKart,
} from "../../api/api";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DialogsTable from "../DialogsTable/index.jsx";
import AutoSearch from "../AutoSearch/index.jsx";
import { useSnackbar } from "notistack";
import {
  akaUIdDomainsMap,findPrimaryUniqueId

} from "../../utils/Functions/func";
import {
  Checkbox,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Input,
  MenuItem,
  FormHelperText,
  IconButton,
  
} from "@material-ui/core";
import useStore from "utils/StoreProvider/useStore";
import DatePicker from "react-datepicker";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import "react-datepicker/dist/react-datepicker.css";

export default ({ openWindow, setOpenWindow }) => {
  const storeProvider = useStore();
  const domains = storeProvider.getDomains();
  const excel = storeProvider.getExcel()
  const domainsMap = storeProvider.getDomainsMap();
  const entityType = storeProvider.getEntityType();
  const { enqueueSnackbar } = useSnackbar();
  const allNets = ["ברירת מחדל", domains.ads, domains.es];
  const [startDate, setStartDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [usersSelected, setUsersSelected] = React.useState([]);
  const [postStatuses, setPostStatuses] = React.useState([]);
  const [userValidation, setUserValidation] = React.useState(false);
  const [uniqueIdValidation, setUniqueIdValidation] = React.useState(false);
  
  const [
    lastUserSelectedUniqueId,
    setLastUserSelectedUniqueId,
  ] = React.useState(null);

  const [lastUserSelected, setLastUserSelected] = React.useState(null);
  const errorMessageFieldNoUsers = "למשתמש שנבחר אין משתמשים בעד וקפיים";
  const errorMessageFieldEmptyP = "שדה ריק נא בחר משתמש!";
  const errorMessageFieldIsG= "המשתמש שנבחר הוא תפקידן!"
  const errorMessageUserExistsP = "למשתמש כבר קיימת בקשה!";
  const errorMessageUserHasOneP = "משתמש כבר קיים בוואן!";
  const errorMessageFieldEmptyG = "שדה ריק נא בחר קבוצה!";
  const errorMessageGroupExists = "קבוצה כבר קיימת בטבלה!";
  const errorMessageGroupHasOne = "קבוצה כבר קיימת בוואן!";
  const selectMessagePerson = "בחר יוז'ר ראשי";
  const selectMessageGroup = "בחר דומיין";
  const [selectMessage, setSelectMessage] = React.useState(selectMessagePerson);
  const [errorMessageFieldEmpty, setErrorMessageFieldEmpty] = React.useState(
    errorMessageFieldEmptyP
  );
  const [errorMessageUserExists, setErrorMessageUserExists] = React.useState(
    errorMessageUserExistsP
  );
  const [errorMessageUserHasOne, setErrorMessageUserHasOne] = React.useState(
    errorMessageUserHasOneP
  );
  const [errorMessageField, setErrorMessageField] = React.useState(
    errorMessageFieldEmpty
  );

  const [isPersonSearch, setIsPersonSearch] = React.useState(true);
  const [checkedUser, setCheckedUser] = React.useState(false);
  const [urgentUser , setUrgentUser ] = React.useState(false);
  const ref = React.createRef();
  const DateCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <>
      <FormControl>
        <InputLabel htmlFor="input-date-picker">
          בחר תאריך מיגרציה עתידי
        </InputLabel>
        <Input
          id="input-date-picker"
          value={value}
          onClick={onClick}
          startAdornment={
            <InputAdornment position="start">
              <IconButton>
                <CalendarTodayIcon color="primary" />
              </IconButton>
            </InputAdornment>
          }
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          לחץ לבחירת תאריך
        </FormHelperText>
      </FormControl>
    </>
  ));
  React.useEffect(() => {
    if (openWindow === true) {
      async function fetchData() {
        // You can await here
        //console.log("Ok");
        await storeProvider.fetchTableData();
        // ...
      }
      fetchData();
    }
  }, [openWindow]);

  React.useEffect(() => {
    setUserValidation(false);
    setUniqueIdValidation(false);
    setLastUserSelected(null);
    setUsers([]);
    if (isPersonSearch) {
      setSelectMessage(selectMessagePerson);
      setErrorMessageFieldEmpty(errorMessageFieldEmptyP);
      setErrorMessageUserExists(errorMessageUserExistsP);
      setErrorMessageUserHasOne(errorMessageUserHasOneP);
      setLastUserSelected(null);
      setLastUserSelectedUniqueId(null);
    } else {
      setSelectMessage(selectMessageGroup);
      setLastUserSelectedUniqueId("");
      setLastUserSelected(null);
      setErrorMessageFieldEmpty(errorMessageFieldEmptyG);
      setErrorMessageUserExists(errorMessageGroupExists);
      setErrorMessageUserHasOne(errorMessageGroupHasOne);
    }
  }, [isPersonSearch]);
  const handlePersonSearch = (event) => {
    setIsPersonSearch(String(event.target.value) === "true");
    
  };

  const handleChangedDomain = (event) => {
    setLastUserSelectedUniqueId(event.target.value);
    setUniqueIdValidation(false);
  };

  const handleClose = () => {
    setUsers([]);
    setStartDate(new Date());
    setUserValidation(false);
    setPostStatuses([]);
    setCheckedUser(false);
    setUniqueIdValidation(false);
    setLastUserSelected(null);
    setUsersSelected([]);
    setLastUserSelectedUniqueId(null);
    setIsPersonSearch(true);
    setOpenWindow(false);
  };

  const handleAddUser = (e) => {
    if (isPersonSearch) {
      if (lastUserSelected === null) {
        setUserValidation(true);
        setUniqueIdValidation(true);
        setErrorMessageField(errorMessageFieldEmpty);
      }
      if (lastUserSelectedUniqueId === null) {
        setUniqueIdValidation(true);
      }

      if (lastUserSelectedUniqueId !== null) {
        async function fetchData() {
          if (lastUserSelected != null) {
            let foundOne = lastUserSelected.domainUsers.find(
              (ds) => ds.dataSource === domains.target
            );
            if (foundOne !== undefined) {
              setErrorMessageField(errorMessageUserHasOne);
              setUserValidation(true);
              setUniqueIdValidation(true);
              return;
            }

            if(lastUserSelected.entityType === entityType){
              setErrorMessageField(errorMessageFieldIsG);
              setUserValidation(true);
              setUniqueIdValidation(true);
              return;

            }
            try {
              let allExistingMigrations = await storeProvider.getTableData();

              if (
                allExistingMigrations.find(
                  (el) => el.id.toString() === lastUserSelected.id
                ) !== undefined
              ) {
                setErrorMessageField(errorMessageUserExists);
                setUserValidation(true);
                setUniqueIdValidation(true);

                return;
              }
            } catch {
              enqueueSnackbar("תקלה בשרת", {
                variant: "error",
                autoHideDuration: 2000,
              });

              return;
            }

            let foundUser = usersSelected.find(
              (user) => user.id === lastUserSelected.id
            );

            if (foundUser === undefined) {
              let obj = Object.assign(lastUserSelected, {
                primaryUniqueId: lastUserSelectedUniqueId,
                newUser: checkedUser,
                startDate: startDate,
                urgentUser: urgentUser
              });
              setUsersSelected(usersSelected.concat(obj));
            } else {
              setErrorMessageField(errorMessageUserExists);
              setUserValidation(true);
              setUniqueIdValidation(true);
            }
          }
        }
        fetchData();

        setLastUserSelected(null);
        setLastUserSelectedUniqueId(null);
      }
    } else {
      if (lastUserSelected === null) {
        setUserValidation(true);
        setUniqueIdValidation(true);
        setErrorMessageField(errorMessageFieldEmpty);
        return;
      }
      async function fetchMembers() {
        let allMembers = [];
        let allExistingMigrations = [];
        try {
          allMembers = await getMembersOfGroupKart(lastUserSelected.id);
          allExistingMigrations = await storeProvider.getTableData();

          //REMMEMBER TO STRING if to remove
        } catch {
          enqueueSnackbar("תקלה בשרת", {
            variant: "error",
            autoHideDuration: 2000,
          });
          return;
        }
        allMembers = allMembers.filter(
          (member) =>
            allExistingMigrations.find(
              (el) => el.id.toString() === member.id
            ) === undefined
        );
        allMembers = allMembers.filter(
          (user) =>
            user.entityType !== entityType
        );

        allMembers = allMembers.filter(
          (user) =>
            user.domainUsers !== undefined &&
            user !== undefined &&
            user.domainUsers.length !== 0
        );
        allMembers = allMembers.filter(
          (el) =>
            el.domainUsers.find((du) => du.dataSource === domains.target) ===
            undefined
        );
        allMembers = allMembers.filter(
          (el) =>
            usersSelected.find((userSelc) => userSelc.id === el.id) ===
            undefined
        );

        let newArr = [];
        allMembers.forEach((user) => {
          user.domainUsers = user.domainUsers?.filter(
            (el) => akaUIdDomainsMap(el.uniqueID,domains,domainsMap) !== undefined
          );
          if (user.domainUsers.length === 0) {
            return;
          }
          console.log(lastUserSelectedUniqueId)
          let primaryUniqueId = findPrimaryUniqueId(
            user,
            lastUserSelectedUniqueId,domains,excel,domainsMap
          );

          if (primaryUniqueId !== undefined) {
            let obj = Object.assign(user, {
              primaryUniqueId: primaryUniqueId,
              newUser: checkedUser,
              startDate: startDate,
              urgentUser: urgentUser
            });

            newArr = newArr.concat(obj);
          }
        });

        setUsersSelected(usersSelected.concat(newArr));
      }

      fetchMembers();
      setLastUserSelected(null);
      setLastUserSelectedUniqueId("");
    }
  };

  const handleChangedCheckedUser = (e) => {
    setCheckedUser(!checkedUser);
  };
  const handleChangedUrgentUser =(e) =>{
    setUrgentUser(!urgentUser);
  }

  const handleRequestClick = async () => {
    let statusResults;
    setPostStatuses([]);

    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    if (usersSelected.length === 0) {
      setSuccess(false);
      setLoading(false);
      setErrorMessageField(errorMessageFieldEmpty);
      setUniqueIdValidation(true);
      setUserValidation(true);
      return;
    }
    try {
      statusResults = await addImmigrantsApiPromise(usersSelected); //NEED TO CHANGE !!!! method api too\!!
    } catch {
      enqueueSnackbar("תקלה בשרת", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setSuccess(true);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    let arrStatuses = [];
    let foundReject = false;
    statusResults.forEach((res) => {
      let status = res.status === "rejected" ? "נכשל" : "הצליח";

      if (res.status === "rejected") {
        foundReject = true;
        arrStatuses.push(status + ": " + res.reason.id + " " + res.reason.name);
      }
    });
    setPostStatuses(arrStatuses);
    if (foundReject) {
      // one or more of them failed
      setOpenWindow(true);
    } else {
      enqueueSnackbar("נוצרה בקשה למיגרציה בהצלחה!", {
        variant: "success",
        autoHideDuration: 2000,
      });
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            maxWidth: "80vw",
            minWidth: "80vw",
            maxHeight: "80vh",
            minHeight: "80vh",
          },
        }}
        disableBackdropClick
        open={openWindow}
        keepMounted={false}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        dir="rtl"
      >
        <DialogTitle id="form-dialog-title">יצירת משתמש</DialogTitle>
        <DialogContent dividers>
          <div className="dialogContentContainer">
            
              <div> נא למלא את הטופס בשביל יצירת משתמש ב.</div>
            

            <div className="searchingContainer">
              <div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <div style={{ color: "#00796b" }}>בחר סוג חיפוש</div>
                  </FormLabel>
                  <RadioGroup
                    value={isPersonSearch.toString()}
                    onChange={handlePersonSearch}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="בן אדם"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="קבוצה"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="fillingFieldsContainer">
                <div className="detailsContainer">
                  <div>
                    <AutoSearch
                      isPersonSearch={isPersonSearch}
                      users={users}
                      setUsers={setUsers}
                      lastUserSelected={lastUserSelected}
                      setUserValidation={setUserValidation}
                      setUniqueIdValidation={setUniqueIdValidation}
                      userValidation={userValidation}
                      setErrorMessageField={setErrorMessageField}
                      errorMessageField={errorMessageField}
                      setLastUserSelected={setLastUserSelected}
                      errorMessageFieldEmpty={errorMessageFieldEmpty}
                      errorMessageFieldNoUsers={errorMessageFieldNoUsers}
                      setPostStatuses={setPostStatuses}
                      setLastUserSelectedUniqueId={setLastUserSelectedUniqueId}
                    />
                  </div>
                  <div>
                    <FormControl>
                      <InputLabel>{selectMessage}</InputLabel>
                      <Select
                        style={{ width: "200px" }}
                        value={
                          isPersonSearch
                            ? lastUserSelectedUniqueId
                              ? lastUserSelectedUniqueId
                              : ""
                            : lastUserSelectedUniqueId
                            ? lastUserSelectedUniqueId
                            : ""
                        }
                        onChange={handleChangedDomain}
                        error={uniqueIdValidation}
                      >
                        {isPersonSearch
                          ? lastUserSelected != null
                            ? lastUserSelected.domainUsers.map((el, index) => (
                                <MenuItem key={index} value={el.uniqueID}>
                                  {el.uniqueID}
                                </MenuItem>
                              ))
                            : null
                          : lastUserSelected != null
                          ? allNets.map((el, index) => (
                              <MenuItem key={index} value={el}>
                                {el}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <Checkbox
                      checked={checkedUser}
                      onChange={handleChangedCheckedUser}
                    />
                    <span>משתמש חדש</span>
                  </div>
                  <div>
                    <Checkbox
                      checked={urgentUser}
                      onChange={handleChangedUrgentUser}
                    />
                    <span>משתמש דחוף</span>
                  </div>
                </div>
                <div>
                  <Fab
                    color="primary"
                    variant="extended"
                    size="medium"
                    onClick={handleAddUser}
                  >
                    <AddIcon />
                    הוסף
                  </Fab>
                </div>
                <div style={{ overflow: "visible" , width: "200px" }}>
                  <DatePicker
                    
                    {...startDate}
                    customInput={<DateCustomInput ref={ref} />}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    popperPlacement="top-end"
                    popperModifiers={{
                      offset: { enabled: true, offset: '5px, -10px' },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: 'viewport'
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    maxDate={new Date().setMonth(new Date().getMonth() + 5)}
                    showDisabledMonthNavigation
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogsTable
            usersSelected={usersSelected}
            setUsersSelected={setUsersSelected}
          />

          <div>
            {postStatuses.map((el, index) => (
              <p className="regex" key={index}>
                {el}
              </p>
            ))}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ביטול
          </Button>

          <div></div>
          <div className="root">
            <div className="wrapper">
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={handleRequestClick}
              >
                יצירה
              </Button>
              
              {loading && (
                <CircularProgress thickness={8} size={70} className="buttonProgress" />
              )}
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
