let express = require('express');
let path = require('path');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// MongoDB connection details
let mongoUrlLocal = "mongodb://admin:password@192.168.0.105:27017";
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let databaseName = "my-db";

app.post('/register', function (req, res) {
    let userObj = req.body;
    userObj['userid'] = 1; // Assigning a static user id for simplicity

    MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
        if (err) {
            console.error("Database connection failed:", err);
            return res.status(500).send("Database connection failed");
        }

        let db = client.db(databaseName);
        db.collection("users").updateOne({ userid: 1 }, { $set: userObj }, { upsert: true }, function(err, result) {
            if (err) {
                console.error("Error updating the user:", err);
                return res.status(500).send("Error updating the user");
            }
            client.close();
            res.send(userObj);
        });
    });
});

app.listen(3000, function () {
    console.log("App listening on port 3000!");
});

