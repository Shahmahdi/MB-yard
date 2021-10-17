import React from "react";
import {
  Grid,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import a from "../styles/heroHunk.png";
import { makeStyles } from "@mui/styles";

const demoData = [
  {
    name: "NAVIFORCE Watch for Men - Silver",
    description: "Black PU Leather Analog Watch for Men - Black",
    price: 1000,
    imageUrl: "../../images/menWatch/naviforce.png",
    categoryName: "Men's Watch"
  },
  {
    name: "Hero Hunk 150cc Motor Bike",
    description:
      "Hero has used 149.2cc engine in this Hunk 150 bike, which is Air cooled, 4 Stroke 2 Valve Single cylinder OHC. The bike is capable of generating a maximum power of 15.6 Bhp @ 8500 rpm and a maximum torque of 13.50 Nm @ 7000 rpm. The bike is capable of running at a maximum speed of about 107 Kmph. The Hunk 150 bike has an average mileage of about 45 Kmpl.",
    price: 130000,
    imageUrl: "../../images/bike/heroHunk.png",
    categoryName: "Motor bike"
  },
  {
    name: "Honda CBR150R Motor Bike - 150 cc",
    description:
      "The CBR150R is one of the stylish latest super bikes of Honda. Including its outstanding features like - sporty look and wonderful color combination along with liquid-cooled powerful engine which included a program fuel injection. In comparison, its price is higher in Bangladesh, but its demand for fashion-based Bangladeshis is above all. The CBR sports bikes are a big part of the motor sports world. Yamaha R15 v3, Suzuki GSX R150 are the strong competitors of this super dashing bike.",
    price: 160000,
    imageUrl: "../../images/bike/hondaCbr150.jpeg",
    categoryName: "Motor bike"
  }
];

const useStyles = makeStyles(() => ({
  listItem: {
    paddingRight: "70px !important"
  },
  borderBottom: {
    borderBottom: "1px solid lightgray"
  }
}));

export const ShoppingCart = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {demoData.map((value, i) => {
            // const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={i}
                className={`${classes.listItem} ${
                  demoData.length !== i + 1 ? `${classes.borderBottom}` : ""
                }`}
                alignItems='flex-start'
                secondaryAction={
                  // <Checkbox
                  //   edge="end"
                  //   onChange={handleToggle(value)}
                  //   checked={checked.indexOf(value) !== -1}
                  //   inputProps={{ 'aria-labelledby': labelId }}
                  // />
                  <IconButton aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                }>
                {/* <ListItem alignItems='flex-start'> */}
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src={a} />
                </ListItemAvatar>
                <ListItemText
                  primary={value.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component='span'
                        variant='body2'
                        color='text.primary'>
                        {value.price}
                      </Typography>
                    </React.Fragment>
                  }
                />
                {/* </ListItem> */}
                {/* <Divider variant='inset' component='li' /> */}
              </ListItem>
            );
          })}
          <ListItem alignItems='flex-start' secondaryAction={100000}>
            <ListItemButton>
              <ListItemText id='last_row' primary={`Continue`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
