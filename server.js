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

// const cardList = [
//     {
//         title: "Kuala 2",
//         image: "images/kuala2.jpeg",
//         link: "About Kuala 2",
//         description: "Demo description about kuala 2"
//     },
//     {
//         title: "Kuala 3",
//         image: "images/kuala3.jpeg",
//         link: "About Kuala 3",
//         description: "Demo description about kuala 3"
//     }
// ];

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
    console.log("App listening to: "+port);
    createCollection("pets");
});