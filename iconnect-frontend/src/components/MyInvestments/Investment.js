import React from "react";

import useStyles from "./Styles.js";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import moment from "moment";

const Investment = ({ investment }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={investment.image}
        title={investment.title}
      />

      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography variant="h5">
              <b>Idea: </b>
              {investment.projectName}
            </Typography>
            <Typography>
              <b>Approval Status: </b>{" "}
              {investment.ideas.isPending ? (
                <span style={{ color: "red" }}>Pending</span>
              ) : (
                <span style={{ color: "green" }}>Approved</span>
              )}
            </Typography>

            <br />
            <Typography>
              <b>Invested Amount:</b> ${investment.ideas.amount}
            </Typography>
            <Typography>
              <b>Payback Plan: </b> {investment.ideas.paybackPlan.toUpperCase()}
            </Typography>
            {investment.ideas.stake && (
              <Typography>
                <b>Stake: </b> {investment.ideas.stake}%
              </Typography>
            )}
            <Typography>
              {" "}
              <b>Invested At:</b> {moment(investment.ideas.updatedAt).fromNow()}
            </Typography>
            <Typography>
              <b>Payment: </b>
              {investment.ideas.paid ? (
                <span style={{ color: "green" }}>Approved</span>
              ) : (
                <span style={{ color: "red" }}>Pending</span>
              )}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Investment;
