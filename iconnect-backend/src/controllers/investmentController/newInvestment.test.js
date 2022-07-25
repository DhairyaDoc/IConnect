const request = require("supertest");
const { response } = require("../../index");
const app = require("../../index");

describe("Investment API Testing", () => {
  let investmentBearerToken = "";

  beforeAll(async () => {
    const response = await request(app)
      .post("/oAuthLogin")
      .send({
        firstName: "iConnect",
        lastName: "Team",
        email: "iconnectteam17@gmail.com",
        tokenId: expect.any(String),
      });

    investmentBearerToken = response.body.token;
  });

  it("Get Pending Investment API Test", () => {
    return request(app)
      .get("/getInvestment/6247dc1bcdbd4a44aee5de38/true")
      .set("Authorization", `Bearer ${investmentBearerToken}`)
      .send({
        investorID: "6247dc1bcdbd4a44aee5de38",
        isPending: true,
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: expect.any(Boolean),
            document: expect.any(Array),
          })
        );
      });
  });

  it("Get Non Pending Investment API Test", () => {
    return request(app)
      .get("/getInvestment/6247dc1bcdbd4a44aee5de38/true")
      .set("Authorization", `Bearer ${investmentBearerToken}`)
      .send({
        investorID: "6247dc1bcdbd4a44aee5de38",
        isPending: true,
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: expect.any(Boolean),
            document: expect.any(Array),
          })
        );
      });
  });

  it("Get Investment Request", () => {
    return request(app)
      .get("/getInvestmentRequest/6244bd79b0af1eed303079cb")
      .set("Authorization", `Bearer ${investmentBearerToken}`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          message: expect.any(Array),
          success: expect.any(Boolean),
        });
      });
  });

  it("Accept Investment API Test", () => {
    return request(app)
      .put("/acceptInvestment")
      .set("Authorization", `Bearer ${investmentBearerToken}`)
      .send({
        investmentID: expect.any(String),
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: expect.any(Boolean),
            message: expect.any(String),
          })
        );
      });
  });

  it("Reject Investment API Test", () => {
    return request(app)
      .put("/rejectInvestment")
      .set("Authorization", `Bearer ${investmentBearerToken}`)
      .send({
        investmentID: expect.any(String),
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: expect.any(Boolean),
            message: expect.any(String),
          })
        );
      });
  });

  it("Get Investment For Payment", () => {
      return request(app).get("/investmentPayment/6244bd79b0af1eed303079cb").set("Authorization", `Bearer ${investmentBearerToken}`)
      .expect("Content-Type", /json/).then(response => {
          expect(response.body).toEqual(
              expect.objectContaining({
                  success: expect.any(Boolean),
                  data: expect.any(Array)
              })
          )
      })
  })
});
