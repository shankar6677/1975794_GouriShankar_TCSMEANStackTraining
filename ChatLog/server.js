let app = require("express")();
let http = require("http").Server(app);   
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";


app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Connection is Successful");
    
    socket.on("chat",(msg)=> {
        console.log(msg);
        mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                if(!err1)
                {
                    let db = client.db("chatLog");
                    db.collection("chatlog").insertOne(msg, (err2,result)=>{
                        if(!err2){
                            console.log(result.insertedCount);
                        }else {
                            console.log(err2.message);
                        }
                        client.close();  
                    })  
        
                }
                else{
                    console.log("Error is " + err);
                    client.close();
                }
            }
        );
    })
})
http.listen(7070,()=>console.log('server running on port number 7070'));