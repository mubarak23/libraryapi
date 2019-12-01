const should = require("should");
const sinon = require("sinon");
const booksController = require("../tests/booksControllerTests");

describe("Book Controller Test", () => {
  describe("Post", () => {
    it("should not allow an empty title on post", () => {
      const book = function(book) {
        this.save = () => {};
      };
      const req = {
        body: {
          author: "mubarak"
        }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = booksController(book);
      controller.post(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Band status ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
