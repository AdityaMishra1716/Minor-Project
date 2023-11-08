import express from "express";


const app=express();
const port=3000;
app.use(express.static("public"));

app.get("/",(req,res)=>{
    
    res.render("app.ejs" );
});
app.get("/profile",(req,res)=>{
    
    res.render('pages/profile.ejs' );
});
app.get("/order",(req,res)=>{
    
    res.render('pages/order.ejs' );
});

app.get("/wish",(req,res)=>{
    
    res.render('pages/wish.ejs' );
});

app.get("/cart",(req,res)=>{
    
    res.render('pages/cart.ejs' );
});


app.listen(port,()=>
{
    console.log("server on port:",port);
});