import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

import useStyles from "./Styles.js";

import {
  investmentPayment,
  makeInvestmentPayment,
} from "../../store/actions/investment";
import { stripePaymentPublishKey } from "../../config/app.js";

const InvestmentPayment = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState();
  const classes = useStyles();

  const paymentList = useSelector(
    state => state.investmentReducer.investmentPayment,
  );

  useEffect(() => {
    handleInvestmentPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPayments(paymentList);
  }, [paymentList]);

  const handleInvestmentPayment = () => {
    dispatch(investmentPayment());
  };

  const handlePayment = (token, items) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user.email;

    const body = {
      email: email,
      items: items,
      token: token,
    };

    dispatch(makeInvestmentPayment(body)).then(result => {
      handleInvestmentPayment();
    });
  };

  return payments && payments.length > 0 ? (
    <Grid className={classes.container} container spacing={2}>
      {payments.map(item => {
        return (
          <Grid key={Math.random()} item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height={140}
                image={item.ideas.image}
                title={item.ideas.projectName}
              />
              <CardContent>
                <Typography variant="h5">{item.ideas.projectName}</Typography>
                <Typography variant="body1">
                  <b>Investment: </b>
                  {item.paid ? (
                    <span style={{ color: "green" }}>Done</span>
                  ) : (
                    <span style={{ color: "red" }}>Not Done</span>
                  )}
                </Typography>

                <Typography variant="body1">
                  <b>Investment Amount: </b>${item.amount}
                </Typography>

                <CardActions>
                  <StripeCheckout
                    stripeKey={stripePaymentPublishKey}
                    token={token => handlePayment(token, item)}
                    amount={item.amount * 100}
                    name="Invest in ideas"
                  >
                    <Button variant="contained">Invest</Button>
                  </StripeCheckout>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <Typography
      gutterBottom
      variant="h4"
      align="center"
      className={classes.text}
    >
      No pending payments
    </Typography>
  );
};

export default InvestmentPayment;
