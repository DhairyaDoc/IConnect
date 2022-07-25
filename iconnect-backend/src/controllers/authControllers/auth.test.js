const { response } = require("express");
const request = require("supertest");
const app = require("../../index");

describe("Auth API", () => {
  it("login success", () => {
    return request(app)
      .post("/login")
      .send({
        email: "bshivangi47@gmail.com",
        password: "password",
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Successfully logged in!",
            loginToken: expect.any(String),
            success: true,
          })
        );
      });
  });
  it("login fail wrong password", () => {
    return request(app)
      .post("/login")
      .send({
        email: "aayushigandhi12@gmail.com",
        password: "wrongpassword",
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Password does not match",
            success: false,
          })
        );
      });
  });
  it("login fail unregistered user", () => {
    return request(app)
      .post("/login")
      .send({
        email: "aayushi281298@gmail.com",
        password: "password",
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "User is not registered",
            success: false,
          })
        );
      });
  });
  it("oauth login success ", () => {
    return request(app)
      .post("/oAuthLogin")
      .send({
        firstName: "Shivangi",
        lastName: "Bhatt",
        email: "bshivangi19@gmail.com",
        tokenId: expect.any(String),
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.objectContaining({
              _id: expect.any(String),
              createdAt: expect.anything(),
              email: expect.any(String),
              firstName: expect.any(String),
              lastName: expect.any(String),
              role: expect.any(String),
              totalInvestments: expect.any(Number),
            }),
            token: expect.any(String),
            success: expect.any(Boolean),
          })
        );
      });
  });
  it("oauth login fail ", () => {
    return request(app)
      .post("/oAuthLogin")
      .send({})
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            message: "All fields are not present",
          })
        );
      });
  });
  it("forgotPassword success", () => {
    return request(app)
      .post("/forgotPassword")
      .send({
        email: expect.any(String),
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
  it("forgotPassword fail", () => {
    return request(app)
      .post("/forgotPassword")
      .send({
        email: "shivangi",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            message: "Invalid Email",
          })
        );
      });
  });
  it("forgotPassword fail", () => {
    return request(app)
      .post("/forgotPassword")
      .send()
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Please enter all the fields",
            success: false,
          })
        );
      });
  });
  it("forgotPassword fail", () => {
    return request(app)
      .post("/forgotPassword")
      .send({
        email: "email@mail.ca",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            message: "No account is registered with this email",
          })
        );
      });
  });
  it("resetPassword fail", () => {
    return request(app)
      .post("/resetPassword")
      .send({ password: expect.any(String), token: expect.any(String) })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: expect.any(Boolean),
            error: expect.any(Array),
          })
        );
      });
  });
  it("validateToken", () => {
    return request(app)
      .get("/validateToken")
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
});
