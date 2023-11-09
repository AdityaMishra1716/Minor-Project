import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const port=3000;

// Serve static assets from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Serve jQuery from the 'node_modules' directory
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));


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