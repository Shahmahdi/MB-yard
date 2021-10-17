import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { showLoginForm } from "../stores/auth/Actions";
import { addItemIntoWishlist, getWishlist, updateUserWishlist } from "../stores/user/Actions";
import { SnacbarField } from "./common/SnacbarField";

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

interface CardViewProps {
  product: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  }
}

interface CardViewInternalProps extends CardViewProps {
  userInfo: any;
  showLoginForm: (val: boolean) => void;
  updateUserWishlist: (val: any) => void;
}

const CardViewComponent = (props: CardViewInternalProps) => {
  const classes = useStyles();
  const [showSnacbar, setShowSnacbar] = useState(false);
  const [response, setResponse] = useState({} as any);

  const addItemToWishlist = async (product: any) => {
    if (!props.userInfo.token) {
      props.showLoginForm(true);
      return;
    } else {
      const res: any = await addItemIntoWishlist(props.userInfo.token, product._id);
      setResponse(res);
      setShowSnacbar(true);
      if (res.status === "success") {
        const updatedWishlist: any = await getWishlist(props.userInfo.token);
        const formateData = {
          list: updatedWishlist.wishlist,
          totalAmount: updatedWishlist.totalAmount
        }
        props.updateUserWishlist(formateData);
      }
    }
  }

  return (
    <Card className={classes.wrapper} sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='auto'
        width="auto"
        image={props.product.imageUrl}
        alt={props.product.title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.product.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.product.description}
        </Typography>
        <Typography className={classes.priceText} align="justify" gutterBottom variant='h5' color='div'>
          <span>Price</span><span> {props.product.price}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => addItemToWishlist(props.product)}>Add to wishlist</Button>
      </CardActions>
      <SnacbarField
        message={response.message}
        open={showSnacbar}
        onClose={() => setShowSnacbar(false)}
        type={response.status}
      />
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    // auth: state.authReducer,
    userInfo: state.userReducer,
    // products: state.productReducer
  }
}

export const CardView = connect(mapStateToProps, { showLoginForm, updateUserWishlist })(CardViewComponent);
