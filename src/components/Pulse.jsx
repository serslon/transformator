import React, { useState, useEffect } from 'react';
import concatString from '@serslon/concat-string';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, MenuItem } from '@material-ui/core';

import debug from '../debug';
const logger = debug('Pulse');

const style = makeStyles(theme => {
  logger(theme)
  return {
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '100%',
    },
  }
});

const Pulse = () => {
  const [t] = useTranslation();
  const signals = ['sinus', 'square'];
  const signalNames = {
    sinus: t('Sinus'),
    square: t('Square'),
  };
  const [signal, setSignal] = useState(signals[0]);
  const [volt1, setSvolt1] = useState(0);
  const [volt2, setSvolt2] = useState(0);
  const classes = style();

  useEffect(
    () => {
      const kf = signal === 'sinus' ? 1.11 : 1;
      const kok = 0.35;
      logger(kf);
    },
    [signal],
  );

  logger('Render Pulse');
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <TextField
          select
          label={t('The form of signal')}
          className={concatString(classes.margin, classes.textField)}
          value={signal}
          variant="outlined"
          onChange={event => setSignal(event.target.value)}
        >
          {signals.map(item => (
            <MenuItem key={item} value={item}>
              {signalNames[item]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label={t('primary voltage')}
          className={concatString(classes.margin, classes.textField)}
          value={signal}
          variant="outlined"
          onChange={event => setSignal(event.target.value)}
        >
          {signals.map(item => (
            <MenuItem key={item} value={item}>
              {signalNames[item]}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default Pulse;
