const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/booksController');
function routes (Book){
    const controller = bookController(Book);
    bookRouter.route('/book')
.post(controller.post)
.get(controller.get);

//Querying the db
bookRouter.route('query_book')
.get((req, res) =>{
    const query = {};
    if(req.query.genre){
        query.genre = req.query.genre;
    }
    Book.find(query, (error, books) =>{
        if(error){
            const response = {
                "message": 'Book with gener Not Found',
                "success": false,
                "status": 401
            };
           return res.json(response);
        }
        const response = {
            "message": 'Get Book Route',
            "success": true,
            "data": books,
            "status": 200
        };
       return res.json(response);
    })
});

bookRouter.use('/book/:bookID', (req, res, next) =>{
    Book.findById(req.params.bookID, (error, book) =>{
        if(error){
            return res.status(401).json(`Error : ${error}`)
        }
        if(book){
            req.book = book;
            return next();
        }
    })
})

bookRouter.route('/book/:bookID')
.get((req, res) =>{
    const response = {
        "message": ' Book with ID Retrieved',
        "success": true,
        "data": req.book,
        "status": 200
    };
   return res.json(response);
})
.put((req, res) => {
    const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read
        req.book.save((error) =>{
            if(error){
                return res.status(401).json(`Error: ${error}`);
            }
            return res.status(200).json(book);
        });

    })
.patch((req, res) =>{
    const { book } = req;
    if(req.body._id){
        delete req.body._id;
    }
    Object.entries(req.body).forEach((item) =>{
        const key = item[0];
        const value = item[1];
        book[key] = value;
    });
    req.book.save((error) =>{
        if(error){
            return res.status(401).json(`Error: ${error}`);
        }
        return res.status(200).json(book);
    })
    .delete((req, res) =>{
        req.body.remove((error) =>{
            if(error){
                return res.status(401).json(error);
            }
            return res.status(204),json(`Book Removed`)
        })
    })
})
return bookRouter;

}

module.exports = routes