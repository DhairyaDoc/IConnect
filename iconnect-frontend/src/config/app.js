export const ENV = process.env.NODE_ENV === "development" ? "dev" : "prod";
export const Backend_URL =
  ENV === "dev"
    ? "http://localhost:3200/"
    : "https://iconnect-back-end-dev.herokuapp.com/";

export const drawerWidth = 240;
export const googleClientId = "GOGGLE CLIENT ID";
export const ICONNECT_EMAIL_CONTACT = "iconnectteam17@gmail.com";
export const STRIPE_PREMIUM_MEMBERSHIP_API_KEY = "STRIPE MEMBERSHIP KEY";
export const stripePaymentPublishKey = "STRIPE PAYMENT PUBLIC KEY";
