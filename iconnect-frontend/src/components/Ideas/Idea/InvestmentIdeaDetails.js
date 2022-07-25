import store from "../../../store";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ContactMe } from "./ContactMe";
import { Grid } from "@material-ui/core";
import useStyles from "./Styles.js";
import { Button, DialogTitle, DialogContent } from "@material-ui/core";
import ExpandIcon from "@mui/icons-material/Expand";
import Dialog from "@mui/material/Dialog";
import { investment } from "../../../store/actions/investment";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const InvestmentModal = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const storeIdea = store.getState();
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.authReducer.user);

  const rowsData = [];

  useEffect(() => {
    dispatch(investment(id)).then(() => {
      navigate("/investmentideadetails/" + id);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setOpen(open);
  }, [open]);

  function createData(name, amount, leftAmount, createdAt, ideaId) {
    const dateTimeArray = createdAt.split("T");
    const dateOnly = dateTimeArray[0];
    const timeOnly = dateTimeArray[1].split(".")[0];

    return { name, amount, leftAmount, dateOnly, timeOnly, ideaId };
  }

  let leftAmount = 0;

  const investmentStore = storeIdea.investmentReducer.investmentDetails;

  if (typeof investmentStore !== "undefined") {
    if (investmentStore !== null) {
      if (investmentStore.length !== 0) {
        let requiredAmount = investmentStore[0].investmentRequired;
        for (const oneInvestment in investmentStore) {
          leftAmount =
            requiredAmount - investmentStore[oneInvestment].ideas.amount;
          requiredAmount = leftAmount;

          rowsData.push(
            createData(
              investmentStore[oneInvestment].users.firstName +
              " " +
              investmentStore[oneInvestment].users.lastName,
              investmentStore[oneInvestment].ideas.amount,
              leftAmount,
              investmentStore[oneInvestment].createdAt,
              investmentStore[oneInvestment].createdBy,
            ),
          );
        }
      }
    }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Investor Name</StyledTableCell>
              <StyledTableCell align="right">Invested Amount</StyledTableCell>
              <StyledTableCell align="right">
                Date of Investment
              </StyledTableCell>
              <StyledTableCell align="right">
                Time of Investment
              </StyledTableCell>
              <StyledTableCell align="right">
                Investment yet to be raised
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData
              ? rowsData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    $ {row.amount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.dateOnly}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.timeOnly}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    $ {row.leftAmount}
                  </StyledTableCell>
                </StyledTableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>


      {user && user.role === "investor" ? (

        <div className="container-fluid">
          <div className="col-lg-10 offset-lg-1">
            <div className="align-items-center">
              <br />
              <br />
              <br />
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  className={classes.buttonSubmit}
                  onClick={handleDialogOpen}
                  variant="contained"
                  endIcon={<ExpandIcon />}
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Contact the ideator
                </Button>

                <Dialog
                  open={open}
                  onClose={handleDialogClose}
                  fullWidth={true}
                  maxWidth={"sm"}
                >
                  <DialogTitle>Contact Ideator</DialogTitle>
                  <DialogContent>
                    <div>
                      <ContactMe idea_id={id} />
                    </div>
                  </DialogContent>
                </Dialog>
              </Grid>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InvestmentModal;
