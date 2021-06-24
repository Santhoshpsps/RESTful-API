//jshint eversion:6

const bodyParser = require('body-parser');
const ejs = require('ejs');

const express = require('express');
const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(express.static("public"));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser:true, useUnifiedTopology:true});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article =mongoose.model("article",articleSchema);

// Article.insertMany([
//   {
//       "title" : "API",
//       "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
//   },
//
//   {
//       "title" : "Bootstrap",
//       "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
//   }
//   ,
//
//   {
//       "title" : "DOM",
//       "content" : "The Document Object Model is like an API for interacting with our HTML"
//   }
// ])


app.get("/",function(req,res){
  res.send("<h1>Success!</h1>");
});

app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,articles){
    if(!err){
      res.send(articles);
      // res.redirect("/articles");
    }
    else{
      console.log(err);
    }

  });
})
.post(function(req,res){
  const newArticle = new Article({
    title:req.body.title,
    content:req.body.content
  });
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully saved");
      // res.redirect("/articles");
    }
    else{
      res.send(err);
    }
  });
})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(!err){
      res.send("Deletion Successful!");
    }
    else{
      res.send(err);
    }
  });
});

app.route("/articles/:name")
.get(function(req,res){
  Article.findOne({title:req.params.name},function(err,result){
    if(!err){
      res.send(result);
    }
    else{
      res.send(err);
    }
  });
})
.put(function(req,res){
  Article.updateOne({title:req.params.name},{title:"Sant",content:"psps"},function(err,results){
    if(!err){
      res.send(results);

    }
    else{
      res.send(err);
    }
  })
})
.patch(function(req,res){
  Article.updateOne({title:req.params.name},{content:"psps"},function(err,results){
    if(!err){
      res.send(results);

    }
    else{
      res.send(err);
    }
  })
})

.delete(function(req,res){
  Article.deleteOne({title:req.params.name},function(err){
    if(!err){
      res.send("Deletion Successful!");
    }
    else{
      res.send(err);
    }
  });
});



app.listen(3000,function(){
  console.log("Server Started at port 3000")
});
