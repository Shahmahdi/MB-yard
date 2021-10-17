import React, { useState } from "react";
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
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { getWishlist, removeItemIntoWishlist, updateUserWishlist } from "../stores/user/Actions";
import { SnacbarField } from "./common/SnacbarField";

const useStyles = makeStyles(() => ({
  listItem: {
    paddingRight: "70px !important"
  },
  borderBottom: {
    borderBottom: "1px solid lightgray"
  }
}));

interface ShoppingCartInternalProps {
  userInfo?: any;
  updateUserWishlist: (val: any) => void
}

const ShoppingCartComponent = (props: ShoppingCartInternalProps) => {
  const classes = useStyles();
  const [showSnacbar, setShowSnacbar] = useState(false);
  const [response, setResponse] = useState({} as any);

  const removeItemFromList = async (productId: string) => {
    const res: any = await removeItemIntoWishlist(props.userInfo.token, productId);
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

  return (
    <Grid container>
      <Grid item xs={12}>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {props.userInfo.wishlist && props.userInfo.wishlist.map((product: any, i: number) => {
            return (
              <ListItem
                key={i}
                className={`${classes.listItem} ${props.userInfo.wishlist.length !== i + 1 ? `${classes.borderBottom}` : ""
                  }`}
                alignItems='flex-start'
                secondaryAction={
                  <IconButton onClick={() => removeItemFromList(product._id)} aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                }>
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src={product.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component='span'
                        variant='body2'
                        color='text.primary'>
                        {product.price}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
          {props.userInfo.wishlist && props.userInfo.wishlist.length > 0 &&
            <ListItem alignItems='flex-start' secondaryAction={props.userInfo.totalWishlistAmount}>
              <ListItemButton>
                <ListItemText id='last_row' primary={`Total`} />
              </ListItemButton>
            </ListItem>
          }
          {props.userInfo.wishlist && props.userInfo.wishlist.length === 0 &&
            <ListItem alignItems='center'>
              <ListItemButton>
                <ListItemText id='last_row' primary={`No item selected yet.`} />
              </ListItemButton>
            </ListItem>
          }
        </List>
        <SnacbarField
          message={response.message}
          open={showSnacbar}
          onClose={() => setShowSnacbar(false)}
          type={response.status}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userInfo: state.userReducer,
  }
}

export const ShoppingCart = connect(mapStateToProps, {updateUserWishlist})(ShoppingCartComponent);
