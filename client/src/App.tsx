import React from 'react';
import { Grid } from '@mui/material';
import './App.css';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
    </Grid>
  );
}

export default App;
