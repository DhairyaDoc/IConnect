const request = require("supertest");
const app = require("../../index");

describe("idea API", () => {
  let token = "";

  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      email: "bshivangi47@gmail.com",
      password: "password",
    });
    token = response.body.loginToken;
  });

  it("postIdea ", () => {
    return request(app)
      .post("/postIdea")
      .set("Authorization", `Bearer ${token}`)
      .send({
        projectName: expect.any(String),
        image: expect.any(String),
        investmentRequired: expect.any(String),
        isInvestmentDone: expect.any(Boolean),
        shortDescription: expect.any(String),
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.anything(),
            success: expect.any(Boolean),
          })
        );
      });
  });

  it("deleteIdea ", () => {
    return request(app)
      .get("/deleteIdea/" + "6231ec83a17279b425dc5477")
      .set("Authorization", `Bearer ${token}`)
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

  it("updateIdea ", () => {
    return request(app)
      .post("/updateIdea/" + "6231ec83a17279b425dc5477")
      .set("Authorization", `Bearer ${token}`)
      .send({
        projectName: expect.any(String),
        investmentRequired: expect.any(Number),
        isInvestmentDone: expect.any(Boolean),
        shortDescription: expect.any(String),
        image: expect.any(String),
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
  it("getIdea pass", () => {
    return request(app)
      .get("/ideas")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            posts: expect.any(Object),
          })
        );
      });
  });
  it("getIdea fail", () => {
    return request(app)
      .get("/ideas")
      .set("Authorization", `Bearer abcd`)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Unauthenticated",
            success: false,
          })
        );
      });
  });
  it("searchIdea pass", () => {
    return request(app)
      .get("/searchidea?searchQuery=desc")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            data: expect.any(Object),
          })
        );
      });
  });
  it("searchIdea fail", () => {
    return request(app)
      .get("/searchidea?searchQuery=aayushi")
      .set("Authorization", `Bearerabc123`)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Unauthenticated",
            success: false,
          })
        );
      });
  });
  it("contactForm success", () => {
    return request(app)
      .get(
        "/contactform?name=" +
          "Aayushi" +
          "&email=" +
          "aayushi@gmail.com" +
          "&message=" +
          "Hi I am Aayushi. I am interested in your idea. I would like to know more about it. Thanks" +
          "&ideaId=" +
          "623ddd3c56294139cb58146e"
      )
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Email sent",
            success: true,
          })
        );
      });
  });
  it("contactForm fail", () => {
    return request(app)
      .get(
        "/contactform?name=" +
          "Aayushi" +
          "&email=" +
          "aayushi@gmail.com" +
          "&message=" +
          "Hi I am Aayushi. I am interested in your idea. I would like to know more about it. Thanks" +
          "&ideaId=" +
          "623ddd3c56294139cb58146e"
      )
      .set("Authorization", `Bearer abc123`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Unauthenticated",
            success: false,
          })
        );
      });
  });

  it("Get Ideas API Test", () => {
    return request(app)
      .get("/userIdeas/6231ec83a17279b425dc5477")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            ideas: expect.any(Array),
          })
        );
      });
  });
});
