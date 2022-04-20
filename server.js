require("dotenv").config();
const express= require("express");
const cors = require("cors");
const app= express();

const MongoClient = require("mongodb").MongoClient;
// Connect to the database
const uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@sit725.pidyf.mongodb.net/SIT725?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let projectCollection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cors());

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
};

const insertProject = (project, callback) => {
    projectCollection.insert(project, callback);
};

const createCollection = (collectionName) => {
    client.connect((err, db) => {
        projectCollection = client.db().collection(collectionName);
        if (!err) {
            console.log("Successfully created or acquired collection.");
        } else {
            console.error("Database error: " + err);
            process.exit(1);
        }
    });
};

const addTwoNumbers = (n1, n2) => {
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    let result = (n1 + n2) || null;
    return result;
}

// Add two numbers API
app.get('/addTwoNumbers', (req, res) => {
    let n1 = req.query.n1;
    let n2 = req.query.n2;
    let result = addTwoNumbers(n1, n2);
    if (result == null) {
        res.json({ statusCode: 400, result: result });
    } else {
        res.json({ statusCode: 200, result: result });
    }
});

app.get('/api/projects', (req,res) => {
    getProjects((err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err });
        } else {
            res.json({ statusCode: 200, message: "Success", data: result });
        }
    });
});

app.post('/api/projects', (req,res) => {
    let project = req.body;
    insertProject(project, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err });
        } else {
            res.json({ statusCode: 200, message: "Successfully added new project", data: result });
        }
    });
});

const port = 3000;

app.listen(port, ()=> {
    console.log("App listening to: " + port);
    createCollection("pets");
});