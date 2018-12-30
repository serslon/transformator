import './bootstrap';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const style = makeStyles({
  root: {
    top: 'calc(50% - 30px)',
    left: 'calc(50% - 30px)',
    width: '50px',
    height: '50px',
    position: 'absolute',
  },
});

const Spinner = () => {
  const classes = style();
  return <CircularProgress disableShrink size="50" className={classes.root} />;
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
