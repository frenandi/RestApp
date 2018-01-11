var should = require("should");
var request = require("supertest");
var app = require("../app.js");
var moongose = require("mongoose");
var Book = moongose.model("Book");
var agent = request.agent(app);

describe("Book Crud Test ", function(){
    it("Should allow a book to be posted and return a read and __id", function(done){
        var bookPost = {title:"algo", author: "algo", genre:"fiction"};
        agent.post("/api/books")
            .send(bookPost)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.not.equal(false);
                results.body.should.have.property("__id");
                done();
            })
    });

    afterEach(function(done){
        Book.remove().exec();
        done();
    })
});