import React, { useState, useEffect } from "react";
import { CardView } from "../../components/Card";
import { Alert, Button, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { getProductList, setProductList } from "../../stores/product/Actions";
import { Box } from "@mui/system";
import { ActionResponse } from "../../stores/InterfaceTypes";

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
  setProductList: (data: any) => void
}

const LandingPageComponent = (props: LandingPageInternalProps) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({} as ActionResponse);

  let limit = 10;
  let skip = 0;
  const fetchProductList = async () => {
    setResponse({ status: "", message: "" });
    const res: any = await getProductList(limit, skip);
    if (res.status === "fail") {
      setResponse(res);
    } else {
      props.setProductList({
        list: res.products,
        hasMore: res.hasMore
      });
    }
    setLoading(false);
  }

  const onClickNextButton = async () => {
    limit = limit + 10;
    skip = skip + 10
    await fetchProductList();
  }

  useEffect(() => {
    console.log(`==================landing page called =============`);
    fetchProductList();
  }, []);

  return (
    <Grid container className={classes.wrapper}>
      {response.status === "fail" && 
        <Box display="flex" justifyContent="center" height="100%">
          <Alert severity='error'>{response.message}</Alert>
        </Box>
      }
      {loading ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "50vh", width: "100%" }}>
        <CircularProgress />
      </Box> : <>
      {props.products.list.map((product: any, i: number) => (
        <Grid key={i} item xs={12} sm={6} lg={4} className={classes.productDetailsWrapper}>
          <CardView
            title={product.name}
            description={product.description}
            imageUrl={product.imageUrl}
            price={product.price}
          />
        </Grid>
      ))}
      {props.products.hasMore && <Grid display="flex" justifyContent="flex-end" item xs={12}>
        <Button variant="contained" onClick={() => onClickNextButton()}>Next</Button>
        </Grid>}
      </>}
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    products: state.productReducer
  }
}

export const LandingPage = connect(mapStateToProps, { setProductList })(LandingPageComponent);
