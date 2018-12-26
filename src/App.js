import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next/hooks';
import { makeStyles, ThemeProvider, useTheme, withTheme } from '@material-ui/styles';

const style = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const App = () => {
  const classes = style();
  const types = ['power'];
  const [method, setMethod] = useState(types[0]);
  const [lngMenu, setLngMenu] = useState(null);
  const [t, i18n] = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const languages = { en: t('English'), ru: t('Russian') };
  const nameTypes = {
    power: t('Transform power'),
  };

  const closeLngMenu = () => setLngMenu(null);

  const openLngMenu = event => setLngMenu(event.currentTarget);

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setLngMenu(null);
  };

  return (
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
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
  );
};

export default withTheme()(App);
