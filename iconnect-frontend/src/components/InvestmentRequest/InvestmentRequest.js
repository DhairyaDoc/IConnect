import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingInvestment,
  rejectInvestment,
  acceptInvestment,
} from "../../store/actions/investment";
import useStyles from "./Style.js";

const InvestmentRequest = () => {
  const dispatch = useDispatch();
  const [requestedInvestment, setRequestedInvestment] = useState();
  const classes = useStyles();

  const investmentRequest = useSelector(
    state => state.investmentReducer.pendingInvestment,
  );

  useEffect(() => {
    handlePendingInvestment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRequestedInvestment(investmentRequest);
  }, [investmentRequest]);

  const handlePendingInvestment = () => {
    dispatch(getPendingInvestment());
  };

  const handleAcceptInvestment = item => {
    dispatch(acceptInvestment(item)).then(result => {
      handlePendingInvestment();
    });
  };

  const handleRejectInvestment = item => {
    dispatch(rejectInvestment(item)).then(result => {
      handlePendingInvestment();
    });
  };

  return requestedInvestment && requestedInvestment.length > 0 ? (
    <Grid className={classes.container} container spacing={2}>
      {requestedInvestment.map(item => {
        return (
          <Grid key={Math.random()} item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.ideas.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.ideas.projectName}
                </Typography>
                <br />
                <Typography gutterBottom>
                  <b>Investment Required: </b>${item.ideas.investmentRequired}
                </Typography>
                <Typography gutterBottom>
                  <b> Investor: </b>
                  {item.investor.firstName} {item.investor.lastName}
                </Typography>
                <Typography gutterBottom>
                  <b> Investor's Email: </b>
                  {item.investor.email}
                </Typography>
                <Typography gutterBottom>
                  <b> Investment Amount: </b>${item.amount}
                </Typography>
                <Typography>{moment(item.updatedAt).fromNow()}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  onClick={() => handleAcceptInvestment(item._id)}
                >
                  Accept
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleRejectInvestment(item._id)}
                >
                  Reject
                </Button>
              </CardActions>
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
      No Pending Investment Request{" "}
    </Typography>
  );
};

export default InvestmentRequest;
