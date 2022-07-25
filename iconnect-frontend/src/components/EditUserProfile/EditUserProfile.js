import React from "react";

import "./EditUserProfile.css";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  FormGroup,
  Divider,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/actions/user";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_PREMIUM_MEMBERSHIP_API_KEY } from "../../config/app.js";
import iConnectLogo from "../../assets/images/android-chrome-512x512.png";
import { Backend_URL } from "../../config/app.js";
import silverImage from "../../assets/images/scottsdale-mint-xN4QdAn4aJw-unsplash.jpg";
import goldImage from "../../assets/images/rene-bohmer-YeUVDKZWSZ4-unsplash.jpg";
import platinumImage from "../../assets/images/rick-rothenberg-34en0tue5Tg-unsplash.jpg";

const EditUserProfile = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const [premiumMembershipType, setPremiumMembershipType] = useState("");
  const [open, setOpen] = useState(false);

  const AlertSuccessMembership = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const membershipTypes = [
    { name: "Silver", amount: 75, imgSrc: silverImage },
    { name: "Gold", amount: 100, imgSrc: goldImage },
    { name: "Platinum", amount: 125, imgSrc: platinumImage },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCompanyName(user.companyName);
      setUserRole(user.role);
      setIsPremiumMember(user.isPremiumMember);
      setPremiumMembershipType(user.premiumMembershipType);
    }
  }, []);

  const submit = () => {
    if (firstName !== "" && lastName !== "") {
      const userID = JSON.parse(localStorage.getItem("user"))._id;
      dispatch(
        updateUser({
          userID,
          firstName,
          lastName,
          userRole,
          companyName,
          isPremiumMember,
          premiumMembershipType,
        }),
      ).then(data => {
        if (data.error) {
          window.alert("Error Occurred while updating user data!");
        }
      });
    } else {
      window.alert("Please add all the fields appropriately!");
    }
  };

  const getPremiumMembership = (token, addresses, tier) => {
    const bearerToken = localStorage.getItem("token");
    let paymentStatus = "";

    fetch(Backend_URL + `checkoutPremium`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken,
      },
      body: JSON.stringify({
        token,
        addresses,
        membershipType: { name: tier.name, amount: tier.amount },
      }),
    })
      .then(res => res.json())
      .then(data => {
        paymentStatus = data.bill.status;
        if (paymentStatus === "succeeded") {
          setIsPremiumMember(true);
          setPremiumMembershipType(tier.name);
          handleClick();
        }
      });
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <AlertSuccessMembership
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have been enrolled as a {premiumMembershipType} member! Please
          submit your profile to save
        </AlertSuccessMembership>
      </Snackbar>
      <Typography gutterBottom variant="h3" align="center">
        Edit User
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                label="First Name"
                placeholder="Enter First Name"
                fullWidth
                required
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Last Name"
                placeholder="Enter Last Name"
                fullWidth
                required
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Company Name"
                placeholder="Enter Company Name"
                fullWidth
                value={companyName}
                onChange={e => {
                  setCompanyName(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} item>
              {userRole === "investor" ? (
                <FormGroup>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!isPremiumMember}
                    className={premiumMembershipType}
                  >
                    {isPremiumMember
                      ? premiumMembershipType + " member"
                      : "Not a premium member"}
                  </Button>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    {membershipTypes.map((tier, index) => (
                      <Card
                        sx={{ maxWidth: 345 }}
                        raised={true}
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          textAlign: "center",
                        }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <CardMedia
                              component="img"
                              height="140"
                              image={tier.imgSrc}
                              alt="green iguana"
                            />
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              style={{ padding: "1rem" }}
                            >
                              {tier.name} membership
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="div"
                              style={{ padding: "1rem" }}
                            >
                              For just {tier.amount} CAD!
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions style={{ margin: "auto" }}>
                          <StripeCheckout
                            key={index}
                            stripeKey={STRIPE_PREMIUM_MEMBERSHIP_API_KEY}
                            billingAddress
                            ComponentClass="div"
                            shippingAddress={false}
                            name="Investor Premium Subcr"
                            description={`${tier.name} subscription`}
                            label={`Become ${tier.name} member`}
                            allowRememberMe={true}
                            amount={tier.amount * 100}
                            panelLabel="Pay"
                            bitcoin={true}
                            currency="CAD"
                            zipCode={true}
                            image={iConnectLogo}
                            token={(token, addresses) => {
                              getPremiumMembership(token, addresses, tier);
                            }}
                          />
                        </CardActions>
                      </Card>
                    ))}
                  </Box>
                </FormGroup>
              ) : (
                <></>
              )}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => submit()}
              style={{ width: "5rem", margin: "0 auto" }}
            >
              Submit
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserProfile;
