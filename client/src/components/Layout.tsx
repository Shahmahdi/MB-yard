import React from 'react';
import { Grid } from '@mui/material';
import { Navbar } from './Navbar';
import { makeStyles } from '@mui/styles';

interface LayoutProps {
  Component: React.ComponentClass | React.StatelessComponent;
}

const useStyles = makeStyles(() => ({
  componentWrapper: {
    padding: "2rem"
  }
}));

export const Layout = (props: LayoutProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12} className={classes.componentWrapper}>
        <props.Component />
      </Grid>
    </Grid>
  );
};
