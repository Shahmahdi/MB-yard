import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@mui/material";

import a from "../styles/heroHunk.png";

// const image = require("../styles/heroHunk.png")

interface CardViewProps {
  title: string;
  description: string;
  imageUrl: any;
}

export const CardView = (props: CardViewProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='100%'
        width="100%"
        // image={require(props.imageUrl)}
        // image="http://localhost:4000/images/bike/heroHunk.png"
        image={a}
        alt={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};
