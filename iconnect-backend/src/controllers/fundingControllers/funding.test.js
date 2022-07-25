const request = require("supertest");
const app = require("../../index");

describe("investments API", () => {
  let investorToken = "";

  beforeAll(async () => {
    const response = await request(app)
      .post("/oAuthLogin")
      .send({
        firstName: "iConnect",
        lastName: "Team",
        email: "iconnectteam17@gmail.com",
        tokenId: expect.any(String),
      });
    investorToken = response.body.token;
  });
  it("invest ", () => {
    return request(app)
      .post("/investments/invest")
      .set("Authorization", `Bearer ${investorToken}`)
      .send({
        investorId: expect.any(String),
        ideaId: expect.any(String),
        amount: expect.any(Number),
        paybackPlan: expect.any(String),
        stake: expect.any(Number),
        debtInterest: expect.any(Number),
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
            success: expect.any(Boolean),
          })
        );
      });
  });
  it("withDrawInvestment ", () => {
    return request(app)
      .post("/investments/withDrawInvestment")
      .set("Authorization", `Bearer ${investorToken}`)
      .send({
        investorId: "6240627ef76abbbe25baf771",
        ideaId: "6231ec83a17279b425dc5477",
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
            success: expect.any(Boolean),
          })
        );
      });
  });
  it("updateInvestment ", () => {
    return request(app)
      .post("/investments/updateInvestment/" + "6231ec83a17279b425dc5477")
      .set("Authorization", `Bearer ${investorToken}`)
      .send({
        investorId: expect.any(String),
        ideaId: expect.any(String),
        amount: expect.any(String),
        paybackPlan: expect.any(String),
        stake: expect.any(String),
        debtInterest: expect.any(String),
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
            success: expect.any(Boolean),
          })
        );
      });
  });
  it("getReceivedInvestments ", () => {
    return request(app)
      .get("/investments/getReceivedInvestments/")
      .set("Authorization", `Bearer ${investorToken}`)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.any(Array),
            success: expect.any(Boolean),
          })
        );
      });
  });
  it("viewDetails fail", () => {
    return request(app)
      .get("/investments/viewDetails/" + "62443f15031832b1835f4890")
      .set("Authorization", `Bearer ${investorToken}`)
      .expect(404);
  });
});
