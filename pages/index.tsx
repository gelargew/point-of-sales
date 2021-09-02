import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { COLOR_PALLETE, ROUTES } from '../src/CONSTANTS';
import { List, ListItemButton, Typography } from '@material-ui/core';
import Head from 'next/head';


export default function Index() {
  return (
    <Container maxWidth="sm">
      <Head>
          <title>Point of Sales</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ 
        padding: 5,
        bgcolor: COLOR_PALLETE.main,
        height: '100vh'
         }} >
        <Typography variant='h2'>
          Point of Sales Prototype
        </Typography>
        <List>
          {ROUTES.map(route => 
          <ListItemButton key={route.path} >
            <Link href={route.path} color="secondary">
              Go to {route.name} Page
            </Link>
          </ListItemButton>)}
          
        </List>
        
      </Box>
    </Container>
  );
}
