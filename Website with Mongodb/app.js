let app = require("express")();
let bodyParser = require("body-parser");
let port = 7070;
app.use(bodyParser.urlencoded({ extended: true }));
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
// Add Course
app.get("/addCourse", (req, res) => {
    res.sendFile(__dirname + "/addCourse.html");
});

app.post("/addCourseDetails", (req, res) => {

    var id = req.body.courseId;
    var name = req.body.courseName;
    var det = req.body.details;
    var amunt = req.body.amount;

    mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
        console.log(id)
        if (!err1) {
            var data = {
                "_id": id,
                "courseName": name,
                "details": det,
                "amount": amunt
            }

            let db = client.db("meanstack");
            db.collection("courses").insertOne(data, (err2, result) => {
                if (!err2) {
                    console.log("Course Added Successfully ");
                } else {
                    console.log(err2.message);
                }
                client.close();
            });
        }
    })
    res.sendFile(__dirname + "/addCourse.html");
})

//Update Course
app.get("/UpdateCourse", (req, res) => {
    res.sendFile(__dirname + "/UpdateCourse.html");
});

app.post("/UpdateCourseDetails", (req, res) => {

    var id = req.body.courseId;
    var amunt = req.body.amount;

    mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
        if (!err1) {
            var data = {
                "_id": id,
                "amount": amunt
            }
            let db = client.db("meanstack");
            db.collection("courses").updateOne({ _id: data._id }, { $set: { amount: data.amount } }, (err2, result) => {
                if (!err2) {
                    // console.log(result);
                    if (result.modifiedCount > 0) {
                        console.log("Record updated successfully")
                    } else {
                        console.log("Record didn't update");
                    }
                }
                client.close();
            })
        }
    })
    res.sendFile(__dirname + "/updateCourse.html");
})


//Delete Course
app.get("/DeleteCourse", (req, res) => {
    res.sendFile(__dirname + "/DeleteCourse.html");
});

app.post("/DeleteCourseDetails", (req, res) => {
    var id = req.body.courseId;
    mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
        if (!err1) {
            var data = {
                "_id": id,
            }
            let db = client.db("meanstack");
            db.collection("courses").deleteOne({ _id: data._id }, (err2, result) => {
                if (!err2) {
                    if (result.deletedCount > 0) {
                        console.log("Record deleted successfully")
                    } else {
                        console.log("Record not present")
                    }

                }
                client.close();
            })
        }
    })
    res.sendFile(__dirname + "/DeleteCourse.html");
})

//Retrieve Course
app.get("/fetchCourses", (req, res) => {
    res.sendFile(__dirname + "/fetchCourses.html");
});

app.get("/allCoursesDetails", async(req, res) => {
    mongoClient.connect(url, { useUnifiedTopology: true }, async(err1, client) => {
        if (!err1) {
            let db = client.db("meanstack");
            let cursor = db.collection("courses").find();
            const results = await cursor.toArray();
            let courses = [];
            if (results.length > 0) {
                results.forEach((result, i) => {
                    courses.push(result)
                });
            } else {
                console.log(`No customers found`);
            }
            res.json(courses)
        }
    })

})
app.listen(port, () => console.log(`App running at ${port}`));