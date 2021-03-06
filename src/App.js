import React from 'react';
import { SnackbarProvider } from 'notistack';
import MainPage from 'pages/Main';
import AdminPage from 'pages/Admin';
import UnathorizedPage from 'pages/Unathorized';
import Charts from 'pages/Charts';
import Header from 'components/Header';
import RTL from 'utils/RTL';
import ThemeProvider from 'utils/ThemeProvider/ThemeProvider';
import LoadingProvider from 'utils/LoadingProvider/LoadingProvider';
import StoreProvider from 'utils/StoreProvider/storeProvider'
import LoadingBar from 'utils/LoadingBar';



// import { Router } from 'react-router';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <RTL>
        <ThemeProvider>
          <SnackbarProvider maxSnack={3} style={{ width: '50%' }}>
            <LoadingProvider>
              <StoreProvider >
                <Router>
                  <Header />
                  <LoadingBar />
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="/unathorized" component={UnathorizedPage} />
                    <Route exact path="/charts" component={Charts} />
                   
                    {/* <ProtectedRoute exact path="/" component={MainPage} /> */}
                  </Switch>
                </Router>
              </StoreProvider>
            </LoadingProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </RTL>
    </>
  );
}

export default App;
