const fs = require('fs');
let data = fs.readFileSync('call_data.json');
let json_data = JSON.parse(data);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
	if (!err1) {
		let db = client.db("CallRecords");
		db.collection("CallRecords").insertMany(json_data, (err2, store) => {
			if (!err2) {
				console.log(store.insertedCount);
			} else {
				console.log("Error while fetching the data from call_data file");
			}
			client.close();
		});

	} else {
		console.log("Error while connecting to mongoDB")
	}
}); 