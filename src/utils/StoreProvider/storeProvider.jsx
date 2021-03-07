import React from "react";
// import './styles.css';
import storeContext from "./storeContext";
import { authApi, domainsApi, getImmigrantsApi, excelApi,entityTypeApi ,domainsMapApi } from "api/api";
import { useSnackbar } from "notistack";
import useLoading from "utils/LoadingProvider/useLoading";

export default (props) => {
  const [auth, setAuth] = React.useState(false);
  const [domains, setDomains] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [excelJs, setExcelJs] = React.useState(null);
  const [entityType , setEntityType] = React.useState(null);
  const [domainsMap, setDomainsMap] = React.useState(null)
  const loadingProvider = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    getCredentials();
    getDomaninsApi();
    getTableDataApi();
    getExcelDataApi();
    getEntityTypeDataApi();
    getDomainsMapDataApi();

    // eslint-disable-next-line
  }, []);

  const getTableDataApi = async () => {
    loadingProvider.showLoading(true);
    try {
      const data = await getImmigrantsApi();
      enqueueSnackbar("מידע התקבל", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setTableData(data);
    } catch {
      enqueueSnackbar("נכשל", { variant: "error", autoHideDuration: 2000 });
    }
    loadingProvider.showLoading(false);
  };

  const getExcelDataApi = async () => {
    try {
      const dataEx = await excelApi();
      console.log("hey")
      setExcelJs(dataEx);
    } catch {
      console.log("hgh2")
      enqueueSnackbar("נכשל", { variant: "error", autoHideDuration: 2000 });
    }
  };
  const getDomainsMapDataApi = async () => {
    try {
      const domainsMapData = await domainsMapApi();
      console.log("hey")
      setDomainsMap(domainsMapData);
    } catch {
      console.log("hgh2")
      enqueueSnackbar("נכשל", { variant: "error", autoHideDuration: 2000 });
    }
  };
  const getEntityTypeDataApi = async () => {
    try {
      const entity = await entityTypeApi();
      setEntityType(entity);
    } catch { 
      enqueueSnackbar("נכשל", { variant: "error", autoHideDuration: 2000 });
    }
  };

  const getCredentials = async () => {
    console.log("auth");
    // loadingProvider.showLoading(true);
    const data = await authApi();
    // enqueueSnackbar('auth good', { variant: 'success', autoHideDuration: 2000 });
    // loadingProvider.showLoading(false);
    setAuth(data);
  };

  const getDomaninsApi = async () => {
    console.log("domains");
    // loadingProvider.showLoading(true);
    const data = await domainsApi();
    // enqueueSnackbar('got domains', { variant: 'success', autoHideDuration: 2000 });
    // loadingProvider.showLoading(false);
    setDomains(data);
  };

  const getEntityType = () => {
    return entityType;
  };

  const getTableData = () => {
    return tableData;
  };
  const getDomainsMap = () =>{
    return domainsMap;
  }
  const getAuth = () => {
    return auth;
  };
  const getExcel = () => {
    return excelJs;
  };

  const getDomains = () => {
    return domains;
  };

  const updateTableData = (data) => {
    setTableData(data);
  };
  const contextValue = {
    fetchTableData: getTableDataApi,
    getCredentials: getCredentials,
    getAuth: getAuth,
    getDomains: getDomains,
    getTableData: getTableData,
    getExcel: getExcel,
    updateTableData: updateTableData,
    getEntityType: getEntityType,
    getDomainsMap: getDomainsMap
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};
