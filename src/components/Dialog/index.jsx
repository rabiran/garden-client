import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import AutoComplete from "@material-ui/lab/Autocomplete";
import "./style.css";
import {
  getUsernamesPerNameKart,
  addImmigrantsApiPromise,
  getGroupsPerNameKart,
  getMembersOfGroupKart,
  getImmigrantsApi,
} from "../../api/api";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import logo from "images/migraine.svg";
import DialogsTable from "../DialogsTable/index.jsx";
import domainsMap from "../../api/domainsMap";
import config from "../../config";
import { useSnackbar } from "notistack";
import {
  Checkbox,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CheckBoxGroup,
} from "@material-ui/core";

export default ({ openWindow, setOpenWindow }) => {
  const { enqueueSnackbar } = useSnackbar();
  const allNets = [config.AdK, config.Kapaim];

  const [loading, setLoading] = React.useState(false);
  const [loadingInput, setLoadingInput] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [timeoutVar, setTimeoutVar] = React.useState(null);
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
    setIsPersonSearch(String(event.target.value) == "true");
  };

  const typingTimeout = 2000;


  const handleChangedDomain = (event) => {
    setLastUserSelectedUniqueId(event.target.value);
    setUniqueIdValidation(false);
  };

  const handleClose = () => {
    setUsers([]);
    setUserValidation(false);
    setPostStatuses([]);
    setUserName("");
    setCheckedUser(false);
    setUniqueIdValidation(false);
    setLastUserSelected(null);
    setUsersSelected([]);
    setLastUserSelectedUniqueId(null);
    setIsPersonSearch(true);
    setOpenWindow(false);
  };
  const handleTextFieldChange = (e) => {
    if (userValidation) {
      setUserValidation(false);
      setUniqueIdValidation(false);
    }
    setUserName(e.target.value);
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

      if (lastUserSelectedUniqueId != null) {
        async function fetchData() {
          if (lastUserSelected != null) {
            let foundOne = lastUserSelected.domainUsers.find(
              (ds) => ds.dataSource === config.ONE
            );
            if (foundOne != undefined) {
              setErrorMessageField(errorMessageUserHasOne);
              setUserValidation(true);
              setUniqueIdValidation(true);
              return;
            }
            try {
              let allExistingMigrations = await getImmigrantsApi();
              
              if(allExistingMigrations.find((el) => el.id.toString() === lastUserSelected.id) != undefined){
                setErrorMessageField(errorMessageUserExists);
                setUserValidation(true);
                setUniqueIdValidation(true);
  
                return;
              }
                          
            }
            catch{
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
          allExistingMigrations = await getImmigrantsApi();

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
            user.domainUsers != undefined &&
            user != undefined &&
            user.domainUsers.length != 0
        );
        allMembers = allMembers.filter(
          (el) =>
            el.domainUsers.find((du) => du.dataSource === config.ONE) ===
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
            (el) => akaUIdDomainsMap(el.uniqueId) != undefined
          );
          if (user.domainUsers.length === 0) {
            return;
          }

          let primaryUniqueId = findPrimaryUniqueId(
            user,
            lastUserSelectedUniqueId
          );

          // console.log(primaryUniqueId)
          if (primaryUniqueId != undefined) {
            let obj = Object.assign(user, {
              primaryUniqueId: primaryUniqueId,
              newUser: checkedUser,
            });
            console.log(obj);
            newArr = newArr.concat(obj);
          }
        });
        console.log(newArr)
        setUsersSelected(usersSelected.concat(newArr));
      }

      fetchMembers();
      setLastUserSelected(null);
      setLastUserSelectedUniqueId("");
    }
  };
  const akaUIdDomainsMap = (uniqueId) => {
    let lowerCaseUniqueId = uniqueId.split("@")[1].toLowerCase();
    const found = domainsMap.find(
      (el) => el[1].toLowerCase() === lowerCaseUniqueId
    );
    if (found === undefined) {
      return undefined;
    }
    if (found[0] === config.AdK) {
      return config.AdK;
    }
    if (found[0] === config.Kapaim) {
      return config.Kapaim;
    }
  };
  //
  const findakaOfUIdExcel = (currentUnit) => {
    if (currentUnit === undefined) {
      return undefined;
    }
    const foundAdK = config.akaAdkatz.find(
      (el) => el.toLowerCase() === currentUnit.toLowerCase()
    );
    if (foundAdK != undefined) {
      return config.AdK;
    }
    const foundKapaim = config.akaKapaim.find(
      (el) => el.toLowerCase() === currentUnit.toLowerCase()
    );
    if (foundKapaim != undefined) {
      return config.Kapaim;
    }
    return undefined;
  };

  const findPrimaryUIdByMail = (person) => {
    if (
      person === undefined ||
      person.mail === undefined ||
      person.domainUsers === undefined ||
      person.domainUsers.length === 0
    ) {
      return undefined;
    }
    let personMailLowCase = person.mail.toLowerCase();
    let foundObj = person.domainUsers.find(
      (el) => el.uniqueId.split("@")[0].toLowerCase() === personMailLowCase
    );
    if (foundObj === undefined) {
      return undefined;
    }
    return foundObj.uniqueId;
  };

  const findPrimaryUIdByMainAka = (person, mainAka) => {
    if (
      person === undefined ||
      person.domainUsers === undefined ||
      person.domainUsers.length === 0
    ) {
      return undefined;
    }
    let primaryUIdByMail = findPrimaryUIdByMail(person);
    if (primaryUIdByMail != undefined) {
      let akaDomainsMapMail = akaUIdDomainsMap(primaryUIdByMail);
      if (akaDomainsMapMail === undefined || akaDomainsMapMail != mainAka) {
        let foundObj = person.domainUsers.find(
          (el) => akaUIdDomainsMap(el.uniqueId) === mainAka
        );
        if (foundObj != undefined) {
          return foundObj.uniqueId;
        }
      }
      if (mainAka === akaDomainsMapMail) {
        return person.mail;
      }
    }
    let foundObjAka = person.domainUsers.find(
      (el) => akaUIdDomainsMap(el.uniqueId) === mainAka
    );
    if (foundObjAka === undefined) {
      return person.domainUsers[0].uniqueId;
    }
    return foundObjAka.uniqueId;
  };
  const findPrimaryUniqueId = (person, dataSource) => {
    if (
      person === undefined ||
      person.domainUsers === undefined ||
      person.domainUsers.length === 0
    ) {
      return undefined;
    }
    if (dataSource != "") {
      return findPrimaryUIdByMainAka(person, dataSource);
    }
    let primaryUIdByMail = findPrimaryUIdByMail(person);
    if (primaryUIdByMail != undefined) {
      return primaryUIdByMail;
    }
    let akaFromExcel = findakaOfUIdExcel(person.currentUnit);
    if (akaFromExcel === undefined) {
      return person.domainUsers[0].uniqueId;
    }
    return findPrimaryUIdByMainAka(person, akaFromExcel);
  };

  const handleChangedCheckedUser = (e) => {
    setCheckedUser(!checkedUser);
  };

  const handleSelectedUser = (e, value) => {
    if (!isPersonSearch) {
      setLastUserSelected(value);
      setUsers([]);
      setPostStatuses([]);
      return;
    }
    if (value === null) {
      setLastUserSelected(null);

      setErrorMessageField(errorMessageFieldEmpty);

      return;
    }

    function fetchData() {
      value.domainUsers = value.domainUsers?.filter(
        (el) => akaUIdDomainsMap(el.uniqueId) != undefined
      );
      if (value.domainUsers === undefined || value.domainUsers.length === 0) {
        setErrorMessageField(errorMessageFieldNoUsers);
        setUserValidation(true);
        return;
      }

      setLastUserSelected(value);

      let primaryUniqueId = findPrimaryUniqueId(value);
      if (primaryUniqueId != undefined) {
        setLastUserSelectedUniqueId(primaryUniqueId);
        return;
      }
      setLastUserSelectedUniqueId(null);
    }
    fetchData();
    setUsers([]);
    setPostStatuses([]);
  };

  React.useEffect(() => {
    
    
    clearTimeout(timeoutVar);
    
    let renderTimeout;


    if (userName != undefined && userName.length > 2) {
      renderTimeout = setTimeout(
        async () => {
          setLoadingInput(true);
          if (userName != undefined && userName.length > 2) {
            
            if (isPersonSearch) {
              let newUsers = [];
              try {
                newUsers = await getUsernamesPerNameKart(userName);
              } catch {
                enqueueSnackbar("תקלה בשרת", {
                  variant: "error",
                  autoHideDuration: 2000,
                });
                setUsers([]);
                return;
              }
              let usFiltered = newUsers.filter((usnow) =>
                usnow.name.includes(userName)
              ); //&&  //Remove includes
              setUsers(usFiltered);

            } else {
              let groupsPerName = [];
              try {
                groupsPerName = await getGroupsPerNameKart(userName);
                
              } catch {
                enqueueSnackbar("תקלה בשרת", {
                  variant: "error",
                  autoHideDuration: 2000,
                });
                setUsers([])
                
              }
              setUsers(groupsPerName);
              
            
              // let newGroups = us.filter((usnow) => usnow.name.includes(userName)); //Remove includes
              
            }
          }

          setLoadingInput(false);
        },

        typingTimeout
      );
   
      

      
      setTimeoutVar(renderTimeout);


    }else{
      if(userName===undefined || userName.length ===0){
        setUsers([]);
      }
      
    }

  }, [userName]);

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
      let status = res.status == "rejected" ? "נכשל" : "הצליח";

      if (res.status == "rejected") {
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
            maxWidth: "70vw",
            minWidth: "70vw",
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
            <DialogContentText>
              <span> נא למלא את הטופס בשביל יצירת משתמש ב.</span>
            </DialogContentText>

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
                    <AutoComplete
                      style={{ width: 340 }}
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
                      getOptionLabel={
                        
                        (option) =>  isPersonSearch  ?
                                               
                          option?.name + option?.hierarchy?.join("/") :option?.name
                                
                         
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label={isPersonSearch ? "חפש משתמש" : "חפש קבוצה"}
                          placeholder={isPersonSearch ? "משתמש" : "קבוצה"}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loadingInput ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                          error={userValidation}
                          helperText={userValidation ? errorMessageField : ""}
                        />
                      )}
                      onInputChange={handleTextFieldChange}
                    ></AutoComplete>
                  </div>
                  <div>
                    <FormControl>
                      <InputLabel>{selectMessage}</InputLabel>
                      <Select
                        native
                        style={{ width: "200px" }}
                        value={
                          isPersonSearch
                            ? lastUserSelectedUniqueId
                              ? lastUserSelectedUniqueId
                              : undefined
                            : lastUserSelectedUniqueId
                            ? lastUserSelectedUniqueId
                            : ""
                        }
                        onChange={handleChangedDomain}
                        error={uniqueIdValidation}
                      >
                        {isPersonSearch ? (
                          lastUserSelected != null ? (
                            lastUserSelected.domainUsers.map((el, index) => (
                              <option key={index} value={el.uniqueId}>
                                {el.uniqueId}
                              </option>
                            ))
                          ) : null
                        ) : lastUserSelected != null ? (
                          <>
                            <option key={-1} value={""}>
                              {"ברירת מחדל"}
                            </option>
                            {allNets.map((el, index) => (
                              <option key={index + 1} value={el}>
                                {el}
                              </option>
                            ))}
                          </>
                        ) : null}
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
                <CircularProgress size={24} className="buttonProgress" />
              )}
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
