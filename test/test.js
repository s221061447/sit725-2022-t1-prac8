var expect = require("chai").expect;
var request = require("request");

describe("Add two numbers", () => {
    var url = "http://localhost:3000/addTwoNumbers?n1=10&n2=3";
    
    it("returns status code as 200 to check if API works", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("returns status code as 200 as a part of the response body to check if API works", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });

    it("returns the result as a number data type", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            done();
        });
    });

    it("returns the result as 13", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.equal(13);
            done();
        });
    });

    it("returns the result as not 15", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.not.equal(15);
            done();
        });
    });
});

describe("Add two strings", () => {
    var url = "http://localhost:3000/addTwoNumbers?n1=a&n2=b";
    
    it("returns status code as 200 to check if API works", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("returns status code as 400 as a part of the response body", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(400);
            done();
        });
    });

    it("returns the result as a null data type", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.result).to.be.a('null');
            done();
        });
    });
});

describe("Validate projects API", () => {
    var url = "http://localhost:3000/api/projects";
    
    it("returns status code as 200 to check if API works", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("returns the result as an array data type", (done) => {
        request(url, (err, res, body) => {
            body = JSON.parse(body);
            expect(body.data).to.be.a('array');
            done();
        });
    });
});