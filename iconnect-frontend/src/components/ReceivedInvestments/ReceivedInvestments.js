import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import useStyles from "./Styles";
import { getReceivedInvestments } from "../../store/actions/investment";
import RepaymentDialog from "./RepaymentDialog";
import { Typography } from "@mui/material";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Investment = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const receievedInvestments = useSelector(
    state => state.investmentReducer.receievedInvestments,
  );
  useEffect(() => {
    dispatch(getReceivedInvestments());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {console.log(receievedInvestments)}
      {receievedInvestments && receievedInvestments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Investor name</StyledTableCell>
                <StyledTableCell align="center">Idea title</StyledTableCell>
                <StyledTableCell align="center">Invested</StyledTableCell>
                <StyledTableCell align="center">Required</StyledTableCell>
                <StyledTableCell align="center">
                  Time of investment
                </StyledTableCell>
                <StyledTableCell align="center">
                  Investment type
                </StyledTableCell>
                <StyledTableCell align="right">Repayment</StyledTableCell>
                {/* <StyledTableCell align="center">Actions</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("Investments::", receievedInvestments)}
              {receievedInvestments
                ? receievedInvestments.map(row => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.investor.firstName + " " + row.investor.lastName}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.ideas.projectName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.ideas.investmentRequired}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(row.createdAt).format("MMM DD, YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.paybackPlan}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.paybackPlan === "stake" ? (
                          <Typography
                            gutterBottom
                            variant="button"
                            align="center"
                            className={classes.text}
                          >
                            {row.stake} % of stake
                          </Typography>
                        ) : (
                          <RepaymentDialog
                            amountInvested={row.amount}
                            periodInMonths={12}
                            dateOfInvestment={row.createdAt}
                            rateOfInterest={row.debtInterest}
                            investorName={
                              row.investor.firstName +
                              " " +
                              row.investor.lastName
                            }
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          gutterBottom
          variant="h4"
          align="center"
          className={classes.text}
        >
          No investment received
        </Typography>
      )}
    </>
  );
};

export default Investment;
