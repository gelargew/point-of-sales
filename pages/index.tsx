import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { ROUTES } from '../src/CONSTANTS';
import { List, ListItemButton } from '@material-ui/core';
import Head from 'next/head';


export default function Index() {
  return (
    <Container maxWidth="sm">
      <Head>
          <title>Point of Sales</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ my: 4 }}>
        <List>
          {ROUTES.map(route => 
          <ListItemButton key={route.path} >
            <Link href={route.path} color="secondary">
              Go to {route.name}
            </Link>
          </ListItemButton>)}
          
        </List>
        
      </Box>
    </Container>
  );
}
