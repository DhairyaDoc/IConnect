export const ENV = process.env.NODE_ENV === "development" ? "dev" : "prod";
export const Backend_URL =
  ENV === "dev"
    ? "http://localhost:3200/"
    : "https://iconnect-back-end-dev.herokuapp.com/";
console.log("Using backendURL", Backend_URL);
export const drawerWidth = 240;
export const googleClientId =
  "731090558331-5g7ct6vjs2lvfu0kim1bquhdoohckdrk.apps.googleusercontent.com";
export const ICONNECT_EMAIL_CONTACT = "iconnectteam17@gmail.com";
export const STRIPE_PREMIUM_MEMBERSHIP_API_KEY =
  "pk_test_51KkguqHbxnZX1q2uZurtU53gER3j6oyX0J2OUHmbloR9bjtbjyZ586PvCKPxKPOLJ9Ve0whsi5iLNix8kukU2odD00S4GiAHTG";
export const stripePaymentPublishKey =
  "pk_test_51Kj8TLDUiun6JENAD8pKb1LxAJkoOTkLRsNXqxMY0BiVeAd5iDVGN8X1bhDVNwlVdnozjrLM1BIz33xELUeT429f00WWN7X1n5";
