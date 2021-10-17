import React, {useEffect} from "react";
import { CardView } from "../../components/Card";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: "1280px",
    margin: "auto"
  },
  productDetailsWrapper: {
    marginBottom: "2rem !important"
  }
}));

export const LandingPage = () => {
  const classes = useStyles();
  useEffect(() => {
    console.log(`==================landing page called =============`);
  }, []);
  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} sm={6} lg={4} className={classes.productDetailsWrapper}>
        <CardView
          title='Walton W43TS-130F 43 inch LED TV - Black'
          description='A LED-backlit LCD is a liquid-crystal display that uses LEDs for backlighting instead of traditional cold cathode fluorescent backlighting. LED-backlit displays use the same TFT LCD technologies as CCFL-backlit LCDs, but offer a variety of advantages over them.'
          imageUrl="http://localhost:4000/images/bike/heroHunk.png"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4} className={classes.productDetailsWrapper}>
        <CardView
          title='Walton W43TS-130F 43 inch LED TV - Black'
          description='A LED-backlit LCD is a liquid-crystal display that uses LEDs for backlighting instead of traditional cold cathode fluorescent backlighting. LED-backlit displays use the same TFT LCD technologies as CCFL-backlit LCDs, but offer a variety of advantages over them.'
          imageUrl="http://localhost:4000/images/bike/heroHunk.png"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4} className={classes.productDetailsWrapper}>
        <CardView
          title='Walton W43TS-130F 43 inch LED TV - Black'
          description='A LED-backlit LCD is a liquid-crystal display that uses LEDs for backlighting instead of traditional cold cathode fluorescent backlighting. LED-backlit displays use the same TFT LCD technologies as CCFL-backlit LCDs, but offer a variety of advantages over them.'
          imageUrl="http://localhost:4000/images/bike/heroHunk.png"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4} className={classes.productDetailsWrapper}>
        <CardView
          title='Walton W43TS-130F 43 inch LED TV - Black'
          description='A LED-backlit LCD is a liquid-crystal display that uses LEDs for backlighting instead of traditional cold cathode fluorescent backlighting. LED-backlit displays use the same TFT LCD technologies as CCFL-backlit LCDs, but offer a variety of advantages over them.'
          imageUrl="http://localhost:4000/images/bike/heroHunk.png"
        />
      </Grid>
    </Grid>
  );
};
