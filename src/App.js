import React from 'react';
import { SnackbarProvider } from 'notistack';
import MainPage from 'pages/Main';
import AdminPage from 'pages/Admin';
import UnathorizedPage from 'pages/Unathorized';
import Header from 'components/Header';
import RTL from 'utils/RTL';
import ThemeProvider from 'utils/ThemeProvider/ThemeProvider';
import LoadingProvider from 'utils/LoadingProvider/LoadingProvider';
import StoreProvider from 'utils/StoreProvider/storeProvider'
import history from 'utils/history';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <RTL>
        <ThemeProvider>
          <SnackbarProvider maxSnack={3} style={{ width: '50%' }}>
            <StoreProvider >
              <Header />
              <LoadingProvider>
                <Router history={history}>
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="/unathorized" component={UnathorizedPage} />
                    {/* <ProtectedRoute exact path="/" component={MainPage} /> */}
                  </Switch>
                </Router>
              </LoadingProvider>
            </StoreProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </RTL>
    </>
  );
}

export default App;
