import React from 'react';
// import './styles.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingContext from './LoadingContext';


export default (props) => {
  const [isLoading, setLoading] = React.useState(false);

  const showLoading = (loading) => {
    setLoading(loading);
  };

  const contextValue = {
    showLoading: showLoading
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {isLoading && <LinearProgress color="secondary" />}
      {props.children}
    </LoadingContext.Provider>
  );
}