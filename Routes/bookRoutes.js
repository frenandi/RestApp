var express = require("express");

var routes = function(Book){
    var bookRouter = express.Router();

    bookRouter.route("/")
        .post(function(req,res){
            var book = new Book(req.body);
            book.save();
            console.log(book);
            res.status(201).send(book);
        })
        .get(function(req,res){
            var query = {};
            if(req.query.genre){
                query.genre = req.query.genre;
            }
            Book.find(query,function(err,books){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });

    bookRouter.use("/:bookId", function(req,res,next){
        Book.findById(req.params.bookId,function(err,book){
            if(err){
                res.status(500).send(err);
            }
            else if(book){
                req.book = book;
                next();
            }            
            else{
                res.status(400).send("no book found");
            }                
        })
    });

    bookRouter.route('/:bookId')
        .get(function(req,res){
            res.json(req.book);
        })
        .put(function(req,res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        })
        .patch(function(req,res){
            if(req.body.__id)
                delete req.body.__id
            for(var p in req.body){
                req.book[p] = req.body[p];
            }
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });
    return bookRouter;
};

module.exports = routes;