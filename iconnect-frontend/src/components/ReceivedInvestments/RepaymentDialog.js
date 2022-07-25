import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
// import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import ExpandIcon from "@mui/icons-material/Expand";
import { Backend_URL } from "../../config/app.js";
import { STRIPE_PREMIUM_MEMBERSHIP_API_KEY } from "../../config/app.js";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import iConnectLogo from "../../assets/images/android-chrome-512x512.png";
import StripeCheckout from "react-stripe-checkout";
import moment from "moment";

const generateRepaymentList = (
  amountInvested,
  periodInMonths,
  dateOfInvestment,
  rateOfInterest,
) => {
  const repaymentDates = [];
  let newDate = dateOfInvestment;
  const totalAmountToRepay =
    amountInvested *
    Math.pow(1 + rateOfInterest / 100 / periodInMonths, periodInMonths);
  let installment = +(totalAmountToRepay / periodInMonths).toFixed(2);

  while (periodInMonths--) {
    let d = moment(new Date(newDate));
    newDate = d.add(1, "M");
    repaymentDates.push({ newDate, installment });
  }

  return repaymentDates;
};

const SlideUpTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RepaymentDialog({
  amountInvested,
  periodInMonths,
  dateOfInvestment,
  rateOfInterest = 0,
  investorName,
}) {
  const [open, setOpen] = useState(false);
  const [repaymentDues, setRepaymentDues] = useState([]);

  const rePay = async (token, addresses, amount, investorName, index) => {
    const bearerToken = localStorage.getItem("token");
    let paymentStatus = "";

    fetch(Backend_URL + `checkoutInvestmentRepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        token,
        addresses,
        amount,
        investorName,
      }),
    })
      .then(res => res.json())
      .then(data => {
        paymentStatus = data.bill.status;
        if (paymentStatus === "succeeded") {
          alert("Done!!");
          setRepaymentDues(arr => {
            const arrNew = arr;
            arrNew.splice(index, 1);
            return arrNew;
          });
        }
      });
  };

  useEffect(() => {
    setRepaymentDues(() => {
      const list = generateRepaymentList(
        amountInvested,
        periodInMonths,
        dateOfInvestment,
        rateOfInterest,
      );
      return list;
    });
  }, [amountInvested, periodInMonths, dateOfInvestment, rateOfInterest]);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleDialogOpen}
        endIcon={<ExpandIcon />}
      >
        Repay
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleDialogClose}
        TransitionComponent={SlideUpTransition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Repayment timeline
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDialogClose}>
              Ok
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {repaymentDues.map((item, index) => (
            <div key={index}>
              <ListItem button>
                <AttachMoneyIcon fontSize="small" />
                <ListItemText
                  primary={moment(item.newDate).format("MMM DD, YYYY")}
                  secondary={item.installment}
                />
                <StripeCheckout
                  stripeKey={STRIPE_PREMIUM_MEMBERSHIP_API_KEY}
                  billingAddress
                  ComponentClass="div"
                  shippingAddress={false}
                  name={"Repay - " + investorName}
                  description="Repay money"
                  label="Pay installment"
                  allowRememberMe={true}
                  amount={item.installment * 100}
                  panelLabel="Pay"
                  bitcoin={true}
                  currency="CAD"
                  zipCode={true}
                  image={iConnectLogo}
                  token={(token, addresses) => {
                    rePay(
                      token,
                      addresses,
                      item.installment,
                      investorName,
                      index,
                    );
                  }}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
