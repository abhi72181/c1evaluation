const express=require("express")
const app=express();

app.listen(4000,()=>{
    console.log("live 4000")
})

app.use(logger)

app.get("/books",(req,res)=>{
   return res.send({route:"/books"})
})

app.get("/libraries",checkPermission("librarian"),(req,res)=>{
    return res.send({route:"/libraries",permission:req.permission})
 })

 app.get("/authors",checkPermission("author"),(req,res)=>{
    return res.send({route:"/authors",permission:req.permission})
 })

 function logger(req,res,next){
      console.log(req.path)
     next();
 }

function checkPermission(role){
   return function(req,res,next){
       if(req.path==="/libraries"){
            req.permission="true"
            next()
       }
       else if(req.path==="/authors"){
           req.permission="true"
           next()
       }
       else{
           console.log("not allowed")
           
       }
   }
}