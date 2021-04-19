let app =require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
port = 9090;

app.get("/", (req,res)=>{
    res.sendFile(__dirname+ "/index.html");
})

io.on("connection", (socket)=>{
    console.log("\n Client connected....")
    
    socket.on("name" ,(name)=>{
        console.log("\n Client Name: "+name);
    })

    socket.on("msg",(msg)=>{
        console.log("Message from Client: "+ msg);
    });


})
http.listen(port, ()=>console.log(`Server Running on port ${port}`));