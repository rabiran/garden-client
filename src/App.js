import React from 'react';
import MainPage from 'pages/Main';
import AdminPage from 'pages/Admin';
import Header from 'components/Header';
import RTL from 'utils/RTL';
import ThemeProvider from 'utils/ThemeProvider/ThemeProvider';
import history from 'utils/history';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <RTL>
        <ThemeProvider>
          <Header />
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/admin" component={AdminPage} />
              {/* <ProtectedRoute exact path="/" component={MainPage} /> */}
            </Switch>
          </Router>
        </ThemeProvider>
      </RTL>
    </>
  );
}

export default App;
