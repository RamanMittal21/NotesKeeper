const express = require("express");
const app =express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/demoTestDB");
const NoteSchema = {
  title: String,
  content: String
};

const Note = mongoose.model("Note",NoteSchema);

// const anote= new Note({
// 	title:"abcd",
// 	content:"dfdsf sdf sdf sdf fs sdf f"
// });
// anote.save();

app.get("/",(req,res)=>{
	res.send("hello");
});


app.get("/api",(req,res)=>{

	Note.find(function(err,notesFound){
    if (!err) {
      res.json(notesFound);    
    } else {
      console.log(err);
    }
  })
});
app.post("/create",(req,res)=>{
    const aNote = new Note({
      title:req.body.title,
      content:req.body.content
    });
    aNote.save(function(err){
        if(!err)
        {
          res.json(aNote);
        }
        else
        {
          console.log(err);
        }
    })
});

app.delete("/delete/:note_id",(req,res)=>{
  const id=req.params.note_id;
  Note.deleteOne({_id:id},function(err){
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("that particular record deleted");
    }
  })
});

app.listen(5000,function(){
	console.log("server is running on port 5000");
});