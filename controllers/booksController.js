function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    //return console.log(book);
    book.save();
    return res.status(201).json(book);
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
