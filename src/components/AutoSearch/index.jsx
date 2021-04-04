import "./styles.css";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUsernamesPerNameKart, getGroupsPerNameKart } from "../../api/api";
import useStore from "utils/StoreProvider/useStore";
import config from "../../config"; 

import {
  akaUIdDomainsMap,
  findPrimaryUniqueId

} from "../../utils/Functions/func";
import domainsMaps from "api/domainsMaps";

function App({
  isPersonSearch = false,
  setLastUserSelected,
  users,
  setUsers,
  lastUserSelected,
  setUserValidation,
  setUniqueIdValidation,
  userValidation ,
  setErrorMessageField,
  errorMessageField,
  errorMessageFieldEmpty,
  errorMessageFieldNoUsers,
  setPostStatuses,
  setLastUserSelectedUniqueId,
  errorMessageFieldIsG,
  errorMessageUserHasOne,
  errorMessageUserExistsP,
  usersSelected,
  
  errorMessageUserAlreadyInTbl,
  isNormalSearch= false,

}) {
  const storeProvider = useStore();
  const domains = storeProvider.getDomains();
  const excel = storeProvider.getExcel();
  const entityType = storeProvider.getEntityType();
  const domainsMap = storeProvider.getDomainsMap();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingInput,setLoadingInput] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [triggeredSearch , setTriggeredSearch] = React.useState(false);
  

  async function searchFunction(inputText, isPersonSearch) {

    setLoadingInput(true);
    async function searchData(){
      if (isPersonSearch) {
        
        try {
          
            let newUsers = await getUsernamesPerNameKart(inputText);
            setUsers(newUsers);
            console.log(newUsers)
            return;
         

        } catch {
          enqueueSnackbar("תקלה בחיפוש משתמש לפי שם", {
            variant: "error",
            autoHideDuration: 2000,
          });
          console.log("Hey")
          setUsers([]);
          return;
        }
  
      } else {
        let groupsPerName = [];
        try {
          groupsPerName = await getGroupsPerNameKart(inputText);
        } catch {
          enqueueSnackbar("תקלה בחיפוש קבוצה לפי שם", {
            variant: "error",
            autoHideDuration: 2000,
          });
          setUsers([]);
        }
        setUsers(groupsPerName);
  
        // let newGroups = us.filter((usnow) => usnow.name.includes(userName)); //Remove includes
      }
    }
    await searchData();

    setLoadingInput(false);
  }

  const handleSelectedUser = (e, value) => {
    if(isNormalSearch){
      setLastUserSelected(value);
      setTriggeredSearch(true);
      setUsers([]);
      return;
    }

    if (!isPersonSearch) {
      setTriggeredSearch(true);
      setLastUserSelected(value);
      setLastUserSelectedUniqueId("ברירת מחדל")
      setUsers([]);
  
      setPostStatuses([]);
      return;
    }
    if (value === null) {
      setTriggeredSearch(true);
      setLastUserSelected(null);
      
      setErrorMessageField(errorMessageFieldEmpty);

      return;
    }

    function fetchData(value) {
      console.log(value)
      value.domainUsers = value.domainUsers?.filter(
        (el) => akaUIdDomainsMap(el.uniqueID,domains,domainsMap) !== undefined
      );
      if (value.domainUsers === undefined || value.domainUsers.length === 0) {
        setErrorMessageField(errorMessageFieldNoUsers);

        setTriggeredSearch(true)
        setUserValidation(true);
        return;
      }
      if(value.entityType === entityType){
        setErrorMessageField(errorMessageFieldIsG);
        setUserValidation(true);
        setTriggeredSearch(true)
        return;
      }
      let foundOne = value.domainUsers.find(
        (ds) => ds.dataSource === domains.target
      );
      if (foundOne !== undefined) {
        setErrorMessageField(errorMessageUserHasOne);
        setUserValidation(true);
        setTriggeredSearch(true);
        
        return;
      }
      let allExistingMigrations = storeProvider.getTableData();

      if (
        allExistingMigrations.find(
          (el) => el.personId === value.id
        ) !== undefined
      ) {
        setErrorMessageField(errorMessageUserExistsP);
        setUserValidation(true);
        setTriggeredSearch(true);

        return;
      }
      let foundUser = usersSelected.find(
        (user) => user.id === lastUserSelected.id
      );
      if(foundUser !== undefined){
        setErrorMessageField(errorMessageUserAlreadyInTbl);
        setUserValidation(true);
        setTriggeredSearch(true);

        return;
      }
      setTriggeredSearch(true)
      setLastUserSelected(value);

      let primaryUniqueId = findPrimaryUniqueId(value,"",domains,excel,domainsMap);
      if (primaryUniqueId !== undefined) {
        setLastUserSelectedUniqueId(primaryUniqueId);
        return;
      }
      setLastUserSelectedUniqueId(null);
    }
    fetchData(value);
    setUsers([]);
    setPostStatuses([]);
  };
  
  const delayedQuery = React.useCallback(
    debounce((inputText,isPersonSearch) => searchFunction(inputText,isPersonSearch), 2000),
    []
  );


  React.useEffect(() => {

    if (inputText.length > 2 && triggeredSearch === false) {
      delayedQuery(inputText,isPersonSearch);
    }
      setTriggeredSearch(false);
    
  
    return delayedQuery.cancel;
  }, [inputText]);

  const handleInput = (e, value) => {

    if (userValidation) {
      setUserValidation(false);
      setUniqueIdValidation(false);
    }
    setInputText(value);
  };

  return (
    <div className="App">
      <Autocomplete
      
        // id="combo-box-demo"
        options={users}
        limitTags={20}
        getOptionLabel={(option) =>
          isPersonSearch
            ? option?.fullName +"/"+ option?.hierarchy?.join("/")
            : option?.name +"/"+ option?.hierarchy?.join("/")
        }
        noOptionsText={"אין תוצאות"}
        filterOptions={(options, state) => options}
        style={{ width: 340 }}
        onInputChange={handleInput}
        onChange={handleSelectedUser}
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
                    <CircularProgress className="circular" color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            error={userValidation}
            helperText={userValidation ? errorMessageField : ""}
          />
        )}
      />
    </div>
  );
}

export default App;
