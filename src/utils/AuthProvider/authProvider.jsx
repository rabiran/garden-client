import React from 'react';
// import './styles.css';
import AuthContext from './authContext';
import { authApi } from 'api/api';
import { useSnackbar } from 'notistack';
import useLoading from 'utils/LoadingProvider/useLoading';

export default (props) => {
  const [auth, setAuth] = React.useState(false);

  const loadingProvider = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    Authenticate();
    // eslint-disable-next-line 
  }, [])

  const Authenticate = async () => {
    console.log('auth');
    loadingProvider.showLoading(true);
    const data = await authApi();
    enqueueSnackbar('auth good', { variant: 'success', autoHideDuration: 2000 });
    loadingProvider.showLoading(false);
    setAuth(data);
  };

  const getAuth = () => {
    return auth;
  }

  const contextValue = {
    Authenticate: Authenticate,
    getAuth: getAuth
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}