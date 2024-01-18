import express from "express";
import bodyParser from "body-parser";
import articleRoute from "./scripts/article.js"




const app=express();
app.use('/articles',articleRoute);

const port=8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})

app.get('/',(req,res)=>{
    res.render("index.ejs");
})
app.get('/form',(req,res)=>{
    res.render("form.ejs");
})
app.get('/article',(req,res)=>{
    res.render("article.ejs")
})
app.post('/form',(req,res)=>{
    console.log("form submitted");
})




app.post('/',(req,res)=>{
    console.log('Received POST request to /article');
    // res.send("ok");
    var artData={
        t:req.body["title"],
        m:req.body.markdown,
        d:req.body.description,
    }
    
    res.render("index.ejs",artData);
})