import express from "express";
import bodyParser from "body-parser";


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static('static'));



router.get('/article',(req,res)=>{
    res.send("hi its me ");
    // res.render("article.ejs")
})
router.post('/article',(req,res)=>{
    console.log('Received POST request to /article');
    // res.send("ok");
    var artData={
        t:req.body["title"],
        m:req.body.markdown,
        d:req.body.description,
    }
    res.render("article.ejs",{
        title: artData["t"],
        markdown:artData["m"],
        description:artData["d"],
    })
})




export default router;