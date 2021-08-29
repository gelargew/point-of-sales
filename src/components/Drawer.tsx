import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import { ROUTES } from '../CONSTANTS';
import { Box, ListItemButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ArrowRightRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'left'
export default function TemporaryDrawer() {
// Material ui bug with deprecated dependencies
// @ts-ignore
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => {
    const router = useRouter()

    return (   
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {ROUTES.map(route => 
            <ListItemButton key={route.path} onClick={() => router.push(route.path)}>
              <ListItemIcon><ArrowRightRounded /></ListItemIcon>
              <ListItemText primary={route.name} /> 
            </ListItemButton>)}
        </List>
      </div>
  )};

  return (
    <Box position='fixed' zIndex={10} >
      {(['left'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize='large' /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}