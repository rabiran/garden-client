import React from 'react';
// import './styles.css';
import storeContext from './storeContext';
import { authApi, domainsApi } from 'api/api';
import { useSnackbar } from 'notistack';
// import useLoading from 'utils/LoadingProvider/useLoading';

export default (props) => {
  const [auth, setAuth] = React.useState(false);
  const [domains, setDomains] = React.useState([]);

  // const loadingProvider = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    getCredentials();
    getDomaninsApi();
    // eslint-disable-next-line 
  }, [])

  const getCredentials = async () => {
    console.log('auth');
    // loadingProvider.showLoading(true);
    const data = await authApi();
    // enqueueSnackbar('auth good', { variant: 'success', autoHideDuration: 2000 });
    // loadingProvider.showLoading(false);
    setAuth(data);
  };

  const getDomaninsApi = async () => {
    console.log('domains');
    // loadingProvider.showLoading(true);
    const data = await domainsApi();
    // enqueueSnackbar('got domains', { variant: 'success', autoHideDuration: 2000 });
    // loadingProvider.showLoading(false);
    setDomains(data);
  };

  const getAuth = () => {
    return auth;
  }

  const getDomains = () => {
    return domains;
  }

  const contextValue = {
    getCredentials: getCredentials,
    getAuth: getAuth,
    getDomains: getDomains
  }

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
}