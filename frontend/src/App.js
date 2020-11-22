import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import Routes from './Routes';
import { AuthProvider } from "./shared/Authentication"
import './App.css'
import 'antd/dist/antd.css';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </ThemeProvider>

  );
}

export default App;
