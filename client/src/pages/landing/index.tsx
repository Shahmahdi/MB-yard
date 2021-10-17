import React, { useEffect } from "react";
import { CardView } from "../../components/Card";
import { Alert, Button, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { fetchingProductList, getProductList, setProductList, fetchingFailedProductList } from "../../stores/product/Actions";
import { Box } from "@mui/system";

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: "1280px",
    margin: "auto"
  },
  productDetailsWrapper: {
    marginBottom: "2rem !important"
  }
}));

interface LandingPageInternalProps {
  products: any
  setProductList: (data: any) => void;
  fetchingProductList: () => void;
  fetchingFailedProductList: (message: string) => void;
}

const LandingPageComponent = (props: LandingPageInternalProps) => {
  const classes = useStyles();

  let limit = 10;
  let skip = 0;
  const fetchProductList = async () => {
    props.fetchingProductList();
    const res: any = await getProductList(limit, skip);
    if (res.status === "fail") {
      props.fetchingFailedProductList(res.message);
    } else {
      props.setProductList({
        list: res.products,
        hasMore: res.hasMore
      });
    }
  }

  const onClickNextButton = async () => {
    limit = limit + 10;
    skip = skip + 10
    await fetchProductList();
  }

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <Grid container className={classes.wrapper}>
      {props.products.fetchingFailed && 
        <Box display="flex" justifyContent="center" height="100%">
          <Alert severity='error'>{props.products.fetchingFailedMessage}</Alert>
        </Box>
      }
      {props.products.fetchingList ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "50vh", width: "100%" }}>
        <CircularProgress />
      </Box> : <>
      {props.products.list.map((product: any, i: number) => (
        <Grid key={i} item xs={12} sm={6} lg={4} className={classes.productDetailsWrapper}>
          <CardView
            product={product}
          />
        </Grid>
      ))}
      {props.products.hasMore && <Grid display="flex" justifyContent="flex-end" item xs={12}>
        <Button variant="contained" onClick={() => onClickNextButton()}>Next</Button>
        </Grid>}
      </>}
      {props.products.list.length === 0 && !props.products.fetchingFailed &&
        <Box display="flex" justifyContent="center" height="100%">
          <Alert severity='info'>No item found.</Alert>
        </Box>
      }
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    products: state.productReducer
  }
}

export const LandingPage = connect(mapStateToProps, { setProductList, fetchingProductList, fetchingFailedProductList })(LandingPageComponent);
