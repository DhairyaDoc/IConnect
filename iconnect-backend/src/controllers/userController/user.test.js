const request = require("supertest");
const app = require("../../index");

describe("Test user profile API", () => {
  let bearerToken = "";

  beforeAll(async () => {
    const res = await request(app).post("/login").send({
      email: "saurabhid@gmail.com",
      password: "group17@asdc",
    });
    bearerToken = res.body.loginToken;
  });
  it("Changes the premium field of a user", () => {
    return request(app)
      .put("/update/623fd4311686245e31980071")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        firstName: "SaurabhIdea",
        lastName: "Das",
        email: "saurabhid@gmail.com",
        companyName: "",
        role: "ideator",
        isPremiumMember: false,
        premiumMembershipType: "none",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.any(Object),
          }),
        );
      });
  });
  it("Changes the premium field of a user - make Silver member", () => {
    return request(app)
      .put("/update/623fd4311686245e31980071")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        firstName: "SaurabhIdea",
        lastName: "Das",
        email: "saurabhid@gmail.com",
        companyName: "",
        role: "ideator",
        isPremiumMember: true,
        premiumMembershipType: "Silver",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.any(Object),
          }),
        );
      });
  });
  it("Changes the premium field of a user - make Gold member", () => {
    return request(app)
      .put("/update/623fd4311686245e31980071")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        firstName: "SaurabhIdea",
        lastName: "Das",
        email: "saurabhid@gmail.com",
        companyName: "",
        role: "ideator",
        isPremiumMember: true,
        premiumMembershipType: "Gold",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.any(Object),
          }),
        );
      });
  });
  it("Changes the premium field of a user - make Platinum member", () => {
    return request(app)
      .put("/update/623fd4311686245e31980071")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        firstName: "SaurabhIdea",
        lastName: "Das",
        email: "saurabhid@gmail.com",
        companyName: "",
        role: "ideator",
        isPremiumMember: true,
        premiumMembershipType: "Platinum",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.any(Object),
          }),
        );
      });
  });
});
