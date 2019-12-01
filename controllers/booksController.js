function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    //return console.log(book);
    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    book.save();
    res.status(201);
    return res.json(book);
  }
  function get(req, res) {
    Book.find((err, books) => {
      if (err) {
        const response = {
          message: "Unable to find a book",
          success: false,
          status: 401
        };
        return res.json(response);
      }
      const response = {
        message: "Get Book Route",
        success: true,
        data: books,
        status: 200
      };
      return res.json(response);
    });
  }
  return { post, get };
}

module.exports = booksController;
