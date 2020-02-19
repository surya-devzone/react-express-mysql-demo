const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");


var app = Express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

Mongoose.connect("mongodb://localhost/nodemysql");

const PostsModel = Mongoose.model("posts", {
    title: String,
    body: String
});

const StudentModel = Mongoose.model("students", {
    name: String,
    address: String
});

// student collection
app.get("/students", async (request, response) => {
    try {
        var result = await StudentModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
}); 
// student collection

app.post("/createpost", async (request, response) => {
    try {
        var post = new PostsModel(request.body);
        var result = await post.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/posts", async (request, response) => {
    try {
        var result = await PostsModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
}); 



app.get("/posts/:id", async (request, response) => {
    try {
        var person = await PostsModel.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
});
 
//update
app.post("/updatepost/:id", async (request, response) => {
    try {
        var person = await PostsModel.findById(request.params.id).exec();

        person.set(request.body);
        
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

//delete
app.post("/deletepost/:id", async (request, response) => {
    try {
        var result = await PostsModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(4001, () => {
    console.log("Listening at :4001...");
});