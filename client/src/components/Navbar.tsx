import React from "react";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Popover
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { makeStyles } from "@mui/styles";
// import { makeStyles } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { LoginForm } from "./LoginForm";
import { ShoppingCart } from "./ShoppingCart";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#ffffff26",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch"
    }
  }
}));
const useStyles = makeStyles(() => ({
  navbarWrapper: {
    backgroundColor: "#55B9A3 !important"
  },
  searchBarSection: {
    display: "flex",
    justifyContent: "center"
  }
}));

export const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [anchorElOfShoppingCart, setAnchorElOfShoppingCart] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <AppBar position='static' className={classes.navbarWrapper}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            MB-yard
          </Typography>
          <Box className={classes.searchBarSection} sx={{ flexGrow: 1 }}>
            <div>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Search for…'
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
          </Box>
          <Box>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              onClick={e => setAnchorElOfShoppingCart(e.currentTarget)}>
              <Badge badgeContent={4} color='error'>
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-haspopup='true'
              color='inherit'
              onClick={e => setAnchorEl(e.currentTarget)}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Popover
        id="login_form_popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}>
        <LoginForm />
      </Popover>
      <Popover
        id="login_form_popover"
        open={Boolean(anchorElOfShoppingCart)}
        anchorEl={anchorElOfShoppingCart}
        onClose={() => setAnchorElOfShoppingCart(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}>
        <ShoppingCart />
      </Popover>
    </>
  );
};
