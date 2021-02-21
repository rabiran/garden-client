import "./styles.css";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "lodash.debounce";
import { useAsync } from "react-async-hook";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUsernamesPerNameKart, getGroupsPerNameKart } from "../../api/api";
import {
  akaUIdDomainsMap,
  findPrimaryUniqueId

} from "../../utils/Functions/func";

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

}) {
  const { enqueueSnackbar } = useSnackbar();
  const [loadingInput,setLoadingInput] = React.useState(false);
  const [inputText, setInputText] = React.useState("");

  async function searchFunction(inputText, isPersonSearch) {
    console.log(inputText);
    console.log(isPersonSearch)
    setLoadingInput(true);
    if (isPersonSearch) {
      let newUsers = [];
      try {
        newUsers = await getUsernamesPerNameKart(inputText);
      } catch {
        enqueueSnackbar("תקלה בשרת", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setUsers([]);
        return;
      }
      let usFiltered = newUsers.filter((usnow) =>
        usnow.name.includes(inputText)
      ); //&&  //Remove includes
      setUsers(usFiltered);
    } else {
      let groupsPerName = [];
      try {
        groupsPerName = await getGroupsPerNameKart(inputText);
      } catch {
        enqueueSnackbar("תקלה בשרת", {
          variant: "error",
          autoHideDuration: 2000,
        });
        setUsers([]);
      }
      setUsers(groupsPerName);

      // let newGroups = us.filter((usnow) => usnow.name.includes(userName)); //Remove includes
    }

    setLoadingInput(false);
  }

  const handleSelectedUser = (e, value) => {
    if (!isPersonSearch) {
      setLastUserSelected(value);
      setLastUserSelectedUniqueId("ברירת מחדל")
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
        console.log("hey")
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

  const delayedQuery = React.useCallback(
    debounce((inputText,isPersonSearch) => searchFunction(inputText,isPersonSearch), 2000),
    []
  );


  React.useEffect(() => {
    if (userValidation && lastUserSelected === null) {
      setUserValidation(false);
      setUniqueIdValidation(false);
    }
    
    if (inputText.length > 2 && lastUserSelected === null ) {
      console.log("Heys")
      delayedQuery(inputText,isPersonSearch);
    }
    return delayedQuery.cancel;
  }, [inputText]);

  const handleInput = (e, value) => {
    setInputText(value);
  };

  return (
    <div className="App">
      <Autocomplete
        id="combo-box-demo"
        options={users}
        getOptionLabel={(option) =>
          isPersonSearch
            ? option?.name + option?.hierarchy?.join("/")
            : option?.name
        }
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
      />
    </div>
  );
}

export default App;
