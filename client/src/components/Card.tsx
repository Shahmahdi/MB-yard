import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
interface CardViewProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  priceText: {
    marginTop: "1.5rem !important",
    display: "flex",
    justifyContent: "space-between"
  }
}));

export const CardView = (props: CardViewProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.wrapper} sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='auto'
        width="auto"
        image={props.imageUrl}
        alt={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.description}
        </Typography>
        <Typography className={classes.priceText} align="justify" gutterBottom variant='h5' color='div'>
          <span>Price</span><span> {props.price}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Add to wishlist</Button>
      </CardActions>
    </Card>
  );
};
