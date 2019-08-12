import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import {
  List,
  Menu,
  Grid,
  Paper,
  AppBar,
  Drawer,
  Button,
  Toolbar,
  ListItem,
  MenuItem,
  Typography,
  IconButton,
} from '@material-ui/core';
import Auto from './components/Auto';
import Power from './components/Power';
import Pulse from './components/Pulse';
import debug from './debug';
const logger = debug('App');

const style = makeStyles({
  grow: {
    flexGrow: 1,
  },
  container: {
    marginTop: 0,
  },
});

const App = () => {
  const classes = style();
  const types = ['pulse', 'power', 'auto'];
  const [showDrawer, setShowDrawer] = useState(false);
  const [method, setMethod] = useState(types[0]);
  const [lngMenu, setLngMenu] = useState(null);
  const [t, i18n] = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const languages = { en: t('English'), ru: t('Russian') };
  const nameTypes = {
    power: t('Transform power'),
    pulse: t('Pulse Transformer'),
    auto: t('Autotransformer'),
  };
  const component = {
    power: <Power />,
    pulse: <Pulse />,
    auto: <Auto />,
  };

  const closeLngMenu = () => setLngMenu(null);

  const openLngMenu = event => setLngMenu(event.currentTarget);

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setLngMenu(null);
  };

  const onOpenDrawer = () => setShowDrawer(true);
  const onCloseDrawer = () => setShowDrawer(false);
  const onChangeMethod = method => () => {
    setMethod(method);
    onCloseDrawer();
  };

  const theme = createMuiTheme({});
  logger('Render application');
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={onOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {nameTypes[method]}
          </Typography>
          <Button onClick={openLngMenu} aria-owns={lngMenu ? 'menu-language' : undefined} aria-haspopup="true">
            {languages[currentLang]}
          </Button>
          <Menu id="menu-language" open={Boolean(lngMenu)} onClose={closeLngMenu} anchorEl={lngMenu}>
            {Object.keys(languages).map((key, idx) => (
              <MenuItem key={idx} selected={key === currentLang} onClick={() => changeLanguage(key)}>
                {languages[key]}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={12}>
          <Paper>{component[method]}</Paper>
        </Grid>
      </Grid>
      <Drawer anchor="left" open={showDrawer} onClose={onCloseDrawer}>
        <List>
          {Object.keys(nameTypes).map((item, idx) => (
            <ListItem key={idx}>
              <Button disabled={method === item} onClick={onChangeMethod(item)}>
                {nameTypes[item]}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default App;
