import app from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import { seed, testBooks, testReviews } from "../db/seed.js";
import { beforeEach } from "mocha";

const should = chai.should();
chai.use(chaiHttp);

describe("Ping API", function () {
  it("should reply with a status message", function (done) {
    chai
      .request(app)
      .get("/api/ping")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.success.should.eq(true);
        done();
      });
  });
});

describe("Books API", function () {
  before(async () => {
    await seed();
  });

  it("should return a list of books", function (done) {
    chai
      .request(app)
      .get("/api/books")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.books.should.be.a("array");
        res.body.books.length.should.eq(testBooks.length);
        res.body.books[0].author.should.eq(testBooks[0].author);
        res.body.books[0].description.should.eq(testBooks[0].description);
        done();
      });
  });

  it("should return a single book by id", function (done) {
    chai
      .request(app)
      .get("/api/books/1")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        should.exist(res.body.book);
        res.body.book.author.should.eq(testBooks[0].author);
        done();
      });
  });

  it("should return a null book if book id doesn't exit", function (done) {
    chai
      .request(app)
      .get("/api/books/0")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(404);
        res.body.should.be.a("object");
        should.not.exist(res.body.book);
        done();
      });
  });

  it("should return reviews along with a book", function (done) {
    chai
      .request(app)
      .get("/api/books/1")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.book.reviews.should.be.a("array");
        res.body.book.reviews.length.should.eq(2);
        done();
      });
  });

  it("should return an empty array if book has no reviews", function (done) {
    chai
      .request(app)
      .get("/api/books/2")
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.book.reviews.should.be.a("array");
        res.body.book.reviews.length.should.eq(0);
        done();
      });
  });

  it("should create a review", function (done) {
    const review = {
      name: "Erin Burton",
      content: "This is a test review",
      bookId: 2,
    };
    chai
      .request(app)
      .post("/api/reviews/create")
      .type("json")
      .send(review)
      .end((err, res) => {
        if (err) throw err;
        console.log(res);
        res.should.have.status(203);
        res.body.review.should.be.a("object");
        res.body.review.content.should.eq(review.content);
        res.body.review.name.should.eq(review.name);
        res.body.review.bookId.should.eq(review.bookId);
        done();
      });
  });
});
