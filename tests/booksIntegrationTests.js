const should = require("should");
const superTest = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const book = mongoose.model("Book");

process.env.Dev = "test";

const agent = superTest.agent(app);

describe("Book Crud Test", () => {
  it("should allow book to be posted and return read .. it", done => {
    const bookPost = { title: "my book", author: "Mubarak", genre: "Fashion" };
    agent
      .post("/api/book")
      .send(bookPost)
      .expect(200)
      .end((error, results) => {
        console.log(results);
        results.body.read.should.not.equal("false");
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach(done => {
    book.deleteMany({}).exec();
    done();
  });
  after(done => {
    mongoose.connection.close();
    app.server(done());
  });
});
