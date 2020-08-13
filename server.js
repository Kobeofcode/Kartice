const express = require("express");
const mongojs = require("mongojs");
const db = mongojs("eddi",["nesto"]);

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.post("/save",(req,res)=>{
    let msg = req.body.msg;
    db.nesto.insert({msg:msg,date:new Date ().toDateString()},(err,data)=>{
        res.send("Sve Ok");
    })
    
})
app.get("/get_data",(req,res)=>{
    db.nesto.find((err,data) =>{
        res.send(data);
    })
})
app.post("/delete",(req,res)=>{
    let id = req.body.id;
    db.nesto.remove({"_id":db.ObjectId(id)},(err,data)=>{
        res.send("Deleted")
    })
})

app.listen(3000, ()=>{
    console.log("listening to port 3000")
})

